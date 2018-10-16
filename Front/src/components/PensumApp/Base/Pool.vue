<template>
    <div>
        <div class = "semestre">
            <h1 class = "header"><span>&nbsp;Primer semestre&nbsp;</span></h1>
            <MateriaSemestre v-for="materia in materias" v-bind:key="materia.cod" v-bind:title="materia.title" v-bind:datos="materia"/>
            <Espacio v-for="index in cuantos" v-bind:key="index"/>
            <h1 class = "footer">
                <span>
                Total creditos: {{creditos}}
                </span>
            </h1>
        </div>
    </div>
</template>

<script>
import Espacio from "@/components/PensumApp/Base/Espacio";
import Materia from "@/components/PensumApp/Base/Materia";
import MateriaSemestre from "@/components/PensumApp/Base/MateriaSemestre"
export default {
  name: "Pool",
  components: {
    Espacio,
    Materia,
    MateriaSemestre
  },
  data() {
    return {
      cuantos: 7,
      materias: [],
      creditos: 0,
    };
  },
  mounted: function() {
    const _this = this;
    _this.$root.$on("materia", function(data) {
      var temp = _this.materias;
      var bool = false;
      var i;
      for (i = 0; i < temp.length; i++) {
        if (temp[i].title === data.datos.title) {
          bool = true;
        }
      }
      if (bool === false) {
        _this.creditos = parseInt(_this.creditos) + parseInt(data.datos.credits);
        _this.cuantos--;
        temp.push(data.datos);
        _this.materias = temp;
      }
    });
    _this.$root.$on("borrarMateria", function(data){
      var index = _this.materias.indexOf(data);
      if (index > -1) {
        _this.materias.splice(index, 1);
      }
      _this.cuantos++;
      _this.creditos = _this.creditos - data.credits
    });
  }
};
</script>

<style scoped>
.semestre {
  margin: 0 auto;
  display: inline-block;
  border-style: groove;
  line-height: 0;
  text-align: left;
  margin-top: 40px;
  width: 70%;
}
.header {
  text-align: left;
  margin-top: -13px;
  margin-left: 10px;
  line-height: 20px;
  font-size: 15px;
}
.footer {
  text-align: left;
  margin-top: 5px;
  margin-left: 10px;
  font-size: 15px;
}
div h1 span {
  background-color: white;
}
</style>
