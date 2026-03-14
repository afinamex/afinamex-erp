CREATE TABLE clientes (
 id SERIAL PRIMARY KEY,
 nombre VARCHAR(100),
 telefono VARCHAR(20),
 correo VARCHAR(100)
);

CREATE TABLE vehiculos (
 id SERIAL PRIMARY KEY,
 cliente_id INTEGER,
 numero_unidad VARCHAR(50),
 marca VARCHAR(50),
 modelo VARCHAR(50),
 anio INTEGER,
 placas VARCHAR(20)
);

CREATE TABLE historial_servicios (
 id SERIAL PRIMARY KEY,
 vehiculo_id INTEGER,
 fecha DATE,
 descripcion TEXT
);

CREATE TABLE cotizaciones (
 id SERIAL PRIMARY KEY,
 vehiculo_id INTEGER,
 fecha DATE,
 descripcion TEXT,
 total DECIMAL
);

CREATE TABLE inventario (
 id SERIAL PRIMARY KEY,
 nombre VARCHAR(100),
 stock INTEGER,
 precio DECIMAL
);
