/*Script ejecución de operaciones UPDATE y DELETE en diferentes periodos de tiempo

Es importante mencionar que existe dependencia entre varias relaciones: eleccion, colegio, mesa, votante, v_municipal y v_federal. También existe dependencia de apod_lista con partido.
Por lo que, hay consideraciones a tomar al hacer operaciones UPDATE y DELETE en diferentes periodos de tiempo:
*las operaciones de borrado y actualización en periodos de tiempo distintos a los iniciales unicamente se pueden dar si no existen referencias a ellos en otras tablas y si no tienen llaves foráneas (dado que las llaves foráneas son la fecha inicial y la fecha final)
*por lo que, los borrados y actualizaciones en otros casos deben ocupar todo el tiempo inicial y final de su llave foránea
*unicamente se pueden alterar los atributos que no son llave por esa misma dependencia, por lo que los siguientes ejemplos las mencionarán.

En este script se utilizo el seleccionado de fechas excluyentes, en caso de querer usar incluyentes se debe cambiar la sintaxis a:
FOR PORTION OF BUSINESS_TIME BETWEEN 'año-mes-dia' AND 'año-mes-dia' 

Eleccion: puede alterarse la descripción. 

Se insertó la siguiente tupla*/
INSERT INTO eleccion (fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo) VALUES ('2030-04-02', '2030-04-08', 'Abril 2030', 'Federal');

/*(General)
UPDATE eleccion FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' TO 'año-mes-dia' SET descripcion = 'nueva descripcion' WHERE id_eleccion = id que se desea cambiar

DELETE eleccion FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' TO 'año-mes-dia' WHERE id_eleccion= id que se desea cambiar
*/
--Ejemplos:
UPDATE eleccion FOR PORTION OF BUSINESS_TIME FROM '2030-04-06' TO '2030-04-07' SET descripcion = 'Dia de descanso' WHERE id_eleccion=5; 

DELETE eleccion FOR PORTION OF BUSINESS_TIME FROM '2030-04-04' TO '2030-04-09' WHERE id_eleccion=7;

/*Colegio: puede alterarse la direccion
Se insertó la siguiente tupla*/
INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion) VALUES ('2022-06-01', '2022-06-11', 'Calle cool', 3);
/*(General)
UPDATE colegio FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' TO 'año-mes-dia' SET direccion='nueva direccion' WHERE id_colegio= id que se desea cambiar

DELETE colegio FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' TO 'año-mes-dia' WHERE id_colegio= id que se desea cambiar
*/
--Ejemplos
UPDATE colegio FOR PORTION OF BUSINESS_TIME FROM '2022-06-01' TO '2022-06-11' SET direccion='santa fe' WHERE id_colegio=11;

DELETE colegio FOR PORTION OF BUSINESS_TIME FROM '2022-06-01' TO '2022-06-12' WHERE id_colegio=11;

/*
Mesa: puede alterarse la letra
Se insertó 
*/

INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, letra, id_mesa_colegio) VALUES ('2025-04-02', '2025-04-08', 'W', 5);
/*(General)
UPDATE mesa FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' to 'año-mes-dia' SET letra = 'nueva letra' WHERE id_mesa= id que se desea cambiar

DELETE mesa FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' to 'año-mes-dia' WHERE id_mesa= id que se desea cambiar
*/
--Ejemplos:

UPDATE mesa FOR PORTION OF BUSINESS_TIME FROM '2025-04-01' to '2025-04-09' SET letra = 'X' WHERE id_mesa=26;

DELETE mesa FOR PORTION OF BUSINESS_TIME FROM '2025-04-01' to '2025-04-09' WHERE id_mesa=26;

/*
Votante: puede alterarse: fecha_nac, direccion, nombre y tipo (unicamente si no no tiene referencias a un superior)
A continuación se mostrará con el ejemplo de nombre:

Se insertó
*/
INSERT INTO votante (ife_pasaporte, fecha_nac, direccion, nombre, fecha_votante_inicio, fecha_votante_final, id_mesa, fecha_mesa_inicio, fecha_mesa_final, id_superior, fecha_superior_inicio, fecha_superior_final, tipo) VALUES ('Vnz9TF5j4wjy5s2qCD', '1920-06-24', 'Condesa 435 interior 3', 'Paulina Romero', '2016-05-02', '2026-05-02', 23, '2025-04-02', '2025-04-08', NULL, NULL, NULL, 0);

/*(General)
UPDATE votante FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' to 'año-mes-dia' SET nombre = 'nuevo nombre' WHERE ife_pasaporte= id que se desea cambiar

DELETE votante FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' to 'año-mes-dia' WHERE ife_pasaporte= id que se desea cambiar
*/
--Ejemplos:
UPDATE votante FOR PORTION OF BUSINESS_TIME FROM '2018-05-02' to '2022-05-02' SET nombre = 'Frida Romero' WHERE ife_pasaporte= 'Vnz9TF5j4wjy5s2qCD';

DELETE votante FOR PORTION OF BUSINESS_TIME FROM '2018-05-02' to '2022-05-02' WHERE ife_pasaporte= 'Vnz9TF5j4wjy5s2qCD';

/*
Tanto para v_municipal como para v_federal no se permitiran hacer UPDATES ni DELETES debido a reglas del negocio, no se debe permitir hacer cambios en los votos emitidos. 
*/

/*
Partido: se puede modificar nombre y presidente
Se hará el ejemplo con presidente
Se insertó
*/
INSERT INTO partido (siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final) VALUES ('PV', 'Partido verde', 'Emilio Soho', '1990-12-08', '2065-12-26');

/*(General):
UPDATE partido FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' to 'año-mes-dia' SET presidente = 'nuevo presidente' WHERE siglas= id que se desea cambiar

DELETE partido FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' to 'año-mes-dia' WHERE siglas= id que se desea cambiar
*/
--Ejemplos:
UPDATE partido FOR PORTION OF BUSINESS_TIME FROM '2000-11-23' to '2002-11-23' SET presidente = 'Francisco Leon' WHERE siglas= 'PV';

DELETE partido FOR PORTION OF BUSINESS_TIME FROM '2000-11-23' to '2002-11-23' WHERE siglas= 'PV';

/*
apod_lista: se puede modificar fecha_nac, direccion, nombre y orden
Se hará el ejemplo con orden
Se insertó
*/

INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('1FL8A5PXSPSF8NU5Q9', '1980-06-10', 'Boulevard de la Luz Escalante 596 Edif. 490 , Depto. 715', 'Juana Perez', 2, '1946-02-03', '2300-01-14', 'PAN');

/*(General):
UPDATE apod_lista FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' to 'año-mes-dia' SET orden = 'nuevo orden' WHERE ife_pasaporte= id que se desea cambiar

DELETE apod_lista FOR PORTION OF BUSINESS_TIME FROM 'año-mes-dia' to 'año-mes-dia' WHERE ife_pasaporte= id que se desea cambiar
*/

--Ejemplos:
UPDATE apod_lista FOR PORTION OF BUSINESS_TIME FROM '1946-02-02' to '2300-01-15' SET orden = 1 WHERE ife_pasaporte= '1FL8A5PXSPSF8NU5Q9';

DELETE apod_lista FOR PORTION OF BUSINESS_TIME FROM '1946-02-02' to '2300-01-15' WHERE ife_pasaporte= '1FL8A5PXSPSF8NU5Q9';








