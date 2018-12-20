import moment from "moment";

export function formatoHora(data) {
  return [data.slice(0, 2), ":", data.slice(2)].join("");
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
