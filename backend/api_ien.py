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

        return jsonify(elecciones_list)

@app.route('/elecciones/<int:id_eleccion>/', methods=['GET', 'POST', 'DELETE'])
def one_eleccion(id_eleccion):
    cur = db.connection.cursor()

    if request.method == 'POST':
        dict_new_eleccion = request.get_json()

        descripcion = dict_new_eleccion['descripcion']
        tipo = "Municipal" if dict_new_eleccion['tipo_elecciones'] == 'm' else "Federal"

        update_command = "UPDATE eleccion SET descripcion='{}', tipo='{}' WHERE id_eleccion = {}".format(descripcion,
                                                                                                    tipo,
                                                                                                    id_eleccion)
        try:
            cur.execute(update_command)
            res = make_response(jsonify({"message": "Collection updated"}), 200)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    elif request.method == 'DELETE':
        delete_command = "DELETE FROM eleccion WHERE id_eleccion={}".format(id_eleccion)

        try:
            cur.execute(delete_command)
            res = make_response(jsonify({}), 204)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    else:
        elecciones_list = []
        show_command = "SELECT id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo, sys_eleccion_inicio, sys_eleccion_final, trans_id_eleccion FROM ELECCION WHERE id_eleccion={}".format(id_eleccion)
        show_command_hist = "SELECT id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo, sys_eleccion_inicio, sys_eleccion_final, trans_id_eleccion FROM hist_eleccion WHERE id_eleccion={}".format(id_eleccion)
        cur.execute(show_command)
        elecciones = cur.fetchall()

        for eleccion in elecciones:
            elecciones_list.append(
                {"id": eleccion[0],
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

        return res

    else:
        select_colegios_command = "SELECT id_colegio, fecha_colegio_inicio, fecha_colegio_final, direccion, id_colegio_eleccion FROM colegio"
        cur.execute(select_colegios_command)
        colegios = cur.fetchall()
        colegios_list = []

        for colegio in colegios:
            id_colegio_eleccion = colegio[3]
            get_eleccion_of_colegio_command = "SELECT descripcion FROM ELECCION WHERE id_eleccion={}".format(id_colegio_eleccion)
            cur.execute(get_eleccion_of_colegio_command)
            eleccion = cur.fetchall()[0]

            colegios_list.append(
                {"id": colegio[0],
                    "fecha_inicio": colegio[1],
                    "fecha_final": colegio[2],
                    "descripcion": colegio[3],
                    "descripcion_eleccion": eleccion[0]
                    # "id_eleccion": id_colegio_eleccion,
                    #                [primera tupla] [primer elemento]
                }
            )

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

        return res

    elif request.method == 'DELETE':
        delete_command = "DELETE FROM colegio WHERE id_colegio = {}".format(id_colegio)

        try:
            cur.execute(delete_command)
            res = make_response(jsonify({}), 204)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

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

                    # "id_eleccion": id_colegio_eleccion,
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

                    # "id_eleccion": id_colegio_eleccion,
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

        update_command = "UPDATE mesa SET fecha_mesa_inicio='{}', fecha_mesa_final='{}', id_mesa_colegio={}, letra='{}' WHERE id_mesa = {}".format(fecha_mesa_inicio,
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

        show_command = "select id_mesa, letra, fecha_mesa_inicio, fecha_mesa_final, sys_mesa_inicio, sys_mesa_final, trans_id_mesa, id_colegio, descripcion from mesa inner join colegio on mesa.id_mesa_colegio=colegio.id_colegio inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion where mesa.id_mesa={}".format(id_mesa)
        show_command_hist = "select id_mesa, letra, fecha_mesa_inicio, fecha_mesa_final, sys_mesa_inicio, sys_mesa_final, trans_id_mesa, id_colegio, descripcion from hist_mesa inner join colegio on hist_mesa.id_mesa_colegio=colegio.id_colegio inner join eleccion on colegio.id_colegio_eleccion=eleccion.id_eleccion where hist_mesa.id_mesa={}".format(id_mesa)
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
                    "descripcion_eleccion": mesa[8]
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
                    "descripcion_eleccion": mesas_hist[i][8]
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
        fecha_inicio = dict_new_partido['fecha_inicio']
        fecha_final = dict_new_partido['fecha_final']

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
        nombre = dict_new_partido['nombre_partido']
        presidente = dict_new_partido['presi']

        # Obtienes las nuevas (no a la fuerza deben de ser nuevas, pueden ser las mismas) fechas
        fecha_inicio = dict_new_partido['Date']
        #fecha_final = ???

        update_command = "UPDATE partido SET siglas='{}', nombre='{}', presidente={} WHERE siglas='{}'".format(new_siglas,
                                                                                                            nombre,
                                                                                                            presidente,
                                                                                                            siglas)

        try:
            cur.execute(update_command)
            res = make_response(jsonify({"message": "Collection updated"}), 200)
        except:
            res = make_response(jsonify({"error": "Collection not found"}), 404)

        return res

    elif request.method == 'DELETE':
        delete_command = "DELETE FROM partido WHERE siglas={}".format(siglas)

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

########################### VOTOS FEDERALES ############################

# @app.route('/votos/federales/', methods=["GET","POST"])
# def page_votosF():
#     cur = db.connection.cursor()
#     show_command = "SELECT id_mesa, siglas, tipo_voto, fecha_hora_voto FROM V_FEDERAL"
#     cur.execute(show_command)
#     v_federales = cur.fetchall()
#     v_federales_list = []
#
#     for voto in v_federales:
#         v_federales_list.append(
#             {"id_mesa": voto[0],
#                 "siglas": voto[1],
#                 "tipo": voto[2],
#                 "fecha_hora": voto[3]
#             }
#         )
#
#     return jsonify(v_federales_list)


########################################### MAIN ################################

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)