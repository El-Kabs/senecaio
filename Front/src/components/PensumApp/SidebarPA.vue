<template>
    <vs-sidebar position-right :reduce="reduce" :reduce-not-hover-expand="notExpand" :hidden-background="hbackground" parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="active">
        <vs-sidebar-group vs-icon="search" title="Buscar" class="sidebar-group">
            <Materia/>
            <vs-input vs-icon="search" placeholder="Buscar" v-model="search" class="searchinput" />
        </vs-sidebar-group>
    </vs-sidebar>
</template>

<script>
import Materia from "@/components/PensumApp/Base/Materia"
export default {
  name: "SidebarPA",
  components: {
    Materia,
  },
  data() {
    return {
      search: '',
      active: true,
      hbackground: true,
      reduce: true,
      notExpand: false,
      colore: '#fcdd00'
    };
  },
  mounted: function (){
      
  }
}
</script>

<style scoped>
.sidebar-group{
    font-family: 'Muli', sans-serif;
}
.searchinput{
    margin: 0 auto;
    font-family: 'Muli', sans-serif;
}
.itemSidebar{
  font-family: 'Muli', sans-serif;
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
  
	border: 0px solid rgba(0,0,0,0) !important;
	border-left: 1px solid rgba(0,0,0,0.07) !important;
	border-radius: 0px !important;
}
</style>
