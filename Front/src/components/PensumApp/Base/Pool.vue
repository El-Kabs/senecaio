<template>
    <div>
        <div class = "semestre">
            <h1 class = "header"><span>&nbsp;Primer semestre&nbsp;</span></h1>
            <Materia v-for="materia in materias" v-bind:key="materia.cod" v-bind:title="materia.title" v-bind:datos="materia" v-bind:drag="drag"/>
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

export default {
  name: "Pool",
  components: {
    Espacio,
    Materia
  },
  data() {
    return {
      cuantos: 1,
      drag: false,
      materias: [],
      creditos: 0
    };
  },
  mounted:function() {
    const _this = this
    this.$root.$on('materia', function(data){
      var temp = _this.materias
      _this.creditos = parseInt(_this.creditos) + parseInt(data.datos.credits);
      temp.push(data.datos);
      _this.materias =  temp;
      console.log(_this.materias)
    });
  }
};
</script>

<style scoped>
.drag,
.drop {
  font-family: 'Nunito', sans-serif !important;
  border-radius: 10px!important;
  position: relative!important;
  padding-top: 65px !important;
  padding-bottom: 65px!important;
  padding-right: 65px!important;
  padding-left: 65px!important;
  text-align: center!important;
  vertical-align: top!important;
}
.drag {
  margin-left: 8px!important;
  margin-right: 8px!important;
  margin-top: 5px!important;
  margin-bottom: 10px!important;
  border-top: 2px solid #ccc!important;
  border-left: 2px solid #ccc!important;
}
.semestre {
  margin: 0 auto;
  display: inline-block;
  border-style: groove;
  line-height: 0;
  text-align: left;
  margin-top: 40px;
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
