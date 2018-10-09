def esSalon(texto):
    if((texto.startswith("ML")) or (texto.startswith("CPM")) or (texto.startswith("F"))):
        return True
    else:
        return False

def esTiempo(texto):
    if(texto.startswith('1') or texto.startswith('2') or texto.startswith('3') or texto.startswith('4') or texto.startswith('5') or texto.startswith('6') or texto.startswith('7') or texto.startswith('8') or texto.startswith('9') or texto.startswith('0') or texto.startswith('D')):
        return True
    else:
        return False

def esUbicacion(texto):
    if(texto.startswith("P") or texto.startswith("C")):
        return True
    else:
        return False

def reemplazar(texto):
    return str((texto).replace("ó","o").replace('í', 'i').replace('é', 'e').replace(u'\xa0', ' ').strip())

def armarJson(salones, ubicaciones, tiempos):
    jsonRetorno = {}
    for x in range(0, len(salones)):
        jsonRetorno[salones[x]] = {"Ubicacion":ubicaciones[x], "Tiempo":tiempos[x]}
    return jsonRetorno