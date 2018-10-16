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
    datos: Object
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
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: 'Información',
        text: _this.datos,
        accept: 'this.acceptAlert'
      });
    },
    acceptAlert(color) {
      const _this = this;
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
