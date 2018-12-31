<template>
  <div>

    <vue-headful
            title="Seneca.io - Sobrecupo"
            description="Seneca.io - Sobrecupo"
        />
        
    <h1>Sobrecupo</h1>

    <div class="content">
      <radial-progress-bar
        v-for="(salon, index) of salones"
        :key="index"
        :diameter="175"
        :completed-steps="darTime(index)"
        :total-steps="totalSteps"
        :innerStrokeColor="innerStrokeColor"
        :startColor="startColor"
        :stopColor="stopColor"
      >
        <p><b>{{index}}</b></p>
        {{getTime(index)}}
      </radial-progress-bar>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Base/Sidebar";
import Navbar from "@/components/Base/Navbar";
import RadialProgressBar from "vue-radial-progress";
import {darTiempo} from "@/utils.js";

export default {
  name: "Sobrecupo",
  components: {
    Sidebar,
    Navbar,
    RadialProgressBar
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      salones: "",
      draggable: "Drag Me",
      completedSteps: 60,
      totalSteps: 60,
      innerStrokeColor: "#fff8d6",
      startColor: "#e5c200",
      stopColor: "#ffe032",
      tiempos: []
    };
  },
  methods: {
    handleDrop(data, event) {
      alert(`You dropped with data: ${JSON.stringify(data)}`);
    },
    getTime(indice) {
      const _this = this;
      let arr = _this.tiempos
      for(let index = 0; index<_this.tiempos.length; index++){
        const element = _this.tiempos[index]
        if(indice === element.salon){
          if(element.tiempo === 0){
            return "Disponible"
          }
          else{
            return element.tiempo + " Minutos"
          }
        }
      }
    },
    darTime(indice){
      const _this = this;
      let arr = _this.tiempos
      for(let index = 0; index<_this.tiempos.length; index++){
        const element = _this.tiempos[index]
        if(indice === element.salon){
          if(element.tiempo === 0){
            return 0
          }
          else{
            if(element.tiempo>60){
              return 60
            }
            else if(element.tiempo<0){
              return 0
            }
            else
              return parseInt(element.tiempo)
          }
        }
      }
    }
  },
  mounted: function() {
    const _this = this;
    fetch("https://sobrecupo-salones.herokuapp.com/biblioteca", {
      method: "GET"
    })
      .then(res => res.text())
      .then(json => {
        const parsed = JSON.parse(json.replace(/'/g, '"'));
        _this.salones = parsed;
        for (var key in _this.salones){
            const element = _this.salones[key]
            var tiempo = darTiempo(element.Tiempo)
            var time = {"salon": key, "tiempo": tiempo}
            _this.tiempos.push(time)
        }
      });
      setInterval(function() {
        for(let index = 0; index<_this.tiempos.length; index++){
          const element = _this.tiempos[index]
          let tiempo = element.tiempo
          if(tiempo===0){}
          else{
            tiempo = tiempo - 1;
          }
          element.tiempo = tiempo
          _this.tiempos[index] = element
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
</style>
