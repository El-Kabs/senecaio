<template>
    <div>
        <div class = "semestre">
            <h1 class = "header"><span>&nbsp;{{titulo}}&nbsp;</span><span><vs-button color="danger" vs-type="gradient" vs-icon="person_add"></vs-button></span></h1>
            <MateriaSemestre v-for="materia in materias" v-bind:key="materia.cod" v-bind:titulo="titulo" v-bind:title="materia.title" v-bind:datos="materia"/>
            <Espacio v-for="element in espacios" v-bind:key="element.indice" v-bind:titulo="element.titulo" v-bind:indice="element.indice"/>
            
            <h1 class = "footer">
                <span>
                Total créditos: {{creditos}}
                </span>
            </h1>
        </div>
    </div>
</template>

<script>
import Espacio from "@/components/PensumApp/Base/Espacio";
import Materia from "@/components/PensumApp/Base/Materia";
import MateriaSemestre from "@/components/PensumApp/Base/MateriaSemestre";
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
      espacios: []
    };
  },
  props: {
    titulo: ""
  },
  mounted: function() {
    const _this = this;

    for (let indice = 1; indice <= _this.cuantos; indice++) {
      var poolI = {};
      poolI["titulo"] = _this.titulo;
      poolI["indice"] = indice + _this.titulo;
      _this.espacios.push(poolI);
    }

    _this.$root.$on("materia", function(data) {
      if (data.titulo === _this.titulo) {
        var temp = _this.materias;
        var bool = false;
        var i;
        for (i = 0; i < temp.length; i++) {
          if (temp[i].title === data.datos.title) {
            bool = true;
          }
        }
        if (bool === false) {
          _this.creditos =
            parseInt(_this.creditos) + parseInt(data.datos.credits);
          _this.cuantos--;
          _this.espacios=[]
          for (let indice = 1; indice <= _this.cuantos; indice++) {
            var poolI = {};
            poolI["titulo"] = _this.titulo;
            poolI["indice"] = indice + _this.titulo;
            _this.espacios.push(poolI);
          }
          temp.push(data.datos);
          _this.materias = temp;
        }
      }
    });
    _this.$root.$on("borrarMateria", function(data) {
      if (data.titulo === _this.titulo) {
        var index = _this.materias.indexOf(data);
        if (index > -1) {
          _this.materias.splice(index, 1);
        }
        _this.cuantos++;
        _this.espacios=[]
          for (let indice = 1; indice <= _this.cuantos; indice++) {
            var poolI = {};
            poolI["titulo"] = _this.titulo;
            poolI["indice"] = indice + _this.titulo;
            _this.espacios.push(poolI);
          }
        _this.creditos = _this.creditos - data.credits;
      }
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
