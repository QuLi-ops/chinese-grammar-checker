import { NextRequest, NextResponse } from 'next/server';
import { Message, GrammarError } from '../../types/grammar';
import { sendGAEvent } from '@next/third-parties/google';
import { v4 as uuidv4 } from 'uuid'; // 需要安装: npm install uuid @types/uuid

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

function constructPrompt(
  text: string,
  style: string,
  responseLanguage: string,
  requestId: string
): Message[] {
  // 记录用户输入事件，包含文本本身和请求ID
  sendGAEvent('event', 'grammar_check_input', {
    request_id: requestId,
    text: text,
    style: style,
    response_language: responseLanguage
  });
  
  return [
    {
      role: 'system',
      content: `You are a language grammar teacher. Each response should be completely independent and not reference any previous conversations or context.
Treat each input as a new, standalone request.
For explanations: Use ${responseLanguage} for your explanations.
The text is ${style} style.

Your task is to:
1. Check if the text is grammatically correct
2. If there are errors, mark them with <<error_id:error_text>> where error_id is the error number
3. Provide clear explanations for each error
4. Provide a corrected version of the text in the SAME LANGUAGE as the original input`
    },
    {
      role: 'user',
      content: text,
    },
  ];
}

export async function POST(request: NextRequest) {
  // 为每个请求生成唯一ID
  const requestId = uuidv4();
  
  if (!OPENROUTER_API_KEY) {
    // 记录API密钥缺失错误，包含请求ID
    sendGAEvent('event', 'grammar_check_error', {
      request_id: requestId,
      error_type: 'configuration',
      error_message: 'OpenRouter API key not configured'
    });
    
    return NextResponse.json(
      { error: 'OpenRouter API key not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { text, style, responseLanguage } = body;

    const messages = constructPrompt(text, style, responseLanguage, requestId);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-001',
        messages,
        provider: {
          require_parameters: true
        },
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "grammar_check",
            strict: true,
            schema: {
              type: "object",
              properties: {
                isCorrect: {
                  type: "boolean",
                  description: "Whether the text is grammatically correct"
                },
                text: {
                  type: "string",
                  description: "Original text with errors marked using <<error_id:error_text>>"
                },
                explanations: {
                  type: "array",
                  description: "Array of error explanations",
                  items: {
                    type: "object",
                    properties: {
                      error_id: { type: "string" },
                      error_text: { type: "string" },
                      explanation: { type: "string" }
                    },
                    required: ["error_id", "error_text", "explanation"]
                  }
                },
                correctedText: {
                  type: "string",
                  description: "The corrected version of the text"
                }
              },
              required: ["isCorrect", "text", "explanations", "correctedText"],
              additionalProperties: false
            }
          }
        },
        temperature: 0.3,
        top_p: 1,
      }),
    });

    if (!response.ok) {
      // 记录API请求失败事件，包含请求ID
      sendGAEvent('event', 'grammar_check_error', {
        request_id: requestId,
        error_type: 'api_request',
        error_message: 'API request to OpenRouter failed',
        status_code: response.status
      });
      
      throw new Error('API request to OpenRouter failed');
    }

    const data = await response.json();
    
    console.log('\n=== AI Request Details ===');
    console.log('Request ID:', requestId);
    console.log('Input Text:', text);
    console.log('Style:', style);
    console.log('Response Language:', responseLanguage);
    
    if (!data.choices?.[0]?.message?.content) {
      // 记录无效响应格式事件，包含请求ID
      sendGAEvent('event', 'grammar_check_error', {
        request_id: requestId,
        error_type: 'response_format',
        error_message: 'Invalid response format from AI'
      });
      
      console.error('Error: Invalid response format from AI');
      console.log('Raw Response:', data);
      throw new Error('Invalid response format from AI');
    }

    let llmResponse;
    try {
      const rawContent = data.choices[0].message.content.trim();
      console.log('\n=== AI Raw Response ===');
      console.log(rawContent);
      
      // 记录AI原始响应事件，包含请求ID
      sendGAEvent('event', 'grammar_check_ai_raw_response', {
        request_id: requestId,
        response: rawContent
      });
      
      llmResponse = JSON.parse(rawContent);
      
      // 记录AI解析响应事件，包含请求ID
      sendGAEvent('event', 'grammar_check_ai_parsed_response', {
        request_id: requestId,
        ...llmResponse
      });
      
      console.log('\n=== Parsed AI Response ===');
      console.log('Is Correct:', llmResponse.isCorrect);
      console.log('Marked Text:', llmResponse.text);
      console.log('Explanations:', llmResponse.explanations);
      console.log('Corrected Text:', llmResponse.correctedText);
    } catch (e) {
      // 记录JSON解析错误事件，包含请求ID
      sendGAEvent('event', 'grammar_check_error', {
        request_id: requestId,
        error_type: 'json_parse',
        error_message: 'Failed to parse AI response as JSON'
      });
      
      console.error('\n=== JSON Parse Error ===');
      console.error('Error:', e);
      console.error('Raw Content:', data.choices[0].message.content);
      throw new Error('Failed to parse AI response as JSON');
    }

    // Extract errors from marked text
    const errors: GrammarError[] = [];
    if (!llmResponse.isCorrect) {
      const regex = /<<(\d+):(.*?)>>/g;
      let match;
      let index = 0;
      
      console.log('\n=== Extracting Errors ===');
      while ((match = regex.exec(llmResponse.text)) !== null) {
        const errorId = match[1];
        const errorText = match[2];
        const start = index + llmResponse.text.slice(index).indexOf(match[0]);
        const end = start + errorText.length;
        
        const error: GrammarError = {
          start,
          end,
          severity: 'high',
          message: llmResponse.explanations[errorId] || ['Grammar error'],
          id: parseInt(errorId)
        };
        
        console.log('Found Error:', {
          id: errorId,
          text: errorText,
          position: `${start}-${end}`,
          message: error.message
        });
        
        errors.push(error);
        index = end;
      }
    }

    const finalResult = {
      isCorrect: llmResponse.isCorrect,
      text,
      correctedText: llmResponse.correctedText,
      explanations: llmResponse.explanations
    };

    // 记录最终结果事件，包含请求ID
    sendGAEvent('event', 'grammar_check_result', {
      request_id: requestId,
      output_text: finalResult
    });

    console.log('\n=== Final Result ===');
    console.log('Request ID:', requestId);
    console.log(JSON.stringify(finalResult, null, 2));
    console.log('\n===================\n');

    return NextResponse.json(finalResult);
  } catch (error: unknown) {
    // 记录处理过程中的错误事件，包含请求ID
    sendGAEvent('event', 'grammar_check_error', {
      request_id: requestId,
      error_type: 'processing',
      error_message: error instanceof Error ? error.message : 'Unknown error'
    });
    
    console.error('Error during grammar check:', error);
    return NextResponse.json(
      { error: `Error during grammar check: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 