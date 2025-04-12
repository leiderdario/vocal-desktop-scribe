
import React from 'react';
import AssistantDemo from '@/components/assistant/AssistantDemo';
import { AssistantProvider } from '@/contexts/AssistantContext';

const Index = () => {
  return (
    <AssistantProvider>
      <AssistantDemo />
    </AssistantProvider>
  );
};

export default Index;
