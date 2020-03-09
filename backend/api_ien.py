#API using flask and a db2 connection
"""
Equipo 7:
Roberto Gervacio
Alejandra Nissan
Isaac Harari
Yann Le Lorier
"""
from flask import Flask, jsonify, redirect, request, url_for, make_response #request handler, getting url in a function
from flask_db2 import DB2
import locale, time
from flask_cors import CORS #pip3 install flask-cors
from datetime import timedelta, datetime

app = Flask(__name__)
CORS(app)
#CORS(app, resources={r"/*": {"origins": "*"}})


app.config['DB2_DATABASE']='testdb'
app.config['DB2_HOSTNAME']='localhost'
app.config['DB2_PORT']='50000'
app.config['DB2_PROTOCOL']='TCPIP'
app.config['DB2_USER']='db2inst1'
app.config['DB2_PASSWORD']='password'

db = DB2(app)

class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

################################################# FUNCTIONS ######################################################

################################################################
#                       ELECCION
################################################################
@app.route('/elecciones/', methods=['GET', 'POST'])
def all_eleccion():
    cur = db.connection.cursor()

    if request.method == 'POST':
        dict_new_eleccion = request.get_json()

        fecha_eleccion_inicio = dict_new_eleccion['fecha_inicio'][:10]
        fecha_eleccion_final = dict_new_eleccion['fecha_fin'][:10]
        descripcion = dict_new_eleccion['descripcion']
        tipo = "Municipal" if dict_new_eleccion['tipo_elecciones'] == 'm' else "Federal"

        insert_command = "INSERT INTO eleccion (fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo) VALUES ('{}', '{}', '{}', '{}')".format(fecha_eleccion_inicio,
                                                                                                                                                        fecha_eleccion_final,
                                                                                                                                                        descripcion,
                                                                                                                                                        tipo)
        try:
            cur.execute(insert_command)
            res = make_response(jsonify({"message": "Collection created"}), 201)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        cur.close()
        return res

    else:
        show_command = "SELECT id_eleccion, descripcion, tipo, fecha_eleccion_inicio, fecha_eleccion_final FROM ELECCION"
        cur.execute(show_command)
        elecciones = cur.fetchall()
        elecciones_list = []

        for eleccion in elecciones:
            elecciones_list.append(
                {"id": eleccion[0],
                    "descripcion": eleccion[1],
                    "tipo": eleccion[2],
                    "fecha_inicio": eleccion[3],
                    "fecha_final": eleccion[4]
                }
            )
        cur.close()
        return jsonify(elecciones_list)

@app.route('/elecciones/<int:id_eleccion>/', methods=['GET', 'POST', 'DELETE'])
def one_eleccion(id_eleccion):
    cur = db.connection.cursor()

    if request.method == 'POST':
        dict_new_eleccion = request.get_json()

        descripcion = dict_new_eleccion['descripcion']

        update_command = "UPDATE eleccion SET descripcion='{}' WHERE id_eleccion = {}".format(descripcion,
                                                                                                    id_eleccion)
        try:
            cur.execute(update_command)
            res = make_response(jsonify({"message": "Collection updated"}), 200)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        cur.close()
        return res

    elif request.method == 'DELETE':
        delete_command = "DELETE FROM eleccion WHERE id_eleccion={}".format(id_eleccion)

        try:
            cur.execute(delete_command)
            res = make_response(jsonify({}), 204)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        cur.close()
        return res

    else: # method == GET
        elecciones_list = []
        show_command = "SELECT id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo, sys_eleccion_inicio, sys_eleccion_final, trans_id_eleccion FROM ELECCION WHERE id_eleccion={}".format(id_eleccion)
        show_command_hist = "SELECT id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo, sys_eleccion_inicio, sys_eleccion_final, trans_id_eleccion FROM hist_eleccion WHERE id_eleccion={}".format(id_eleccion)
        cur.execute(show_command)
        elecciones = cur.fetchall()

        for eleccion in elecciones:
            elecciones_list.append(
                {
                "id": eleccion[0],
                "fecha_inicio": eleccion[1],
                "fecha_final": eleccion[2],
                "descripcion": eleccion[3],
                "tipo": eleccion[4],
                "sys_inicio": eleccion[5],
                "sys_final": eleccion[6],
                "trans_id": eleccion[7]
                }
            )

        cur.execute(show_command_hist)
        elecciones_hist = cur.fetchall()

        for i in range(len(elecciones_hist)-1,-1,-1):
            elecciones_list.append(
                {"id": elecciones_hist[i][0],
                "fecha_inicio": elecciones_hist[i][1],
                "fecha_final": elecciones_hist[i][2],
                "descripcion": elecciones_hist[i][3],
                "tipo": elecciones_hist[i][4],
                "sys_inicio": elecciones_hist[i][5],
                "sys_final": elecciones_hist[i][6],
                "trans_id": elecciones_hist[i][7]
                }
            )

    cur.close()
    return jsonify(elecciones_list)


