export type ErrorSeverity = 'low' | 'medium' | 'high';
export type InputType = 'sentence' | 'paragraph' | 'article';
export type LanguageStyle = 'formal' | 'informal';
export type ResponseLanguage = 'Chinese' | 'English';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GrammarError {
  start: number;
  end: number;
  severity: ErrorSeverity;
  message: string;
}

export interface APIResponse {
  text: string;
  isCorrect: boolean;
  errors?: GrammarError[];
  correctedText?: string;
  explanations?: string[];
} 