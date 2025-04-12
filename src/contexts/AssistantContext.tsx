
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define the types for our context
interface AssistantContextProps {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  response: string;
  toggleListening: () => void;
  executeCommand: (command: string) => Promise<void>;
}

// Create the context
const AssistantContext = createContext<AssistantContextProps | undefined>(undefined);

// Create the provider component
export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // Use the appropriate constructor based on browser support
      // The type casting to 'any' is needed to handle browser differences
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || 
                                  (window as any).webkitSpeechRecognition;
      
      recognitionRef.current = new SpeechRecognitionAPI();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'es-ES'; // Spanish language

        recognitionRef.current.onstart = () => {
          setIsListening(true);
          setTranscript('');
          console.log('Speech recognition started');
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          console.log('Speech recognition ended');
        };

        recognitionRef.current.onresult = (event) => {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;
          setTranscript(transcriptText);
          
          // Process the command
          handleRecognizedSpeech(transcriptText);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          toast({
            title: "Error de reconocimiento",
            description: `Hubo un problema al escuchar: ${event.error}`,
            variant: "destructive"
          });
        };
      }
    } else {
      toast({
        title: "No soportado",
        description: "Tu navegador no soporta reconocimiento de voz",
        variant: "destructive"
      });
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);

  // Handle recognized speech
  const handleRecognizedSpeech = async (text: string) => {
    setIsProcessing(true);
    try {
      await executeCommand(text);
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle listening state
  const toggleListening = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    } else if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  // Execute command based on transcript
  const executeCommand = async (command: string) => {
    console.log('Executing command:', command);
    
    // Normalize the command text
    const normalizedCommand = command.toLowerCase().trim();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic command detection
    if (normalizedCommand.includes('abrir') || normalizedCommand.includes('iniciar') || normalizedCommand.includes('ejecutar')) {
      // Handle app opening
      if (normalizedCommand.includes('excel')) {
        handleResponse('Abriendo Microsoft Excel...');
        simulateAppAction('excel');
      } else if (normalizedCommand.includes('word')) {
        handleResponse('Abriendo Microsoft Word...');
        simulateAppAction('word');
      } else if (normalizedCommand.includes('navegador') || normalizedCommand.includes('chrome') || normalizedCommand.includes('internet')) {
        handleResponse('Abriendo el navegador...');
        simulateAppAction('browser');
      } else if (normalizedCommand.includes('calculadora')) {
        handleResponse('Abriendo la calculadora...');
        simulateAppAction('calculator');
      } else {
        handleResponse('No reconozco esa aplicación. Puedo abrir Excel, Word, el navegador o la calculadora.');
      }
    } else if (normalizedCommand.includes('escribir') || normalizedCommand.includes('texto')) {
      // Handle text input
      const textToType = normalizedCommand.replace(/escribir|texto|en excel|en word/gi, '').trim();
      handleResponse(`Escribiendo: "${textToType}"`);
      simulateTextInput(textToType);
    } else if (normalizedCommand.includes('cerrar') || normalizedCommand.includes('salir')) {
      // Handle app closing
      handleResponse('Cerrando la aplicación actual...');
      simulateAppAction('close');
    } else {
      // General question answering
      const aiResponse = await generateAIResponse(normalizedCommand);
      handleResponse(aiResponse);
    }
  };

  // Handle response - speak and set state
  const handleResponse = (text: string) => {
    setResponse(text);
    speak(text);
  };

  // Text-to-speech function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simulate opening applications
  const simulateAppAction = (app: string) => {
    console.log(`Simulating opening ${app}`);
    // This is just a simulation for demonstration purposes
    // In a real app, you would need to use platform-specific APIs
  };

  // Simulate typing text
  const simulateTextInput = (text: string) => {
    console.log(`Simulating typing: ${text}`);
    // This is just a simulation for demonstration purposes
  };

  // Generate AI response - in a real app, this would call an actual AI API
  const generateAIResponse = async (query: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple response mapping for demonstration
    if (query.includes('hola') || query.includes('saludos')) {
      return '¡Hola! ¿En qué puedo ayudarte hoy?';
    } else if (query.includes('tiempo') || query.includes('clima')) {
      return 'No tengo acceso en tiempo real al clima, pero puedo ayudarte a abrir una página del clima si me lo pides.';
    } else if (query.includes('hora') || query.includes('fecha')) {
      const now = new Date();
      return `Son las ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} del ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}.`;
    } else if (query.includes('gracias')) {
      return 'De nada, estoy aquí para ayudarte.';
    } else if (query.includes('ayuda') || query.includes('puedes hacer')) {
      return 'Puedo ayudarte a abrir aplicaciones como Excel o Word, escribir texto por ti, y responder preguntas generales. Prueba diciendo "abrir Excel" o "¿qué hora es?"';
    } else {
      return 'Lo siento, no entiendo esa consulta. ¿Puedes reformularla o preguntarme algo diferente?';
    }
  };

  const contextValue: AssistantContextProps = {
    isListening,
    isProcessing,
    transcript,
    response,
    toggleListening,
    executeCommand
  };

  return (
    <AssistantContext.Provider value={contextValue}>
      {children}
    </AssistantContext.Provider>
  );
};

// Custom hook to use the assistant context
export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};
