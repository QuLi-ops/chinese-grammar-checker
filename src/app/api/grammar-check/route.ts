import { NextRequest, NextResponse } from 'next/server';
import { Message } from '../../types/grammar';

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

You must respond in the following JSON format ONLY, with no additional text:
{
  "isCorrect": boolean,
  "text": string,  // Original text with errors marked using *** ***
  "explanations": string[],  // Array of explanations, numbered as "1. ", "2. ", etc.
  "correctedText": string  // The corrected version of the text
}

Example response for incorrect text:
{
  "isCorrect": false,
  "text": "This is ***a*** incorrect sentence",
  "explanations": ["1. The article 'a' should be 'an' before a word starting with a vowel sound"],
  "correctedText": "This is an incorrect sentence"
}

Example response for correct text:
{
  "isCorrect": true,
  "text": "This is a correct sentence",
  "explanations": [],
  "correctedText": "This is a correct sentence"
}

Rules:
1. ONLY output valid JSON, no other text or formatting
2. Always include all fields in the response
3. For correct text, return the same text in both text and correctedText fields
4. For incorrect text, mark errors with *** *** in the text field
5. Number explanations starting from 1 (e.g., "1. ", "2. ", etc.)
6. Make sure the number of explanations matches the number of errors marked`
    },
    {
      role: 'user',
      content: text,
    },
  ];
}

function parseResponse(content: string) {
  if (content.trim() === 'Correct') {
    return {
      text: content,
      isCorrect: true,
      errors: [],
      correctedText: undefined
    };
  }

  const sections = content.split('---').map(s => s.trim());
  const markedText = sections[0];
  const explanations = sections[1]?.split('\n').filter(line => line.startsWith('explanation-')) || [];
  const correctedText = sections[2]?.replace('CorrectedText', '').trim();

  // 解析错误标记
  const errors = [];
  let match;
  const regex = /\*\*\*(.*?)\*\*\*/g;
  let index = 0;
  
  while ((match = regex.exec(markedText)) !== null) {
    const errorText = match[1];
    const start = markedText.indexOf(match[0], index);
    const end = start + errorText.length;
    
    errors.push({
      start,
      end,
      severity: errors.length === 0 ? 'high' : 'medium', // 简单的严重度分配逻辑
      message: explanations[errors.length] || 'Grammar error'
    });
    
    index = end;
  }

  return {
    text: markedText.replace(/\*\*\*/g, ''),
    isCorrect: false,
    errors,
    correctedText
  };
}

function extractErrors(markedText: string, explanations: string[]) {
  const errors = [];
  const regex = /\*\*\*(.*?)\*\*\*/g;
  let match;
  let index = 0;
  
  while ((match = regex.exec(markedText)) !== null) {
    const errorText = match[1];
    const start = markedText.indexOf(match[0], index);
    const end = start + match[0].length;
    
    // Find the corresponding explanation for this error
    const explanation: string = explanations[errors.length] || 'Grammar error';
    
    errors.push({
      text: errorText,
      start,
      end,
      severity: 'error',
      message: explanation // Keep the number prefix
    });
    
    index = end;
  }
  
  return errors;
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
        model: 'anthropic/claude-3.5-haiku-20241022',
        messages,
        response_format: { "type": "json_object" },
        temperature: 0.3,
        top_p: 1,
      }),
    });

    if (!response.ok) {
      throw new Error('API request to OpenRouter failed');
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI');
    }

    let llmResponse;
    try {
      llmResponse = JSON.parse(data.choices[0].message.content.trim());
    } catch (e) {
      console.error('JSON parse error:', e);
      console.error('Raw content:', data.choices[0].message.content);
      throw new Error('Failed to parse AI response as JSON');
    }

    // Extract errors from marked text
    const errors = [];
    if (!llmResponse.isCorrect) {
      const regex = /\*\*\*(.*?)\*\*\*/g;
      let match;
      let index = 0;
      
      while ((match = regex.exec(llmResponse.text)) !== null) {
        const errorText = match[1];
        const start = index + llmResponse.text.slice(index).indexOf(match[0]);
        const end = start + errorText.length;
        
        errors.push({
          start,
          end,
          severity: 'high',
          message: llmResponse.explanations[errors.length] || 'Grammar error'
        });
        
        index = end;
      }
    }

    const result = {
      text: text, // Original text without markers
      isCorrect: llmResponse.isCorrect,
      errors,
      correctedText: llmResponse.correctedText,
      explanations: llmResponse.explanations
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error during grammar check:', error);
    return NextResponse.json(
      { error: `Error during grammar check: ${error.message}` },
      { status: 500 }
    );
  }
} 