################################################################
#                       COLEGIO
################################################################
@app.route('/colegios/', methods=["GET", "POST"])
def all_colegio():
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_colegio = request.get_json()

        direccion = dict_new_colegio['direccion']
        id_eleccion = dict_new_colegio['id_eleccion']

        get_eleccion_of_colegio_command = "SELECT fecha_eleccion_inicio, fecha_eleccion_final FROM ELECCION WHERE id_eleccion={}".format(id_eleccion)

        cur.execute(get_eleccion_of_colegio_command)
        eleccion = cur.fetchall()[0]

        fecha_colegio_inicio = eleccion[0]
        fecha_colegio_final = eleccion[1]

        insert_command = "INSERT INTO colegio (fecha_colegio_inicio, fecha_colegio_final, id_colegio_eleccion, direccion) VALUES ('{}', '{}', {}, '{}');".format(fecha_colegio_inicio,
                                                                                                                                                        fecha_colegio_final,
                                                                                                                                                        id_eleccion,
                                                                                                                                                        direccion)

        try:
            cur.execute(insert_command)
            res = make_response(jsonify({"message": "Collection created"}), 201)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        cur.close()
        return res

    else:
        select_colegios_command = "SELECT id_colegio, fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion FROM COLEGIO"
        cur.execute(select_colegios_command)
        colegios = cur.fetchall()
        colegios_list = []

        for colegio in colegios:
            id_colegio_eleccion = colegio[4]
            get_eleccion_of_colegio_command = "SELECT descripcion FROM ELECCION WHERE id_eleccion={}".format(id_colegio_eleccion)
            cur.execute(get_eleccion_of_colegio_command)
            eleccion = cur.fetchall()[0]

            colegios_list.append(
                {
                  "id": colegio[0],
                  "fecha_inicio": colegio[1],
                  "fecha_final": colegio[2],
                  "direccion": colegio[3],
                  "descripcion_eleccion": eleccion[0],
                  "id_eleccion": id_colegio_eleccion,
                    #                [primera tupla] [primer elemento]
                }
            )

        cur.close()
        return jsonify(colegios_list)

@app.route('/colegios/<int:id_colegio>/', methods=['GET', 'POST', 'DELETE'])
def one_colegio(id_colegio):
    cur = db.connection.cursor()

    if request.method == 'POST':
        # Agarras lo que te pasan del front
        dict_new_colegio = request.get_json()
        direccion = dict_new_colegio['direccion']
        id_eleccion = dict_new_colegio['id_eleccion']

        # Agarras la eleccion
        get_eleccion_of_colegio_command = "SELECT fecha_eleccion_inicio, fecha_eleccion_final FROM ELECCION WHERE id_eleccion={}".format(id_eleccion)
        cur.execute(get_eleccion_of_colegio_command)
        eleccion = cur.fetchall()[0]
        # Obtienes las nuevas (no a la fuerza deben de ser nuevas, pueden ser las mismas) fechas
        fecha_colegio_inicio = eleccion[0]
        fecha_colegio_final = eleccion[1]

        update_command = "UPDATE colegio SET fecha_colegio_inicio='{}', fecha_colegio_final='{}', id_colegio_eleccion={}, direccion='{}' WHERE id_colegio = {}".format(fecha_colegio_inicio,
                                                                                                                                                                    fecha_colegio_final,
                                                                                                                                                                    id_eleccion,
                                                                                                                                                                    direccion,
                                                                                                                                                                    id_colegio)

        try:
            cur.execute(update_command)
            res = make_response(jsonify({"message": "Collection updated"}), 200)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        cur.close()
        return res

    elif request.method == 'DELETE':
        delete_command = "DELETE FROM colegio WHERE id_colegio = {}".format(id_colegio)

        try:
            cur.execute(delete_command)
            res = make_response(jsonify({}), 204)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        cur.close()
        return res

    else:
        colegios_list = []
        show_command = "SELECT id_colegio, fecha_colegio_inicio, fecha_colegio_final, id_colegio_eleccion, direccion, sys_colegio_inicio, sys_colegio_final, trans_id_colegio FROM colegio WHERE id_colegio={}".format(id_colegio)
        show_command_hist = "SELECT id_colegio, fecha_colegio_inicio, fecha_colegio_final, id_colegio_eleccion, direccion, sys_colegio_inicio, sys_colegio_final, trans_id_colegio FROM hist_colegio WHERE id_colegio={}".format(id_colegio)
        cur.execute(show_command)
        colegios = cur.fetchall()

        for colegio in colegios:
            id_colegio_eleccion = colegio[3]
            get_eleccion_of_colegio_command = "SELECT descripcion FROM ELECCION WHERE id_eleccion={}".format(id_colegio_eleccion)
            cur.execute(get_eleccion_of_colegio_command)
            eleccion = cur.fetchall()[0]

            colegios_list.append(
                {"id": colegio[0],
                    "fecha_inicio": colegio[1],
                    "fecha_final": colegio[2],
                    "direccion": colegio[4],
                    "sys_inicio": colegio[5],
                    "sys_final": colegio[6],
                    "trans_id": colegio[7],

                    "id_eleccion": id_colegio_eleccion,
                    "descripcion_eleccion": eleccion[0]
                }
            )

        cur.execute(show_command_hist)
        colegios_hist = cur.fetchall()

        for i in range(len(colegios_hist)-1,-1,-1):
            id_colegio_eleccion = colegios_hist[i][3]

            get_eleccion_of_colegio_command = "SELECT descripcion FROM ELECCION WHERE id_eleccion={}".format(id_colegio_eleccion)
            cur.execute(get_eleccion_of_colegio_command)
            eleccion = cur.fetchall()[0]

            colegios_list.append(
                {"id": colegios_hist[i][0],
                    "fecha_inicio": colegios_hist[i][1],
                    "fecha_final": colegios_hist[i][2],
                    "direccion": colegios_hist[i][4],
                    "sys_inicio": colegios_hist[i][5],
                    "sys_final": colegios_hist[i][6],
                    "trans_id": colegios_hist[i][7],

                    "id_eleccion": id_colegio_eleccion,
                    "descripcion_eleccion": eleccion[0]
                }
            )

    return jsonify(colegios_list)


