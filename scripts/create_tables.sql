-- Comandos importantes:
-- - Listar DATABASES: list db directory
-- - Listar tablas una vez conectado a la DB: list tables
-- - Describir tabla una vez conectado a la DB: describe table <nombre de tabla>
-- - Eliminar tabla una vez conectado a la DB: drop table <nombre de tabla>

-- Create the DB
CREATE DATABASE test

-- Connect to the DB to edit it
conect to test

-- Tabla ELECCION
-- Si es Federal: 0
-- Si es Electoral: 1
CREATE TABLE eleccion(id_eleccion INTEGER NOT NULL, fecha_eleccion DATE NOT NULL, tipo_eleccion INTEGER NOT NULL, PRIMARY KEY(id_eleccion))

-- Tabla COLEGIO
CREATE TABLE colegio(id_colegio INTEGER NOT NULL, id_eleccion INTEGER NOT NULL, FOREIGN KEY (id_eleccion) REFERENCES eleccion(id_eleccion) ON DELETE CASCADE, PRIMARY KEY(id_colegio))

-- Tabla MESA
CREATE TABLE mesa(id_mesa INTEGER NOT NULL, id_colegio INTEGER NOT NULL, FOREIGN KEY (id_colegio) REFERENCES colegio(id_colegio) ON DELETE CASCADE, PRIMARY KEY(id_mesa))

-- Tabla VOTO
CREATE TABLE voto(id_voto INTEGER NOT NULL, nombre VARCHAR(50) NOT NULL, PRIMARY KEY (id_voto))

-- Tabla PARTIDO
CREATE TABLE partido(siglas VARCHAR(10) NOT NULL, nombre VARCHAR(50) NOT NULL, PRIMARY KEY(siglas))

-- Tabla APODERADOS
CREATE TABLE apoderado(ife_pasaporte VARCHAR(20) NOT NULL, nombre VARCHAR(50) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(150) NOT NULL, id_partido VARCHAR(10) NOT NULL, FOREIGN KEY (id_partido) REFERENCES partido(siglas) ON DELETE CASCADE, PRIMARY KEY(ife_pasaporte))

-- Tabla LISTA MUNICIPAL
CREATE TABLE lista_municipal(ife_pasaporte VARCHAR(20) NOT NULL, nombre VARCHAR(50) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(150) NOT NULL, id_partido VARCHAR(10) NOT NULL, orden INTEGER NOT NULL, FOREIGN KEY (id_partido) REFERENCES partido(siglas) ON DELETE CASCADE, PRIMARY KEY(ife_pasaporte))

-- Tabla PRESIDENTE_MESA
CREATE TABLE presidente_mesa(ife_pasaporte VARCHAR(20) NOT NULL, nombre VARCHAR(50) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(150) NOT NULL, fecha_inicio DATE NOT NULL, fecha_final DATE NOT NULL, PERIOD BUSINESS_TIME(fecha_inicio, fecha_final), id_mesa INTEGER NOT NULL, FOREIGN KEY (id_mesa) REFERENCES mesa(id_mesa) ON DELETE CASCADE, PRIMARY KEY(ife_pasaporte))

-- Tabla VOCAL_MESA
CREATE TABLE vocal_mesa(ife_pasaporte VARCHAR(20) NOT NULL, nombre VARCHAR(50) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(150) NOT NULL, fecha_inicio DATE NOT NULL, fecha_final DATE NOT NULL, PERIOD BUSINESS_TIME(fecha_inicio, fecha_final), id_mesa INTEGER NOT NULL, FOREIGN KEY (id_mesa) REFERENCES mesa(id_mesa) ON DELETE CASCADE, PRIMARY KEY(ife_pasaporte))

-- Tabla
-- CREATE TABLE v_mexicano(ife_pasaporte VARCHAR(20) NOT NULL, nombre VARCHAR(50) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(150) NOT NULL, fecha_inicio DATE NOT NULL, fecha_final DATE NOT NULL, PERIOD BUSINESS_TIME(fecha_inicio, fecha_final), id_mesa INTEGER NOT NULL, FOREIGN KEY (id_mesa) REFERENCES mesa(id_mesa) ON DELETE CASCADE, PRIMARY KEY(ife_pasaporte))

-- Tabla
-- CREATE TABLE v_extranjero(ife_pasaporte VARCHAR(20) NOT NULL, nombre VARCHAR(50) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(150) NOT NULL, fecha_inicio DATE NOT NULL, fecha_final DATE NOT NULL, PERIOD BUSINESS_TIME(fecha_inicio, fecha_final), id_mesa INTEGER NOT NULL, FOREIGN KEY (id_mesa) REFERENCES mesa(id_mesa) ON DELETE CASCADE, PRIMARY KEY(ife_pasaporte))
