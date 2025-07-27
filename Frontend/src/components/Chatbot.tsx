import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ShoppingCart, Package, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { chatbotQuery } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  productos?: any[];
}

interface ChatbotProps {
  isFloating?: boolean;
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ isFloating = false, className = "" }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy el asistente del Marketplace Tarragona. Puedo ayudarte con información sobre productos, stock, pedidos y más. ¿En qué puedo ayudarte?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatbotQuery({ query: inputValue });
      
      if (response.success !== false) {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: response.response || 'Lo siento, no pude procesar tu consulta.',
          isUser: false,
          timestamp: new Date(),
          productos: response.productos || []
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(response.message || 'Error en la consulta');
      }
    } catch (error: any) {
      console.error('Error del chatbot:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Lo siento, hubo un error al procesar tu consulta. Por favor, inténtalo de nuevo.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error en el chatbot",
        description: error.message || "No se pudo conectar con el asistente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const suggestedQuestions = [
    "¿Qué productos de Tarragona tienes?",
    "¿Cuál es el stock de manzanas?",
    "Muéstrame productos sin alérgenos",
    "¿Qué productos tienen poco stock?",
    "Estadísticas del marketplace"
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  const ProductCard = ({ producto }: { producto: any }) => (
    <Card className="w-full max-w-sm mb-2">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-sm">{producto.nombre}</h4>
          <Badge variant={producto.stock > 10 ? "default" : "destructive"}>
            Stock: {producto.stock || 0}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p><Package className="inline w-3 h-3 mr-1" />{producto.tipo}</p>
          {producto.origen && <p><Info className="inline w-3 h-3 mr-1" />{producto.origen}</p>}
          {producto.paradero && <p>📍 {producto.paradero}</p>}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className={`${isFloating ? 'fixed bottom-4 right-4 w-96 h-[500px] z-50 shadow-2xl' : 'w-full h-[600px]'} ${className} flex flex-col`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          Asistente Marketplace Tarragona
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 pb-3">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                  
                  {/* Mostrar productos si los hay */}
                  {message.productos && message.productos.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">
                        Productos encontrados:
                      </p>
                      <div className="grid gap-2">
                        {message.productos.slice(0, 3).map((producto, index) => (
                          <ProductCard key={index} producto={producto} />
                        ))}
                        {message.productos.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            ... y {message.productos.length - 3} productos más
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`flex items-center gap-1 mt-1 ${
                      message.isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.isUser ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-3 py-2 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Escribiendo...</span>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Preguntas sugeridas */}
        {messages.length <= 1 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Preguntas frecuentes:</p>
            <div className="flex flex-wrap gap-1">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input de mensaje */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot; 