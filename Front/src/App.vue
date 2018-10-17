<template>
  <div id="app"> 
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from "@/components/Base/Sidebar";

export default {
  components: {
    Sidebar
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
::-webkit-scrollbar {
  width: 0px; /* remove scrollbar space */
  background: transparent; /* optional: just make scrollbar invisible */
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
