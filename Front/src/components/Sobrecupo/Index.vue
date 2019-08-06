<template>
  <div>
    <vue-headful title="Seneca.io - Sobrecupo" description="Seneca.io - Sobrecupo" />
    <h1>Sobrecupo</h1>
    <vs-dropdown v-if="!isLoading">
      
      <a href="#">
        {{this.elegido}}
        <vs-icon class="btn-drop" icon="expand_more"></vs-icon>
      </a>

      <vs-dropdown-menu class="dropdown">
        <vs-dropdown-item class="itemDrop" v-bind:key="prefix" v-for="(prefix) of prefix" v-on:click="opcion(prefix)">{{prefix}}</vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
    <div class="content">
      <fold v-if="isLoading" v-bind:loading="isLoading" color="#FFE080"></fold>

      <radial-progress-bar
        v-for="(salon, index) of salonesMostrar"
        :key="index"
        :diameter="175"
        :completed-steps="darTime(salon.salon)"
        :total-steps="totalSteps"
        :innerStrokeColor="innerStrokeColor"
        :startColor="startColor"
        :stopColor="stopColor"
      >
        <p>
          <b>{{salon.salon.replace('_', '')}}</b>
        </p>
        {{getTime(salon.salon)}}
      </radial-progress-bar>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Base/Sidebar";
import Navbar from "@/components/Base/Navbar";
import RadialProgressBar from "vue-radial-progress";
import { darTiempo, darTiempoRestante } from "@/utils.js";


export default {
  name: "Sobrecupo",
  components: {
    Sidebar,
    Navbar,
    RadialProgressBar
  },
  data() {
    return {
      salones: "",
      draggable: "Drag Me",
      completedSteps: 60,
      totalSteps: 60,
      innerStrokeColor: "#fff8d6",
      startColor: "#e5c200",
      stopColor: "#ffe032",
      tiempos: [],
      isLoading: false,
      elegido: "Elige un edificio",
      salonesMostrar: [],
      prefix: []
    };
  },
  methods: {
    opcion(edificio) {
      const _this = this;
      _this.elegido = edificio;
      _this.salonesMostrar = [];
      var salonesAux = _this.salones;
      var salonesMostrarAux = [];
      for (var key in salonesAux) {
        if (key.startsWith(edificio)) {
          salonesAux[key]["salon"] = key.replace("_", "");
          salonesMostrarAux.push(salonesAux[key]);
        }
      }
      salonesMostrarAux.sort(function(a, b) {
        if (a.salon < b.salon) {
          return -1;
        }
        if (a.salon > b.salon) {
          return 1;
        }
        return 0;
      });
      _this.salonesMostrar = salonesMostrarAux;
    },
    handleDrop(data, event) {
      alert(`You dropped with data: ${JSON.stringify(data)}`);
    },
    getTime(indice) {
      const _this = this;
      let arr = _this.tiempos;
      for (let index = 0; index < _this.tiempos.length; index++) {
        const element = _this.tiempos[index];
        if (indice === element.salon) {
          if (element.tiempo === 0) {
            return "Disponible";
          } else {
            return element.tiempo + " Minutos";
          }
        }
      }
    },
    darTime(indice) {
      const _this = this;
      let arr = _this.tiempos;
      for (let index = 0; index < _this.tiempos.length; index++) {
        const element = _this.tiempos[index];
        if (indice === element.salon) {
          if (element.tiempo === 0) {
            return 0;
          } else {
            if (element.tiempo > 60) {
              return 60;
            } else if (element.tiempo < 0) {
              return 0;
            } else return parseInt(element.tiempo);
          }
        }
      }
    }
  },
  mounted: function() {
    const _this = this;
    _this.isLoading = true;
    fetch("https://sobrecupo-salones.herokuapp.com/biblioteca", {
      method: "GET"
    })
      .then(res => res.text())
      .then(json => {
        const parsed = JSON.parse(json.replace(/'/g, '"'));
        _this.salones = parsed;
        for (var key in _this.salones) {
          const element = _this.salones[key];
          var tiempo = darTiempo(element.Tiempo);
          var time = { salon: key.replace("_", ""), tiempo: tiempo };
          _this.tiempos.push(time);
        }
      })
      .then(res => {
        fetch(
          "https://raw.githubusercontent.com/El-Kabs/senecaio/master/Back/Sobrecupo/calendario.json",
          {
            method: "GET"
          }
        )
          .then(res => res.text())
          .then(json => {
            const parsed = JSON.parse(json.replace(/'/g, '"'));
            let salonesAuxB = _this.salones;
            for (var key in parsed) {
              if (parsed.hasOwnProperty(key)) {
                salonesAuxB[key] = parsed[key];
              }
            }

            for (var key in parsed) {
              const element = parsed[key];
              console.log(key)
              var tiempo = darTiempoRestante(element, key);
              var time = { salon: key.replace("_", ""), tiempo: tiempo };
              _this.tiempos.push(time);
            }
          })
          .then(res => {
            var prefixx = [];
            for (var key in _this.salones) {
              let prefijo = key.split("_")[0];
              if((prefijo.length<=4) || (prefijo.startsWith("LIGA"))){
                if(prefijo.startsWith("F")){
                  prefixx.push("F")
                }
                else{
                  prefixx.push(prefijo);
                }
              }
            }
            let prefixUnique = [...new Set(prefixx)];
            _this.prefix = prefixUnique
            _this.isLoading = false;
          });
      });

    setInterval(function() {
      for (let index = 0; index < _this.tiempos.length; index++) {
        const element = _this.tiempos[index];
        let tiempo = element.tiempo;
        if (tiempo === 0) {
        } else {
          tiempo = tiempo - 1;
        }
        element.tiempo = tiempo;
        _this.tiempos[index] = element;
      }
    }, 10 * 1000);
  }
};
</script>


<style scoped>
.frame {
  width: 100%;
  height: 100;
}
.content {
  margin-top: 39px !important;
  height: 100%;
  margin-left: 54px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.radial-progress-container {
  display: inline-block;
  margin-right: 5%;
  margin-bottom: 25px;
}
.a-icon {
  outline: none;
  text-decoration: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.a-icon i {
  font-size: 18px;
}

.dropdown{
  color:black;
  display: inline!important;
  font-family: "Nunito", sans-serif !important;
  font-size: 13px;
}

.itemDrop{
  font-weight: bold;
  padding-top: 2px!important;
  display: inline!important;
}

</style>
