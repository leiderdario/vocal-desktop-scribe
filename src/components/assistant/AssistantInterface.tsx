
import React from 'react';
import AssistantButton from './AssistantButton';
import TranscriptDisplay from './TranscriptDisplay';
import ResponseDisplay from './ResponseDisplay';
import AudioWaveform from './AudioWaveform';
import CommandSuggestions from './CommandSuggestions';
import { AssistantProvider } from '@/contexts/AssistantContext';

const AssistantInterface = () => {
  return (
    <AssistantProvider>
      <div className="min-h-screen w-full flex flex-col items-center justify-between p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full flex-1 flex flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-assistant-blue to-assistant-purple text-transparent bg-clip-text">
            Asistente Virtual
          </h1>
          <p className="text-gray-600 text-center max-w-md mb-8">
            Tu asistente por voz para controlar aplicaciones y obtener respuestas a tus preguntas
          </p>
          
          <ResponseDisplay />
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <AssistantButton />
            <AudioWaveform />
            <TranscriptDisplay />
          </div>
          
          <CommandSuggestions />
        </div>
        
        <footer className="w-full text-center text-sm text-gray-500 mt-8">
          <p>Di "ayuda" para ver qué puedo hacer por ti</p>
        </footer>
      </div>
    </AssistantProvider>
  );
};

export default AssistantInterface;