################################################################
#                       MESA
################################################################
@app.route('/mesas/', methods=['GET', 'POST'])
def all_mesas():
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_colegio = request.get_json()

        letra = dict_new_colegio['letra']
        id_colegio = dict_new_colegio['id_colegio']

        get_colegio_of_mesa_command = "SELECT fecha_colegio_inicio, fecha_colegio_final FROM colegio WHERE id_colegio={}".format(id_colegio)

        cur.execute(get_colegio_of_mesa_command)
        colegio = cur.fetchall()[0]

        fecha_mesa_inicio = colegio[0]
        fecha_mesa_final = colegio[1]

        insert_command = "INSERT INTO mesa (fecha_mesa_inicio, fecha_mesa_final, id_mesa_colegio, letra) VALUES ('{}', '{}', {}, '{}');".format(fecha_mesa_inicio,
                                                                                                                                            fecha_mesa_final,
                                                                                                                                            id_colegio,
                                                                                                                                            letra)

        try:
            cur.execute(insert_command)
            res = make_response(jsonify({"message": "Collection created"}), 201)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    else:
        show_command = "select id_mesa, fecha_mesa_inicio, fecha_mesa_final, letra, id_colegio, descripcion from mesa inner join colegio on mesa.id_mesa_colegio=colegio.id_colegio inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion"
        cur.execute(show_command)
        mesas = cur.fetchall()

        mesas_list = []

        for mesa in mesas:
            mesas_list.append(
                {"id": mesa[0],
                    "fecha_inicio": mesa[1],
                    "fecha_final": mesa[2],
                    "letra": mesa[3],
                    "id_colegio": mesa[4],
                    "descripcion_eleccion": mesa[5]
                }
            )

        return jsonify(mesas_list)

@app.route('/mesas/<int:id_mesa>/', methods=['GET', 'POST', 'DELETE'])
def one_mesa(id_mesa):
    cur = db.connection.cursor()
    if request.method == 'POST':
        # Agarras lo que te pasan del front
        dict_new_mesa = request.get_json()
        letra = dict_new_mesa['letra']
        id_colegio = dict_new_mesa['id_colegio']

        # Agarras el colegio
        get_colegio_of_mesa_command = "SELECT fecha_colegio_inicio, fecha_colegio_final FROM colegio WHERE id_colegio={}".format(id_colegio)
        cur.execute(get_colegio_of_mesa_command)
        colegio = cur.fetchall()[0]
        # Obtienes las nuevas (no a la fuerza deben de ser nuevas, pueden ser las mismas) fechas
        fecha_mesa_inicio = colegio[0]
        fecha_mesa_final = colegio[1]

        update_command = "UPDATE mesa SET fecha_mesa_inicio='{}', fecha_mesa_final='{}', id_mesa_colegio='{}', letra='{}' WHERE id_mesa = '{}'".format(fecha_mesa_inicio,
                                                                                                                                                fecha_mesa_final,
                                                                                                                                                id_colegio,
                                                                                                                                                letra,
                                                                                                                                                id_mesa)

        try:
            cur.execute(update_command)
            res = make_response(jsonify({"message": "Collection updated"}), 200)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    elif request.method == 'DELETE':

        delete_command = "DELETE FROM mesa WHERE id_mesa = {}".format(id_mesa)

        try:
            cur.execute(delete_command)
            res = make_response(jsonify({}), 204)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    else:
        mesas_list = []

        show_command = "select id_mesa, letra, fecha_mesa_inicio, fecha_mesa_final, sys_mesa_inicio, sys_mesa_final, trans_id_mesa, id_colegio, descripcion, id_eleccion from mesa inner join colegio on mesa.id_mesa_colegio=colegio.id_colegio inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion where mesa.id_mesa={}".format(id_mesa)
        show_command_hist = "select id_mesa, letra, fecha_mesa_inicio, fecha_mesa_final, sys_mesa_inicio, sys_mesa_final, trans_id_mesa, id_colegio, descripcion, id_eleccion from hist_mesa inner join colegio on hist_mesa.id_mesa_colegio=colegio.id_colegio inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion where hist_mesa.id_mesa={}".format(id_mesa)
        cur.execute(show_command)
        mesas = cur.fetchall()

        for mesa in mesas:
            mesas_list.append(
                {"id": mesa[0],
                    "letra": mesa[1],
                    "fecha_inicio": mesa[2],
                    "fecha_final": mesa[3],
                    "sys_inicio": mesa[4],
                    "sys_final": mesa[5],
                    "trans_id": mesa[6],
                    "id_colegio": mesa[7],
                    "descripcion_eleccion": mesa[8],
                    "id_eleccion": mesa[9]
                }
            )

        cur.execute(show_command_hist)
        mesas_hist = cur.fetchall()

        for i in range( len(mesas_hist)-1 ,-1,-1):
            mesas_list.append(
                {"id": mesas_hist[i][0],
                    "letra": mesas_hist[i][1],
                    "fecha_inicio": mesas_hist[i][2],
                    "fecha_final": mesas_hist[i][3],
                    "sys_inicio": mesas_hist[i][4],
                    "sys_final": mesas_hist[i][5],
                    "trans_id": mesas_hist[i][6],
                    "id_colegio": mesas_hist[i][7],
                    "descripcion_eleccion": mesas_hist[i][8],
                    "id_eleccion": mesas_hist[i][9]
                }
            )

        return jsonify(mesas_list)


