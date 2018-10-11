<template>
    <drag class="drag" :transfer-data="{ draggable }">{{ draggable }}</drag>
</template>

<script>
export default {
    data () {
    return {
      draggable: 'Drag Me'
    }
  }
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
.drag {
  color: #fff;
  cursor: move;
  background: #777;
  border-right: 2px solid #555;
  border-bottom: 2px solid #555;
}
</style>
