#API using flask and a db2 connection
"""
Equipo 7:
Roberto Gervacio
Alejandra Nissan
Isaac Harari
Yann Le Lorier
"""
from flask import Flask, jsonify, redirect, request, url_for #request handler, getting url in a function
from flask_db2 import DB2
import locale, time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
# @cross_origin()
@app.route('/elecciones/', methods=['GET', 'POST'])
def all_eleccion():
    cur = db.connection.cursor()

    if request.method == 'POST':
        fecha_eleccion_inicio = request.form['fecha_inicio']
        fecha_eleccion_final = request.form['fecha_fin']
        descripcion = request.form['descripcion']
        tipo = request.form['tipo_elecciones']

        insert_command = "INSERT INTO eleccion (fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo) VALUES ('{}', '{}', '{}', '{}')".format(fecha_eleccion_inicio,
                                                                                                                                                        fecha_eleccion_final,
                                                                                                                                                        descripcion,
                                                                                                                                                        tipo)
        cur.execute(insert_command)

        return redirect("http://127.0.0.1:5000/")

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

#ELECCION
# @app.route('/elecciones/')
# def all_elecciones():

#     show_command = "SELECT id_eleccion, descripcion, tipo, fecha_eleccion_inicio, fecha_eleccion_final FROM ELECCION"
#     cur.execute(show_command)
#     elecciones = cur.fetchall()
#     elecciones_list = []


#     for eleccion in elecciones:
#         elecciones_list.append(
#             {"id": eleccion[0],
#                 "descripcion": eleccion[1],
#                 "tipo": eleccion[2],
#                 "fecha_inicio": eleccion[3],
#                 "fecha_final": eleccion[4]
#             }
#         )

#     return jsonify(elecciones_list)

@app.route('/elecciones/<int:id_eleccion>/', methods=['GET', 'POST', 'DELETE'])
def one_eleccion(id_eleccion):
    cur = db.connection.cursor()
    if request.method == 'POST':
        fecha_eleccion_inicio = request.form['fecha_inicio']
        fecha_eleccion_final = request.form['fecha_fin']
        descripcion = request.form['descripcion']
        tipo = request.form['tipo_elecciones']
        update_command = "UPDATE eleccion SET fecha_eleccion_inicio='{}', fecha_eleccion_final='{}', descripcion='{}', tipo='{}' WHERE id_eleccion = {}".format(fecha_eleccion_inicio,
                                                                                                                                                                fecha_eleccion_final,
                                                                                                                                                                descripcion,
                                                                                                                                                                tipo,
                                                                                                                                                        id_eleccion)
        cur.execute(update_command)
        return redirect("http://127.0.0.1:5000/elecciones")

    elif request.method == 'DELETE':
        delete_command = "DELETE FROM eleccion WHERE id_eleccion = {}".format(id_eleccion)
        cur.execute(delete_command)

        return redirect("http://127.0.0.1:5000/elecciones")

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

#MESA
@app.route('/mesas/')
def all_mesas():
    cur = db.connection.cursor()
    show_command = "select descripcion, id_colegio, id_mesa, fecha_mesa_inicio, fecha_mesa_final from mesa inner join colegio on mesa.id_mesa_colegio = colegio.id_colegio inner join eleccion on colegio.id_colegio_eleccion = eleccion.id_eleccion"
    cur.execute(show_command)
    mesas = cur.fetchall()
    print(mesas)
    mesas_list = []

    for mesa in mesas:
        mesas_list.append(
            {"eleccion": mesa[0],
                "id_colegio": mesa[1],
                "id": mesa[2],
                "fecha_inicio": mesa[3],
                "fecha_final": mesa[4]
            }
        )

    return jsonify(mesas_list)

@app.route('/mesas/<int:id_mesa>/', methods=['GET', 'DELETE'])
def one_mesa(id_mesa):
    cur = db.connection.cursor()
    if request.method == 'DELETE':
        print(id_mesa)
        print()
        print()
        print()
        delete_command = "DELETE FROM mesa WHERE id_mesa = {}".format(id_mesa)
        cur.execute(delete_command)

        
        return redirect("http://127.0.0.1:5000/mesas")

    else:
        mesas_list = []
        show_command = "SELECT id_mesa, fecha_mesa_inicio, fecha_mesa_final, sys_mesa_inicio, sys_mesa_final, trans_id_mesa FROM MESA WHERE id_mesa={}".format(id_mesa)
        show_command_hist = "SELECT id_mesa, fecha_mesa_inicio, fecha_mesa_final, sys_mesa_inicio, sys_mesa_final, trans_id_mesa FROM hist_mesa WHERE id_mesa={}".format(id_mesa)
        cur.execute(show_command)
        mesas = cur.fetchall()

        for mesa in mesas:
            mesas_list.append(
                {"id": mesa[0],
                "fecha_inicio": mesa[1],
                "fecha_final": mesa[2],
                "sys_inicio": mesa[3],
                "sys_final": mesa[4],
                "trans_mesa": mesa[5]
                }
            )

        cur.execute(show_command_hist)
        mesas_hist = cur.fetchall()

        for i in range( len(mesas_hist)-1 ,-1,-1):
            mesas_list.append(
                {"id": mesas_hist[i][0],
                "fecha_inicio": mesas_hist[i][1],
                "fecha_final": mesa_hist[i][2],
                "sys_inicio": mesas_hist[i][3],
                "sys_final": mesas_hist[i][4],
                "trans_id": mesa_hist[i][5]
                }
            )
    return jsonify(mesas_list) 
