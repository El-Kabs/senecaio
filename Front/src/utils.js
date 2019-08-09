import moment from "moment";

export function formatoHora(data) {
  try {
    return [data.slice(0, 2), ":", data.slice(2)].join("");
  } catch (e) {
    return "00:00";
  }
}

function formatoHoraA(data) {
  try {
    return [data.slice(0, 2), ":", data.slice(2)].join("");
  } catch (e) {
    return "00:00";
  }
}

export function darFechasPorDia(inicio, fin, dia) {
  var start = moment(inicio),
    end = moment(fin),
    day = dia;

  var result = [];
  var current = start.clone();

  while (current.day(7 + day).isBefore(end)) {
    result.push(current.clone());
  }
  return result;
}
export function restarInicio(fecha) {
  return moment(fecha, ["DD-MMM-YYYY", "D-MMM-YYYY"]).subtract(7, "d");
}
export function agregarFinal(fecha) {
  return moment(fecha, ["DD-MMM-YYYY", "D-MMM-YYYY"]).add(1, "d");
}
export function decidirDia(dia) {
  if (dia === "L") {
    return 1;
  } else if (dia === "M") {
    return 2;
  } else if (dia === "I") {
    return 3;
  } else if (dia === "J") {
    return 4;
  } else if (dia === "V") {
    return 5;
  } else if (dia === "S") {
    return 6;
  } else if (dia === "D") {
    return 7;
  }
}
export function calcularFechas(data) {
  var diasFinal = [];

  var fechaInicio = restarInicio(data.fecha_inicio);
  var fechaFin = agregarFinal(data.fecha_fin);

  data.dias.forEach(elementb => {
    var dia = decidirDia(elementb);
    diasFinal.push(darFechasPorDia(fechaInicio, fechaFin, dia));
  });
  return diasFinal;
}

export function checkFechas(fechasMirar, fechasEvents) {
  for (let index = 0; index < fechasEvents.length; index++) {
    for (let indexb = 0; indexb < fechasMirar.length; indexb++) {
      if (
        !(
          moment(fechasMirar[indexb].start) >=
          moment(fechasEvents[index].end) ||
          moment(fechasMirar[indexb].end) <= moment(fechasEvents[index].start)
        )
      ) {
        return false;
      }
    }
  }
  return true;
}

export function removeDuplicates(arr) {
  let unique = [...new Set(arr)];
  arr = unique;
  var dups = [];
  var arrb = arr.filter(function (el) {
    if (dups.indexOf(el.nrc) == -1) {
      dups.push(el.nrc);
      return true;
    }
    return false;
  });
  return arrb;
}

export function darTiempo(tiempo) {
  if (tiempo === "Disponible") {
    return 0;
  } else {
    tiempo = parseInt(tiempo.split(" Minutos")[0]);
    return tiempo
  }
}

function esDia(diaActual, clase) {
  var retorno = false
  if ((diaActual === 1) && (clase['l'] !== null)) {
    return true
  }
  else if ((diaActual === 2) && (clase['m'] !== null)) {
    return true
  }
  else if ((diaActual === 3) && (clase['i'] !== null)) {
    return true
  }
  else if ((diaActual === 4) && (clase['j'] !== null)) {
    return true
  }
  else if ((diaActual === 5) && (clase['v'] !== null)) {
    return true
  }
  else if ((diaActual === 6) && (clase['s'] !== null)) {
    return true
  }

}

function recursion(key, clases) {
  if (clases[key++] !== undefined) {

  }
}

