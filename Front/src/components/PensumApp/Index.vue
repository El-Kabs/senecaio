<template>
    <div class="PensumApp">

      <vue-headful
            title="Seneca.io - PensumApp"
            description="Seneca.io - PensumApp"
        />

        <h1>PensumApp</h1>
        
        <Pool v-bind:titulo=element.titulo v-for="element in pools" v-bind:key="element.titulo"/>
        <div class = "botones">
          <a href="#PensumApp" v-smooth-scroll="{ duration: 2000, offset:-50 }">
          <vs-button id="PensumApp" color="danger" vs-size="large" vs-type="filled" icon="add" class="botonAddSem"  v-on:click="addSemestre"></vs-button>
          </a>
          <vs-button color="danger" vs-size="large" vs-type="filled" icon="remove" class="botonRemSem" v-on:click="removeSemestre"></vs-button>
        </div>
    </div>
</template>

<script>
import SidebarPA from "@/components/PensumApp/SidebarPA";
import Espacio from "@/components/PensumApp/Base/Espacio";
import Materia from "@/components/PensumApp/Base/Materia";
import Pool from "@/components/PensumApp/Base/Pool";
import {removeDuplicatesTitle} from "@/utils.js";
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
      pools: [],
      guardar: []
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
  salir: function(event){
    const _this = this;
    },
  },
  beforeDestroy: function(event){
    const _this = this;
  },
  created() {
      window.addEventListener('beforeunload', this.salir)
    },
  mounted: function() {
    const _this = this;
    

    if(localStorage.pensumAppN){
      _this.cuantos = localStorage.pensumAppN
    }

    for (let indice = 1; indice <= _this.cuantos; indice++) {
      var poolI = {};
      poolI["titulo"] = indice + _this.placeholder;
      _this.pools.push(poolI);
    }
  

    _this.$root.$on("exportFinal", function(data) {
      _this.guardar.push(data);
    });
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
.botones {
  display: table;
  margin: 0 auto;
}
</style>
