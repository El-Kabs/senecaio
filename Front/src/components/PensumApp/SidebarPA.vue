<template>
    <vs-sidebar click-not-close :reduce="reduce" :reduce-not-hover-expand="notExpand" :hidden-background="hbackground" parent="body" default-index="1" color="primary" v-model="active">
        <vs-sidebar-group icon="search" title="Buscar" class="sidebar-group">
            <vs-input icon="search" placeholder="Buscar" v-model="search" class="searchinput" v-on:keyup="searchquery"/>
            <fold v-if="isLoading" v-bind:loading="isLoading" color="#FFE080" ></fold>
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
      active: false,
      hbackground: true,
      reduce: true,
      notExpand: false,
      colore: "#fcdd00",
      materias: Object,
      resultados: Object,
      drag: true,
      isLoading: false
    };
  },
  mounted: function() {
    const _this = this;
    if(_this.$route.path==="/PensumApp"){
      _this.active=true;
    }
    _this.$root.$on("openSidebar", function(data){
      _this.active = true;
    });
    _this.$root.$on("closeSidebar", function(data){
      _this.active = false;
    });
    fetch(
      "https://senecacupos.herokuapp.com/pensum",
      {
        method: "GET"
      }
    )
      .then(res => res.text())
      .then(json => {
        const parsed = JSON.parse(json.replace(/'/g, '"'));
        _this.materias = parsed;
        _this.isLoading = false;
      });
  },
  methods: {
    searchquery: function(event) {
      const _this = this;
      if (_this.search.length > 3) {
        var arr = _this.materias["records"];
        arr = arr.filter(function(item) {
          return (
            item.depto.toUpperCase() === _this.search.toUpperCase() ||
            item.title.toUpperCase() === _this.search.toUpperCase() ||
            item.title.toUpperCase().startsWith(_this.search.toUpperCase()) ||
            item.title.toUpperCase().includes(_this.search.toUpperCase()) ||
            (item.depto.toUpperCase()+item.cod.toUpperCase()).startsWith(_this.search.toUpperCase())
          );
        });
        let unique = [...new Set(arr)]; 
        arr = unique;
        var dups = [];
        var arrb = arr.filter(function(el) {
          if (dups.indexOf(el.nrc) == -1) {
            return true;
          }
          return false;
        });
        _this.resultados = arrb;
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
