<template>

  <modal
    name="info-modal"
    :classes="['v--modal', 'info-modal']"
    transition="nice-modal-fade"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    :clickToClose="true"
    height="auto"
  >
  
    <div class="inner">
      <carousel :per-page="1" :mouse-drag="false">
        <slide>
          <b>Sobrecupo</b>
          <p>Aquí encontrarás información sobre los salones y salas de estudio vacios en la universidad, así como el tiempo que falta para que los ocupados se encuentren disponibles.</p>
          <br>
          <img src="~@/assets/Sobrecupo.png" class="imagen">
          <br>
          <br>
          <img src="~@/assets/Sobrecupoo.png" class="imagen">
        </slide>
        <slide>
          <b>Academical</b>
          <p>
            En Academical podrás planear tu horario, buscar las materias que quieres ver, agregarlas a tu calendario y ver una pequeña calificación del profesor.
            Podrás ver el NRC, horario, días de la semana y calificación del profesor, así como un acceso rápido a sus reviews en
            <b>Los Estudiantes</b> haciendo click a la materia dentro del calendario.
          </p>
          <br>
          <img src="~@/assets/Academical.png" class="imagen">
        </slide>
        <slide>
          <b>PensumApp</b>
          <p>PensumApp es una herramienta para planear las materias que verás a lo largo de tu carrera, dando la posibilidad de materias a cuantos semestres quieras planear. Te proporcionará el número de creditos 
              de cada semestre y podrás así mismo eliminar semestres adicionales. Tendrás a tu disposición información de cada materia, como co-requisitos, pre-requisitos y código de cada materia.
          </p>
          <br>
          <br>
          <br>
          <img src="~@/assets/Pensumapp.png" class="imagen">
        </slide>
        <slide>
            <b>Desarollado por:</b>
            <br>
            <ul id="desarrollo">
                <li v-for="item in nombres" v-bind:key=item.nombre>
                    {{item.nombre}}
                </li>
            </ul>
            <br>
            <b>
                Agradecimientos a:
            </b>
            <br>
            <ul id="agradecimientos">
                <li v-for="item in agradecimientos" v-bind:key=item.nombre>
                    {{item.nombre}}
                </li>
            </ul>
            <br>
            <br>
            <img src="@/assets/logo.png" class="imagen">
            <br>
            <br>
            <vs-button color="dark" type="filled" size="large" class="git" v-on:click="abrirGit">
                GitHub
            </vs-button>
        </slide>
      </carousel>
    </div>
  </modal>
</template>

<script>
export default {
  name: "InfoModal",
  data(){
      return{
          nombres: [
            { nombre: 'Kevin Babativa (Kabs)' },
            { nombre: 'Luis Miguel Gonzalez' }
        ],
        agradecimientos: [
            {nombre: 'Fabio Espinosa por LosEstudiantes.co'},
            {nombre: 'Julian Manrique por Sobrecupo'}
        ]
      }
  },
  methods:{
      abrirGit(){
          window.open('https://github.com/El-Kabs/senecaio','_blank');
      }
  }
};
</script>

<style scoped>

.inner {
  margin: 15px;
}
.imagen {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}
ul{
    list-style-type: circle;
}
.git{
    margin: auto;
    display: block;
    font-size: 14px;
}
</style>
