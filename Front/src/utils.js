import moment from "moment";

export function formatoHora(data) {
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
  return moment(fecha).subtract(7, "d");
}
export function agregarFinal(fecha) {
  return moment(fecha).add(1, "d");
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
  var encontrado = false;
  for (let index = 0; index < fechasEvents.length || encontrado; index++) {
    const element = moment(fechasEvents[index].start);
    const elementFinal = moment(fechasEvents[index].end);
    for (let indexb = 0; indexb < fechasMirar.length; indexb++) {
      const elementb = moment(fechasMirar[indexb].start);
      const elementbFinal = moment(fechasMirar[indexb].end);
      if (element.isSame(elementb, "day")) {
        if (element.hour() === elementb.hour()) {
          if (element.minute() === elementb.minute()) {
            console.log("Fechas mirar: " + fechasMirar[indexb].start);
            console.log("Fechas eventos: " + fechasEvents[index].start);
            encontrado = true;
            return false;
          }
        }
      }
      else if(elementFinal.isSame(elementbFinal, "day")){
        if (elementFinal.hour() === elementbFinal.hour()) {
          if (elementFinal.minute() === elementbFinal.minute()) {
            console.log("Fechas mirar: " + fechasMirar[indexb].start);
            console.log("Fechas eventos: " + fechasEvents[index].start);
            encontrado = true;
            return false;
          }
        }
      }else{
        if((elementb.isAfter(element)) && (elementbFinal.isBefore(elementFinal))){
          encontrado = true;
          return false;
        }
      }
    }
  }
  return true;
}

export function removeDuplicates(arr){
  let unique = [...new Set(arr)]; 
  arr = unique;
  var dups = [];
  var arrb = arr.filter(function(el) {
    if (dups.indexOf(el.nrc) == -1) {
      dups.push(el.nrc);
      return true;
    }
    return false;
  });
  return arrb;
}