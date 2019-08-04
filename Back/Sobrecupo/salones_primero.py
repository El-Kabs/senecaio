import requests
import json
import salones as saloness

prefijos = ['SICO', 'MSCM', 'MDIS', 'ADMI', 'DPUB', 'ARTI', 'MGPD', 'CBCA', 'DLIT', 'DEIN', 'MIFI', 'DEPO', 'MUSI', 'DADM', 'QUIM', 'ICYA', 'HART', 'ANTR', 'CIDE', 'FILO', 'IQUI', 'IELE', 'FISI', 'BCOM', 'HIST', 'BIOL', 'AUTO', 'DISE', 'INTL', 'EECO', 'DPRO', 'MLIT', 'ARTE', 'MPCU', 'DERE', 'DEMP', 'PSCL', 'IING', 'MIAD', 'LEGI', 'DIGS', 'GTEL', 'MTRI', 'DEPR', 'MGAD', 'ESIO', 'MGPU', 'MBIT', 'CBIO', 'MGAP', 'DMIN', 'DECA', 'MEDI', 'MISO', 'EDUC', 'MART', 'MADM', 'CISO', 'RJUR', 'FARH', 'MPAZ', 'DEPI', 'MSIN', 'CBPC', 'CPOL', 'GEOC', 'PSIC', 'MIIA', 'ISIS', 'MINE', 'MGPA', 'GPUB', 'MBAE', 'SPUB', 'CBCC', 'MBIO', 'IIND', 'LITE', 'ECON', 'DENI', 'MATE', 'EMAT', 'MHAR', 'DDER', 'EPID', 'MECU', 'MFIN', 'IGEN', 'IBIO', 'EDUI', 'IMEC', 'MECA', 'PERI', 'ARQU', 'MPET', 'LENG', 'CBCO', 'CONT', 'STRA', 'MPER', 'MMER', 'DCOM', 'HDIG', 'EINT', 'EGOB', 'MGEO', 'DGGJ', 'MDER']
headers = {'Referer': 'https://registroapps.uniandes.edu.co/oferta_cursos/index.php'}

salones = {}

def llenarS():
    global salones
    with open('salones.txt', 'r') as f:
        content = f.readlines()
        content = [x.strip() for x in content]
        for x in content:
            salones[x] = [1]

def obtener():
    global salones
    i = 0
    for x in prefijos:
        print(str(i)+"/"+str(len(prefijos)))
        req = requests.get('https://registroapps.uniandes.edu.co/oferta_cursos/api/get_courses.php?term=201820&ptrm=1&prefix=' + str(x), headers=headers)
        i = i + 1
        jsonP = json.loads(req.text)
        for x in jsonP['records']:
            for b in x['schedules']:
                dias = ""
                if(b['L'] is not None):
                    dias = dias + b['L']
                if (b['M'] is not None):
                    dias = dias + b['M']
                if (b['I'] is not None):
                    dias = dias + b['I']
                if (b['J'] is not None):
                    dias = dias + b['J']
                if (b['V'] is not None):
                    dias = dias + b['V']
                if (b['S'] is not None):
                    dias = dias + b['S']
                if (b['D'] is not None):
                    dias = dias + b['D']
                salon = b['classroom'].replace('.', '')
                if((salon == '.NOREQ') | (salon == '')):
                    pass
                else:
                    horas = str(b['time_ini']) +'&&'+ str(b['time_fin'])
                    armado = str(dias)+";;"+str(horas)+"//"
                    salones[salon].append(armado)

def obtener8A():
    global salones
    i = 0
    for x in prefijos:
        print(str(i) + "/" + str(len(prefijos)))
        req = requests.get(
            'https://registroapps.uniandes.edu.co/oferta_cursos/api/get_courses.php?term=201820&ptrm=8B&prefix=' + str(
                x), headers=headers)
        i = i + 1
        jsonP = json.loads(req.text)
        for x in jsonP['records']:
            for b in x['schedules']:
                dias = ""
                if (b['L'] is not None):
                    dias = dias + b['L']
                if (b['M'] is not None):
                    dias = dias + b['M']
                if (b['I'] is not None):
                    dias = dias + b['I']
                if (b['J'] is not None):
                    dias = dias + b['J']
                if (b['V'] is not None):
                    dias = dias + b['V']
                if (b['S'] is not None):
                    dias = dias + b['S']
                if (b['D'] is not None):
                    dias = dias + b['D']
                salon = b['classroom'].replace('.', '')
                if ((salon == '.NOREQ') | (salon == '')):
                    pass
                else:
                    horas = str(b['time_ini']) + '&&' + str(b['time_fin'])
                    armado = str(dias) + ";;" + str(horas) + "//"
                    salones[salon].append(armado)

def escribir():
    global salones
    with open('data_salones_desorden.json', 'w') as fp:
        json.dump(salones, fp)

def principal():
    llenarS()
    obtener()
    obtener8A()
    escribir()
    saloness.escribir()