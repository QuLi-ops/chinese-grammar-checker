'use client';

import React, { useMemo, useEffect, useState } from 'react';
import VoiceOutput from './VoiceOutput';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from 'next-intl';

interface ExplanationItem {
  error_id: string;
  error_text: string;
  explanation: string;
}

interface GrammarOutputProps {
  text: string;
  isCorrect: boolean;
  correctedText?: string;
  explanations?: ExplanationItem[];
}

const GrammarOutput: React.FC<GrammarOutputProps> = ({
  text,
  isCorrect,
  correctedText,
  explanations = [],
}) => {
  const t = useTranslations('grammarOutput');
  const [textSegments, setTextSegments] = useState<{text: string; isError?: boolean; errorId?: string}[]>([]);

  // 根据error_text在原文中查找并标记错误
  useEffect(() => {
    if (isCorrect || explanations.length === 0) {
      setTextSegments([{text}]);
      return;
    }

    // 创建一个标记数组，记录每个字符是否是错误的一部分
    const errorMarks: {isError: boolean; errorId?: string}[] = Array(text.length).fill({isError: false});
    
    // 标记所有错误
    explanations.forEach(item => {
      if (!item.error_text) return;
      
      // 查找所有匹配项
      let startIndex = 0;
      let index;
      while ((index = text.indexOf(item.error_text, startIndex)) !== -1) {
        // 标记这段文本为错误
        for (let i = index; i < index + item.error_text.length; i++) {
          errorMarks[i] = {isError: true, errorId: item.error_id};
        }
        startIndex = index + 1;
      }
    });
    
    // 根据标记生成文本段
    const segments: {text: string; isError?: boolean; errorId?: string}[] = [];
    let currentSegment = {
      text: '',
      isError: errorMarks[0]?.isError,
      errorId: errorMarks[0]?.errorId
    };
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const mark = errorMarks[i];
      
      // 如果当前字符的错误状态与当前段落相同，则添加到当前段落
      if (mark.isError === currentSegment.isError && mark.errorId === currentSegment.errorId) {
        currentSegment.text += char;
      } else {
        // 否则，保存当前段落并开始新段落
        segments.push({...currentSegment});
        currentSegment = {
          text: char,
          isError: mark.isError,
          errorId: mark.errorId
        };
      }
    }
    
    // 添加最后一个段落
    if (currentSegment.text) {
      segments.push(currentSegment);
    }
    
    setTextSegments(segments);
  }, [text, isCorrect, explanations]);

  // 计算错误解释区域的高度
  const explanationsHeight = useMemo(() => {
    // 基础高度为100px
    const baseHeight = 100;
    // 每个错误项增加60px高度
    const itemHeight = 60;
    // 计算总高度
    const totalHeight = baseHeight + (explanations.length * itemHeight);
    // 设置最小高度和最大高度
    return Math.max(150, Math.min(500, totalHeight));
  }, [explanations.length]);

  const renderText = () => {
    if (isCorrect) {
      return (
        <div className="flex items-center text-emerald-600 dark:text-emerald-400">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{t('correct')}</span>
        </div>
      );
    }

    return (
      <div className="whitespace-pre-wrap">
        {textSegments.map((segment, index) => {
          if (!segment.isError) {
            return <span key={index}>{segment.text}</span>;
          }

          return (
            <span
              key={index}
              className="relative inline group cursor-help border-b-2 border-red-400"
              title={`Error ${segment.errorId?.replace('error_', '')}`}
            >
              {segment.text}
              <div className="invisible group-hover:visible absolute z-[100] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full min-w-[200px]">
                <div className="relative px-3 py-2 bg-popover text-popover-foreground text-sm rounded shadow-lg">
                  {explanations.find(e => e.error_id === segment.errorId)?.explanation || ''}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover rotate-45"></div>
                </div>
              </div>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="relative p-4 bg-muted rounded-md">
              <div className="text-lg leading-relaxed">
                {renderText()}
              </div>
            </div>
            <VoiceOutput
              text={text}
              language="zh-CN"
              isEnabled={false}
            />
          </div>

          {!isCorrect && explanations && explanations.length > 0 && (
            <div>
              <CardTitle className="mb-4">
                {t('explanationsTitle')} ({explanations.length})
              </CardTitle>
              <ScrollArea 
                className="p-4 bg-blue-50 dark:bg-blue-950 rounded-md" 
                style={{ height: `${explanationsHeight}px` }}
              >
                <ul className="space-y-3 text-blue-800 dark:text-blue-200 w-full">
                  {explanations.map((item) => (
                    <li key={item.error_id} className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-1 shrink-0">
                        {item.error_id.replace('error_', '')}
                      </Badge>
                      <div className="leading-relaxed">
                        <div className="font-medium">{item.error_text}</div>
                        <div className="mt-1">{item.explanation}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}

          {!isCorrect && correctedText && (
            <div>
              <CardTitle className="mb-4">{t('correctionsTitle')}</CardTitle>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-md text-emerald-700 dark:text-emerald-200">
                <ScrollArea className="max-h-[200px]">
                  <div className="text-lg leading-relaxed whitespace-pre-wrap">
                    {correctedText}
                  </div>
                </ScrollArea>
              </div>
              <VoiceOutput
                text={correctedText}
                language="zh-CN"
                isEnabled={false}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GrammarOutput; 