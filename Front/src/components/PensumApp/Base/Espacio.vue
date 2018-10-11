<template>
    <drop class="drop" @drop="handleDrop">Dropzone</drop>
</template>

<script>
export default {
    methods: {
    handleDrop(data, event) {
      alert(`You dropped with data: ${JSON.stringify(data)}`);
    },
  },

}
</script>

<style scoped>
.drag,
.drop {
  font-family: sans-serif;
  display: inline-block;
  border-radius: 10px;
  background: #ccc;
  position: relative;
  padding: 30px;
  text-align: center;
  vertical-align: top;
}
.drop {
  background: #eee;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ccc;
}
</style>
