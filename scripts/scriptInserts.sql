-- ELECCIONES
INSERT INTO eleccion (fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo) VALUES ('2015-06-01', '2015-06-11', 'Junio 2015', 'Federal');
INSERT INTO eleccion (fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo) VALUES ('2018-05-07', '2018-05-17', 'Mayo 2018', 'Municipal');
INSERT INTO eleccion (fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo) VALUES ('2022-06-01', '2022-06-11', 'Junio 2022', 'Municipal');
INSERT INTO eleccion (fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo) VALUES ('2025-04-02', '2025-04-08', 'Abril 2025', 'Federal');
-- One line command
-- INSERT INTO eleccion (fecha_eleccion_inicio, fecha_eleccion_final, descripcion) VALUES ('2015-06-01', '2015-06-11', 'Junio 2015'), ('2018-05-07', '2018-05-17', 'Mayo 2018'), ('2022-06-01', '2022-06-11', 'Junio 2022'), ('2025-04-02', '2025-04-08', 'Abril 2025')
-- UPDATE eleccion SET fecha_eleccion_inicio='{}', fecha_eleccion_final='{}', descripcion='{}', tipo='{}' WHERE id_eleccion = 5
-- UPDATE eleccion SET fecha_eleccion_inicio='2020-02-03', fecha_eleccion_final='2020-02-20', descripcion='Febrero 2021', tipo='Municipal' WHERE id_eleccion = 5
-- Todos funcionan


-- COLEGIOS
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2025-04-02', '2025-04-08', 'Calle cool', 4);
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2015-06-01', '2015-06-11', 'Calle cool', 1);
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2018-05-07', '2018-05-17', 'Calle cool', 2);
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2018-05-07', '2018-05-17', 'Calle cool', 2);
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2025-04-02', '2025-04-08', 'Calle cool', 4);
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2025-04-02', '2025-04-08', 'Calle cool', 4);
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2022-06-01', '2022-06-11', 'Calle cool', 3);
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2015-06-01', '2015-06-11', 'Calle cool', 1);
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2018-05-07', '2018-05-17', 'Calle cool', 2);
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ( '2022-06-01', '2022-06-11', 'Calle cool', 3);
-- One line command
INSERT INTO colegio (id_colegio, fecha_colegio_inicio, fecha_colegio_final, id_colegio_eleccion) VALUES (1, '2018-05-07', '2018-05-17', 2), (2, '2025-04-02', '2025-04-08', 4), (3, '2015-06-01', '2015-06-11', 1), (4, '2018-05-07', '2018-05-17', 2), (5, '2025-04-02', '2025-04-08', 4), (6, '2025-04-02', '2025-04-08', 4), (7, '2022-06-01', '2022-06-11', 3), (8, '2015-06-01', '2015-06-11', 1), (9, '2018-05-07', '2018-05-17', 2), (10, '2022-06-01', '2022-06-11', 3);
-- Todos funcionan


-- MESAS
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'A', 8);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2018-05-07', '2018-05-17', 'B', 9);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'C', 3);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2025-04-02', '2025-04-08', 'D', 6);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2018-05-07', '2018-05-17', 'E', 1);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2025-04-02', '2025-04-08', 'F', 6);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'G', 3);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2025-04-02', '2025-04-08', 'H', 6);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2018-05-07', '2018-05-17', 'L', 4);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2018-05-07', '2018-05-17', 'M', 4);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2018-05-07', '2018-05-17', 'A', 1);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2022-06-01', '2022-06-11', 'B', 7);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2025-04-02', '2025-04-08', 'C', 5);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'D', 8);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'E', 8);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'F', 3);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2022-06-01', '2022-06-11', 'G', 7);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2022-06-01', '2022-06-11', 'K', 10);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'Z', 3);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'M', 8);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2025-04-02', '2025-04-08', 'R', 2);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'S', 3);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2025-04-02', '2025-04-08', 'T', 5);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2015-06-01', '2015-06-11', 'U', 3);
INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2025-04-02', '2025-04-08', 'V', 5);
-- One line command
INSERT INTO mesa (id_mesa, fecha_mesa_inicio, fecha_mesa_final, id_mesa_colegio) VALUES (1, '2015-06-01', '2015-06-11', 8), (2, '2018-05-07', '2018-05-17', 9), (3, '2015-06-01', '2015-06-11', 3), (4, '2025-04-02', '2025-04-08', 6), (5, '2018-05-07', '2018-05-17', 1), (6, '2025-04-02', '2025-04-08', 6), (7, '2015-06-01', '2015-06-11', 3), (8, '2025-04-02', '2025-04-08', 6), (9, '2018-05-07', '2018-05-17', 4), (10, '2018-05-07', '2018-05-17', 4), (11, '2018-05-07', '2018-05-17', 1), (12, '2022-06-01', '2022-06-11', 7), (13, '2025-04-02', '2025-04-08', 5), (14, '2015-06-01', '2015-06-11', 8), (15, '2015-06-01', '2015-06-11', 8), (16, '2015-06-01', '2015-06-11', 3), (17, '2022-06-01', '2022-06-11', 7), (18, '2022-06-01', '2022-06-11', 10), (19, '2015-06-01', '2015-06-11', 3), (20, '2015-06-01', '2015-06-11', 8), (21, '2025-04-02', '2025-04-08', 2), (22, '2015-06-01', '2015-06-11', 3), (23, '2025-04-02', '2025-04-08', 5), (24, '2015-06-01', '2015-06-11', 3), (25, '2025-04-02', '2025-04-08', 5);
-- Todos funcionan


