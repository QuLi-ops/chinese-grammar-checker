export type ErrorSeverity = 'low' | 'medium' | 'high';
export type InputType = 'sentence' | 'paragraph' | 'article';
export type LanguageStyle = 'formal' | 'informal';
export type ResponseLanguage = 'Chinese' | 'English';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
} 