################################################################
#                       PARTIDO
################################################################
@app.route('/partidos/', methods=["GET", "POST"])
def all_partido():
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_partido = request.get_json()

        siglas = dict_new_partido['siglas']
        nombre = dict_new_partido['nombre']
        presidente = dict_new_partido['presidente']
        fecha_inicio = dict_new_partido['fecha_inicio'][:10]
        # Se calcula la fecha final = fecha inicio + 6 anios
        fecha_final = datetime.strptime(fecha_inicio, '%Y-%m-%d') + timedelta(weeks=52*6)
        fecha_final = fecha_final.strftime('%Y-%m-%d')[:10]

        insert_command = "INSERT INTO PARTIDO (siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final) VALUES  ('{}', '{}', '{}', '{}', '{}');".format(siglas,
                                                                                                                                                                    nombre,
                                                                                                                                                                    presidente,
                                                                                                                                                                    fecha_inicio,
                                                                                                                                                                    fecha_final)
        try:
            cur.execute(insert_command)
            res = make_response(jsonify({"message": "Collection created"}), 201)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    else:
        show_command = "SELECT siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final FROM PARTIDO"
        cur.execute(show_command)
        partidos = cur.fetchall()

        partidos_list = []

        for partido in partidos:
            partidos_list.append(
                {"siglas": partido[0],
                    "nombre": partido[1],
                    "presidente": partido[2],
                    "fecha_inicio": partido[3],
                    "fecha_final": partido[4],
                }
            )

        return jsonify(partidos_list)

@app.route('/partidos/<siglas>/', methods=['GET', 'POST', 'DELETE'])
def one_partido(siglas):
    cur = db.connection.cursor()
    if request.method == 'POST':
        # Agarras lo que te pasan del front
        dict_new_partido = request.get_json()
        new_siglas = dict_new_partido['siglas']
        nombre = dict_new_partido['nombre']
        presidente = dict_new_partido['presidente']
        fecha_ini = dict_new_partido['fecha_inicio'][:10]
        fecha_inicio = datetime.strptime(fecha_ini, '%Y-%m-%d')
        

        update_command = "UPDATE partido SET siglas='{}', nombre='{}', presidente='{}' WHERE siglas='{}' AND fecha_partido_inicio='{}'".format(new_siglas,
                                                                                                            nombre,
                                                                                                            presidente,
                                                                                                            siglas,
                                                                                                            fecha_inicio
                                                                                                            )

        try:
            cur.execute(update_command)
            res = make_response(jsonify({"message": "Collection updated"}), 200)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    elif request.method == 'DELETE':
        delete_command = "DELETE FROM partido WHERE siglas='{}'".format(siglas)

        try:
            cur.execute(delete_command)
            res = make_response(jsonify({}), 204)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    else:
        partidos_list = []

        show_command = "SELECT siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final, sys_partido_inicio, sys_partido_final, trans_id_partido from partido where siglas='{}'".format(siglas)
        show_command_hist = "SELECT siglas, nombre, presidente, fecha_partido_inicio, fecha_partido_final, sys_partido_inicio, sys_partido_final, trans_id_partido from hist_partido where siglas='{}'".format(siglas)

        cur.execute(show_command)
        partidos = cur.fetchall()

        for partido in partidos:
            partidos_list.append(
                {"siglas": partido[0],
                    "nombre": partido[1],
                    "presidente": partido[2],
                    "fecha_inicio": partido[3],
                    "fecha_final": partido[4],
                    "sys_inicio": partido[5],
                    "sys_final": partido[6],
                    "trans_id": partido[7],
                }
            )

        cur.execute(show_command_hist)
        partidos_hist = cur.fetchall()

        for i in range( len(partidos_hist)-1 ,-1,-1):
            partidos_list.append(
                {"siglas": partidos_hist[i][0],
                    "nombre": partidos_hist[i][1],
                    "presidente": partidos_hist[i][2],
                    "fecha_inicio": partidos_hist[i][3],
                    "fecha_final": partidos_hist[i][4],
                    "sys_inicio": partidos_hist[i][5],
                    "sys_final": partidos_hist[i][6],
                    "trans_id": partidos_hist[i][7],
                }
            )

        return jsonify(partidos_list)


################################################################
#                     APODERADOS LISTA
################################################################
@app.route('/apoderados/', methods=['GET', 'POST'])
def all_apod_lista():
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_apoderado = request.get_json()
        ife_pas = dict_new_apoderado['id']
        fecha_nac = dict_new_apoderado['fecha_nac'][:10]
        direccion = dict_new_apoderado['direccion']
        nombre = dict_new_apoderado['nombre']
        orden = dict_new_apoderado['orden']
        siglas = dict_new_apoderado['siglas']

        get_partido = "SELECT fecha_partido_inicio, fecha_partido_final FROM PARTIDO WHERE siglas='{}'".format(siglas)
        cur.execute(get_partido)
        partido = cur.fetchall()[0]
        fecha_partido_inicio = partido[0]
        fecha_partido_final = partido[1]

        insert_command = "INSERT INTO apod_lista (ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}')".format(ife_pas,
                                                                                                                                                                                                                    fecha_nac,
                                                                                                                                                                                                                    direccion,
                                                                                                                                                                                                                    nombre,
                                                                                                                                                                                                                    orden,
                                                                                                                                                                                                                    fecha_partido_inicio,
                                                                                                                                                                                                                    fecha_partido_final,
                                                                                                                                                                                                                    siglas)
        try:
            cur.execute(insert_command)
            res = make_response(jsonify({"message": "Collection created"}), 201)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)
        return res

    else:
        show_command = "SELECT ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas FROM APOD_LISTA"
        cur.execute(show_command)
        apoderados = cur.fetchall()
        apoderados_list = []

        for apod in apoderados:
            apoderados_list.append(
                {"id": apod[0],
                    "fecha_nac": apod[1],
                    "direccion": apod[2],
                    "nombre": apod[3],
                    "orden": apod[4],
                    "fecha_inicio": apod[5],
                    "fecha_final": apod[6],
                    "siglas": apod[7],
                }
            )
        return jsonify(apoderados_list)


