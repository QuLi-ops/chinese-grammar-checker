'use client';

import React, { useState } from 'react';
import { useGrammarCheck } from '../hooks/useGrammarCheck';
import GrammarOutput from './GrammarOutput';
import { ResponseLanguage, InputType, LanguageStyle, APIResponse } from '../types/grammar';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const GrammarInput: React.FC = () => {
  const [text, setText] = useState('');
  const [responseLanguage, setResponseLanguage] = useState<ResponseLanguage>('Chinese');
  const [inputType, setInputType] = useState<InputType>('sentence');
  const [style, setStyle] = useState<LanguageStyle>('formal');

  const { checkGrammar, isLoading, error, result } = useGrammarCheck();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          <CardTitle>Grammar Check</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4 items-start">
              <div className="flex-1 space-y-2">
                <Label>Response Language</Label>
                <Select 
                  value={responseLanguage} 
                  onValueChange={(value: string) => setResponseLanguage(value as ResponseLanguage)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label>Language Style</Label>
                <RadioGroup
                  value={style}
                  onValueChange={(value: string) => setStyle(value as LanguageStyle)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formal" id="formal" />
                    <Label htmlFor="formal">Formal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="informal" id="informal" />
                    <Label htmlFor="informal">Informal</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Input Type</Label>
              <RadioGroup
                value={inputType}
                onValueChange={(value: string) => setInputType(value as InputType)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sentence" id="sentence" />
                  <Label htmlFor="sentence">Sentence</Label>
                </div>
                {/* Temporarily commented out paragraph and article options */}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Input Text</Label>
              <div className="relative">
                <Textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter text to check... (Maximum 400 characters)"
                  className="min-h-[150px]"
                  maxLength={400}
                />
                <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                  {text.length}/400
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Checking...' : 'Check Grammar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center text-muted-foreground">
          Checking grammar...
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
          errors={result.errors}
          correctedText={result.correctedText}
          explanations={result.explanations}
        />
      )}
    </div>
  );
};

export default GrammarInput; 