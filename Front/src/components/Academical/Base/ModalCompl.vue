<template>
    <modal name="error-modal"
         :classes="['v--modal', 'error-modal']"
         :pivot-y="0.2"
         :adaptive="true"
         :scrollable="true"
         :reset="true"
         :clickToClose="false"
         height="auto"
         @before-open="beforeOpen"
         @before-close="beforeClose">
    <div class="error-modal-content">
    <div style="padding: 10px;">
        Selecciona una de estas {{complementarias.length}} complementarias:
        <div>
            <bounce v-if="isLoading" v-bind:loading="isLoading" color="#FFE080" ></bounce>
        </div>
        <MateriaModal class="materia" v-for="resultado in finales" v-bind:key="resultado.nrc+resultado.curso+resultado.title+resultado.seccion" v-bind:title="resultado.title" v-bind:datos="resultado"/>
    </div>
    </div>
  </modal>
</template>

<script>
import MateriaModal from "@/components/Academical/Base/MateriaModal";
export default {
  name: 'ModalCompl',
  components: {
    MateriaModal,
  },
  data () {
    return {
      complementarias: [],
      materias: [],
      finales: [],
      isLoading: true,
      color: "#FFE080"
    }
  },
  mounted: function(){
      const _this = this;
    _this.$root.$on("CerrarModal", function(data) {
      this.$modal.hide('error-modal');
        _this.finales = []
        _this.isLoading = true;
    });
  },
  methods: {
    beforeOpen (event) {
        const _this = this;
        console.log(_this.isLoading)
        this.complementarias = event.params.complementarias
        fetch(
        "https://senecacupos.herokuapp.com/",
        {
            method: "GET"
        }
        )
        .then(res => res.text())
        .then(json => {
            const parsed = JSON.parse(json.replace(/'/g, '"'));
            _this.materias = parsed;
            var arr = _this.materias["records"];
            var res = arr.filter(function (el) {
                return _this.complementarias.indexOf(el.nrc) >= 0; 
            });
            _this.finales = res;
            _this.isLoading = false;
            this.$vs.notify({
            color: "primary",
            title: "Complementarias cargadas",
            text: "Las complementarias fueron cargadas"
          });
        });
        
    },
    beforeClose (event) {
        const _this = this;
        _this.finales = []
        _this.isLoading = true;
    }
  }
}
</script>
<style lang="scss">
.error-modal {
  transition: box-shadow 1s;
  &.has-bugs {
    box-shadow: 0 24px 80px -2px rgba(255, 0, 0, .4) !important;
  }
}
.error-modal-content {
  padding: 10px;
  text-align: center;
  .bugs-label {
    text-transform: uppercase;
    font-size: 60px;
    font-weight: 300;
    letter-spacing: 2px;
    padding: 40px;
  }
  button {
    width: 180px;
  }
  sub {
    color: #EC625F;
    transition: opacity 0.25s;
  }
}
</style>