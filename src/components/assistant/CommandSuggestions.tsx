
import React from 'react';
import { useAssistant } from '@/contexts/AssistantContext';
import { ExternalLink, FileSpreadsheet, FileText, Calculator } from 'lucide-react';

const CommandSuggestions = () => {
  const { executeCommand } = useAssistant();

  const suggestions = [
    { 
      icon: <FileSpreadsheet className="h-5 w-5 text-green-600" />, 
      text: "Abrir Excel", 
      command: "abrir excel" 
    },
    { 
      icon: <FileText className="h-5 w-5 text-blue-600" />, 
      text: "Abrir Word", 
      command: "abrir word" 
    },
    { 
      icon: <ExternalLink className="h-5 w-5 text-purple-600" />, 
      text: "Abrir navegador", 
      command: "abrir navegador" 
    },
    { 
      icon: <Calculator className="h-5 w-5 text-gray-600" />, 
      text: "Abrir calculadora", 
      command: "abrir calculadora" 
    }
  ];

  const handleSuggestionClick = (command: string) => {
    executeCommand(command);
  };

  return (
    <div className="w-full max-w-md grid grid-cols-2 gap-2 mt-6">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => handleSuggestionClick(suggestion.command)}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-lg p-3 transition-colors shadow-sm"
        >
          {suggestion.icon}
          <span className="text-sm font-medium">{suggestion.text}</span>
        </button>
      ))}
    </div>
  );
};

export default CommandSuggestions;
