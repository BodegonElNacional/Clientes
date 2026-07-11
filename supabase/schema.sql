-- Esquema Base de Datos: MVP El Nacional (Fidelización + E-commerce + B2B Marketing)

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Personal (Staff y Usuarios Administradores)
CREATE TABLE usuarios_staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  usuario VARCHAR(100) UNIQUE NOT NULL, -- Nombre de usuario / email para login
  contrasena VARCHAR(255) NOT NULL, -- Contraseña (hash en producción)
  rol VARCHAR(50) NOT NULL, -- 'repartidor', 'cajero', 'gerente', 'marketing'
  telefono VARCHAR(20),
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Empresas (Marketing B2B)
CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(255) NOT NULL,
  direccion VARCHAR(255),
  telefono VARCHAR(50),
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Campañas de Marketing (Volanteada/B2B)
CREATE TABLE campanas_marketing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  cantidad_volantes INTEGER NOT NULL,
  fecha DATE DEFAULT CURRENT_DATE,
  notas TEXT, -- Ej: "Se volanteó en Alsina 124 por la mañana"
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Clientes (Usuarios)
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  telefono VARCHAR(20) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  empresa_id UUID REFERENCES empresas(id) ON DELETE SET NULL,
  puntos_acumulados INTEGER DEFAULT 0,
  direccion VARCHAR(255),
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Productos (Menú del día semanal + Carta Tradicional)
CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  precio_puntos INTEGER, -- Costo en puntos para canjear (NULL si no es canjeable)
  puntos_ganados INTEGER DEFAULT 0, -- Puntos que otorga comprar este plato
  categoria VARCHAR(50) NOT NULL, -- 'menu_dia', 'carta', 'bebida', 'postre', 'combo'
  dia_semana INTEGER, -- 1 a 5 (Lunes a Viernes) para el menú cíclico. NULL para fijos.
  es_activo BOOLEAN DEFAULT TRUE,
  imagen_url TEXT,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Pedidos (Transacciones)
CREATE TABLE pedidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID REFERENCES clientes(id) NOT NULL,
  estado VARCHAR(50) DEFAULT 'pendiente', -- 'pendiente', 'preparando', 'listo', 'entregado', 'cancelado'
  tipo_entrega VARCHAR(50) NOT NULL, -- 'mostrador' (takeaway) o 'delivery'
  metodo_pago VARCHAR(50), -- 'mercadopago', 'efectivo', 'puntos'
  paga_con DECIMAL(10, 2), -- Monto con el que paga si es efectivo
  vuelto DECIMAL(10, 2), -- Vuelto a entregar al cliente
  total DECIMAL(10, 2) NOT NULL,
  puntos_ganados INTEGER DEFAULT 0,
  puntos_gastados INTEGER DEFAULT 0,
  repartidor_id UUID REFERENCES usuarios_staff(id) ON DELETE SET NULL, -- Repartidor asignado
  notas TEXT,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Detalles del Pedido
CREATE TABLE detalles_pedido (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id UUID REFERENCES productos(id),
  cantidad INTEGER NOT NULL DEFAULT 1,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL
);

-- 8. Transacciones de Puntos (Ledger de Fidelización)
CREATE TABLE transacciones_puntos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID REFERENCES clientes(id) NOT NULL,
  pedido_id UUID REFERENCES pedidos(id) ON DELETE SET NULL,
  tipo VARCHAR(20) NOT NULL, -- 'suma' o 'resta'
  cantidad INTEGER NOT NULL,
  motivo VARCHAR(255) NOT NULL, -- Ej: 'Compra Online', 'Canje Flan Mixto'
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Data: Empresas
INSERT INTO empresas (nombre, direccion, telefono) VALUES
('Accenture', 'Alsina 150', '4321-5555'),
('Banco BID', 'Esmeralda 130', '4311-6666');

-- Seed Data: Campañas de Marketing
INSERT INTO campanas_marketing (empresa_id, cantidad_volantes, notas) VALUES
((SELECT id FROM empresas WHERE nombre = 'Accenture' LIMIT 1), 100, 'Volanteamos en Alsina 124 frente a las oficinas.'),
((SELECT id FROM empresas WHERE nombre = 'Banco BID' LIMIT 1), 50, 'Dejamos volantes en la recepción del banco.');

-- Seed Data: Staff Inicial / Usuarios Administradores del Sistema
INSERT INTO usuarios_staff (nombre, apellido, usuario, contrasena, rol, telefono) VALUES
('Juan', 'Gomez', 'juan.delivery', 'delivery123', 'repartidor', '11-2222-3333'),
('Carlos', 'Perez', 'carlos.delivery', 'delivery123', 'repartidor', '11-4444-5555'),
('Marta', 'Rodriguez', 'marta.caja', 'cajero123', 'cajero', '11-6666-7777'),
('Sofía', 'Fernández', 'sofia.marketing', 'marketing123', 'marketing', '11-9999-8888'),
('Hernán', 'López', 'admin', 'admin123', 'gerente', '11-5555-5555');

-- Seed Data: Productos Core
INSERT INTO productos (nombre, descripcion, precio, precio_puntos, puntos_ganados, categoria, dia_semana) VALUES
('Tapa de asado', 'Con papas rústicas al romero', 9500, 950, 95, 'carta', NULL),
('Bife de chorizo', 'Con puré o papas fritas', 12000, 1200, 120, 'carta', NULL),
('Pechuga grille', 'Con ensalada mixta', 8500, 850, 85, 'carta', NULL),
('Milanesa Napolitana', 'Con guarnición de puré o papas fritas', 9000, 900, 90, 'carta', NULL),
('Bifes a la criolla', 'Plato del día lunes. Cocidos en salsa criolla con papas españolas.', 8500, 850, 85, 'menu_dia', 1),
('Entraña al verdeo', 'Plato del día martes. Entraña tierna con salsa suave de cebolla de verdeo y puré.', 9000, 900, 90, 'menu_dia', 2),
('Pescado Brótola', 'Plato del día miércoles. Filete de brótola al limón con vegetales al vapor.', 8500, 850, 85, 'menu_dia', 3),
('Gaseosa Línea Coca-Cola', 'Lata 354ml', 1500, 150, 15, 'bebida', NULL),
('Agua Saborizada', 'Botella 500ml', 1200, 120, 12, 'bebida', NULL),
('Combo Milanesa + Gaseosa', 'Milanesa clásica con bebida', 10000, 1000, 100, 'combo', NULL);
