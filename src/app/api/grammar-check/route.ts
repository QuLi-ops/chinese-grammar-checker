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
      content: `Always respond in ${responseLanguage}. User's text is ${style} style.
You are only allowed to respond with the REQUIREMENT which is what I want you to respond with.

Here are the REQUIREMENTS:
1.If the gremmar of the text is correct, you should only respond with "Correct".
2.If the gremmar of the text is incorrect, you should:
- repeat the whole text and mark the errors with "*** ***"
- use explanation-1/2/3... to explain the errors and say "explanation-1/explanation-2/explanation-3" in every first of explanation section.
- writing the corrected text that has been fixed.and say "CorrectedText" in the first of corrected text section.
3.use "---" to separate every section.`,
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
        'HTTP-Referer': 'https://github.com/your-username/chinese-grammar-checker',
        'X-Title': 'Chinese Grammar Checker',
      },
      body: JSON.stringify({
        model: 'google/gemma-2-9b-it:free',
        messages,
        temperature: 0.1, // 降低随机性
        top_p: 0.1, // 降低输出多样性
        frequency_penalty: 0, // 不惩罚频繁词
        presence_penalty: 0, // 不惩罚主题重复
        seed: 42, // 固定随机种子
      }),
    });

    if (!response.ok) {
      throw new Error('OpenRouter API request failed');
    }

    const data = await response.json();
    console.log('Complete AI Response:', data);
    console.log('AI Message Content:', data.choices[0].message.content);
    
    const llmResponse = data.choices[0].message.content;
    const result = parseResponse(llmResponse);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Grammar check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 