################################################################
#                       COLEGIO
################################################################
@app.route('/colegios/', methods=["GET", "POST"])
def all_colegio():
    cur = db.connection.cursor()
    if request.method == 'POST':
        id = request.form['id']
        fecha_colegio_inicio = request.form['fecha_inicio']
        fecha_colegio_final = request.form['fecha_fin']
        id_eleccion = request.form['id_eleccion']

        insert_command = "INSERT INTO colegio (id_colegio, fecha_colegio_inicio, fecha_colegio_final, id_colegio_eleccion) VALUES ({}, '{}', '{}', {});".format(id,
                                                                                                                                                        fecha_colegio_inicio,
                                                                                                                                                        fecha_colegio_final,
                                                                                                                                                        id_eleccion)

        try:
            cur.execute(insert_command)
        except:
            raise InvalidUsage('Error al crear el colegio')

        return redirect("http://127.0.0.1:5000/colegios")

    else:
        select_colegios_command = "SELECT id_colegio, fecha_colegio_inicio, fecha_colegio_final, id_colegio_eleccion FROM colegio"
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
                    "id_eleccion": id_colegio_eleccion,
                    #                [primera tupla] [primer elemento]
                    "descripcion_eleccion": eleccion[0]
                }
            )

        return jsonify(colegios_list)

def one_eleccion(id_eleccion):
    cur = db.connection.cursor()
    if request.method == 'POST':
        id = request.form['id']
        fecha_colegio_inicio = request.form['fecha_inicio']
        fecha_colegio_final = request.form['fecha_fin']
        id_eleccion = request.form['id_eleccion']
        update_command = "UPDATE colegio SET fecha_colegio_inicio='{}', fecha_colegio_final='{}', id_colegio_eleccion={} WHERE id_colegio = {}".format(fecha_colegio_inicio,
                                                                                                                                                    fecha_colegio_final,
                                                                                                                                                    id_eleccion,
                                                                                                                                                    id)
        cur.execute(update_command)
        return redirect("http://127.0.0.1:5000/elecciones")

    else:
        pass
    # elif request.method == 'DELETE':
    #     delete_command = "DELETE FROM eleccion WHERE id_eleccion = {}".format(id_eleccion)
    #     cur.execute(delete_command)
    #
    #     return redirect("http://127.0.0.1:5000/elecciones")
    #
    # else:
    #     elecciones_list = []
    #     show_command = "SELECT id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo, sys_eleccion_inicio, sys_eleccion_final, trans_id_eleccion FROM ELECCION WHERE id_eleccion={}".format(id_eleccion)
    #     show_command_hist = "SELECT id_eleccion, fecha_eleccion_inicio, fecha_eleccion_final, descripcion, tipo, sys_eleccion_inicio, sys_eleccion_final, trans_id_eleccion FROM hist_eleccion WHERE id_eleccion={}".format(id_eleccion)
    #     cur.execute(show_command)
    #     elecciones = cur.fetchall()
    #
    #     for eleccion in elecciones:
    #         elecciones_list.append(
    #             {"id": eleccion[0],
    #             "fecha_inicio": eleccion[1],
    #             "fecha_final": eleccion[2],
    #             "descripcion": eleccion[3],
    #             "tipo": eleccion[4],
    #             "sys_inicio": eleccion[5],
    #             "sys_final": eleccion[6],
    #             "trans_id": eleccion[7]
    #             }
    #         )
    #
    #     cur.execute(show_command_hist)
    #     elecciones_hist = cur.fetchall()
    #
    #     for i in range(len(elecciones_hist)-1,-1,-1):
    #         elecciones_list.append(
    #             {"id": elecciones_hist[i][0],
    #             "fecha_inicio": elecciones_hist[i][1],
    #             "fecha_final": elecciones_hist[i][2],
    #             "descripcion": elecciones_hist[i][3],
    #             "tipo": elecciones_hist[i][4],
    #             "sys_inicio": elecciones_hist[i][5],
    #             "sys_final": elecciones_hist[i][6],
    #             "trans_id": elecciones_hist[i][7]
    #             }
    #         )
    return jsonify(elecciones_list)


    # create_command = ""
    # if request.method == "POST":
    #     id_colegio = request.form['colegio']
    #     desc_elecc = request.form['elecciones']
    #     fecha_inicio = request.form['fecha_inicio']
    #     fecha_fin = request.form['fecha_fin']
    #     cur.execute(create_command)
    #     return redirect('/colegios/')