@app.route('/apoderados/<ife_pasaporte>/', methods=['GET', 'POST', 'DELETE'])
def one_apod_lista(ife_pasaporte):
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_apod = request.get_json()

        new_ife_pas = dict_new_apod['id']
        fecha_nac = dict_new_apod['fecha_nac'][:10]
        direccion = dict_new_apod['direccion']
        nombre = dict_new_apod['nombre']
        orden = dict_new_apod['orden']
        siglas = dict_new_apod['siglas']

        get_partido = "SELECT fecha_partido_inicio, fecha_partido_final FROM PARTIDO WHERE siglas='{}'".format(siglas)
        cur.execute(get_partido)
        partido = cur.fetchall()[0]
        fecha_apod_lista_inicio = partido[0]
        fecha_apod_lista_final = partido[1]

        update_command = "UPDATE apod_lista SET ife_pasaporte='{}', fecha_nac='{}', direccion='{}', nombre='{}', orden={}, fecha_apod_lista_inicio='{}', fecha_apod_lista_final='{}', siglas='{}' WHERE ife_pasaporte='{}'".format(new_ife_pas,
                                                                                                                                                                                                                            fecha_nac,
                                                                                                                                                                                                                            direccion,
                                                                                                                                                                                                                            nombre,
                                                                                                                                                                                                                            orden,
                                                                                                                                                                                                                            fecha_apod_lista_inicio,
                                                                                                                                                                                                                            fecha_apod_lista_final,
                                                                                                                                                                                                                            siglas,
                                                                                                                                                                                                                            ife_pasaporte)

        try:
            cur.execute(update_command)
            res = make_response(jsonify({"message": "Collection updated"}), 200)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    elif request.method == 'DELETE':
        delete_command = "DELETE FROM apod_lista WHERE ife_pasaporte='{}'".format(ife_pasaporte)

        try:
            cur.execute(delete_command)
            res = make_response(jsonify({}), 204)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    else:
        apoderados_list = []

        show_command = "SELECT ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas, sys_apod_lista_inicio, sys_apod_lista_final, trans_id_apod_lista FROM APOD_LISTA where ife_pasaporte='{}'".format(ife_pasaporte)
        show_command_hist = "SELECT ife_pasaporte, fecha_nac, direccion, nombre, orden, fecha_apod_lista_inicio, fecha_apod_lista_final, siglas, sys_apod_lista_inicio, sys_apod_lista_final, trans_id_apod_lista FROM HIST_APOD_LISTA where ife_pasaporte='{}'".format(ife_pasaporte)

        cur.execute(show_command)
        apoderados = cur.fetchall()

        for apoderado in apoderados:
            apoderados_list.append(
                {"id": apoderado[0],
                    "fecha_nac": apoderado[1],
                    "direccion": apoderado[2],
                    "nombre": apoderado[3],
                    "orden": apoderado[4],
                    "fecha_inicio": apoderado[5],
                    "fecha_final": apoderado[6],
                    "siglas": apoderado[7],
                    "sys_inicio": apoderado[8],
                    "sys_final": apoderado[9],
                    "trans_id": apoderado[10],
                }
            )

        cur.execute(show_command_hist)
        apoderados_hist = cur.fetchall()

        for i in range( len(apoderados_hist)-1 ,-1,-1):
            apoderados_list.append(
                {"id": apoderados_hist[i][0],
                    "fecha_nac": apoderados_hist[i][1],
                    "direccion": apoderados_hist[i][2],
                    "nombre": apoderados_hist[i][3],
                    "orden": apoderados_hist[i][4],
                    "fecha_inicio": apoderados_hist[i][5],
                    "fecha_final": apoderados_hist[i][6],
                    "siglas": apoderados_hist[i][7],
                    "sys_inicio": apoderados_hist[i][8],
                    "sys_final": apoderados_hist[i][9],
                    "trans_id": apoderados_hist[i][10],
                }
            )

        return jsonify(apoderados_list)


