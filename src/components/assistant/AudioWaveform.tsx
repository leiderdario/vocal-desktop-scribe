
import React from 'react';
import { useAssistant } from '@/contexts/AssistantContext';
import { cn } from '@/lib/utils';

const AudioWaveform = () => {
  const { isListening } = useAssistant();

  if (!isListening) {
    return null;
  }

  // Create an array of 10 bars for the audio waveform
  const bars = Array.from({ length: 10 });

  return (
    <div className="flex items-end h-8 gap-1 mt-4">
      {bars.map((_, i) => (
        <div
          key={i}
          className={cn(
            "bg-gradient-to-t from-assistant-blue to-assistant-purple w-1.5 rounded-full",
            isListening ? "animate-wave" : "h-1"
          )}
          style={{ 
            height: `${Math.random() * 2 + 1}rem`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;
