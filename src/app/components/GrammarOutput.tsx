'use client';

import React from 'react';
import VoiceOutput from './VoiceOutput';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Error {
  start: number;
  end: number;
  severity: 'low' | 'medium' | 'high';
  message: string[];
  id: number;
}

interface GrammarOutputProps {
  text: string;
  isCorrect: boolean;
  errors?: Error[];
  correctedText?: string;
  explanations?: { [key: string]: string[] };
}

const GrammarOutput: React.FC<GrammarOutputProps> = ({
  text,
  isCorrect,
  errors = [],
  correctedText,
  explanations = {},
}) => {
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
          <span>Grammatically Correct</span>
        </div>
      );
    }

    // 将文本分割成错误和非错误部分
    const segments: { text: string; isError?: boolean; error?: Error }[] = [];
    let lastIndex = 0;

    // 按位置排序错误
    const sortedErrors = [...errors].sort((a, b) => a.start - b.start);

    sortedErrors.forEach((error) => {
      // 添加错误前的正常文本
      if (error.start > lastIndex) {
        segments.push({
          text: text.slice(lastIndex, error.start),
        });
      }
      // 添加错误文本
      segments.push({
        text: text.slice(error.start, error.end),
        isError: true,
        error,
      });
      lastIndex = error.end;
    });

    // 添加最后一段正常文本
    if (lastIndex < text.length) {
      segments.push({
        text: text.slice(lastIndex),
      });
    }

    return (
      <div className="relative inline">
        {segments.map((segment, index) => {
          if (!segment.isError) {
            return <span key={index}>{segment.text}</span>;
          }

          const severityColors = {
            low: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-400',
            medium: 'bg-orange-100 dark:bg-orange-900 border-orange-400',
            high: 'bg-red-100 dark:bg-red-900 border-red-400',
          };

          return (
            <span
              key={index}
              className={cn(
                "relative inline-block group cursor-help border-b-2",
                severityColors[segment.error!.severity]
              )}
              title={segment.error!.message[0]}
            >
              {segment.text}
              <div className="invisible group-hover:visible absolute z-[100] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full min-w-[200px]">
                <div className="relative px-3 py-2 bg-popover text-popover-foreground text-sm rounded shadow-lg">
                  {segment.error!.message.map((msg, idx) => (
                    <div key={idx} className={idx > 0 ? "mt-1 text-sm opacity-80" : ""}>
                      {msg}
                    </div>
                  ))}
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
          <CardTitle>Check Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="relative p-4 bg-muted rounded-md">
              <div className="text-lg leading-relaxed overflow-visible">
                {renderText()}
              </div>
            </div>
            <VoiceOutput
              text={text}
              language="zh-CN"
              isEnabled={false}
            />
          </div>

          {!isCorrect && explanations && Object.keys(explanations).length > 0 && (
            <div>
              <CardTitle className="mb-4">Grammar Explanations</CardTitle>
              <ScrollArea className="p-4 bg-blue-50 dark:bg-blue-950 rounded-md max-h-[300px]">
                <ul className="space-y-3 text-blue-800 dark:text-blue-200">
                  {Object.entries(explanations).map(([id, explanationArray]) => (
                    <li key={id} className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-1 shrink-0">
                        {id}
                      </Badge>
                      <div className="leading-relaxed">
                        {explanationArray.map((explanation, index) => (
                          <div key={index} className={index > 0 ? "mt-1 text-sm opacity-80" : ""}>
                            {explanation}
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}

          {!isCorrect && correctedText && (
            <div>
              <CardTitle className="mb-4">Suggested Corrections</CardTitle>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-md text-emerald-700 dark:text-emerald-200">
                <ScrollArea className="max-h-[200px]">
                  <div className="text-lg leading-relaxed">
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