################################################################
#                     VOTOS FEDERALES
################################################################
@app.route('/votosfederales/', methods=["GET","POST"])
def all_votosF():
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_voto_f = request.get_json()

        id_mesa = dict_new_voto_f['id_mesa']
        siglas = dict_new_voto_f['siglas']
        tipo_voto = dict_new_voto_f['tipo_voto']

        get_mesa = "SELECT fecha_mesa_inicio, fecha_mesa_final FROM MESA WHERE id_mesa={}".format(id_mesa)
        cur.execute(get_mesa)
        mesa = cur.fetchall()[0]
        fecha_mesa_inicio = mesa[0]
        fecha_mesa_final = mesa[1]

        get_partido = "SELECT fecha_partido_inicio, fecha_partido_final FROM PARTIDO WHERE siglas='{}'".format(siglas)
        cur.execute(get_partido)
        partido = cur.fetchall()[0]
        fecha_partido_inicio = partido[0]
        fecha_partido_final = partido[1]

        insert_command = "INSERT INTO v_federal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES ({}, '{}', '{}', '{}', '{}', '{}', {});".format(id_mesa,
                                                                                                                                                                                                                fecha_mesa_inicio,
                                                                                                                                                                                                                fecha_mesa_final,
                                                                                                                                                                                                                fecha_partido_inicio,
                                                                                                                                                                                                                fecha_partido_final,
                                                                                                                                                                                                                siglas,
                                                                                                                                                                                                                tipo_voto)
        try:
            cur.execute(insert_command)
            res = make_response(jsonify({"message": "Collection created"}), 201)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res
    else:
        cur = db.connection.cursor()
        show_command = "select id_v_federal, tipo_voto, fecha_hora_voto, letra, id_colegio, descripcion, v_federal.siglas from v_federal inner join mesa on v_federal.id_mesa=mesa.id_mesa inner join colegio on mesa.id_mesa_colegio=colegio.id_colegio inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion inner join partido on v_federal.siglas=partido.siglas"
        cur.execute(show_command)
        v_federales = cur.fetchall()
        v_federales_list = []

        for voto in v_federales:
            v_federales_list.append(
                {"id": voto[0],
                    "tipo_voto": voto[1],
                    "fecha_hora_voto": voto[2],
                    "letra": voto[3],
                    "id_colegio": voto[4],
                    "descripcion": voto[5],
                    "siglas": voto[6],
                }
            )
        return jsonify(v_federales_list)


################################################################
#                     VOTOS MUNICIPALES
################################################################
@app.route('/votosmunicipales/', methods=["GET","POST"])
def all_votosM():
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_voto_m = request.get_json()

        id_mesa = dict_new_voto_m['id_mesa']
        siglas = dict_new_voto_m['siglas']
        tipo_voto = dict_new_voto_m['tipo_voto']

        get_mesa = "SELECT fecha_mesa_inicio, fecha_mesa_final FROM MESA WHERE id_mesa={}".format(id_mesa)
        cur.execute(get_mesa)
        mesa = cur.fetchall()[0]
        fecha_mesa_inicio = mesa[0]
        fecha_mesa_final = mesa[1]

        get_partido = "SELECT fecha_partido_inicio, fecha_partido_final FROM PARTIDO WHERE siglas='{}'".format(siglas)
        cur.execute(get_partido)
        partido = cur.fetchall()[0]
        fecha_partido_inicio = partido[0]
        fecha_partido_final = partido[1]

        insert_command = "INSERT INTO v_municipal (id_mesa, fecha_mesa_inicio, fecha_mesa_final, fecha_partido_inicio, fecha_partido_final, siglas, tipo_voto) VALUES ({}, '{}', '{}', '{}', '{}', '{}', {});".format(id_mesa,
                                                                                                                                                                                                                fecha_mesa_inicio,
                                                                                                                                                                                                                fecha_mesa_final,
                                                                                                                                                                                                                fecha_partido_inicio,
                                                                                                                                                                                                                fecha_partido_final,
                                                                                                                                                                                                                siglas,
                                                                                                                                                                                                                tipo_voto)
        try:
            cur.execute(insert_command)
            res = make_response(jsonify({"message": "Collection created"}), 201)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res
    else:
        cur = db.connection.cursor()
        show_command = "select id_v_municipal, tipo_voto, fecha_hora_voto, letra, id_colegio, descripcion, v_municipal.siglas from v_municipal inner join mesa on v_municipal.id_mesa=mesa.id_mesa inner join colegio on mesa.id_mesa_colegio=colegio.id_colegio inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion inner join partido on v_municipal.siglas=partido.siglas"
        cur.execute(show_command)
        v_federales = cur.fetchall()
        v_federales_list = []

        for voto in v_federales:
            v_federales_list.append(
                {"id": voto[0],
                    "tipo_voto": voto[1],
                    "fecha_hora_voto": voto[2],
                    "letra": voto[3],
                    "id_colegio": voto[4],
                    "descripcion": voto[5],
                    "siglas": voto[6],
                }
            )
        return jsonify(v_federales_list)

################################################################
#                     VOTANTE (NO_MEX, MEX)
################################################################
@app.route('/votantes/', methods=["GET", "POST"])
def all_votante():
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_votante = request.get_json()
        ife_pas = dict_new_votante['id']
        fecha_nac = dict_new_votante['fecha_nac'][:10]
        direccion = dict_new_votante['direccion']
        nombre = dict_new_votante['nombre']
        fecha_inicio_votante = dict_new_votante['fecha_inicio'][:10]
        # fecha_final_votante = dict_new_votante['fecha_final'][:10]
        fecha_final = datetime.strptime(fecha_inicio_votante, '%Y-%m-%d') + timedelta(weeks=52*10)
        fecha_final_votante = fecha_final.strftime('%Y-%m-%d')[:10]
        tipo = dict_new_votante['es_extranjero']
        print(tipo)
        es_extranjero = 0 if tipo else 1
        print(es_extranjero)
        id_mesa = dict_new_votante['id_mesa']

        get_mesa = "SELECT fecha_mesa_inicio, fecha_mesa_final FROM MESA WHERE MESA.id_mesa='{}'".format(id_mesa)
        cur.execute(get_mesa)
        mesa = cur.fetchall()[0]
        fecha_mesa_inicio = mesa[0]
        fecha_mesa_final = mesa[1]

        insert_command = "INSERT INTO VOTANTE (ife_pasaporte, fecha_nac, direccion, nombre, fecha_votante_inicio, fecha_votante_final, id_mesa, fecha_mesa_inicio, fecha_mesa_final, tipo) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', {}, '{}', '{}', '{}')".format(ife_pas,
                                                                                                                                                                                                                                                                fecha_nac,
                                                                                                                                                                                                                                                                direccion,
                                                                                                                                                                                                                                                                nombre,
                                                                                                                                                                                                                                                                fecha_inicio_votante,
                                                                                                                                                                                                                                                                fecha_final_votante,
                                                                                                                                                                                                                                                                id_mesa,
                                                                                                                                                                                                                                                                fecha_mesa_inicio,
                                                                                                                                                                                                                                                                fecha_mesa_final,
                                                                                                                                                                                                                                                                es_extranjero)
        # cur.execute(insert_command)
        try:
            cur.execute(insert_command)
            res = make_response(jsonify({"message": "Collection created"}), 201)
        except :
            res = make_response(jsonify({"error": "Collection not found"}), 404)
        return res

    else: #request == get
        show_command = "SELECT ife_pasaporte, nombre, letra, V.id_mesa, tipo FROM VOTANTE AS V INNER JOIN MESA ON V.id_mesa=MESA.id_mesa WHERE tipo in (0, 1)"
        cur.execute(show_command)
        votantes = cur.fetchall()
        votantes_list = []

        for votante in votantes:
            votantes_list.append(
                {"id": votante[0],
                    "nombre": votante[1],
                    "letra": votante[2],
                    "id_mesa": votante[3],
                    "tipo": votante[4]
                }
            )
        return jsonify(votantes_list)

