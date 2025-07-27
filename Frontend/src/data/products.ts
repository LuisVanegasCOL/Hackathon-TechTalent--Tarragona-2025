import { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: 'carne', name: 'Carne', image: '/imagenes/categorias/carne.jpg', color: 'bg-red-100' },
  { id: 'pescado', name: 'Pescado', image: '/imagenes/categorias/pescado.jpg', color: 'bg-blue-100' },
  { id: 'verdura', name: 'Verdura', image: '/imagenes/categorias/verduras.jpg', color: 'bg-green-100' },
  { id: 'fruta', name: 'Fruta', image: '/imagenes/categorias/frutas.jpg', color: 'bg-yellow-100' },
  { id: 'lacteos', name: 'Lácteos', image: '/imagenes/categorias/lacteos.jpg', color: 'bg-purple-100' },
  { id: 'panaderia', name: 'Panadería', image: '/imagenes/categorias/panaderia.jpg', color: 'bg-orange-100' },
  { id: 'conservas', name: 'Conservas', image: '/imagenes/categorias/conservas.jpg', color: 'bg-gray-100' },
  { id: 'especias', name: 'Especias', image: '/imagenes/categorias/especias.jpg', color: 'bg-red-100' },
  { id: 'aceite', name: 'Aceite', image: '/imagenes/categorias/aceite.jpg', color: 'bg-green-200' },
  { id: 'huevos', name: 'Huevos', image: '/imagenes/categorias/huevos.jpg', color: 'bg-yellow-200' },
  { id: 'miel', name: 'Miel', image: '/imagenes/categorias/miel.jpg', color: 'bg-yellow-300' }
];

export const products: Product[] = [
  // Carne
  {
    id: '1',
    name: 'Costillas de Cerdo',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop',
    category: 'carne',
    provider: 'Carnicería García',
    origin: 'Tarragona',
    allergens: []
  },
  {
    id: '2',
    name: 'Chuletas de Cordero',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1588347818131-7ca007c6ec10?w=300&h=200&fit=crop',
    category: 'carne',
    provider: 'Carnicería García',
    origin: 'Aragón',
    allergens: []
  },
  {
    id: '3',
    name: 'Salchichas Frescas',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=200&fit=crop',
    category: 'carne',
    provider: 'Carnicería García',
    origin: 'Cataluña',
    allergens: ['gluten']
  },
  {
    id: '4',
    name: 'Lomo de Cerdo',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1603048076520-b67bfe641d95?w=300&h=200&fit=crop',
    category: 'carne',
    provider: 'Carnicería García',
    origin: 'Tarragona',
    allergens: []
  },

  // Pescado
  {
    id: '5',
    name: 'Salmón Fresco',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&h=200&fit=crop',
    category: 'pescado',
    provider: 'Pescadería del Mar',
    origin: 'Noruega',
    allergens: ['pescado']
  },
  {
    id: '6',
    name: 'Dorada del Mediterráneo',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
    category: 'pescado',
    provider: 'Pescadería del Mar',
    origin: 'Costa Brava',
    allergens: ['pescado']
  },
  {
    id: '7',
    name: 'Gambas Rojas',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop',
    category: 'pescado',
    provider: 'Pescadería del Mar',
    origin: 'Palamós',
    allergens: ['crustaceos']
  },

  // Verdura
  {
    id: '8',
    name: 'Tomates de Rama',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop',
    category: 'verdura',
    provider: 'Huerta de Pepe',
    origin: 'El Vendrell',
    allergens: []
  },
  {
    id: '9',
    name: 'Lechugas Ecológicas',
    price: 2.20,
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=300&h=200&fit=crop',
    category: 'verdura',
    provider: 'Huerta de Pepe',
    origin: 'Reus',
    allergens: []
  },
  {
    id: '10',
    name: 'Pimientos Rojos',
    price: 4.80,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=200&fit=crop',
    category: 'verdura',
    provider: 'Huerta de Pepe',
    origin: 'Cambrils',
    allergens: []
  },

  // Fruta
  {
    id: '11',
    name: 'Manzanas Golden',
    price: 2.80,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=200&fit=crop',
    category: 'fruta',
    provider: 'Frutería Carmen',
    origin: 'Lleida',
    allergens: []
  },
  {
    id: '12',
    name: 'Naranjas de Valencia',
    price: 3.20,
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=300&h=200&fit=crop',
    category: 'fruta',
    provider: 'Frutería Carmen',
    origin: 'Valencia',
    allergens: []
  },

  // Lácteos
  {
    id: '13',
    name: 'Queso Manchego',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=200&fit=crop',
    category: 'lacteos',
    provider: 'Quesería Artesana',
    origin: 'La Mancha',
    allergens: ['lacteos']
  },
  {
    id: '14',
    name: 'Yogur Natural',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop',
    category: 'lacteos',
    provider: 'Granja Local',
    origin: 'Tarragona',
    allergens: ['lacteos']
  }
];

export const allergenIcons: { [key: string]: string } = {
  'gluten': '🌾',
  'lacteos': '🥛',
  'huevos': '🥚',
  'pescado': '🐟',
  'crustaceos': '🦐',
  'frutos_secos': '🥜',
  'cacahuetes': '🥜',
  'soja': '🌱',
  'sesamo': '🌰',
  'apio': '🥬',
  'mostaza': '🌿',
  'sulfitos': '⚗️'
};