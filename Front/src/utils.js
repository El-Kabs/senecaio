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

export function checkFechas(fechasMirar, fechasEvents){
  for (let index = 0; index < fechasEvents.length; index++){
    for (let indexb = 0; indexb < fechasMirar.length; indexb++) {
      if(!(moment(fechasMirar[indexb].start) >= moment(fechasEvents[index].end) || moment(fechasMirar[indexb].end) <= moment(fechasEvents[index].start))){
        console.log("Fechas mirar: " + fechasMirar[indexb].start);
        console.log("Fechas eventos: " + fechasEvents[index].start);
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
  var arrb = arr.filter(function(el) {
    if (dups.indexOf(el.nrc) == -1) {
      dups.push(el.nrc);
      return true;
    }
    return false;
  });
  return arrb;
}

function darDia(str){
  if(str==='L'){
    return "Lunes"
  }
  else if(str==='M'){
    return "Martes"
  }
  else if(str==='I'){
    return "Miercoles"
  }
  else if(str==='J'){
    return "Jueves"
  }
  else if(str==='V'){
    return "Viernes"
  }
  else if(str==='S'){
    return "Sabado"
  }
  else if(str==='D'){
    return "Domingo"
  }
}

export function getTexto(data) {
  var texto = "";
  var prer = "";
  var core = "";
  var tipo = "";
  var horarios = "";
  console.log(data);
  for (let i = 0; i < data.prereq.length; i++) {
    prer += data.prereq[i];
  }
  for (let i = 0; i < data.coreq.length; i++) {
    var estructura = data.coreq[i].subject + data.coreq[i].number;
    core += estructura;
  }
  if (prer === "") prer = "Ninguno";
  if (core === "") core = "Ninguno";
  if(data.tipo == '1'){
    tipo="Todo el semestre."
  }
  else if(data.tipo == '8A'){
    tipo = "Primeras 8 semanas."
  }
  else if(data.tipo == '8B'){
    tipo = "Últimas 8 semanas."
  }
  else{
    tipo = "21 Semanas medicina."
  }
  for (let index = 0; index < data.horarios.length; index++) {
    const element = data.horarios[index];
    const dias = element.dias;
    let edificio = ""
    let salon = ""
    let diasS = ""
    for (let b = 0; b < dias.length; b++) {
      const elementb = dias[b];
      diasS+=darDia(elementb)+' - ';
    }
    diasS = diasS.substring(0, diasS.length - 2)
    if(element.edificio==='- -'){
      edificio = "sin asignar"
    }
    if(element.salon==='- -'){
      salon = "sin asignar"
    }
    if(edificio === "sin asignar" && salon === 'sin asignar'){
      salon = ''
    }
    let horaInicio = ""
    horaInicio = formatoHoraA(element.hora_inicio)
    let horaFinal = ""
    horaFinal = formatoHoraA(element.hora_fin)
    horarios += diasS + " en "+edificio+salon+" de "+horaInicio+" a "+horaFinal+"."
  }
  let compleme = ""
  for(let index = 0; index<data.compl.length; index++){
    console.log(data.compl[index])
    compleme+="NRC "+data.compl[index]+", "
  }
  compleme = compleme.substring(0, compleme.length-2);
  if(compleme===""){
    compleme="Sin complementaria."
  }

  let profe = data.profesores[0]

  if(profe===undefined){
    profe = "Sin asignar."
  }
  

  texto += "Código: " + data.depto + data.curso;
  texto += "\nNRC: " + data.nrc;
  texto += "\n" + tipo;
  texto += "\nCupos: "+data.cupos
  texto += "\nSección: "+data.seccion
  texto += "\nPrerrequisitos: " + prer+ "\nCorrequisitos: "+ core
  texto += "\nProfesor: "+profe
  texto += "\nCalificación promedio del profesor: "+data.calificacion.promedio
  texto += "\nNota promedio con este profesor: "+data.calificacion.nota
  texto += "\n"+horarios
  return texto.trim();
}

export function tieneComplementarias(data){
  console.log(data)
  if(data.compl.length>=1){
    return true;
  }
  else
    return false;
}
