from random import randrange
from datetime import timedelta
import datetime

def random_date(start, end):
    #tomado de https://stackoverflow.com/questions/553303/generate-a-random-date-between-two-other-dates
    """
    This function will return a random datetime between two datetime 
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)

def populate_votante():
    sqlForm = "INSERT INTO VOTANTE (ife_pasaporte, fecha_nac, direccion, nombre, id_mesa, id_superior, orden, id_partido, tipo) VALUES (%s, %s, %s, %s, %d, %d, %d, %d, %c)"

def populate_apod_lista():
    sqlForm = "INSERT INTO APOD_LISTA (ife_pasaporte, fecha_nac, direccion, nombre, fecha_apod_lista_inicio, fecha_apod_lista_final, id_partido) VALUES (%s, %s, %s, %s, %s, %s, %d)"

def populate_eleccion():
    sqlForm = "INSERT INTO ELECCION (fecha_eleccion_inicio, fecha_eleccion_final) VALUES (%s, %s)"

def populate_colegio():
    sqlForm = "INSERT INTO COLEGIO (id_eleccion, fecha_colegio_inicio, fecha_colegio_final) VALUES (%d, %s, %s)"

def populate_mesa():
    sqlForm = "INSERT INTO MESA (id_colegio, fecha_mesa_inicio, fecha_mesa_final) VALUES (%d, %s, %s)"

def populate_v_federal():
    sqlForm = "INSERT INTO V_FEDERAL (id_mesa, id_partido, tipo_voto) VALUES (%d, %d, %s)"

def populate_v_federal():
    sqlForm = "INSERT INTO V_MUNICIPAL (id_mesa, id_partido, tipo_voto) VALUES (%d, %d, %s)"

def populate_partido():
    sqlForm = "INSERT INTO PARTIDO (siglas, nombre, presidente, fecha_partido_inicial, fecha_partido_final) VALUES (%s, %s, %s, %s, %s)"

#adaptando el formato de python al de SQL
def format_date(date):
    hms = date.strftime("%H:%M:%S")
    return date.strftime("%Y")+"-"+date.strftime("%m")+"-"+date.strftime("%d")+" "+hms

def create_date():
    return datetime.datetime.today()

def delta_date(date, offset): #offset debe estar en meses
    return date + datetime.timedelta(offset*365/12)

def write_csvs():
    # Genere un script SQL que permita poblar la base de datos 
    # con un conjunto de datos de prueba 
    # (mínimo 5 partidos, 3 apoderados por partido, 100 votantes (entre nacionales y extranjeros), 4 elecciones diferentes,
    # 10 colegios electorales.
    start_date = create_date()

    # formateando la fecha para que quede con el estandar de SQL
    start_date_str = format_date(start_date)

    print(start_date_str)

    end_date_str = format_date(delta_date(start_date, 72)) #seis años de vigencia del partido

    print(end_date_str)
    party_names = ["Partido Revolucionario Institucional", "Morena", "Partido Acción Nacional", "Partido Nacional Revolucionario", "Partido Electoral Inutil"]
    p_names = ["Juan", "José", "Jean", "Juana", "Annette", "Valentina", "Ana", "Philippe", "Yann", "Roberto", "Alejandra", "Isaac", "John", "Charlie", "Paul", "Dave"]
    p_lnames = ["Le Lorier", "Gervacio", "Nissan", "Harari", "Gómez", "González", "Coltrane", "Parker", "Desmond", "Brubeck"]
    # fichier = open("voters.csv", "w+")

    # fichier.close()

write_csvs()