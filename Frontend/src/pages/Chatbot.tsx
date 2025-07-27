import React from 'react';
import { ArrowLeft, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ChatbotComponent from '@/components/Chatbot';
import Header from '@/components/Header';

const ChatbotPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold">Asistente Virtual</h1>
            </div>
          </div>
          
          <p className="text-muted-foreground max-w-2xl">
            Conversa con nuestro asistente inteligente para obtener información sobre productos, 
            consultar stock, hacer pedidos y más. Está entrenado específicamente para ayudarte 
            con todo lo relacionado al Marketplace Tarragona.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <ChatbotComponent className="h-[700px]" />
          </div>
        </div>

        <div className="mt-8 bg-muted/50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">¿Qué puedo hacer?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-blue-600">📦 Productos</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Buscar productos por nombre</li>
                <li>• Filtrar por tipo o categoría</li>
                <li>• Consultar productos de Tarragona</li>
                <li>• Productos sin alérgenos</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-green-600">📊 Stock</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Consultar stock disponible</li>
                <li>• Productos con stock bajo</li>
                <li>• Verificar disponibilidad</li>
                <li>• Alertas de stock</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-purple-600">📈 Estadísticas</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Estadísticas generales</li>
                <li>• Resumen de pedidos</li>
                <li>• Productos por categoría</li>
                <li>• Información del marketplace</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage; 