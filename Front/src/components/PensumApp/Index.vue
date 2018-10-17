<template>
    <div class="PensumApp">
        <SidebarPA/>
        <h1>Prueba</h1>
        <Pool v-bind:titulo=element.titulo v-for="element in pools" v-bind:key="element.titulo"/>
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
    Pool,
  },
  data() {
    return {
      cuantos: 8,
      placeholder: '° Semestre',
      pools: []
    };
  },
  methods: {
  },
  mounted:function(){
    const _this = this;
    
    for(let indice = 1; indice<=_this.cuantos; indice++){
      var poolI = {}
      poolI["titulo"] = indice + _this.placeholder;
      console.log(poolI)
      _this.pools.push(poolI)
    }
    console.log(_this.pools)
  }
};
</script>

<style scoped>
</style>