@app.route('/votos/federales/', methods=["GET","POST"])
def page_votosF():
    cur = db.connection.cursor()
    show_command = "SELECT id_mesa, siglas, tipo_voto, fecha_hora_voto FROM V_FEDERAL"
    cur.execute(show_command)
    v_federales = cur.fetchall()
    v_federales_list = []

    for voto in v_federales:
        v_federales_list.append(
            {"id_mesa": voto[0],
                "siglas": voto[1],
                "tipo": voto[2],
                "fecha_hora": voto[3]
            }
        )

    return jsonify(v_federales_list)

@app.route('/votos/municipales/', methods=["GET","POST"])
def page_votosM():
    cur = db.connection.cursor()
    show_command = "SELECT id_mesa, siglas, tipo_voto, fecha_hora_voto FROM V_MUNICIPAL"
    cur.execute(show_command)
    v_municipales = cur.fetchall()
    v_municipales_list = []

    for voto in v_municipales:
        v_municipales_list.append(
            {"id_mesa": voto[0],
                "siglas": voto[1],
                "tipo": voto[2],
                "fecha_hora": voto[3]
            }
        )
    return jsonify(v_municipales_list)
    # create_command = ""
    # if request.method == "POST":
    #     elecciones_descripcion = request.form['elecciones']
    #     colegio = request.form['colegio']
    #     mesa = request.form['mesa']
    #     tipo = request.form['tipo_voto']
    #     siglas = request.form['partido']
    #     cur.execute(create_command)
    #     return redirect('/votosmunicipales/')

@app.route('/votantes/', methods=["GET", "POST"])
def page_votantes():
    cur = db.connection.cursor()
    show_command = "SELECT ife_pasaporte, nombre, id_mesa, tipo, fecha_votante_inicio, fecha_votante_final, id_superior FROM VOTANTE"
    cur.execute(show_command)
    votantes = cur.fetchall()
    votantes_list = []

    for votante in votantes:
        votantes_list.append(
            {"id": votante[0],
                "nombre": votante[1],
                "id_mesa": votante[2],
                "tipo": votante[3],
                "fecha_inicio": votante[4],
                "fecha_final": votante[5],
                "id_sup": votante[6]
            }
        )

    return jsonify(votantes_list)
    # create_command = ""
    # if request.method == "POST":
    #     elecciones = request.form['elecciones']
    #     colegio = request.form['colegio']
    #     mesa = request.form['mesa']
    #     nombre = request.form['nombre']
    #     direccion = request.form['direccion']
    #     fecha_nac = request.form['fecha']
    #     fecha_registro = request.form['fecha_registro']

    #     cur.execute(create_command)
    #     return redirect('/votantes/')

@app.route('/partidos/', methods=["GET", "POST"])
def page_partidos():
    cur = db.connection.cursor()
    show_command = "SELECT  FROM PARTIDO"

    cur.execute(show_command)
    partidos = cur.fetchall()
    partidos_list = []

    for partido in partidos:
        partidos_list.append(
            {"siglas": partido[0],
                "nombre": partido[1],
                "id_mesa": partido[2],
                "tipo": partido[3],
                "fecha_inicio": partido[4],
                "fecha_final": partido[5],
                "id_sup": partido[6]
            }
        )

    return jsonify(partidos_list)


    # create_command = ""
    # if request.method == "POST":
    #     siglas = request.form['siglas']
    #     nombre = request.form['nombre']
    #     presidente = request.form['presidente']
    #     fecha_inicio = request.form['fecha_inicio']
    #     fecha_fin = request.form['fecha_fin']
    #     cur.execute(create_command)
    #     return redirect('/partidos/')

@app.route('/mesas/', methods=["GET", "POST"])
def page_mesas():
    cur = db.connection.cursor()
    show_command = ""
    create_command = ""
    if request.method == "POST":
        id_mesa = request.form['mesa']
        desc_elecc = request.form['elecciones']
        fecha_inicio = request.form['fecha_inicio']
        fecha_fin = request.form['fecha_fin']
        cur.execute(create_command)
        return redirect('/mesas/')

@app.route('/')
def dashboard():
    cur = db.connection.cursor()
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


########################################### MAIN ################################

if __name__ == "__main__":
    #app.run(debug=True)
    app.run( port=5001, debug=True)
    # create_command = ""
    # if request.method == "POST":
    #     elecciones = request.form['elecciones']
    #     colegio = request.form['colegio']
    #     mesa = request.form['mesa']
    #     nombre = request.form['nombre']
    #     direccion = request.form['direccion']
    #     fecha_nac = request.form['fecha']
    #     fecha_registro = request.form['fecha_registro']

    #     cur.execute(create_command)
    #     return redirect('/votantes/')
