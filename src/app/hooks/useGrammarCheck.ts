import { useState } from 'react';
import { ResponseLanguage, InputType, LanguageStyle, APIResponse } from '../types/grammar';

export function useGrammarCheck() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<APIResponse | null>(null);

  const checkGrammar = async (
    text: string,
    responseLanguage: ResponseLanguage,
    inputType: InputType,
    style: LanguageStyle,
    requestId: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/grammar-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          responseLanguage,
          inputType,
          style,
          requestId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check grammar');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Grammar check error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkGrammar,
    isLoading,
    error,
    result,
  };
} 