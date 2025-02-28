'use client';

import React, { useState } from 'react';
import { useGrammarCheck } from '../hooks/useGrammarCheck';
import GrammarOutput from './GrammarOutput';
import { ResponseLanguage, InputType, LanguageStyle } from '../types/grammar';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';

const GrammarInput: React.FC = () => {
  const t = useTranslations('grammarInput');
  const [text, setText] = useState('');
  const [responseLanguage, setResponseLanguage] = useState<ResponseLanguage>('English');
  const [inputType, setInputType] = useState<InputType>('sentence');
  const [style, setStyle] = useState<LanguageStyle>('formal');

  const { checkGrammar, isLoading, error, result } = useGrammarCheck();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 检查文本是否为空或只包含空白字符
    if (!text.trim()) {
      return;
    }
    
    await checkGrammar(text, responseLanguage, inputType, style);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= 400) {
      setText(newText);
    }
  };


  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4 items-start">
              <div className="flex-1 space-y-2">
                <Label>{t('responseLanguage')}</Label>
                <Select 
                  value={responseLanguage} 
                  onValueChange={(value: string) => setResponseLanguage(value as ResponseLanguage)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label>{t('languageStyle')}</Label>
                <RadioGroup
                  value={style}
                  onValueChange={(value: string) => setStyle(value as LanguageStyle)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formal" id="formal" />
                    <Label htmlFor="formal">{t('formal')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="informal" id="informal" />
                    <Label htmlFor="informal">{t('informal')}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('inputType')}</Label>
              <RadioGroup
                value={inputType}
                onValueChange={(value: string) => setInputType(value as InputType)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sentence" id="sentence" />
                  <Label htmlFor="sentence">{t('sentence')}</Label>
                </div>
                {/* Temporarily commented out paragraph and article options */}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>{t('inputText')}</Label>
              <div className="relative">
                <Textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder={t('placeholder')}
                  className="min-h-[150px]"
                  maxLength={400}
                />
                <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                  {t('characterCount', { count: text.length })}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isLoading || !text.trim()}
              >
                {isLoading ? t('checkingButton') : t('checkButton')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center text-muted-foreground">
          {t('checkingMessage')}
        </div>
      )}
      
      {error && (
        <Card className="mt-8 border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}
      
      {!isLoading && !error && result && (
        <GrammarOutput
          text={result.text}
          isCorrect={result.isCorrect}
          correctedText={result.correctedText}
          explanations={result.explanations}
        />
      )}
    </div>
  );
};

export default GrammarInput; 