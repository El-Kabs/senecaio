<template>
  <vs-sidebar :reduce="reduce" :reduce-not-hover-expand="notExpand" :hidden-background="hbackground" parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="active">
    <vs-sidebar-item index="1" icon="group" class="itemSidebar" v-on:click="sobreCupo">
    Sobrecupo
    </vs-sidebar-item>
    <vs-sidebar-item index="2" icon="today" class="itemSidebar">
    Academical
    </vs-sidebar-item>
    <vs-sidebar-item index="3" icon="school" class="itemSidebar" v-on:click="pensumApp">
    PensumApp
    </vs-sidebar-item>
  </vs-sidebar>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      active: true,
      hbackground: true,
      reduce: true,
      notExpand: false,
      colore: "#fcdd00"
    };
  },
  methods: {
    sobreCupo() {
      this.$router.push({ name: "Sobrecupo" });
    },
    pensumApp() {
      this.$router.push({ name: "IndexPensum" });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Muli");

.itemSidebar {
  font-family: "Muli", sans-serif;
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
</style>
