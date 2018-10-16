<template>
    <drop class="drop" @drop="handleDrop"></drop>
</template>

<script>
export default {
    methods: {
    handleDrop(data, event) {
      this.$root.$emit('materia', data);
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito');
.drag,
.drop {
  font-family: 'Nunito', sans-serif;
  display: inline-block;
  border-radius: 10px;
  background: #ccc;
  position: relative;
  padding-right: 87px !important;
  padding-left: 87px !important;
  padding-top: 70px !important;
  padding-bottom: 70px !important;
  text-align: center;
  vertical-align: top;
}
.drop {
  margin-left: 8px !important;
  margin-right: 7px !important;
  margin-top: 5px;
  margin-bottom: 10px;
  background: #eee;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ccc;
}
</style>
