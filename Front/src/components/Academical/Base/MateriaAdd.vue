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
  getTexto
} from "@/utils.js";
export default {
  data() {
    return {
      colorB: String,
      h: window.innerHeight, 
      w: window.innerWidth
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
        "#F2F2F2",
        "#F2E963",
        "#F2B544",
        "#F2A03D",
        "#EA9674",
        "#FCBC80",
        "#F7E29C",
        "#A4EDE6",
        "#E1F9F7",
        "#FFFFFF"
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
      var texto = getTexto(_this.datos)
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: _this.datos.title,
        text: texto,
        accept: _this.delete,
        acceptText: "Eliminar",
        cancelText: "Cancelar"
      });
      
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
    delete: function(color){
      const _this = this;
      this.$root.$emit("QuitarMateriaBarra", _this.datos);
      this.$root.$emit("QuitarMateriaCalendario", _this.datos);
      this.$vs.notify({
        color: "danger",
        title: "Materia eliminada",
        text: "La materia fue eliminada."
      });
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
  width: 80%;
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
