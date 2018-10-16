<template>
    <div>
        <div class = "semestre">
            <h1 class = "header"><span>&nbsp;Primer semestre&nbsp;</span></h1>
            <Espacio v-for="index in cuantos" v-bind:key="index"/>
            <h1 class = "footer">
                <span>
                Total creditos: 5
                </span>
            </h1>
        </div>
    </div>
</template>

<script>
import Espacio from "@/Components/PensumApp/Base/Espacio";
import Materia from "@/components/PensumApp/Base/Materia";
export default {
  name: "Pool",
  components: {
    Espacio,
    Materia
  },
  data() {
    return {
      cuantos: 3
    };
  },
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
