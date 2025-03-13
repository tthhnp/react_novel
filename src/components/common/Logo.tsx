import React from 'react';
import { Bot } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Bot className="w-8 h-8 text-indigo-500" />
      <span className="font-semibold text-xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
        VOICE
      </span>
    </div>
  );
}