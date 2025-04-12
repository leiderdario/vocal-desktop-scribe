
import React from 'react';
import { useAssistant } from '@/contexts/AssistantContext';

const TranscriptDisplay = () => {
  const { transcript, isListening } = useAssistant();

  if (!isListening && !transcript) {
    return null;
  }

  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 mt-6 text-center">
      <p className="text-gray-800">
        {transcript || (isListening ? "Escuchando..." : "")}
      </p>
    </div>
  );
};

export default TranscriptDisplay;
