-- Script para agregar 30 productos adicionales al marketplace de Tarragona
-- Incluye productos de carne, pescado, conservas, especias y otros
-- Ejecutar después de tener la tabla producto con la estructura completa

USE marketplace;

-- Insertar productos adicionales
INSERT INTO producto (nombre, precio, tipo, alergenos, paradero, origen, stock, id_vendedor) VALUES

-- CARNES (8 productos)
('Pollo de Corral', 12.50, 'carne', '', 'Carnicería García', 'Penedès', 15, 6),
('Lomo de Cerdo Ibérico', 18.75, 'carne', '', 'Carnicería García', 'Extremadura', 8, 6),
('Ternera Gallega', 24.00, 'carne', '', 'Carnicería García', 'Galicia', 6, 6),
('Cordero Lechal', 22.50, 'carne', '', 'Carnicería García', 'Castilla y León', 4, 6),
('Chorizo Artesano', 15.20, 'carne', 'gluten', 'Carnicería García', 'La Rioja', 12, 7),
('Jamón Serrano', 32.00, 'carne', '', 'Carnicería García', 'Teruel', 3, 7),
('Costillas de Cerdo', 14.80, 'carne', '', 'Carnicería García', 'Cataluña', 10, 6),
('Picada de Ternera', 16.90, 'carne', '', 'Carnicería García', 'Tarragona', 8, 6),

-- PESCADOS Y MARISCOS (8 productos)
('Salmón Fresco Noruego', 26.50, 'pescado', 'pescado', 'Pescadería del Mar', 'Noruega', 5, 8),
('Dorada del Mediterráneo', 19.80, 'pescado', 'pescado', 'Pescadería del Mar', 'Costa Brava', 8, 8),
('Gambas Rojas de Palamós', 35.00, 'pescado', 'crustaceos', 'Pescadería del Mar', 'Palamós', 3, 8),
('Bacalao Fresco', 21.50, 'pescado', 'pescado', 'Pescadería del Mar', 'Galicia', 6, 8),
('Merluza del Cantábrico', 23.75, 'pescado', 'pescado', 'Pescadería del Mar', 'Cantabria', 4, 8),
('Pulpo Gallego', 28.90, 'pescado', 'moluscos', 'Pescadería del Mar', 'Galicia', 5, 8),
('Mejillones de Roca', 8.50, 'pescado', 'moluscos', 'Pescadería del Mar', 'Delta del Ebro', 20, 8),
('Lubina Salvaje', 25.30, 'pescado', 'pescado', 'Pescadería del Mar', 'Mediterráneo', 6, 8),

-- CONSERVAS (7 productos)
('Tomate Triturado Ecológico', 3.20, 'conservas', '', 'Conservas Artesanas', 'Navarra', 25, 9),
('Aceitunas Arbequinas', 6.80, 'conservas', '', 'Conservas Artesanas', 'Lleida', 18, 9),
('Pimientos del Piquillo', 4.50, 'conservas', '', 'Conservas Artesanas', 'Navarra', 15, 9),
('Atún en Aceite de Oliva', 8.90, 'conservas', 'pescado', 'Conservas Artesanas', 'Cantabria', 22, 9),
('Mermelada de Fresa Artesana', 5.75, 'conservas', '', 'Conservas Artesanas', 'Huelva', 12, 9),
('Legumbres Cocidas Ecológicas', 2.95, 'conservas', '', 'Conservas Artesanas', 'Castilla La Mancha', 30, 9),
('Anchoas del Cantábrico', 12.40, 'conservas', 'pescado', 'Conservas Artesanas', 'Cantabria', 8, 9),

-- ESPECIAS Y CONDIMENTOS (7 productos)
('Azafrán de La Mancha', 18.50, 'especias', '', 'Especias del Mundo', 'Castilla La Mancha', 5, 10),
('Pimentón Dulce de La Vera', 4.20, 'especias', '', 'Especias del Mundo', 'Extremadura', 20, 10),
('Romero Silvestre', 3.80, 'especias', '', 'Especias del Mundo', 'Tarragona', 15, 10),
('Sal Marina de Ibiza', 2.50, 'especias', '', 'Especias del Mundo', 'Ibiza', 25, 10),
('Comino Molido', 3.10, 'especias', '', 'Especias del Mundo', 'Andalucía', 18, 10),
('Orégano Mediterráneo', 2.80, 'especias', '', 'Especias del Mundo', 'Cataluña', 22, 10),
('Pimienta Negra en Grano', 5.90, 'especias', '', 'Especias del Mundo', 'India', 12, 10);

-- Verificar la inserción
SELECT COUNT(*) as total_productos FROM producto;
SELECT tipo, COUNT(*) as cantidad FROM producto GROUP BY tipo ORDER BY cantidad DESC; 