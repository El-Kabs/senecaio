<template>
  <div id="app"> 
    <Navbar/>
    <SidebarPA/>
    <SidebarA/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from "@/components/Base/Sidebar";
import Navbar from "@/components/Base/Navbar";
import SidebarPA from "@/components/PensumApp/SidebarPA"
import SidebarA from "@/components/Academical/SidebarA"
export default {
  components: {
    Sidebar,
    Navbar,
    SidebarPA,
    SidebarA
  },
  name: "App",
  mounted: function() {
    this.$vs.theme({
      primary: "rgb(252, 221, 0)",
      success: "rgb(0, 255, 46)"
    });
  },
  data(){
    return{
      events: new Array()
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito:300');
.vs-sidebar{
  margin-top: 39px!important;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
html {
  margin-top: 35px!important;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
}
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content-noti {
  font-family: "Nunito", sans-serif !important;
}
.vs-dialog {
  font-family: "Nunito", sans-serif !important;
  white-space: pre-line;
}
.vs-dialog-text{
  margin-top: -20px;
}
.fc-content{
  cursor: pointer;
}
</style>
