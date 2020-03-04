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

app = Flask(__name__)

app.config['DB2_DATABASE']='tarea1bd'
app.config['DB2_HOSTNAME']='localhost'
app.config['DB2_PORT']='50000'
app.config['DB2_PROTOCOL']='TCPIP'
app.config['DB2_USER']='db2inst1'
app.config['DB2_PASSWORD']='ihm'

db = DB2(app)

# @app.route('/user/<username>')
# def profile(username):
# @app.route('/<int:year>/<int:month>/<title>')
# def article(year, month, title):

# @app.route('/insert/')
# def insert():
#     cur = db.connection.cursor()
#     cur.execute("INSERT INTO products (id, description, start_date, end_date) VALUES (3, 'bacacho', '2020-04-24', '2020-05-11')")

#     return redirect("http://127.0.0.1:5000/")


# @app.route('/update/<name_product>')
# def update(name_product):
#     cur = db.connection.cursor()
#     print(name_product)
#     update_command = "UPDATE products FOR PORTION OF BUSINESS_TIME FROM '2020-04-28' TO '2020-05-09' SET description = '{}' WHERE id = 3".format(name_product)
#     cur.execute(update_command)

    # return redirect("http://127.0.0.1:5000/")

@app.route('/elecciones/')
def all_elecciones():
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


@app.route('/elecciones/<int:id_eleccion>/', methods=['GET', 'POST'])
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



    # cur = db.connection.cursor()

    # create_eleccion = ""
    # if request.method == "POST":
    #     desc_eleccion = request.form['campana']
    #     tipo = request.form['tipo_elecciones']
    #     cur.execute(create_eleccion)
    #     return redirect('/elecciones/')


@app.route('/votosfederales/', methods=["GET","POST"])
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


@app.route('/votosmunicipales/', methods=["GET","POST"])
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

    for votantes in votantes:
        votantes_list.append(
            {"id": votantes[0],
                "nombre": votantes[1],
                "id_mesa": votantes[2],
                "tipo": votantes[3],
                "fecha_inicio": votantes[4],
                "fecha_final": votantes[5],
                "id_sup": votantes[6]
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
    show_command = ""
    create_command = ""
    if request.method == "POST":
        siglas = request.form['siglas']
        nombre = request.form['nombre']
        presidente = request.form['presidente']
        fecha_inicio = request.form['fecha_inicio']
        fecha_fin = request.form['fecha_fin']
        cur.execute(create_command)
        return redirect('/partidos/')

@app.route('/colegios/', methods=["GET", "POST"])
def page_colegios():
    cur = db.connection.cursor()
    show_command = ""
    create_command = ""
    if request.method == "POST":
        id_colegio = request.form['colegio']
        desc_elecc = request.form['elecciones']
        fecha_inicio = request.form['fecha_inicio']
        fecha_fin = request.form['fecha_fin']
        cur.execute(create_command)
        return redirect('/colegios/')

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

# @app.route("/get_my_ip", methods=["GET"])
# def get_my_ip():
#     return jsonify({'ip': request.remote_addr}), 200}

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

# def json_items(query, cur, keys):
#     cur.execute(query)
#     db_items = cur.fetchall()
#     items_list = []
#     i = 0
#     for item in db_items:
#         items_list.append(
#             {
#                 "{}: {}".format(keys[i], item[i])
#             }
#         )
#         i += 1
#     return jsonify(items_list)

if __name__ == "__main__":
    app.run(debug=True)
