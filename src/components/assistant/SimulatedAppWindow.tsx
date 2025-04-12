
import React, { useState } from 'react';
import { X, Minus, Square, FileSpreadsheet, FileText, Globe, Calculator } from 'lucide-react';

interface SimulatedAppWindowProps {
  app: 'excel' | 'word' | 'browser' | 'calculator' | null;
  onClose: () => void;
}

const SimulatedAppWindow = ({ app, onClose }: SimulatedAppWindowProps) => {
  const [text, setText] = useState('');

  if (!app) return null;

  const getAppTitle = () => {
    switch (app) {
      case 'excel': return 'Microsoft Excel';
      case 'word': return 'Microsoft Word';
      case 'browser': return 'Navegador Web';
      case 'calculator': return 'Calculadora';
      default: return 'Aplicación';
    }
  };

  const getAppIcon = () => {
    switch (app) {
      case 'excel': return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case 'word': return <FileText className="h-5 w-5 text-blue-600" />;
      case 'browser': return <Globe className="h-5 w-5 text-purple-600" />;
      case 'calculator': return <Calculator className="h-5 w-5 text-gray-600" />;
      default: return null;
    }
  };

  const getAppContent = () => {
    switch (app) {
      case 'excel':
        return (
          <div className="flex flex-col h-full">
            <div className="flex border-b">
              <div className="p-2 border-r w-10 text-center">A</div>
              <div className="p-2 border-r w-10 text-center">B</div>
              <div className="p-2 border-r w-10 text-center">C</div>
              <div className="p-2 border-r w-10 text-center">D</div>
            </div>
            <div className="flex border-b">
              <div className="p-2 border-r w-10 text-center">1</div>
              <textarea 
                className="p-2 border-r flex-1 resize-none outline-none" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Texto dictado aparecerá aquí..."
              />
            </div>
            <div className="flex border-b">
              <div className="p-2 border-r w-10 text-center">2</div>
              <div className="p-2 border-r flex-1"></div>
            </div>
          </div>
        );
      case 'word':
        return (
          <div className="h-full p-4 bg-white">
            <textarea 
              className="w-full h-full p-4 resize-none outline-none border-0"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="El texto dictado aparecerá aquí..."
            />
          </div>
        );
      case 'browser':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center p-2 bg-gray-100 border-b">
              <div className="flex-1 px-4 py-1 bg-white rounded-full text-sm text-gray-500">
                https://www.ejemplo.com/
              </div>
            </div>
            <div className="flex-1 p-4 bg-white flex items-center justify-center">
              <p className="text-gray-500">Página web de ejemplo</p>
            </div>
          </div>
        );
      case 'calculator':
        return (
          <div className="flex flex-col h-full p-2 bg-gray-100">
            <div className="bg-white p-3 mb-2 text-right">
              {text || '0'}
            </div>
            <div className="grid grid-cols-4 gap-1">
              {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
                <button 
                  key={key}
                  className="p-3 bg-white hover:bg-gray-200 active:bg-gray-300 rounded"
                  onClick={() => setText(prev => key === '=' ? eval(prev) : prev + key)}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="w-3/4 h-3/4 max-w-3xl bg-gray-100 rounded-lg shadow-xl flex flex-col">
        <div className="flex items-center px-4 py-2 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2">
            {getAppIcon()}
            <span className="font-medium">{getAppTitle()}</span>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="hover:bg-gray-300 p-1 rounded">
              <Minus className="h-4 w-4" />
            </button>
            <button className="hover:bg-gray-300 p-1 rounded">
              <Square className="h-4 w-4" />
            </button>
            <button 
              className="hover:bg-red-100 hover:text-red-600 p-1 rounded"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {getAppContent()}
        </div>
      </div>
    </div>
  );
};

export default SimulatedAppWindow;
