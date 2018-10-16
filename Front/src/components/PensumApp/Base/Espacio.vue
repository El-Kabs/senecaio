<template>
    <drop class="drop" @drop="handleDrop"></drop>
</template>

<script>
export default {
    name: "Espacio",
    methods: {
    handleDrop(data, event) {
      this.$root.$emit('materia', data);
    },
  },
}
</script>

<style scoped>
.drag,
.drop {
  font-family: "Muli", sans-serif;
  display: inline-block;
  border-radius: 10px;
  background: #ccc;
  position: relative;
  padding-top: 65px;
  padding-bottom: 65px;
  padding-right: 65px;
  padding-left: 65px;
  text-align: center;
  vertical-align: top;
}
.drop {
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  background: #eee;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ccc;
}
</style>
