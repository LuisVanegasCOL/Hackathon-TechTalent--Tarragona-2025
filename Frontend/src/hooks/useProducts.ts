import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getProductos, createProducto, updateProducto, deleteProducto } from '@/lib/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const normalizeCategory = (cat: string) => {
    if (!cat) return '';
    const map: Record<string, string> = {
      'lácteo': 'lacteos',
      'lácteos': 'lacteos',
      'lacteo': 'lacteos',
      'panadería': 'panaderia',
      'panaderia': 'panaderia',
      'fruta': 'fruta',
      'verdura': 'verdura',
      'carne': 'carne',
      'pescado': 'pescado',
      'conservas': 'conservas',
      'especias': 'especias',
      'aceite': 'aceite',
      'huevos': 'huevos',
      'miel': 'miel'
    };
    return map[cat.toLowerCase()] || cat.toLowerCase();
  };

  // Obtener imagen por defecto basada en el nombre del producto
  const getDefaultImage = (nombre: string, categoria: string) => {
    const name = nombre.toLowerCase();
    
    // Mapeo específico de productos a imágenes
    const imageMap: Record<string, string> = {
      // Frutas
      'manzanas': 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=200&fit=crop',
      'naranjas': 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=300&h=200&fit=crop',
      'platanos': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop',
      'fresas': 'https://images.unsplash.com/photo-1543528176-61b239494933?w=300&h=200&fit=crop',
      'pera': 'https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?w=300&h=200&fit=crop',
      
      // Verduras
      'tomates': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop',
      'lechugas': 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=300&h=200&fit=crop',
      'pimientos': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=200&fit=crop',
      'cebollas': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop',
      
      // Lácteos
      'leche': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop',
      'queso': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=200&fit=crop',
      'yogur': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop',
      
      // Panadería
      'pan': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
      'baguette': 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=300&h=200&fit=crop',
      'croissant': 'https://images.unsplash.com/photo-1555507036-ab794f1aec4d?w=300&h=200&fit=crop',
      
      // Carnes - PRODUCTOS ESPECÍFICOS NUEVOS
      'pollo': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=200&fit=crop',
      'lomo': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop',
      'cerdo': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop',
      'ternera': 'https://images.unsplash.com/photo-1603048076520-b67bfe641d95?w=300&h=200&fit=crop',
      'cordero': 'https://images.unsplash.com/photo-1588347818131-7ca007c6ec10?w=300&h=200&fit=crop',
      'chorizo': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=200&fit=crop',
      'jamón': 'https://images.unsplash.com/photo-1549888834-3ec93abae044?w=300&h=200&fit=crop',
      'costillas': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop',
      'picada': 'https://images.unsplash.com/photo-1603048076520-b67bfe641d95?w=300&h=200&fit=crop',
      'chuleton': 'https://images.unsplash.com/photo-1603048076520-b67bfe641d95?w=300&h=200&fit=crop',
      
      // Pescados - PRODUCTOS ESPECÍFICOS NUEVOS
      'salmon': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&h=200&fit=crop',
      'dorada': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
      'gambas': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop',
      'bacalao': 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=300&h=200&fit=crop',
      'merluza': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
      'pulpo': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&h=200&fit=crop',
      'mejillones': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop',
      'lubina': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
      
      // Conservas - PRODUCTOS ESPECÍFICOS NUEVOS
      'tomate triturado': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop',
      'aceitunas': 'https://images.unsplash.com/photo-1611143669943-d31b4081422c?w=300&h=200&fit=crop',
      'piquillo': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=200&fit=crop',
      'atun': 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=300&h=200&fit=crop',
      'mermelada': 'https://images.unsplash.com/photo-1543528176-61b239494933?w=300&h=200&fit=crop',
      'legumbres': 'https://images.unsplash.com/photo-1586933001817-ad4cb2c50b41?w=300&h=200&fit=crop',
      'anchoas': 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=300&h=200&fit=crop',
      
      // Especias - PRODUCTOS ESPECÍFICOS NUEVOS
      'azafran': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
      'pimenton': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
      'romero': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
      'sal': 'https://images.unsplash.com/photo-1594736797933-d0400dbaa6de?w=300&h=200&fit=crop',
      'comino': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
      'oregano': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
      'pimienta': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
      
      // Otros productos existentes
      'huevos': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=200&fit=crop',
      'aceite': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop',
      'miel': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=200&fit=crop',
      'especias': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
      'conservas': 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=300&h=200&fit=crop'
    };

    // Buscar imagen específica por nombre
    for (const [key, image] of Object.entries(imageMap)) {
      if (name.includes(key)) {
        return image;
      }
    }

    // Fallback por categoría
    const categoryImages: Record<string, string> = {
      'fruta': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop',
      'verdura': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
      'lacteos': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop',
      'panaderia': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
      'carne': 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=200&fit=crop',
      'pescado': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
      'aceite': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop',
      'huevos': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=200&fit=crop',
      'miel': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=200&fit=crop',
      'especias': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
      'conservas': 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=300&h=200&fit=crop'
    };

    return categoryImages[categoria] || 'https://images.unsplash.com/photo-1506617564039-2f97b74790bd?w=300&h=200&fit=crop';
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductos();
      if (response.success && response.productos) {
        // Transformar datos del backend al formato del frontend
        const formattedProducts: Product[] = response.productos.map((p: any) => ({
          id: p.id.toString(),
          name: p.nombre,
          price: parseFloat(p.precio),
          category: normalizeCategory(p.tipo),
          provider: p.paradero,
          origin: p.origen,
          image: p.imagen || getDefaultImage(p.nombre, normalizeCategory(p.tipo)),
          allergens: p.alergenos ? p.alergenos.split(',') : []
        }));
        setProducts(formattedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const response = await createProducto({
        name: productData.name,
        price: productData.price,
        category: productData.category,
        provider: productData.provider,
        origin: productData.origin,
        image: productData.image,
        allergens: productData.allergens.join(',')
      });

      if (response.success) {
        await fetchProducts(); // Refrescar la lista
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  };

  const editProduct = async (productId: string, productData: Omit<Product, 'id'>) => {
    try {
      const response = await updateProducto(parseInt(productId), {
        name: productData.name,
        price: productData.price,
        category: productData.category,
        provider: productData.provider,
        origin: productData.origin,
        image: productData.image,
        allergens: productData.allergens.join(',')
      });

      if (response.success) {
        await fetchProducts(); // Refrescar la lista
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      const response = await deleteProducto(parseInt(productId));

      if (response.success) {
        await fetchProducts(); // Refrescar la lista
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  };

  return { 
    products, 
    loading, 
    updateProducts: fetchProducts, // Mantener compatibilidad
    addProduct,
    editProduct,
    removeProduct,
    refetch: fetchProducts
  };
};