<template>
    <vs-navbar :type="type" v-model="activeItem" class="nabarx" color="#1db952">
      
    </vs-navbar>
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