-- PARTIDO
INSERT INTO partido (siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final) VALUES ('PAN', 'Partido Accion Nacional', 'Alejandra Nissan', '1946-02-03', '2300-01-14');
INSERT INTO partido (siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final) VALUES ('PRI', 'Partido Revolucionario Institucional', 'Yann Le Lorier', '1930-01-24', '2067-03-22');
INSERT INTO partido (siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final) VALUES ('PRD', 'Partido de la Revolución Democratica', 'Roberto Gervacio', '1975-08-04', '2463-09-09');
INSERT INTO partido (siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final) VALUES ('MC', 'Movimiento Ciudadano', 'Isaac Harari', '1981-10-11', '2093-11-10');
INSERT INTO partido (siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final) VALUES ('PT', 'Partido del Trabajo', 'Alberto Anaya', '1990-12-08', '2073-12-26');
-- One time command
INSERT INTO partido (siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final) VALUES ('PAN', 'Partido Accion Nacional', 'Alejandra Nissan', '1946-02-03', '2300-01-14'), ('PRI', 'Partido Revolucionario Institucional', 'Yann Le Lorier', '1930-01-24', '2067-03-22'), ('PRD', 'Partido de la Revolución Democratica', 'Roberto Gervacio', '1975-08-04', '2463-09-09'), ('MC', 'Movimiento Ciudadano', 'Isaac Harari', '1981-10-11', '2093-11-10'), ('PT', 'Partido del Trabajo', 'Alberto Anaya', '1990-12-08', '2073-12-26');
-- Todos funcionan

INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (1, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (26, '2022-06-01', '2022-06-11', '1981-10-11', '2093-11-10', 'MC', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (10, '2018-05-07', '2018-05-17', '1946-02-03', '2300-01-14', 'PAN', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (9, '2018-05-07', '2018-05-17', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (4, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (18, '2022-06-01', '2022-06-11', '1930-01-24', '2067-03-22', 'PRI', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (13, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (3, '2015-06-01', '2015-06-11', '1946-02-03', '2300-01-14', 'PAN', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (25, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (13, '2025-04-02', '2025-04-08', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (19, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (5, '2018-05-07', '2018-05-17', '1981-10-11', '2093-11-10', 'MC', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (3, '2015-06-01', '2015-06-11', '1946-02-03', '2300-01-14', 'PAN', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (21, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (20, '2015-06-01', '2015-06-11', '1990-12-08', '2073-12-26', 'PT', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (6, '2025-04-02', '2025-04-08', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (9, '2018-05-07', '2018-05-17', '1946-02-03', '2300-01-14', 'PAN', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (7, '2015-06-01', '2015-06-11', '1946-02-03', '2300-01-14', 'PAN', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (20, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (23, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (3, '2015-06-01', '2015-06-11', '1975-08-04', '2463-09-09', 'PRD', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (2, '2018-05-07', '2018-05-17', '1975-08-04', '2463-09-09', 'PRD', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (25, '2025-04-02', '2025-04-08', '1981-10-11', '2093-11-10', 'MC', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (9, '2018-05-07', '2018-05-17', '1930-01-24', '2067-03-22', 'PRI', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (4, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (8, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (24, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (22, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 1);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (23, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 0);
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (16, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 1);
-- One time command
INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (16, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 1), (9, '2018-05-07', '2018-05-17', '1981-10-11', '2093-11-10', 'MC', 0), (4, '2025-04-02', '2025-04-08', '1946-02-03', '2300-01-14', 'PAN', 1), (9, '2018-05-07', '2018-05-17', '1990-12-08', '2073-12-26', 'PT', 0), (4, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1), (18, '2022-06-01', '2022-06-11', '1930-01-24', '2067-03-22', 'PRI', 0), (13, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 0), (3, '2015-06-01', '2015-06-11', '1946-02-03', '2300-01-14', 'PAN', 0), (25, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 1), (13, '2025-04-02', '2025-04-08', '1990-12-08', '2073-12-26', 'PT', 0), (19, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 0), (5, '2018-05-07', '2018-05-17', '1981-10-11', '2093-11-10', 'MC', 1), (3, '2015-06-01', '2015-06-11', '1946-02-03', '2300-01-14', 'PAN', 1), (21, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1), (20, '2015-06-01', '2015-06-11', '1990-12-08', '2073-12-26', 'PT', 1), (6, '2025-04-02', '2025-04-08', '1990-12-08', '2073-12-26', 'PT', 0), (9, '2018-05-07', '2018-05-17', '1946-02-03', '2300-01-14', 'PAN', 0), (7, '2015-06-01', '2015-06-11', '1946-02-03', '2300-01-14', 'PAN', 1), (20, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 0), (23, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 1), (3, '2015-06-01', '2015-06-11', '1975-08-04', '2463-09-09', 'PRD', 0), (2, '2018-05-07', '2018-05-17', '1975-08-04', '2463-09-09', 'PRD', 1), (25, '2025-04-02', '2025-04-08', '1981-10-11', '2093-11-10', 'MC', 0), (9, '2018-05-07', '2018-05-17', '1930-01-24', '2067-03-22', 'PRI', 1), (4, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 0), (8, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 0), (24, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 0), (22, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 1), (23, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 0), (16, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 1);
-- Todos funcionan


-- V_MUNICIPAL
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (16, '2015-06-01', '2015-06-11', '1975-08-04', '2463-09-09', 'PRD', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (9, '2018-05-07', '2018-05-17', '1981-10-11', '2093-11-10', 'MC', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (4, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (9, '2018-05-07', '2018-05-17', '1946-02-03', '2300-01-14', 'PAN', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (4, '2025-04-02', '2025-04-08', '1946-02-03', '2300-01-14', 'PAN', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (18, '2022-06-01', '2022-06-11', '1975-08-04', '2463-09-09', 'PRD', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (13, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (3, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (25, '2025-04-02', '2025-04-08', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (13, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (19, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (5, '2018-05-07', '2018-05-17', '1946-02-03', '2300-01-14', 'PAN', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (3, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (21, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (20, '2015-06-01', '2015-06-11', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (6, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (9, '2018-05-07', '2018-05-17', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (7, '2015-06-01', '2015-06-11', '1946-02-03', '2300-01-14', 'PAN', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (20, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (23, '2025-04-02', '2025-04-08', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (3, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (2, '2018-05-07', '2018-05-17', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (25, '2025-04-02', '2025-04-08', '1981-10-11', '2093-11-10', 'MC', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (9, '2018-05-07', '2018-05-17', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (4, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (8, '2025-04-02', '2025-04-08', '1981-10-11', '2093-11-10', 'MC', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (24, '2015-06-01', '2015-06-11', '1975-08-04', '2463-09-09', 'PRD', 1);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (22, '2015-06-01', '2015-06-11', '1990-12-08', '2073-12-26', 'PT', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (23, '2025-04-02', '2025-04-08', '1981-10-11', '2093-11-10', 'MC', 0);
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (16, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 0);
-- One time command
INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES (16, '2015-06-01', '2015-06-11', '1975-08-04', '2463-09-09', 'PRD', 0), (9, '2018-05-07', '2018-05-17', '1981-10-11', '2093-11-10', 'MC', 1), (4, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1), (9, '2018-05-07', '2018-05-17', '1946-02-03', '2300-01-14', 'PAN', 1), (4, '2025-04-02', '2025-04-08', '1946-02-03', '2300-01-14', 'PAN', 0), (18, '2022-06-01', '2022-06-11', '1975-08-04', '2463-09-09', 'PRD', 0), (13, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 1), (3, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 0), (25, '2025-04-02', '2025-04-08', '1990-12-08', '2073-12-26', 'PT', 0), (13, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1), (19, '2015-06-01', '2015-06-11', '1930-01-24', '2067-03-22', 'PRI', 1), (5, '2018-05-07', '2018-05-17', '1946-02-03', '2300-01-14', 'PAN', 0), (3, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 1), (21, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 0), (20, '2015-06-01', '2015-06-11', '1990-12-08', '2073-12-26', 'PT', 0), (6, '2025-04-02', '2025-04-08', '1975-08-04', '2463-09-09', 'PRD', 1), (9, '2018-05-07', '2018-05-17', '1990-12-08', '2073-12-26', 'PT', 0), (7, '2015-06-01', '2015-06-11', '1946-02-03', '2300-01-14', 'PAN', 0), (20, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 1), (23, '2025-04-02', '2025-04-08', '1990-12-08', '2073-12-26', 'PT', 0), (3, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 0), (2, '2018-05-07', '2018-05-17', '1990-12-08', '2073-12-26', 'PT', 0), (25, '2025-04-02', '2025-04-08', '1981-10-11', '2093-11-10', 'MC', 0), (9, '2018-05-07', '2018-05-17', '1990-12-08', '2073-12-26', 'PT', 0), (4, '2025-04-02', '2025-04-08', '1930-01-24', '2067-03-22', 'PRI', 1), (8, '2025-04-02', '2025-04-08', '1981-10-11', '2093-11-10', 'MC', 1), (24, '2015-06-01', '2015-06-11', '1975-08-04', '2463-09-09', 'PRD', 1), (22, '2015-06-01', '2015-06-11', '1990-12-08', '2073-12-26', 'PT', 0), (23, '2025-04-02', '2025-04-08', '1981-10-11', '2093-11-10', 'MC', 0), (16, '2015-06-01', '2015-06-11', '1981-10-11', '2093-11-10', 'MC', 0)
-- Todos funcionan

-- APOD_LISTA
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('YLX0Y8SSAIJVX7AJLM', '1995-11-03', 'Andador Chihuahua 388 Edif. 807 , Depto. 165', 3,'Dana Wilson', '1946-02-03', '2300-01-14', 'PAN');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('BCHNRZ2O1H18MD0VPX', '1992-12-11', 'Pasaje Norte Contreras 662 Interior 596', 2,'Edward Joseph', '1946-02-03', '2300-01-14', 'PAN');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('SOO0CY9ABI5D2ZSTFD', '1964-06-08', 'Peatonal Sur Maldonado 219 Edif. 335 , Depto. 463', 1,'Cecile Teel', '1946-02-03', '2300-01-14', 'PAN');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('OQAA20BWKRRASUDS37', '1954-01-08', 'Ampliación Iraq 425 538', 3,'Otis Varian', '1930-01-24', '2067-03-22', 'PRI');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('1J18T65IIMI8KFIHJQ', '1924-07-09', 'Periférico Baja California Sur 312 440', 2,'Samantha Reid', '1930-01-24', '2067-03-22', 'PRI');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('3MDJ98LAB1CNZL7OEV', '1984-01-19', 'Diagonal Indonesia 234 170', 1,'Davis Torres', '1930-01-24', '2067-03-22', 'PRI');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('WK39AEJS6X8F3H4BUJ', '1996-08-26', 'Cerrada Yucatán 314 Interior 223', 3,'Ethel Brainard', '1975-08-04', '2463-09-09', 'PRD');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('CIJWKS5IRDQ6TOU7J6', '1955-01-16', 'Boulevard Norte Bravo 479 467', 2,'Dong Turner', '1975-08-04', '2463-09-09', 'PRD');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('05L3S0DAEQW9SW6ZUI', '1931-11-02', 'Privada Baja California 885 368', 1,'Sandra Arredondo', '1975-08-04', '2463-09-09', 'PRD');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('N3DT9L6H0OL2WBKASX', '1943-11-28', 'Periférico Longoria 084 Interior 484', 3,'Ed Whitley', '1981-10-11', '2093-11-10', 'MC');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('HPM1URTYOXD4Q5O84C', '1954-10-02', 'Continuación Camerún 146 Edif. 969 , Depto. 189', 2,'Norma Moriarty', '1981-10-11', '2093-11-10', 'MC');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('NNO56ARJ4VXDYO5UDF', '1921-12-06', 'Periférico Norte Benavídez 140 Edif. 795 , Depto. 041', 1,'Marc Watts', '1981-10-11', '2093-11-10', 'MC');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('PQX8YIJ2NY2QH0U896', '1986-10-15', 'Privada Kirguistán 115 662', 3,'Keri Dobbins', '1990-12-08', '2073-12-26', 'PT');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('OCPIXKADOS6W6ND1XZ', '1937-06-24', 'Avenida Zambia 904 Interior 065', 2,'Joshua Thomas', '1990-12-08', '2073-12-26', 'PT');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('JHMZX33TYZWH3GFC4L', '1959-08-25', 'Diagonal Norte Bétancourt 135 Edif. 106 , Depto. 409', 1,'Donna Tabin', '1990-12-08', '2073-12-26', 'PT');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('OCPIXKADOS6W6ND1XZ', '1937-06-24', 'Avenida Zambia 904 Interior 065', 'Joshua Thomas', 2,'1990-12-08', '2073-12-26', 'PT');
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('JHMZX33TYZWH3GFC4L', '1959-08-25', 'Diagonal Norte Bétancourt 135 Edif. 106 , Depto. 409', 'Donna Tabin', 1,'1990-12-08', '2073-12-26', 'PT');
-- One time command
INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden,fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('YLX0Y8SSAIJVX7AJLM', '1995-11-03', 'Andador Chihuahua 388 Edif. 807 , Depto. 165', 'Dana Wilson', '1946-02-03', '2300-01-14', 'PAN'),('BCHNRZ2O1H18MD0VPX', '1992-12-11', 'Pasaje Norte Contreras 662 Interior 596', 'Edward Joseph', '1946-02-03', '2300-01-14', 'PAN'),('SOO0CY9ABI5D2ZSTFD', '1964-06-08', 'Peatonal Sur Maldonado 219 Edif. 335 , Depto. 463', 'Cecile Teel', '1946-02-03', '2300-01-14', 'PAN'),('OQAA20BWKRRASUDS37', '1954-01-08', 'Ampliación Iraq 425 538', 'Otis Varian', '1930-01-24', '2067-03-22', 'PRI'),('1J18T65IIMI8KFIHJQ', '1924-07-09', 'Periférico Baja California Sur 312 440', 'Samantha Reid', '1930-01-24', '2067-03-22', 'PRI'),('3MDJ98LAB1CNZL7OEV', '1984-01-19', 'Diagonal Indonesia 234 170', 'Davis Torres', '1930-01-24', '2067-03-22', 'PRI'),('WK39AEJS6X8F3H4BUJ', '1996-08-26', 'Cerrada Yucatán 314 Interior 223', 'Ethel Brainard', '1975-08-04', '2463-09-09', 'PRD'),('CIJWKS5IRDQ6TOU7J6', '1955-01-16', 'Boulevard Norte Bravo 479 467', 'Dong Turner', '1975-08-04', '2463-09-09', 'PRD'),('05L3S0DAEQW9SW6ZUI', '1931-11-02', 'Privada Baja California 885 368', 'Sandra Arredondo', '1975-08-04', '2463-09-09', 'PRD'),('N3DT9L6H0OL2WBKASX', '1943-11-28', 'Periférico Longoria 084 Interior 484', 'Ed Whitley', '1981-10-11', '2093-11-10', 'MC'),('HPM1URTYOXD4Q5O84C', '1954-10-02', 'Continuación Camerún 146 Edif. 969 , Depto. 189', 'Norma Moriarty', '1981-10-11', '2093-11-10', 'MC'),('NNO56ARJ4VXDYO5UDF', '1921-12-06', 'Periférico Norte Benavídez 140 Edif. 795 , Depto. 041', 'Marc Watts', '1981-10-11', '2093-11-10', 'MC'),('PQX8YIJ2NY2QH0U896', '1986-10-15', 'Privada Kirguistán 115 662', 'Keri Dobbins', '1990-12-08', '2073-12-26', 'PT'),('OCPIXKADOS6W6ND1XZ', '1937-06-24', 'Avenida Zambia 904 Interior 065', 'Joshua Thomas', '1990-12-08', '2073-12-26', 'PT'),('JHMZX33TYZWH3GFC4L', '1959-08-25', 'Diagonal Norte Bétancourt 135 Edif. 106 , Depto. 409', 'Donna Tabin', '1990-12-08', '2073-12-26', 'PT')
-- Todos funcionan



select id_v_federal, tipo_voto, fecha_hora_voto, letra, id_colegio, descripcion, v_federal.siglas from v_federal inner join mesa on v_federal.id_mesa=mesa.id_mesa inner join colegio on mesa.id_mesa_colegio=colegio.id_colegio inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion inner join partido on v_federal.siglas=partido.siglas




show_command = "select id_mesa, fecha_mesa_inicio, fecha_mesa_final, letra, id_colegio, descripcion from mesa 
    inner join colegio on mesa.id_mesa_colegio=colegio.id_colegio 
    inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion"