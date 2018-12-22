<template>
    <vs-sidebar click-not-close :reduce="reduce" :reduce-not-hover-expand="notExpand" :hidden-background="hbackground" parent="body" default-index="1" color="primary" v-model="active">
        <vs-sidebar-group vs-icon="search" title="Buscar" class="sidebar-group">
            <vs-input vs-icon="search" placeholder="Buscar" v-model="search" class="searchinput" v-on:keyup="searchquery"/>
            <Materia class="materia" v-for="resultado in resultados" v-bind:key="resultado.nrc+resultado.curso+resultado.title+resultado.seccion" v-bind:title="resultado.title" v-bind:datos="resultado"/>
        </vs-sidebar-group>
        <vs-sidebar-group vs-icon="search" title="Tus materias" class="sidebar-group">
            <MateriaAdd class="materia-add" v-for="resultado in elegidas" v-bind:key="resultado.nrc+resultado.curso+resultado.title+resultado.seccion" v-bind:title="resultado.title" v-bind:datos="resultado"/>
            <span class = "creditos">Creditos totales: {{creditos()}}</span>
        </vs-sidebar-group>
    </vs-sidebar>
</template>

<script>
import Materia from "@/components/Academical/Base/Materia";
import MateriaAdd from "@/components/Academical/Base/MateriaAdd";
import {
  removeDuplicates
} from "@/utils.js";
export default {
  name: "SidebarA",
  components: {
    Materia,
    MateriaAdd
  },
  data() {
    return {
      search: "",
      active: false,
      hbackground: true,
      reduce: true,
      notExpand: false,
      materias: Object,
      resultados: Object,
      colore: "#fcdd00",
      drag: false,
      elegidas: []
    };
  },
  mounted: function(){
    const _this = this;
    
    if(_this.$route.path==="/Academical"){
      _this.active=true;
    }
    _this.$root.$on("openSidebarA", function(data){
      _this.active = true;
      if(localStorage.academical){
      var arreglo = JSON.parse(localStorage.academical);
      for (let index = 0; index < arreglo.length; index++) {
        const element = arreglo[index];
        _this.$root.$emit("AgregarMateriaBarraB", element);
      }
    }
    });
    _this.$root.$on("closeSidebarA", function(data){
      _this.active = false;
      _this.elegidas = []
    });
    _this.$root.$on("AgregarMateriaBarraB", function(data){
      console.log("Entró a agregar materia a barra")
      _this.elegidas.push(data);
      var arre = _this.elegidas
      arre = removeDuplicates(arre);
      _this.elegidas = arre;
      var guardar = JSON.stringify(_this.elegidas);
      localStorage.academical = JSON.stringify(_this.elegidas);
    });
    _this.$root.$on("QuitarMateriaBarra", function(data){
      var index = _this.elegidas.indexOf(data);
      if (index > -1) {
        _this.elegidas.splice(index, 1);
      }
      var guardar = JSON.stringify(_this.elegidas);
      localStorage.academical = JSON.stringify(_this.elegidas);
    });

    if(localStorage.academical){
      var arreglo = JSON.parse(localStorage.academical);
      for (let index = 0; index < arreglo.length; index++) {
        const element = arreglo[index];
        console.log("ANTES DE")
        _this.$root.$emit("AgregarMateriaBarraB", element);
      }
    }
    
    fetch(
      "https://senecacupos.herokuapp.com/",
      {
        method: "GET"
      }
    )
      .then(res => res.text())
      .then(json => {
        const parsed = JSON.parse(json.replace(/'/g, '"'));
        _this.materias = parsed;
      });
  },
  methods:{
    creditos: function(){
      var suma = 0;
      var _this = this;
      _this.elegidas.forEach(function(element) {
        suma = parseInt(suma) + parseInt(element.creditos);
      });
      return suma;
    },
    searchquery: function(event) {
      const _this = this;
      if (_this.search.length >= 3) {
        var arr = _this.materias["records"];
        arr = arr.filter(function(item) {
          return (
            item.depto.toUpperCase() === _this.search.toUpperCase() ||
            item.title.toUpperCase() === _this.search.toUpperCase() ||
            item.title.toUpperCase().startsWith(_this.search.toUpperCase()) ||
            item.nrc.toUpperCase().startsWith(_this.search.toUpperCase()) ||
            item.title.toUpperCase().includes(_this.search.toUpperCase()) ||
            (item.depto.toUpperCase()+item.curso.toUpperCase()).startsWith(_this.search.toUpperCase())
          );
        });
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
        _this.resultados = arrb;
      }
    }
  }
};
</script>

<style scoped>
.sidebarx{
  margin-top: 39px!important;
}
.vs-sidebar{
  margin-top: 39px!important;
}
.sidebar-group {
  align-items: center;
  font-family: 'Nunito', sans-serif;
}
.searchinput {
  margin: 0 auto;
  font-family: 'Nunito', sans-serif;
}
.itemSidebar {
  font-family: 'Nunito', sans-serif;
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}

.header-sidebar h4 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.header-sidebar h4 > button {
  margin-left: 10px;
}

.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.footer-sidebar > button {
  border: 0px solid rgba(0, 0, 0, 0) !important;
  border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
  border-radius: 0px !important;
}

.vs-input{
  margin-bottom: 15px;
}

.creditos{
  font-size: 13px;
  font-family: 'Nunito', sans-serif;
  text-align: left;
}

</style>
