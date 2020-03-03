###########################################################################
# INSERT DE ELECCIONES
###########################################################################
def insert_eleccion(id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final):
    insert_command = "INSERT INTO eleccion (id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final) VALUES ({}, '{}', '{}')".format(id_eleccion,
                                                                                                                                    fecha_eleccion_inicio,
                                                                                                                                    fecha_eleccion_final)
    cur = db.connection.cursor()
    cur.execute(insert_command)

@app.route('/insert/elecciones/')
def insert_elecciones():

    elecciones_ids = [1, 2, 3]
                              # Anio-Mes-Dia
    fechas_elecciones_inicio = ["2015-06-01", "2018-05-07", "2022-06-01"]
    fechas_elecciones_final =  ["2015-06-11", "2018-05-17", "2022-06-11"]

    vec_fechas_inicio_fin = list(zip(elecciones_ids, fechas_elecciones_inicio, fechas_elecciones_final))

    for tupla_fecha in vec_fechas_inicio_fin:
        id_eleccion = tupla_fecha[0]
        fecha_eleccion_inicio = tupla_fecha[1]
        fecha_eleccion_final = tupla_fecha[2]
        insert_eleccion(id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final)

    return redirect("http://127.0.0.1:5000/")

###########################################################################
# INSERT DE CLEGIOS
###########################################################################
def insert_colegio(id_colegio, id_eleccion, fecha_colegio_inicio, fecha_colegio_final):
    insert_command = "INSERT INTO colegio (id_colegio, id_eleccion fecha_eleccion_inicio, fecha_eleccion_final) VALUES ({}, '{}', '{}', '{}')".format(id_colegio,
                                                                                                                                                id_eleccion,
                                                                                                                                                fecha_colegio_inicio,
                                                                                                                                                fecha_colegio_final)
    cur = db.connection.cursor()
    cur.execute(insert_command)

@app.route('/insert/colegios/')
def insert_colegios():

    colegios_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    elecciones_ids = [1, 2, 1, 3, 3, 2, 3, 1, 2, 1]
                            # Anio-Mes-Dia
    #  elecciones_ids:              1,          2,              1,             3,           3,             2,           3,          1,              2,          1
    fechas_colegios_inicio = ["2015-06-01", "2018-05-07", "2015-06-02", "2022-06-05", "2022-06-02", "2018-05-07", "2022-06-01", "2015-06-04", "2018-05-10", "2015-06-09"]
    fechas_colegios_final =  ["2015-06-06", "2018-05-09", "2015-05-04", "2022-06-11", "2022-06-07", "2018-05-17", "2022-06-09", "2015-06-09", "2018-05-14", "2015-05-11"]

    vec_fechas_inicio_fin = list(zip(colegios_ids, elecciones_ids, fechas_colegios_inicio, fechas_colegios_final))

    for tupla_fecha in vec_fechas_inicio_fin:
        id_colegio = tupla_fecha[0]
        id_eleccion = tupla_fecha[1]
        fecha_colegio_inicio = tupla_fecha[2]
        fecha_colegio_final = tupla_fecha[3]
        insert_colegios(id_colegio, id_eleccion, fecha_colegio_inicio, fecha_colegio_final)

    return redirect("http://127.0.0.1:5000/")
