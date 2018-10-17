<template>
    <vs-button class = "botonhijodeperra" :style="styling" color=colorB vs-type="filled" v-on:click="borrar">
        {{title}}
    </vs-button>
</template>

<script>
export default {
  data() {
    return {
      colorB: String,
      activeConfirm: false
    };
  },
  props: {
    title: String,
    datos: Object,
    titulo: ''
  },
  computed: {
    styling: function() {
      const _this = this;
      _this.colorB = _this.datos["color"];
      return {
        background: _this.colorB
      };
    }
  },
  methods: {
    borrar() {
      const _this = this;
      var texto = ''
      texto+="Departamento: "+_this.datos.depto+ " \nCreditos: "+_this.datos.credits
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: _this.datos.title,
        text: texto,
        accept: _this.accept,
        acceptText: "Eliminar",
        cancelText: "Cancelar"
      });
    },
    accept(color) {
      const _this = this;
      _this.datos["titulo"] = _this.titulo
      this.$root.$emit("borrarMateria", _this.datos);
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

.botonhijodeperra {
  font-family: "Nunito", sans-serif;
  display: inline-block;
  border-radius: 10px;
  position: relative;
  text-align: center;
  vertical-align: top;
  color: black;
  margin-left: 6px !important;
  margin-right: 5px !important;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 176px;
  height: 142px;
}
.botonhijodeperra:hover {
  box-shadow: 0 2px 25px -8px black !important;
}
</style>
