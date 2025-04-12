
import React from 'react';
import { useAssistant } from '@/contexts/AssistantContext';

const ResponseDisplay = () => {
  const { response } = useAssistant();

  if (!response) {
    return null;
  }

  return (
    <div className="w-full max-w-md bg-gradient-to-r from-assistant-blue/10 to-assistant-purple/10 backdrop-blur-sm rounded-lg shadow-md p-4 mb-6">
      <p className="text-gray-800">{response}</p>
    </div>
  );
};

export default ResponseDisplay;
