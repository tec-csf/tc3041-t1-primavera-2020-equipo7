--Creacion de el contenedor con la base de datos--

sudo docker run -itd --name mydb2 --privileged=true -p 50000:50000 -e LICENSE=accept -e DB2INST1_PASSWORD=password -e DBNAME=testdb ibmcom/db2 bash -v <path>:/database ibmcom/db2

-- ver cuando termine de crearse
sudo docker logs -f mydb2

--Conectandote a la base de datos--
sudo docker exec -ti mydb2 bash

su - db2inst1

CREATE TABLE eleccion(id_eleccion INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1), fecha_eleccion_inicio DATE NOT NULL, fecha_eleccion_final DATE NOT NULL, descripcion VARCHAR(30) NOT NULL, tipo VARCHAR(10) NOT NULL, sys_eleccion_inicio TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW BEGIN, sys_eleccion_final TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW END, trans_id_eleccion TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS TRANSACTION START ID, PERIOD SYSTEM_TIME(sys_eleccion_inicio, sys_eleccion_final), PERIOD BUSINESS_TIME(fecha_eleccion_inicio, fecha_eleccion_final), PRIMARY KEY (id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final))

CREATE TABLE hist_eleccion like eleccion

ALTER TABLE eleccion ADD VERSIONING USE HISTORY TABLE hist_eleccion

CREATE TABLE colegio(id_colegio INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1), fecha_colegio_inicio DATE NOT NULL, fecha_colegio_final DATE NOT NULL, direccion VARCHAR(100) NOT NULL, id_colegio_eleccion INT NOT NULL, sys_colegio_inicio TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW BEGIN, sys_colegio_final TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW END, trans_id_colegio TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS TRANSACTION START ID, PERIOD SYSTEM_TIME(sys_colegio_inicio, sys_colegio_final), PERIOD BUSINESS_TIME(fecha_colegio_inicio, fecha_colegio_final), PRIMARY KEY (id_colegio, fecha_colegio_inicio, fecha_colegio_final), FOREIGN KEY (id_colegio_eleccion, fecha_colegio_inicio, fecha_colegio_final) REFERENCES eleccion (id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final))

CREATE TABLE hist_colegio like colegio

ALTER TABLE colegio ADD VERSIONING USE HISTORY TABLE hist_colegio

CREATE TABLE mesa(id_mesa INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1), fecha_mesa_inicio DATE NOT NULL, fecha_mesa_final DATE NOT NULL, letra VARCHAR(1) NOT NULL, id_mesa_colegio INT NOT NULL, sys_mesa_inicio TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW BEGIN, sys_mesa_final TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW END, trans_id_mesa TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS TRANSACTION START ID, PERIOD SYSTEM_TIME(sys_mesa_inicio, sys_mesa_final), PERIOD BUSINESS_TIME(fecha_mesa_inicio, fecha_mesa_final), PRIMARY KEY (id_mesa, fecha_mesa_inicio, fecha_mesa_final), FOREIGN KEY (id_mesa_colegio, fecha_mesa_inicio, fecha_mesa_final) REFERENCES colegio (id_colegio, fecha_colegio_inicio, fecha_colegio_final))

CREATE TABLE hist_mesa like mesa

ALTER TABLE mesa ADD VERSIONING USE HISTORY TABLE hist_mesa

CREATE TABLE partido(siglas VARCHAR(10) NOT NULL, nombre VARCHAR(50) NOT NULL, presidente VARCHAR(50) NOT NULL, fecha_partido_inicio DATE NOT NULL, fecha_partido_final DATE NOT NULL, sys_partido_inicio TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW BEGIN, sys_partido_final TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW END, trans_id_partido TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS TRANSACTION START ID, PERIOD SYSTEM_TIME(sys_partido_inicio, sys_partido_final), PERIOD BUSINESS_TIME(fecha_partido_inicio, fecha_partido_final), PRIMARY KEY (siglas, fecha_partido_inicio, fecha_partido_final))

CREATE TABLE hist_partido like partido

ALTER TABLE partido ADD VERSIONING USE HISTORY TABLE hist_partido

CREATE TABLE v_federal(id_v_federal INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1), id_mesa INT NOT NULL, fecha_mesa_inicio DATE NOT NULL, fecha_mesa_final DATE NOT NULL, fecha_partido_inicio DATE NOT NULL, fecha_partido_final DATE NOT NULL, siglas VARCHAR(10) NOT NULL, tipo_voto INT, fecha_hora_voto TIMESTAMP(12) NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id_v_federal), FOREIGN KEY(id_mesa, fecha_mesa_inicio, fecha_mesa_final) REFERENCES mesa(id_mesa, fecha_mesa_inicio, fecha_mesa_final), FOREIGN KEY(siglas, fecha_partido_inicio, fecha_partido_final) REFERENCES partido(siglas, fecha_partido_inicio, fecha_partido_final))

