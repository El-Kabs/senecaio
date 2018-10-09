import json
from flask import Flask, Request
import escritura
import salones_primero
import threading

app = Flask(__name__)

@app.route('/biblioteca')
def obtenerJson():
    d = ""
    with open('data_biblioteca.json') as json_data:
        d = json.load(json_data)
    return str(d)

@app.route('/escribirb')
def escribirJsonBiblioteca():
    escritura.escribir()
    return "OK"

@app.route('/salones')
def obtenerJsonSalones():
    d = ""
    with open('data_salones.json') as json_data:
        d = json.load(json_data)
    return str(d).replace('1, ', '')

def escSalones():
    salones_primero.principal()

@app.route('/escribirs')
def escribirJsonSalones():
    threads = list()
    t = threading.Thread(target=escSalones)
    threads.append(t)
    t.start()
    return ("OK")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')