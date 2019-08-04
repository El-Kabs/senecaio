import requests
import json
from bs4 import BeautifulSoup
import funciones

def escribir():
    #Peticion HTTP
    headers = {'Referer': 'https://biblioteca.uniandes.edu.co/index.php?lang=es'}
    url = "https://biblioteca.uniandes.edu.co/Servicios/SalasDisponibles/"
    r = requests.get(url, headers=headers)

    #Pasarla a Soup
    soup = BeautifulSoup(r.text, 'html.parser')

    #Inicializar variables
    jsonFinal = {}
    salones = []
    ubicaciones = []
    tiempos = []

    #Recorrer todos los <td>
    for x in soup.find_all("td"):
        info = funciones.reemplazar(x.text)   
        if(funciones.esSalon(info)):
            salones.append(info)
        elif(funciones.esUbicacion(info)):
            ubicaciones.append(info)
        elif(funciones.esTiempo(info)):
            tiempos.append(info)
        else:
            pass

    #Armar JSON
    jsonFinal = funciones.armarJson(salones, ubicaciones, tiempos)

    with open('data_biblioteca.json', 'w') as fp:
        json.dump(jsonFinal, fp)
