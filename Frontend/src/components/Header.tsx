import React, { useState } from 'react';
import { Search, User, ShoppingCart, ChevronDown, Package, Users, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery = '' }) => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch?.(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }
  };

  const handleUserClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleChatbotClick = () => {
    navigate('/chatbot');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-market-red text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0 flex items-center gap-3"
          onClick={handleLogoClick}
        >
          <img 
            src="/logo-mercats-tarragona.png" 
            alt="Mercats de Tarragona"
            className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
          />
          <span className="hidden lg:block text-lg font-semibold">
            MercaTarraco
          </span>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-2xl mx-2 md:mx-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10 bg-white text-gray-900 border-0 focus:ring-2 focus:ring-market-red-light w-full"
            />
          </form>
        </div>

        {/* User actions */}
        <div className="flex items-center gap-2">
            {/* Botón del Chatbot */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleChatbotClick}
              className="flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Asistente</span>
            </Button>

            {/* Carrito */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCartClick}
              className="relative flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="hidden sm:inline">Carrito</span>
            </Button>

            {/* Usuario/Admin */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                                     <Button variant="ghost" size="sm" className="flex items-center gap-2">
                     <User className="w-4 h-4" />
                     <span className="hidden sm:inline">{user.name}</span>
                     <ChevronDown className="w-3 h-3" />
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end">
                   <DropdownMenuItem onClick={() => navigate('/profile')}>
                     <User className="w-4 h-4 mr-2" />
                     Mi Perfil
                   </DropdownMenuItem>
                   {user.role === 'vendedor' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Package className="w-4 h-4 mr-2" />
                        Dashboard Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/admin/users')}>
                        <Users className="w-4 h-4 mr-2" />
                        Gestión Usuarios
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleUserClick} className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
              </Button>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;