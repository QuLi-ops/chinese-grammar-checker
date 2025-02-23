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

You must respond in the following JSON format:
{
  "isCorrect": boolean,
  "markedText": string | null,  // Original text with errors marked using *** ***. Only present if isCorrect is false
  "explanations": string[] | null,  // Array of explanations, each starting with "explanation-". Only present if isCorrect is false
  "correctedText": string | null  // The corrected version of the text. Only present if isCorrect is false
}

Rules:
1. If the grammar is correct:
   - Set "isCorrect": true
   - All other fields should be null
2. If the grammar is incorrect:
   - Set "isCorrect": false
   - Mark errors in markedText with *** ***
   - Each explanation in explanations array must start with "explanation-"
   - Provide the corrected version in correctedText
3. Do not include any additional text or formatting outside of this JSON structure.`
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
    
    errors.push({
      text: errorText,
      start,
      end,
      severity: 'error',
      message: explanations[errors.length] || 'Grammar error'
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
        model: 'openai/gpt-4o-2024-08-06',
        messages,
        top_p: 1,
        temperature: 0.67,
        repetition_penalty: 1,
        response_format: { "type": "json_object" }
      }),
    });

    if (!response.ok) {
      throw new Error('API request to OpenRouter failed');
    }

    const data = await response.json();
    console.log('Complete AI Response:', data);
    console.log('\n=== AI Response Details ===');
    console.log('Raw response:', data.choices[0].message.content);
    console.log('\n=== Parsed Response ===');
    
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error('Invalid response format - missing choices array:', data);
      throw new Error('Invalid response format');
    }

    if (!data.choices[0].message || typeof data.choices[0].message.content !== 'string') {
      console.error('Invalid message format in response:', data.choices[0]);
      throw new Error('Invalid message format');
    }

    const llmResponse = JSON.parse(data.choices[0].message.content);
    console.log('Parsed JSON:', JSON.stringify(llmResponse, null, 2));
    console.log('\n=== Processing Results ===');
    
    const result = {
      text: llmResponse.isCorrect ? "✓" : llmResponse.markedText,
      isCorrect: llmResponse.isCorrect,
      errors: llmResponse.isCorrect ? [] : extractErrors(llmResponse.markedText, llmResponse.explanations),
      correctedText: llmResponse.correctedText
    };
    
    console.log('Final processed result:', JSON.stringify(result, null, 2));
    console.log('===============================\n');
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error during grammar check:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 