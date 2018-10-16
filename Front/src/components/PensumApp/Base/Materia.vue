<template>
    <drag class="drag" :transfer-data="{ datos }" :style="styling" :draggable=drag><span class = "texto">{{ title }}</span></drag>
</template>

<script>
export default {
  data() {
    return {
      colorB: String
    };
  },
  props: {
    title: String,
    datos: Object,
    drag: Boolean
  },
  computed: {
    styling: function() {
      const _this = this;
      var colors = [
        "#93DFCB",
        "#A8EAC0",
        "#CAEFC4",
        "#E9F5CA",
        "#F6FFCA",
        "#EA9674",
        "#FCBC80",
        "#F7E29C",
        "#A4EDE6",
        "#E1F9F7"
      ];
      var hash = 13;
      for (var i = 0; i < _this.title.length; i++) {
        hash = _this.title.charCodeAt(i) + (hash << 17) - hash;
      }
      // Calculate color
      var index = Math.abs(hash % colors.length);
      _this.colorB = colors[index];
      _this.datos["color"] = _this.colorB;
      return {
        background: _this.colorB
      };
    }
  }
};
</script>

<style scoped>
.texto {
  font-family: "Muli", sans-serif;
  font-size: 14px;
}
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
  margin-top: 15px;
  margin-left: 15%;
  margin-right: 15%;
  color: #000000;
  cursor: move;
  border-right: 2px solid #555;
  border-bottom: 2px solid #555;
}
</style>
