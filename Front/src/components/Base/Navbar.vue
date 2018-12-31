<template>
  <div class="con-type-example">
    <vs-navbar :type="type" :color="colorx" v-model="activeItem" class="nabarx">
      <vs-navbar-title>
        Seneca.io
      </vs-navbar-title>

      <vs-spacer></vs-spacer>

      <vs-navbar-item index="1" icon="group" class="itemNavbar" v-on:click="sobreCupo">
        <a v-on:click="sobreCupo">Sobrecupo</a>
      </vs-navbar-item>
      <vs-navbar-item index="2" icon="today" class="itemNavbar" v-on:click="academical">
        <a v-on:click="academical">Academical</a>
      </vs-navbar-item>
      <vs-navbar-item index="3" icon="school" class="itemSidebar" v-on:click="pensumApp">
        <a v-on:click="pensumApp">PensumApp</a>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    activeItem: 0,
    type: "shadow",
    activeS: false,
    colorx:'#ffe032',
  }),
  methods: {
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