CREATE TABLE v_municipal(id_v_municipal INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1), id_mesa INT NOT NULL, fecha_mesa_inicio DATE NOT NULL, fecha_mesa_final DATE NOT NULL, fecha_partido_inicio DATE NOT NULL, fecha_partido_final DATE NOT NULL, siglas VARCHAR(10) NOT NULL, tipo_voto INT, fecha_hora_voto TIMESTAMP(12) NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id_v_municipal), FOREIGN KEY(id_mesa, fecha_mesa_inicio, fecha_mesa_final) REFERENCES mesa(id_mesa, fecha_mesa_inicio, fecha_mesa_final), FOREIGN KEY(siglas, fecha_partido_inicio, fecha_partido_final) REFERENCES partido(siglas, fecha_partido_inicio, fecha_partido_final))

CREATE TABLE votante(ife_pasaporte VARCHAR(50) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(100) NOT NULL, nombre VARCHAR(100) NOT NULL, fecha_votante_inicio DATE NOT NULL, fecha_votante_final DATE NOT NULL, id_mesa INT NOT NULL, fecha_mesa_inicio DATE NOT NULL, fecha_mesa_final DATE NOT NULL, id_superior VARCHAR(50), fecha_superior_inicio DATE, fecha_superior_final DATE,  tipo INT NOT NULL, sys_votante_inicio TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW BEGIN, sys_votante_final TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW END, trans_id_votante TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS TRANSACTION START ID, PERIOD SYSTEM_TIME(sys_votante_inicio, sys_votante_final), PERIOD BUSINESS_TIME(fecha_votante_inicio, fecha_votante_final), PRIMARY KEY (ife_pasaporte, fecha_votante_inicio, fecha_votante_final), FOREIGN KEY(id_mesa, fecha_mesa_inicio, fecha_mesa_final) REFERENCES mesa (id_mesa, fecha_mesa_inicio, fecha_mesa_final), FOREIGN KEY (id_superior, fecha_superior_inicio, fecha_superior_final) REFERENCES votante (ife_pasaporte, fecha_votante_inicio, fecha_votante_final))

CREATE TABLE hist_votante like votante

ALTER TABLE votante ADD VERSIONING USE HISTORY TABLE hist_votante

CREATE TABLE apod_lista(ife_pasaporte VARCHAR(50) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(100) NOT NULL, nombre VARCHAR(100) NOT NULL, orden INT NOT NULL,fecha_apod_lista_inicio DATE NOT NULL, fecha_apod_lista_final DATE NOT NULL, siglas VARCHAR(10) NOT NULL, sys_apod_lista_inicio TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW BEGIN, sys_apod_lista_final TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS ROW END, trans_id_apod_lista TIMESTAMP(12) NOT NULL GENERATED ALWAYS AS TRANSACTION START ID, PERIOD SYSTEM_TIME(sys_apod_lista_inicio, sys_apod_lista_final), PERIOD BUSINESS_TIME(fecha_apod_lista_inicio, fecha_apod_lista_final), PRIMARY KEY(ife_pasaporte, fecha_apod_lista_inicio, fecha_apod_lista_final), FOREIGN KEY(siglas, fecha_apod_lista_inicio, fecha_apod_lista_final) REFERENCES partido (siglas, fecha_partido_inicio, fecha_partido_final))

CREATE TABLE hist_apod_lista like apod_lista

ALTER TABLE apod_lista ADD VERSIONING USE HISTORY TABLE hist_apod_lista



CREATE UNIQUE INDEX index_period_eleccion ON eleccion(id_eleccion, BUSINESS_TIME WITHOUT OVERLAPS)

CREATE UNIQUE INDEX index_period_colegio ON colegio(id_colegio, BUSINESS_TIME WITHOUT OVERLAPS)

CREATE UNIQUE INDEX index_period_mesa ON mesa(id_mesa, BUSINESS_TIME WITHOUT OVERLAPS)

CREATE UNIQUE INDEX index_period_partido ON partido(siglas, BUSINESS_TIME WITHOUT OVERLAPS)

CREATE UNIQUE INDEX index_period_votante ON votante(ife_pasaporte, BUSINESS_TIME WITHOUT OVERLAPS)

CREATE UNIQUE INDEX index_period_apod_lista ON apod_lista(ife_pasaporte, BUSINESS_TIME WITHOUT OVERLAPS)

--REFERENCIAS--
--https://www.idug.org/p/bl/et/blogaid=798—
--https://www.ibm.com/developerworks/data/library/techarticle/dm-1207db2temporalintegrity/dm-1207db2temporalintegrity-pdf.pdf—
--https://www.ibm.com/developerworks/data/library/techarticle/dm-1410temporal-tables-db2zos/--
--file:///C:/Users/HP/AppData/Local/Packages/Microsoft.MicrosoftEdge_8wekyb3d8bbwe/TempState/Downloads/tempfeaturessql2011.pdf—
--https://www.ibm.com/support/knowledgecenter/en/SSEPEK_11.0.0/admin/src/tpc/db2z_creatingbitempversioning.html—
