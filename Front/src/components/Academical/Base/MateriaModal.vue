<template>
    <vs-button class = "botonhijodeperra" :style="styling" color=colorB vs-type="filled" v-on:click="seleccion">
        <b class="titulo"> {{ toUp(title.toLowerCase()) }} </b><br>
        {{datos.creditos}} Créditos <br>
        <span class="profesor">{{toUpProfesor(datos.profesores[0])}}</span><br>
        NRC: {{datos.nrc}} <br>
        <b>Cupos: {{datos.cupos}}</b>
    </vs-button>
</template>

<script>
import {
  getTexto,
  tieneComplementarias
} from "@/utils.js";
export default {
  data() {
    return {
      colorB: String
    };
  },
  props: {
    title: String,
    datos: Object,
    drag: Boolean
  },
  computed: {
    styling: function() {
      const _this = this;
      var formado = _this.title
      var colors = [
        "#305473",
        "#F2E963",
        "#F2B544",
        "#F2A03D",
        "#EA9674",
        "#FCBC80",
        "#F7E29C",
        "#A4EDE6",
        "#E1F9F7",
      ];
      var hash = 13;
      for (var i = 0; i < formado.length; i++) {
        hash = _this.title.charCodeAt(i) + (hash << 17) - hash;
      }
      // Calculate color
      var index = Math.abs(hash % colors.length);
      _this.colorB = colors[index];
      _this.datos["color"] = _this.colorB;
      return {
        background: _this.colorB
      };
    }
  },
  methods: {
    seleccion: function (event){
      const _this = this;
      var url = "http://senecacupos.herokuapp.com/profesor?profe="+_this.datos.profesores[0]
      fetch(url, {
        method: 'GET'
      }).then(res => res.text()).then(json => {
      _this.datos["calificacion"] = JSON.parse(json.replace(/'/g, '"'))
      var texto = getTexto(_this.datos)
      var tieneComplementaria = tieneComplementarias(_this.datos)
      _this.$vs.dialog({
        type: "confirm",
        color: "success",
        title: _this.datos.title,
        text: texto,
        accept: _this.accept,
        acceptText: "Agregar",
        cancelText: "Cancelar"
      });
      
      })
    },
    accept(color) {
      const _this = this;
      _this.datos["titulo"] = _this.titulo
      this.$root.$emit("AgregarMateriaBarra", _this.datos);
      this.$root.$emit("CerrarModal", _this.datos);
    },
    toUp: function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toUpProfesor: function capitalizeFirstLetter(string) {
        if(string == undefined){
            return "Sin profesor asignado"
        }
        else{
            string = string.toLowerCase();
            return string.charAt(0).toUpperCase() + string.slice(1);
        }            
    },
    checkInCalendar: function (event){
      const _this = this;
      this.$root.$emit("MirarMateriaBarra", _this.datos);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito');
.botonhijodeperra {
  font-family: "Nunito", sans-serif;
  display: block;
  border-radius: 10px;
  position: relative;
  text-align: center;
  color: black;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-top: 15px;
  margin-bottom: 10px;
  width: 85%;
  height: 10%;
}
.botonhijodeperra:hover {
  box-shadow: 0 2px 25px -8px black !important;
}
.profesor{
    text-transform: capitalize;   
}
.titulo{
    font-size: 15px;
}
</style>
