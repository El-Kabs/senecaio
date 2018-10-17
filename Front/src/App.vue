<template>
  <div id="app"> 
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from "@/components/Base/Sidebar";
import Navbar from "@/components/Base/Navbar";
export default {
  components: {
    Sidebar,
    Navbar
  },
  name: "App",
  mounted: function() {
    this.$vs.theme({
      primary: "rgb(252, 221, 0)"
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito");
.vs-sidebar{
  margin-top: 39px!important;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
html {
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
}
</style>
