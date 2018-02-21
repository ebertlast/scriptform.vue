<template>
  <div>
      <!-- 0.- Listado de Registros -->
      <transition enter-active-class="animated fadeIn" mode="out-in" appear>
        <datatable tabla="VWS_USU" @viewDetail="row=$event" @go="step = 1" v-show="step===0" @add="step=2"></datatable>
      </transition>

      <!-- Detalles del Registro -->
      <transition enter-active-class="animated fadeIn" mode="out-in" appear>
        <usuDetail v-if="step===1" @volver="step=0" @editar="step=3" :usu="row" ></usuDetail>
      </transition>

      <!-- Agregar Nuevo Registro -->
      <transition enter-active-class="animated fadeIn" mode="out-in" appear>
        <usuAdd v-if="step===2" @volver="step=0" :usu="row" :sedes="sedes" :grupos="grupos" ></usuAdd>
      </transition>
      
      <!-- Editar el Registro -->
      <transition enter-active-class="animated fadeIn" mode="out-in" appear>
        <usuEdit v-if="step===3" @volver="step=1" :usu="row" :sedes="sedes" :grupos="grupos"></usuEdit>
      </transition>
      
  </div>
</template>

<script>
import { default as globalComponents } from "../../../../components";
import UsuDetail from "./UsuDetail";
import UsuAdd from "./UsuAdd";
import UsuEdit from "./UsuEdit";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      row: {},
      step: 0,
      sedes: [],
      grupos: []
    };
  },
  components: {
    Datatable: globalComponents.Datatable,
    UsuDetail,
    UsuAdd,
    UsuEdit
  },
  mounted() {
    this.step = 0;
    this.setCurrent("Usuarios del Sistema");
    this.$http
      .get(`sedes`)
      .then(response => {
        this.sedes = response.result.recordset;
        this.$http.get(`grupos`).then(response => {
          this.grupos = response.result.recordset;
        });
      })
      .catch(() => {});
  },
  methods: {
    // prueba() {
    //   alert("Agregar Registro");
    // },
    ...mapActions(["setCurrent"])
  },
  watch: {},
  computed: {}
};
</script>

<style>

</style>