@app.route('/votantes/<ife_pasaporte>/', methods=["GET", "POST", "DELETE"])
def one_votante(ife_pasaporte):
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_apod = request.get_json()

        new_ife_pas = dict_new_apod['id']
        fecha_nac = dict_new_apod['fecha_nac'][:10]
        direccion = dict_new_apod['direccion']
        nombre = dict_new_apod['nombre']
        fecha_votante_inicio = dict_new_apod['fecha_inicio'][:10]
        fecha_votante_final = dict_new_apod['fecha_final'][:10]
        id_mesa = dict_new_apod['id_mesa']
        tipo = dict_new_apod['tipo']

        get_mesa = "SELECT fecha_mesa_inicio, fecha_mesa_final FROM mesa WHERE id_mesa={}".format(id_mesa)
        cur.execute(get_mesa)
        mesa = cur.fetchall()[0]
        

        new_ife_pas = dict_new_apod['id']
        fecha_nac = dict_new_apod['fecha_nac'][:10]
        direccion = dict_new_apod['direccion']
        nombre = dict_new_apod['nombre']
        fecha_votante_inicio = dict_new_apod['fecha_inicio'][:10]
        fecha_votante_final = dict_new_apod['fecha_final'][:10]
        id_mesa = dict_new_apod['id_mesa']
        fecha_mesa_inicio = mesa[0][:10]
        fecha_mesa_final = mesa[1][:10]
        tipo = dict_new_apod['tipo']

        update_command = "UPDATE votante SET ife_pasaporte='{}', fecha_nac='{}', direccion='{}', nombre='{}', orden={}, fecha_votante_inicio='{}', fecha_votante_final='{}', id_mesa={}, fecha_mesa_inicio='{}', fecha_mesa_final='{}', tipo={} WHERE ife_pasaporte='{}'".format(new_ife_pas,
                                                                                                                                                                                                                                                                                    fecha_nac,
                                                                                                                                                                                                                                                                                    direccion,
                                                                                                                                                                                                                                                                                    nombre,
                                                                                                                                                                                                                                                                                    fecha_votante_inicio,
                                                                                                                                                                                                                                                                                    fecha_votante_final,
                                                                                                                                                                                                                                                                                    id_mesa,
                                                                                                                                                                                                                                                                                    fecha_mesa_inicio,
                                                                                                                                                                                                                                                                                    fecha_mesa_final,
                                                                                                                                                                                                                                                                                    tipo,
                                                                                                                                                                                                                                                                                    ife_pasaporte)
        try:
            cur.execute(update_command)
            res = make_response(jsonify({"message": "Collection updated"}), 200)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    elif request.method == 'DELETE':
        delete_command = "DELETE FROM VOTANTE WHERE ife_pasaporte='{}'".format(ife_pasaporte)

        try:
            cur.execute(delete_command)
            res = make_response(jsonify({}), 204)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    else:#request==get
        votantes_list = []

        show_command = "SELECT ife_pasaporte, fecha_nac, VOTANTE.direccion, nombre, fecha_votante_inicio, fecha_votante_final, VOTANTE.id_mesa, VOTANTE.fecha_mesa_inicio, VOTANTE.fecha_mesa_final, id_colegio, id_eleccion, descripcion, VOTANTE.tipo, sys_votante_inicio, sys_votante_final, trans_id_votante FROM VOTANTE INNER JOIN MESA ON VOTANTE.id_mesa=MESA.id_mesa inner join colegio on mesa.id_mesa_colegio=colegio.id_colegio INNER JOIN ELECCION ON COLEGIO.id_colegio_eleccion=eleccion.id_eleccion WHERE VOTANTE.tipo in (0, 1) AND ife_pasaporte='{}'".format(ife_pasaporte)
        # "select ife_pasaporte, fecha_nac, direccion, nombre, fecha_votante_inicio, fecha_votante_final, id_mesa, fecha_mesa_inicio, fecha_mesa_final, id_colegio, id_eleccion, descripcion, tipo, sys_votante_inicio, sys_votante_final, trans_id_votante from votante
        #     inner join mesa on votante.id_mesa=mesa.id_mesa
        #     inner join colegio on mesa.id_mesa_colegio=colegio.id_colegio
        #     inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion
        #     where tipo in (0, 1)"
        show_command_hist = "SELECT ife_pasaporte, fecha_nac, HIST_VOTANTE.direccion, nombre, fecha_votante_inicio, fecha_votante_final, HIST_VOTANTE.id_mesa, HIST_VOTANTE.fecha_mesa_inicio, HIST_VOTANTE.fecha_mesa_final, id_colegio, id_eleccion, descripcion, HIST_VOTANTE.tipo, sys_votante_inicio, sys_votante_final, trans_id_votante FROM HIST_VOTANTE INNER JOIN MESA on HIST_VOTANTE.id_mesa=MESA.id_mesa INNER JOIN COLEGIO on MESA.id_mesa_colegio=COLEGIO.id_colegio INNER JOIN ELECCION on COLEGIO.id_colegio_eleccion=eleccion.id_eleccion WHERE HIST_VOTANTE.tipo in (0, 1) AND ife_pasaporte='{}'".format(ife_pasaporte)

        cur.execute(show_command)
        votantes = cur.fetchall()

        for votante in votantes:
            votantes_list.append(
                {"id": votante[0],
                    "fecha_nac": votante[1],
                    "direccion": votante[2],
                    "nombre": votante[3],
                    "fecha_inicio": votante[4],
                    "fecha_final": votante[5],
                    "id_mesa": votante[6],
                    "fecha_mesa_inicio": votante[7],
                    "fecha_mesa_final": votante[8],
                    "id_colegio": votante[9],
                    "id_eleccion": votante[10],
                    "descripcion": votante[11],
                    "tipo": votante[12],
                    "sys_inicio": votante[13],
                    "sys_final": votante[14],
                    "trans_id": votante[15]
                }
            )

        cur.execute(show_command_hist)
        votantes_hist = cur.fetchall()

        for i in range( len(votantes_hist)-1 ,-1,-1):
            votantes_list.append(
                {"id": votantes_hist[i][0],
                    "fecha_nac": votantes_hist[i][1],
                    "direccion": votantes_hist[i][2],
                    "nombre": votantes_hist[i][3],
                    "fecha_votante_inicio": votantes_hist[i][4],
                    "fecha_votante_final": votantes_hist[i][5],
                    "id_mesa": votantes_hist[i][6],
                    "fecha_mesa_inicio": votantes_hist[i][7],
                    "fecha_mesa_final": votantes_hist[i][8],
                    "id_colegio": votantes_hist[i][9],
                    "id_eleccion": votantes_hist[i][10],
                    "descripcion": votantes_hist[i][11],
                    "tipo": votantes_hist[i][12],
                    "sys_inicio": votantes_hist[i][13],
                    "sys_final": votantes_hist[i][14],
                    "trans_id": votantes_hist[i][15]
                }
            )

        return jsonify(votantes_list)

