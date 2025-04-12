
import React from 'react';
import { useAssistant } from '@/contexts/AssistantContext';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AssistantButton = () => {
  const { isListening, isProcessing, toggleListening } = useAssistant();

  return (
    <div className="relative flex justify-center items-center">
      {isListening && (
        <div className="absolute w-24 h-24 rounded-full animate-pulse-ring bg-gradient-to-r from-assistant-blue to-assistant-purple opacity-30"></div>
      )}
      <button
        onClick={toggleListening}
        disabled={isProcessing}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
          isListening 
            ? "bg-gradient-to-r from-assistant-blue to-assistant-purple text-white scale-110" 
            : "bg-gray-100 text-assistant-dark hover:bg-gray-200"
        )}
      >
        {isProcessing ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : isListening ? (
          <Mic className="h-8 w-8" />
        ) : (
          <MicOff className="h-8 w-8" />
        )}
      </button>
    </div>
  );
};

export default AssistantButton;
