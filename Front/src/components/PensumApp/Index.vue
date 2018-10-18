<template>
    <div class="PensumApp">
        <SidebarPA/>
        <h1>PensumApp</h1>
        
        <Pool v-bind:titulo=element.titulo v-for="element in pools" v-bind:key="element.titulo"/>
        <div class = "botones">
          <vs-button color="danger" vs-size="large" vs-type="filled" vs-icon="face" class="botonAddSem" v-on:click="exportToJson"></vs-button>
          <vs-button color="danger" vs-size="large" vs-type="filled" vs-icon="add" class="botonAddSem" v-on:click="addSemestre"></vs-button>
          <vs-button color="danger" vs-size="large" vs-type="filled" vs-icon="remove" class="botonRemSem" v-on:click="removeSemestre"></vs-button>
        </div>
    </div>
</template>

<script>
import SidebarPA from "@/components/PensumApp/SidebarPA";
import Espacio from "@/components/PensumApp/Base/Espacio";
import Materia from "@/components/PensumApp/Base/Materia";
import Pool from "@/components/PensumApp/Base/Pool";
export default {
  name: "IndexPensum",
  components: {
    Espacio,
    Materia,
    SidebarPA,
    Pool
  },
  data() {
    return {
      cuantos: 8,
      placeholder: "° Semestre",
      pools: []
    };
  },
  methods: {
    addSemestre() {
      const _this = this;
      _this.cuantos++;
      _this.pools = [];
      for (let indice = 1; indice <= _this.cuantos; indice++) {
        var poolI = {};
        poolI["titulo"] = indice + _this.placeholder;
        _this.pools.push(poolI);
      }
    },
    removeSemestre() {
      const _this = this;
      _this.cuantos--;
      if (_this.cuantos === 0) {
        _this.cuantos++;
      }
      _this.pools = [];
      for (let indice = 1; indice <= _this.cuantos; indice++) {
        var poolI = {};
        poolI["titulo"] = indice + _this.placeholder;
        _this.pools.push(poolI);
      }
    },
    exportToJson(){
      console.log("JSON")
      this.$root.$emit("exportToJson", "evento");
    }
  },
  mounted: function() {
    const _this = this;

    for (let indice = 1; indice <= _this.cuantos; indice++) {
      var poolI = {};
      poolI["titulo"] = indice + _this.placeholder;
      console.log(poolI);
      _this.pools.push(poolI);
    }
  }
};
</script>

<style scoped>
.botonAddSem {
  margin-right: 10px;
  margin-top: 25px;
  margin-bottom: 25px;
  background: #00a31d !important;
}
.botonRemSem {
  margin-top: 25px;
  margin-bottom: 25px;
  background: #ed2300 !important;
}
.botones{
  display: table;
  margin: 0 auto;
}
</style>
