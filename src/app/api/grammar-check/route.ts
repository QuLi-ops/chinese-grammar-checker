import { NextRequest, NextResponse } from 'next/server';
import { Message, GrammarError } from '../../types/grammar';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const LOGS_API_URL = 'https://chinese-grammar-checker.quli1016908036.workers.dev/api/logs';
const LOGS_API_TOKEN = 'my-secure-api-logs-token-2025';

// 定义错误解释的接口
interface ErrorExplanation {
  error_id: string;
  error_text: string;
  explanation: string;
}

// 定义日志数据接口
interface LogData {
  rawContent: string;
  markedText?: string;
  explanations?: ErrorExplanation[];
  correctedText?: string;
  result?: {
    style?: string;
    responseLanguage?: string;
    isCorrect?: boolean;
    text?: string;
    error?: string;
  };
}

// 发送日志到 Cloudflare Worker
async function sendLogToCloudflare(logData: LogData) {
  try {
    console.log('正在发送日志到 Cloudflare Worker:', logData);
    
    const response = await fetch(LOGS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOGS_API_TOKEN}`
      },
      body: JSON.stringify(logData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('发送日志到 Cloudflare 失败:', response.status, errorText);
      return;
    }
    
    const result = await response.json();
    console.log('日志发送成功，ID:', result.logId);
  } catch (error) {
    console.error('发送日志到 Cloudflare 时出错:', error);
  }
}

function constructPrompt(
  text: string,
  style: string,
  responseLanguage: string
): Message[] {
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
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: 'OpenRouter API key not configured' },
      { status: 500 }
    );
  }

  // 创建日志对象，将在整个处理过程中逐步填充
  const logData: LogData = {
    rawContent: ''  // 初始化为空字符串，稍后会填充
  };

  try {
    const body = await request.json();
    const { text, style, responseLanguage } = body;
    
    // 记录原始文本
    logData.rawContent = text;
    logData.result = { style, responseLanguage };

    const messages = constructPrompt(text, style, responseLanguage);

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
      throw new Error('API request to OpenRouter failed');
    }

    const data = await response.json();
    
    console.log('\n=== AI Request Details ===');
    console.log('Input Text:', text);
    console.log('Style:', style);
    console.log('Response Language:', responseLanguage);
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Error: Invalid response format from AI');
      console.log('Raw Response:', data);
      throw new Error('Invalid response format from AI');
    }

    let llmResponse;
    try {
      const rawContent = data.choices[0].message.content.trim();
      console.log('\n=== AI Raw Response ===');
      console.log(rawContent);
      
      llmResponse = JSON.parse(rawContent);
      
      console.log('\n=== Parsed AI Response ===');
      console.log('Is Correct:', llmResponse.isCorrect);
      console.log('Marked Text:', llmResponse.text);
      console.log('Explanations:', llmResponse.explanations);
      console.log('Corrected Text:', llmResponse.correctedText);
      
      // 更新日志数据
      logData.markedText = llmResponse.text;
      logData.explanations = llmResponse.explanations;
      logData.correctedText = llmResponse.correctedText;
    } catch (e) {
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

    console.log('\n=== Final Result ===');
    console.log(JSON.stringify(finalResult, null, 2));
    console.log('\n===================\n');

    // 更新最终结果
    logData.result = finalResult;
    
    // 只在处理完成后发送一次日志
    await sendLogToCloudflare(logData);

    return NextResponse.json(finalResult);
  } catch (error: unknown) {
    console.error('Error during grammar check:', error);
    
    // 发送错误日志
    if (logData.rawContent) {
      logData.result = { error: error instanceof Error ? error.message : 'Unknown error' };
      await sendLogToCloudflare(logData);
    }
    
    return NextResponse.json(
      { error: `Error during grammar check: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  } 
} 