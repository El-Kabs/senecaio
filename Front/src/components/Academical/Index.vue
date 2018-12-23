<template>
  <div class="Academical">
    <Modal>
    </Modal>
    <div class="Calendario">
      <full-calendar ref="calendar" :config="config" :events="events" @event-selected="eventSelected"/>
    </div>
  </div>
</template>

<script>
import SidebarA from "@/components/Academical/SidebarA";
import moment from "moment";
import FullCalendar from 'vue-full-calendar'
import Modal from '@/components/Academical/Base/ModalCompl'
import VModal from 'vue-js-modal'
import {
  formatoHora,
  darFechasPorDia,
  restarInicio,
  agregarFinal,
  decidirDia,
  calcularFechas,
  checkFechas,
  getTexto,
  tieneComplementarias
} from "@/utils.js";

export default {
  name: "IndexAcademical",
  components: {
    Modal
  },
  data() {
    return {
      config: {
        header: {
          left: "prev",
          center: "title",
          right: "next"
        },
        allDaySlot: false,
        minTime: "06:00:00",
        maxTime: "22:00:00",
        nowIndicator: true,
        locale: "es",
        titleFormat: "DD MMMM YYYY",
        columnFormat: "dddd - D",
        defaultDate: "2019-01-21",
        ultimoEvent: Object,
        overlap: false,
      },
      events: new Array()
    };
  },
  mounted: function() {
    const _this = this;
    
    
    if(localStorage.academicalCalendario){
      var arreglo = JSON.parse(localStorage.academicalCalendario);
      for (let index = 0; index < arreglo.length; index++) {
        const element = arreglo[index];
        _this.events.push(element);
      }
    }
    _this.$root.$on("QuitarMateriaBarra", function(data) {
      var index = _this.events.indexOf(data);
      if (index > -1) {
        _this.events.splice(index, 1);
      }
    });
    _this.$root.$on("AgregarMateriaBarra", function(data) {
      _this.agregarFechas(data);
    });
    _this.$root.$on("MirarMateriaBarra", function(data) {
      _this.checkInCalendar(data);
    });
    _this.$root.$on("QuitarMateriaCalendario", function(data) {
      _this.deleteCalendar(data);
    });
  },
  beforeDestroy: function(event){
    const _this = this;
    localStorage.academicalCalendario = JSON.stringify(_this.events);
  },
  created() {
      window.addEventListener('beforeunload', this.salir)
    },
  methods: {
    salir: function(event){
      const _this = this;
      localStorage.academicalCalendario = JSON.stringify(_this.events);
    },
    eventSelected: function(event) {
      const _this = this;
      _this.ultimoEvent = event;
      var texto = getTexto(event.data);
      this.$vs.dialog({
        type: "confirm",
        color: "primary",
        title: "Información de "+event.data.title,
        text: texto,
        accept: _this.delete,
        acceptText: "Abrir en losestudiantes.co",
        cancelText: "Cancelar"
      });
    },
    deleteCalendar: function(data) {
      const _this = this;
      try {
        let event = _this.ultimoEvent;
        var arr = _this.events;
        var b = arr.filter(function(item) {
          return (
            item.data.nrc === event.data.nrc &&
            item.data.title.toUpperCase() === event.data.title.toUpperCase()
          );
        });
        _this.events = _this.events.filter(el => !b.includes(el));
        _this.ultimoEvent = Object;
        _this.$root.$emit("QuitarMateriaBarra", event.data);
      } catch (err) {
        let event = data;
        var arr = _this.events;
        var b = arr.filter(function(item) {
          return (
            item.data.nrc === event.nrc &&
            item.data.title.toUpperCase() === event.title.toUpperCase()
          );
        });
        _this.events = _this.events.filter(el => !b.includes(el));
        _this.$root.$emit("QuitarMateriaBarra", event.data);
      }
    },
    delete: function(color) {
      let url = ""
      const _this = this;
      url = 'https://losestudiantes.co/universidad-de-los-andes/'+_this.ultimoEvent.data.calificacion.depto+'/profesores/'+_this.ultimoEvent.data.calificacion.prof
      window.open(url,'_blank');
    },
    agregarFechas: function(data) {
      const _this = this;
      var fechas = [];
      data.horarios.forEach(element => {
        var horaInicio = formatoHora(element.hora_inicio);
        var horaFin = formatoHora(element.hora_fin);
        var horaInicioHora = horaInicio.split(":")[0];
        var horaInicioMinutos = horaInicio.split(":")[1];
        var horaFinHora = horaFin.split(":")[0];
        var horaFinMinutos = horaFin.split(":")[1];
        calcularFechas(element).forEach(elementb => {
          elementb.forEach(elementc => {
            var inicio = moment(elementc)
              .add(horaInicioHora, "hours")
              .add(horaInicioMinutos, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
            var final = moment(elementc)
              .add(horaFinHora, "hours")
              .add(horaFinMinutos, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
            var fecha = {
              start: inicio,
              end: final,
              title: data.title,
              backgroundColor: data.color,
              borderColor: "black",
              editable: false,
              overlap: false,
              data: data,
              textColor: "black"
            };
            fechas.push(fecha)
          });
        });
      });
      let chequeo = checkFechas(fechas, _this.events)
      let chequeoTwo = tieneComplementarias(data);

      if(chequeo){
        for (let index = 0; index < fechas.length; index++) {
          const element = fechas[index];
          _this.events.push(element);
        }
        if(chequeoTwo){
          console.log("Segundo chequeo")
          this.$modal.show('error-modal', {'complementarias': data.compl});
          this.$root.$emit("AgregarMateriaBarraB", data);
          this.$vs.notify({
            color: "success",
            title: "Materia agregada",
            text: "La materia fue agregada."
          });
        }
        else{
          this.$root.$emit("AgregarMateriaBarraB", data);
          this.$vs.notify({
            color: "success",
            title: "Materia agregada",
            text: "La materia fue agregada."
          });
        }
      }
      else if(!chequeo){
        this.$vs.notify({
        color: "danger",
        title: "Materia no agregada",
        text: "La materia presenta un conflicto de horario."
      });
      }      
    },
    checkInCalendar: function(data) {
      const _this = this;
      var fechas = [];
      data.horarios.forEach(element => {
        var horaInicio = formatoHora(element.hora_inicio);
        var horaFin = formatoHora(element.hora_fin);
        var horaInicioHora = horaInicio.split(":")[0];
        var horaInicioMinutos = horaInicio.split(":")[1];
        var horaFinHora = horaFin.split(":")[0];
        var horaFinMinutos = horaFin.split(":")[1];
        calcularFechas(element).forEach(elementb => {
          elementb.forEach(elementc => {
            var inicio = moment(elementc)
              .add(horaInicioHora, "hours")
              .add(horaInicioMinutos, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
            var final = moment(elementc)
              .add(horaFinHora, "hours")
              .add(horaFinMinutos, "minutes")
              .format("YYYY-MM-DD HH:mm:ss");
            var fecha = {
              start: inicio,
              end: final,
              title: data.title,
              backgroundColor: data.color,
              borderColor: "black",
              editable: false,
              overlap: false,
              data: data,
              textColor: "black"
            };
            _this.events.push(fecha);
          });
        });
      });
    },
  }
};
</script>

<style scoped>
.Academical {
  padding-top: 65px;
}

.Calendario {
  width: 70%;
  margin: 0 auto;
}
</style>