####################################################################
#                            PRESIDENTES
#####################################################################

@app.route('/presidentes/', methods=['GET', 'POST'])
def all_presidentes():
    cur = db.connection.cursor()
    if request.method == 'POST':
        dict_new_presi = request.get_json()
        ife_pas = dict_new_presi['id']
        fecha_nac = dict_new_presi['fecha_nac'][:10]
        direccion = dict_new_presi['direccion']
        nombre = dict_new_presi['nombre']
        id_eleccion = dict_new_presi['id_eleccion']
        id_colegio = dict_new_presi['id_colegio']
        fecha_inicio_presi = dict_new_presi['fecha_inicio'][:10]
        fecha_final_presi = dict_new_presi['fecha_final'][:10]
        # tipo = dict_new_presi['tipo'] -> ES FORZOSAMENTE 2
        id_mesa = dict_new_presi['id_mesa']

        get_mesa = "SELECT fecha_mesa_inicio, fecha_mesa_final FROM MESA WHERE id_mesa={}".format(id_mesa)
        cur.execute(get_mesa)
        mesa = cur.fetchall()[0]
        fecha_mesa_inicio = mesa[0][:10]
        fecha_mesa_final = mesa[1][:10]

        insert_command = "insert into votante (ife_pasaporte, fecha_nac, direccion, nombre, fecha_votante_inicio, fecha_votante_final, id_mesa, fecha_mesa_inicio, fecha_mesa_final, tipo) values ('{}', '{}', '{}', '{}', '{}', '{}', {}, '{}', '{}', {})".format(ife_pas,
                                                                                                                                                                                                                                                                fecha_nac,
                                                                                                                                                                                                                                                                direccion,
                                                                                                                                                                                                                                                                nombre,
                                                                                                                                                                                                                                                                fecha_inicio_presi,
                                                                                                                                                                                                                                                                fecha_final_presi,
                                                                                                                                                                                                                                                                id_mesa,
                                                                                                                                                                                                                                                                fecha_mesa_inicio,
                                                                                                                                                                                                                                                                fecha_mesa_final,
                                                                                                                                                                                                                                                                2)
        try:
            cur.execute(insert_command)
            res = make_response(jsonify({"message": "Collection created"}), 201)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)
        return res

    else:
        show_command = "select ife_pasaporte, nombre, letra, VOTANTE.id_mesa, tipo from votante inner join mesa on votante.id_mesa=mesa.id_mesa where tipo=2"
        cur.execute(show_command)
        votantes = cur.fetchall()
        votantes_list = []

        for votante in votantes:
            votantes_list.append(
                {"id": votante[0],
                    "nombre": votante[1],
                    "letra": votante[2],
                    "id_mesa": votante[3],
                    "tipo": votante[4]
                }
            )
        return jsonify(votantes_list)


########################################### MAIN ################################
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
