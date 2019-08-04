<template>
  <div class="con-type-example">
    <vs-navbar :type="type" :color="colorx" v-model="activeItem" class="nabarx">
      <vs-navbar-title>
        Seneca.io
      </vs-navbar-title>

      <vs-spacer></vs-spacer>

      <vs-navbar-item index="4" >
        <a href="#" v-on:click="login" v-if="!isAuth">Login</a>
      </vs-navbar-item>

      <vs-navbar-item index="1" icon="group" class="itemNavbar"  v-on:click="sobreCupo" v-if="isAuth"> 
        <a v-on:click="sobreCupo">Sobrecupo</a>
      </vs-navbar-item>
      <vs-navbar-item index="2" icon="today" class="itemNavbar"  v-on:click="academical" v-if="isAuth">
        <a v-on:click="academical">Academical</a>
      </vs-navbar-item>
      <vs-navbar-item index="3" icon="school" class="itemSidebar"  v-on:click="pensumApp" v-if="isAuth">
        <a v-on:click="pensumApp">PensumApp</a>
      </vs-navbar-item>
      <vs-navbar-item index="4" class="itemSidebar"  v-on:click="logOut" v-if="isAuth">
        <a v-on:click="logOut">Log out</a>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>
import {isAuth} from '@/authUtils.js'
import firebase from 'firebase';
export default {
  data: () => ({
    activeItem: 0,
    type: "shadow",
    activeS: false,
    colorx:'#ffe032',
    isAuth: false
  }),
  mounted(){
    this.isAuth = isAuth();
  },
  methods: {
    login() {
      this.$root.$emit("openLogin", "evento");
    },
    openSidebar() {
      this.$root.$emit("openSidebar", "evento");
    },
    closeSidebar() {
      this.$root.$emit("closeSidebar", "evento");
    },
    openSidebarA() {
      this.$root.$emit("openSidebarA", "evento");
    },
    closeSidebarA() {
      this.$root.$emit("closeSidebarA", "evento");
    },
    sobreCupo() {
      this.closeSidebar();
      this.closeSidebarA();
      this.$router.push({ name: "Sobrecupo" });
    },
    pensumApp() {
      this.openSidebar();
      this.closeSidebarA();
      this.$router.push({ name: "IndexPensum" });
    },
    academical() {
      this.closeSidebar();
      this.openSidebarA();
      this.$router.push({ name: "IndexAcademical" });
    },
    logOut(){
      const _this = this;
      firebase.auth().signOut().then(function() {
        localStorage.removeItem("access_token")
        _this.$router.push({ name: "Sobrecupo"})
        window.location.reload()
      }, function(error) {
        console.log(error)
      });
    }
  }
};
</script>

<style scoped>
.vs-navbar {
  position: fixed;
  top: 0;
}
</style>