function comparacion(clases) {

  var hora = ''
  if (new Date().getMinutes() < 10) {
    hora = new Date().getHours() + '0' + new Date().getMinutes()

  }
  else {
    hora = new Date().getHours() + '' + new Date().getMinutes()
  }

  var horaN = hora.substr(0, 2) + ':' + hora.substr(2, hora.length)

  var minutos = horaN.split(':')[1]
  var horas = horaN.split(':')[0]
  var horaFinalF = new Date()
  horaFinalF.setHours(horas)
  horaFinalF.setMinutes(minutos)

  clases.sort(function (a, b) {
    if (a.time_ini < b.time_ini) {
      return -1;
    }
    if (a.time_ini > b.time_ini) {
      return 1;
    }
    return 0;
  })
  for (var key in clases) {
    try {
      var horaBienFin = clases[key]['time_fin'].toString().substr(0, 2) + ':' + clases[key]['time_fin'].toString().substr(2, clases[key]['time_fin'].toString().length)
      var minutosClase = horaBienFin.split(':')[1]
      var horasClase = horaBienFin.split(':')[0]
      var horaBienFinal = new Date()
      horaBienFinal.setHours(horasClase)
      horaBienFinal.setMinutes(minutosClase)
      if (hora > clases[key]['time_ini'] && clases[key]['time_fin'] > hora) {
        console.log(clases[key])
        return parseInt((Math.abs(horaBienFinal - horaFinalF) / 36e5) * 60)
      }
      else if (hora > clases[key]['time_fin'] && clases[key++]['time_ini'] > hora) {
        var horaBienFinB = clases[key++]['time_fin'].toString().substr(0, 2) + ':' + clases[key++]['time_fin'].toString().substr(2, clases[key++]['time_fin'].toString().length)
        var minutosClaseB = horaBienFinB.split(':')[1]
        var horasClaseB = horaBienFinB.split(':')[0]
        var horaBienFinalB = new Date()
        horaBienFinalB.setHours(horasClaseB)
        horaBienFinalB.setMinutes(minutosClaseB)
        return parseInt((Math.abs(horaBienFinalB - horaFinalF) / 36e5) * 60)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
}

export function darTiempoRestante(horarios, llave) {
  var aComparar = []
  horarios.forEach(element => {
    for (var key in element) {
      for (var keyB in element[key]) {
        var salonComparar = element[key][keyB]['classroom'].replace('.', '')
        if (salonComparar === llave) {
          try {
            var fecha = Date.now()
            var diaSemana = new Date().getDay()
            var fechaSalon = new Date(element[key][keyB]['date_ini']).getTime()
            var fechaSalonFin = new Date(element[key][keyB]['date_fin']).getTime()
            if (fecha > fechaSalon && fechaSalonFin > fecha) {
              if (esDia(diaSemana, element[key][keyB])) {
                aComparar.push(element[key][keyB])
              }
            }
          } catch (err) {
            console.log(err)
          }

        }
      }
    }
  })
  return comparacion(aComparar)
}

export function removeDuplicatesTitle(arr) {
  let unique = [...new Set(arr)];
  arr = unique;
  var dups = [];
  var arrb = arr.filter(function (el) {
    if (dups.indexOf(el.title + el.semestre) == -1) {
      dups.push(el.title + el.semestre);
      return true;
    }
    return false;
  });
  return arrb;
}

export function removeNulls(arr) {
  var filtered = arr.filter(function (el) {
    return el != null;
  });
  return filtered;
}

function darDia(str) {
  if (str === "L") {
    return "Lunes";
  } else if (str === "M") {
    return "Martes";
  } else if (str === "I") {
    return "Miercoles";
  } else if (str === "J") {
    return "Jueves";
  } else if (str === "V") {
    return "Viernes";
  } else if (str === "S") {
    return "Sabado";
  } else if (str === "D") {
    return "Domingo";
  }
}

export function getTexto(data) {
  var texto = "";
  var prer = "";
  var core = "";
  var tipo = "";
  var horarios = "";
  for (let i = 0; i < data.prereq.length; i++) {
    prer += data.prereq[i];
  }
  for (let i = 0; i < data.coreq.length; i++) {
    var estructura = data.coreq[i].subject + data.coreq[i].number;
    core += estructura;
  }
  if (prer === "") prer = "Ninguno";
  if (core === "") core = "Ninguno";
  if (data.tipo == "1") {
    tipo = "Todo el semestre.";
  } else if (data.tipo == "8A") {
    tipo = "Primeras 8 semanas.";
  } else if (data.tipo == "8B") {
    tipo = "Últimas 8 semanas.";
  } else {
    tipo = "21 Semanas medicina.";
  }
  for (let index = 0; index < data.horarios.length; index++) {
    const element = data.horarios[index];
    const dias = element.dias;
    let edificio = "";
    let salon = "";
    let diasS = "";
    for (let b = 0; b < dias.length; b++) {
      const elementb = dias[b];
      diasS += darDia(elementb) + " - ";
    }
    diasS = diasS.substring(0, diasS.length - 2);
    if (element.edificio === "- -") {
      edificio = "sin asignar";
    }
    if (element.salon === "- -") {
      salon = "sin asignar";
    }
    if (edificio === "sin asignar" && salon === "sin asignar") {
      salon = "";
    }
    let horaInicio = "";
    horaInicio = formatoHoraA(element.hora_inicio);
    let horaFinal = "";
    horaFinal = formatoHoraA(element.hora_fin);
    horarios +=
      diasS +
      " en " +
      edificio +
      salon +
      " de " +
      horaInicio +
      " a " +
      horaFinal +
      ".";
  }
  let compleme = "";
  for (let index = 0; index < data.compl.length; index++) {
    compleme += "NRC " + data.compl[index] + ", ";
  }
  compleme = compleme.substring(0, compleme.length - 2);
  if (compleme === "") {
    compleme = "Sin complementaria.";
  }

  let profe = data.profesores[0];

  if (profe === undefined) {
    profe = "Sin asignar.";
  }

  texto += "Código: " + data.depto + data.curso;
  texto += "\nNRC: " + data.nrc;
  texto += "\n" + tipo;
  texto += "\nCupos: " + data.cupos;
  texto += "\nSección: " + data.seccion;
  texto += "\nPrerrequisitos: " + prer + "\nCorrequisitos: " + core;
  texto += "\nProfesor: " + profe;
  texto +=
    "\nCalificación promedio del profesor: " + data.calificacion.promedio;
  texto += "\nNota promedio con este profesor: " + data.calificacion.nota;
  texto += "\n" + horarios;
  return texto.trim();
}

export function tieneComplementarias(data) {
  if (data.compl.length >= 1) {
    return true;
  } else return false;
}
