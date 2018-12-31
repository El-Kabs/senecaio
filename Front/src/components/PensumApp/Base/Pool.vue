<template>
  <div>
    <div class="semestre">
      <h1 class="header">
        <span>&nbsp;{{titulo}}&nbsp;</span>
        <vs-button
          vs-size="small"
          class="botonn"
          color="success"
          style="border-radius: 100%;"
          vs-type="filled"
          icon="add"
          v-on:click="newEspacio"
        ></vs-button>
        <vs-button
          vs-size="small"
          class="botonr"
          color="success"
          style="border-radius: 100%;"
          vs-type="filled"
          icon="remove"
          v-on:click="removeEspacio"
        ></vs-button>
      </h1>
      <MateriaSemestre
        v-for="materia in materias"
        v-bind:key="materia.cod"
        v-bind:titulo="titulo"
        v-bind:title="materia.title"
        v-bind:datos="materia"
      />
      <Espacio
        v-for="element in espacios"
        v-bind:key="element.indice"
        v-bind:titulo="element.titulo"
        v-bind:indice="element.indice"
      />
      <h1 class="footer">
        <span>Total créditos: {{creditos}}</span>
      </h1>
    </div>
  </div>
</template>

<script>
import Espacio from "@/components/PensumApp/Base/Espacio";
import Materia from "@/components/PensumApp/Base/Materia";
import MateriaSemestre from "@/components/PensumApp/Base/MateriaSemestre";
import {removeDuplicatesTitle, removeNulls} from "@/utils.js"
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
  methods: {
    newEspacio() {
      const _this = this;
      _this.cuantos++;
      _this.espacios = [];
      for (let indice = 1; indice <= _this.cuantos; indice++) {
        var poolI = {};
        poolI["titulo"] = _this.titulo;
        poolI["indice"] = indice + _this.titulo;
        _this.espacios.push(poolI);
      }
    },
    addMateriaData(materia) {
      const _this = this;
      var temp = _this.materias;

      _this.creditos =
        parseInt(_this.creditos) + parseInt(materia.datos.credits);
      _this.cuantos--;
      _this.espacios = [];
      for (let indice = 1; indice <= _this.cuantos; indice++) {
        var poolI = {};
        poolI["titulo"] = _this.titulo;
        poolI["indice"] = indice + _this.titulo;
        _this.espacios.push(poolI);
      }
      materia.datos["semestre"] = _this.titulo
      temp.push(materia.datos);
      _this.materias = temp;
      _this.guardar(materia.datos)
    },
    addMateria(materia) {
      const _this = this;
      if (materia.semestre === _this.titulo) {
        var temp = _this.materias;
        _this.creditos = parseInt(_this.creditos) + parseInt(materia.credits);
        _this.cuantos--;
        _this.espacios = [];
        for (let indice = 1; indice <= _this.cuantos; indice++) {
          var poolI = {};
          poolI["titulo"] = _this.titulo;
          poolI["indice"] = indice + _this.titulo;
          _this.espacios.push(poolI);
        }
        materia["semestre"] = _this.titulo
        temp.push(materia);
        _this.materias = temp;
        _this.guardar(materia)
      }
    },
    removeEspacio() {
      const _this = this;
      _this.cuantos--;
      if (_this.cuantos === 0) {
        _this.cuantos++;
      }
      _this.espacios = [];
      for (let indice = 1; indice <= _this.cuantos; indice++) {
        var poolI = {};
        poolI["titulo"] = _this.titulo;
        poolI["indice"] = indice + _this.titulo;
        _this.espacios.push(poolI);
      }
    },
    guardar(materia){
      const _this = this
      let stored = JSON.parse(localStorage.pensumApp)
      var arr = stored["materias"]
      arr.push(materia)
      arr = removeDuplicatesTitle(arr)
      arr = removeNulls(arr)
      stored["materias"] = arr
      localStorage.pensumApp = JSON.stringify(stored)
    }
  },
  beforeDestroy: function(event) {
    this.materias = [];
    this.espacios = [];
    this.cuantos = 7;
    this.creditos = 0;
  },
  mounted: function() {
    const _this = this;
    let titulo = _this.titulo;
    for (let indice = 1; indice <= _this.cuantos; indice++) {
      var poolI = {};
      poolI["titulo"] = _this.titulo;
      poolI["indice"] = indice + _this.titulo;
      _this.espacios.push(poolI);
    }

    if (localStorage.pensumApp) {
      var arreglo = JSON.parse(localStorage.pensumApp);
      for (let index = 0; index < arreglo["materias"].length; index++) {
        const element = arreglo["materias"][index];
        _this.addMateria(element);
      }
    }
    else{
      let arreglo = {"materias": []}
      localStorage.pensumApp = JSON.stringify(arreglo)
    }

    _this.$root.$on("materia", function(data) {
      if (data.datos === undefined) {
        if (data.semestre === _this.titulo) {
          var temp = _this.materias;
          var bool = false;
          var i;
          for (i = 0; i < temp.length; i++) {
            if (temp[i].title === data.title) {
              bool = true;
            }
          }
          if (bool === false) {
            console.log("Agregar a: " + _this.titulo);
            _this.addMateria(data);
          }
        }
      } else if (data.datos !== undefined) {
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
            _this.addMateriaData(data);
          }
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
        _this.espacios = [];
        for (let indice = 1; indice <= _this.cuantos; indice++) {
          var poolI = {};
          poolI["titulo"] = _this.titulo;
          poolI["indice"] = indice + _this.titulo;
          _this.espacios.push(poolI);
        }
        _this.creditos = _this.creditos - data.credits;

        let stored = JSON.parse(localStorage.pensumApp)
        var arr = stored["materias"]
        var indice = -1
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          if(arr[index].title === data.title && arr[index].semestre === data.semestre){
            indice = index
          }
        }
        console.log(indice)
        if(indice > -1){
          arr.splice(indice, 1)
        }
        stored["materias"] = arr
        localStorage.pensumApp = JSON.stringify(stored)
      }
    });
  }
};
</script>

<style scoped>
.botonn {
  width: 20px !important;
  height: 20px !important;
  margin-right: 5px !important;
  background: #00a31d !important;
  padding: 3px !important;
}
.botonr {
  width: 20px !important;
  height: 20px !important;
  background: #ed2300 !important;
  padding: 3px !important;
}
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
