<template>
  <div class="Academical">
    <div class="Calendario">
      <full-calendar :config="config" :events="events" @event-selected="eventSelected"/>
    </div>
  </div>
</template>

<script>
import SidebarA from "@/components/Academical/SidebarA";
import moment from "moment";
import {
  formatoHora,
  darFechasPorDia,
  restarInicio,
  agregarFinal,
  decidirDia,
  calcularFechas
} from "@/utils.js";

export default {
  name: "IndexAcademical",
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
      },
      events: new Array()
    };
  },
  mounted: function() {
    const _this = this;
     _this.$root.$on("QuitarMateriaBarra", function(data){
      var index = _this.events.indexOf(data);
      if (index > -1) {
        _this.events.splice(index, 1);
      }
    });
    _this.$root.$on("AgregarMateriaBarra", function(data) {
      _this.agregarFechas(data);
    });
  },
  methods: {
    eventSelected: function(event){
      const _this = this;
      var arr = _this.events;
      var b = arr.filter(function(item) {
          return (
            item.data.nrc === event.data.nrc ||
            item.data.title.toUpperCase() === event.data.title.toUpperCase()
          );
        });
      _this.events = _this.events.filter( ( el ) => !b.includes( el ) );
      _this.$root.$emit("QuitarMateriaBarra", event.data);
    },
    agregarFechas: function(data) {
      const _this = this;
      var fechas = []
      data.horarios.forEach(element => {
        var horaInicio = formatoHora(element.hora_inicio);
        var horaFin = formatoHora(element.hora_fin);
        var horaInicioHora = horaInicio.split(":")[0]
        var horaInicioMinutos = horaInicio.split(":")[1]
        var horaFinHora = horaFin.split(":")[0]
        var horaFinMinutos = horaFin.split(":")[1]
        calcularFechas(element).forEach(elementb => {
          elementb.forEach(elementc => {
            var inicio = moment(elementc).add(horaInicioHora, 'hours').add(horaInicioMinutos, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            var final = moment(elementc).add(horaFinHora, 'hours').add(horaFinMinutos, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            var fecha  = {"start": inicio, "end": final, "title": data.title, "backgroundColor": data.color, "borderColor": "black", "editable": false, "overlap": false, "data": data, "textColor": "black"}
            _this.events.push(fecha);
          })
        })
      });
    }
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
