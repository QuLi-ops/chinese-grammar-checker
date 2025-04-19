'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

interface ClarityScriptProps {
  projectId: string;
}

export default function ClarityScript({ projectId }: ClarityScriptProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      try {
        Clarity.init(projectId);
      } catch (error) {
        console.error('Failed to initialize Clarity:', error);
      }
    }
  }, [projectId]);

  return null;
} 