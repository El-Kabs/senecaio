<template>
    <vs-sidebar :reduce="reduce" :reduce-not-hover-expand="notExpand" :hidden-background="hbackground" parent=".PEnsumApp" default-index="1" color="primary" class="sidebarx" spacer v-model="active">
        <vs-sidebar-group vs-icon="search" title="Buscar" class="sidebar-group">
            <vs-input vs-icon="search" placeholder="Buscar" v-model="search" class="searchinput" v-on:keyup="searchquery"/>
            <Materia class="materia" v-for="resultado in resultados" v-bind:key="resultado.cod+resultado.title" v-bind:title="resultado.title" v-bind:datos="resultado" v-bind:drag="drag"/>
        </vs-sidebar-group>
    </vs-sidebar>
</template>

<script>
import Materia from "@/components/PensumApp/Base/Materia";
export default {
  name: "SidebarPA",
  components: {
    Materia
  },
  data() {
    return {
      search: "",
      active: true,
      hbackground: true,
      reduce: true,
      notExpand: false,
      colore: "#fcdd00",
      materias: Object,
      resultados: Object,
      drag: true
    };
  },
  mounted: function() {
    const _this = this;
    fetch(
      "https://raw.githubusercontent.com/El-Kabs/pensumapp2/master/scrap/materiasFinal.json",
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
  methods: {
    searchquery: function(event) {
      const _this = this;
      if (_this.search.length > 3) {
        var arr = _this.materias["records"];
        _this.resultados = arr.filter(function(item) {
          return (
            item.depto.toUpperCase() === _this.search.toUpperCase() ||
            item.title.toUpperCase() === _this.search.toUpperCase() ||
            item.title.toUpperCase().startsWith(_this.search.toUpperCase())
          );
        });
        return arr.filter(function(item) {
          return (
            item.depto.toUpperCase() === _this.search.toUpperCase() ||
            item.title.toUpperCase() === _this.search.toUpperCase() ||
            item.title.toUpperCase().startsWith(_this.search.toUpperCase())
          );
        });
      }
    },
    chooseColor: function(title){
      
    }
  }
};
</script>

<style scoped>
.sidebarx{
  margin-top: 39px!important;
  height: 100%;
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

.materia{
  width: 70%;
}
</style>
