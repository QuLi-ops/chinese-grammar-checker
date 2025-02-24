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

You must respond in the following JSON format ONLY, with no additional text:
{
  "isCorrect": boolean,
  "text": string,  // Original text with errors marked using <<error_id:error_text>>
  "explanations": {  // Object mapping error_id to explanation
    "1": string[],  // Array of explanations for error 1, first line is main explanation, following lines are additional details
    "2": string[],  // Array of explanations for error 2
    // ... more error explanations
  },
  "correctedText": string  // The corrected version of the text
}

Example response for incorrect text:
{
  "isCorrect": false,
  "text": "This is <<1:a>> incorrect sentence with <<2:to many>> errors.",
  "explanations": {
    "1": ["The article 'a' should be 'an' before a word starting with a vowel sound"],
    "2": ["'to many' should be 'too many'",
          "In this context, 'too' means 'excessive' or 'more than necessary'"]
  },
  "correctedText": "This is an incorrect sentence with too many errors."
}

Example response for correct text:
{
  "isCorrect": true,
  "text": "This is a correct sentence",
  "explanations": {},
  "correctedText": "This is a correct sentence"
}

Rules:
1. ONLY output valid JSON, no other text or formatting
2. Always include all fields in the response
3. For correct text, return the same text in both text and correctedText fields
4. For incorrect text, mark EVERY error with <<error_id:error_text>>
5. Each error must have a unique numeric ID starting from 1
6. Each error_id in the text must have a corresponding entry in the explanations object
7. Main explanation should be clear and concise
8. Additional details should be provided as separate lines in the explanation array
9. Do not combine multiple errors into one - each distinct error should have its own ID and explanation`
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