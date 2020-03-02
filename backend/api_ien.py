#API using flask and a db2 connection
"""
Equipo 7:
Roberto Gervacio
Alejandra Nissan
Isaac Harari
Yann Le Lorier
"""
from flask import Flask, jsonify, redirect
from flask_db2 import DB2

app = Flask(__name__)

app.config['DB2_DATABASE']='testdb'
app.config['DB2_HOSTNAME']='localhost'
app.config['DB2_PORT']='50000'
app.config['DB2_PROTOCOL']='TCPIP'
app.config['DB2_USER']='db2inst1'
app.config['DB2_PASSWORD']='password'

db = DB2(app)

# @app.route('/user/<username>')
# def profile(username):
# @app.route('/<int:year>/<int:month>/<title>')
# def article(year, month, title):

@app.route('/insert/')
def insert():
    cur = db.connection.cursor()
    cur.execute("INSERT INTO products (id, description, start_date, end_date) VALUES (3, 'bacacho', '2020-04-24', '2020-05-11')")

    return redirect("http://127.0.0.1:5000/")


@app.route('/update/<name_product>')
def update(name_product):
    cur = db.connection.cursor()
    print(name_product)
    update_command = "UPDATE products FOR PORTION OF BUSINESS_TIME FROM '2020-04-28' TO '2020-05-09' SET description = '{}' WHERE id = 3".format(name_product)
    cur.execute(update_command)

    return redirect("http://127.0.0.1:5000/")



@app.route('/')
def dashboard():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM products")
    products = cur.fetchall()
    products_list = []

    for product in products:
        products_list.append(
            {"id": product[0],
                "description": product[1],
                "start_date": product[2],
                "end_date": product[3],
            }
        )


    return jsonify(products_list)

if __name__ == "__main__":
    app.run(debug=True)
