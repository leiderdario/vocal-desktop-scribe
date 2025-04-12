
import React, { useState, useEffect } from 'react';
import { useAssistant } from '@/contexts/AssistantContext';
import AssistantInterface from './AssistantInterface';
import SimulatedAppWindow from './SimulatedAppWindow';

const AssistantDemo = () => {
  const [openApp, setOpenApp] = useState<'excel' | 'word' | 'browser' | 'calculator' | null>(null);
  const { response } = useAssistant();

  // Monitor response to detect app actions
  useEffect(() => {
    if (response.includes('Abriendo Microsoft Excel')) {
      setOpenApp('excel');
    } else if (response.includes('Abriendo Microsoft Word')) {
      setOpenApp('word');
    } else if (response.includes('Abriendo el navegador')) {
      setOpenApp('browser');
    } else if (response.includes('Abriendo la calculadora')) {
      setOpenApp('calculator');
    } else if (response.includes('Cerrando la aplicación')) {
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
