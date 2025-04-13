
import React, { useState, useEffect } from 'react';
import { useAssistant } from '@/contexts/AssistantContext';
import AssistantInterface from './AssistantInterface';
import SimulatedAppWindow from './SimulatedAppWindow';

const AssistantDemo = () => {
  const [openApp, setOpenApp] = useState<'excel' | 'word' | 'browser' | 'calculator' | null>(null);
  const { response } = useAssistant();

  // Monitor response to detect app actions
  useEffect(() => {
    if (!response) return; // Add this check to avoid errors with undefined response
    
    console.log("Response updated:", response);
    
    if (response.includes('Abriendo Microsoft Excel')) {
      console.log("Opening Excel app");
      setOpenApp('excel');
    } else if (response.includes('Abriendo Microsoft Word')) {
      console.log("Opening Word app");
      setOpenApp('word');
    } else if (response.includes('Abriendo el navegador')) {
      console.log("Opening browser app");
      setOpenApp('browser');
    } else if (response.includes('Abriendo la calculadora')) {
      console.log("Opening calculator app");
      setOpenApp('calculator');
    } else if (response.includes('Cerrando la aplicación')) {
      console.log("Closing app");
      setOpenApp(null);
    }
  }, [response]);

  const handleCloseApp = () => {
    setOpenApp(null);
  };

  return (
    <div className="relative">
      <AssistantInterface />
      <SimulatedAppWindow app={openApp} onClose={handleCloseApp} />
    </div>
  );
};

export default AssistantDemo;
