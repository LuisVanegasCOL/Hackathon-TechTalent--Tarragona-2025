import React, { useState } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import Chatbot from './Chatbot';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // No mostrar el botón flotante en la página dedicada del chatbot
  if (location.pathname === '/chatbot') {
    return null;
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <Button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot flotante */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            {/* Botón para cerrar/minimizar */}
            <div className="absolute -top-2 -right-2 flex gap-1 z-10">
              <Button
                onClick={toggleChatbot}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background shadow-md"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                onClick={toggleChatbot}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background shadow-md"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Componente del chatbot */}
            <Chatbot isFloating={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot; 