import { NextRequest, NextResponse } from 'next/server';
import { Message, GrammarError } from '../../types/grammar';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

function constructPrompt(
  text: string,
  style: string,
  responseLanguage: string
): Message[] {
  return [
    {
      role: 'system',
      content: `You are a grammar checking assistant. Each response should be completely independent and not reference any previous conversations or context.
Treat each input as a new, standalone request.
Always respond in ${responseLanguage}. But every section that repeat the user's text should be the language that is user's text.
User's text is ${style} style.

Your task is to:
1. Check if the text is grammatically correct
2. If there are errors, mark them with <<error_id:error_text>>
3. Provide clear explanations for each error
4. Provide a corrected version of the text`
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

  try {
    const body = await request.json();
    const { text, style, responseLanguage } = body;

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

    const result = {
      text: text,
      isCorrect: llmResponse.isCorrect,
      errors,
      correctedText: llmResponse.correctedText,
      explanations: llmResponse.explanations
    };

    console.log('\n=== Final Result ===');
    console.log(JSON.stringify(result, null, 2));
    console.log('\n===================\n');

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Error during grammar check:', error);
    return NextResponse.json(
      { error: `Error during grammar check: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 