<template>
  <div class="con-type-example">
    <vs-navbar :type="type" v-model="activeItem" class="nabarx">
      <vs-navbar-title>
        Seneca.io
      </vs-navbar-title>

      <vs-spacer></vs-spacer>

      <vs-navbar-item index="0">
        <a href="#">Home</a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#">News</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#">Update</a>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>
export default {
     data:()=>({
        activeItem: 0,
        type: 'shadow',
        activeS: false 
     }),
     methods:{
         openSidebar(){
            this.$root.$emit('sideBarEvent', 'evento')
         }
     }
}
</script>

<style scoped>
.vs-navbar{
    position: fixed;
    top: 0;
}
</style>

