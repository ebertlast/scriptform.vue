<template>
  <div class="row">
      <div class="col-lg-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
            <h5>Página {{paginacion.paginaActual|formatNumber}} de {{paginacion.paginas|formatNumber}} - Filas {{((cantPorPaginas>paginacion.registros)?paginacion.registros:cantPorPaginas)|formatNumber}} de {{paginacion.registros|formatNumber}} </h5>
            <div class="ibox-tools">
              <div class="sk-spinner sk-spinner-cube-grid" v-show="cargando">
                <div class="sk-cube"></div>
                <div class="sk-cube"></div>
                <div class="sk-cube"></div>
                <div class="sk-cube"></div>
                <div class="sk-cube"></div>
                <div class="sk-cube"></div>
                <div class="sk-cube"></div>
                <div class="sk-cube"></div>
                <div class="sk-cube"></div>
              </div>
              <a class="collapse-link hide">
                <i class="fa fa-chevron-up"></i>
              </a>
              <a class="dropdown-toggle hide" data-toggle="dropdown" href="#">
                <i class="fa fa-wrench"></i>
              </a>
              <ul class="dropdown-menu dropdown-user">
                <li>
                  <a href="#">Config option 1</a>
                </li>
                <li>
                  <a href="#">Config option 2</a>
                </li>
              </ul>
                  <!-- <button class="btn btn-outline btn-primary dim" type="button"><i class="fa fa-check"></i></button> -->
                  <!-- <button type="button" class="btn btn-primary btn-xs">Mini button</button> -->
              <button class="btn btn-primary btn-xs" @click="add" :disabled="cargando">
                  <i class="fa fa-plus"></i>
                  Agregar Registro
              </button>
            </div>
          </div>
          <div class="ibox-content" style="">
            <div class="row">
              <div class="col-sm-5 m-b-xs">
                  <select class="input-sm form-control input-s-sm inline" v-model="cantPorPaginas" :disabled="cargando||paginacion.paginas===1||rows.length<=0">
                    <option value="10" selected>10 FILAS POR PÁGINA</option>
                    <option value="25">25 FILAS POR PÁGINA</option>
                    <option value="50">50 FILAS POR PÁGINA</option>
                    <option value="100">100 FILAS POR PÁGINA</option>
                  </select>
              </div>
              <div class="col-sm-4 m-b-xs">
                <div data-toggle="buttons" class="btn-group">
                  <button type="button" class="btn btn-white" @click="paginaActual=paginacion.paginaActual-1" :disabled="(paginacion.paginaActual === 1) || cargando" ><i class="fa fa-chevron-left"></i></button>
                  <button class="btn btn-white" v-if="!(paginacion.paginaActual === 1)"  @click="paginaActual=paginacion.paginaActual-1" :disabled="cargando">{{paginacion.paginaActual-1}}</button>
                  <button class="btn btn-white active" :disabled="cargando">{{paginacion.paginaActual}}</button>
                  <button class="btn btn-white" @click="paginaActual=paginacion.paginaActual+1" v-if="!(paginacion.paginaActual+1 > paginacion.paginas)" :disabled="cargando">{{paginacion.paginaActual+1}}</button>
                  <!-- <button class="btn btn-white">4</button> -->
                  <button type="button" class="btn btn-white" @click="paginaActual=paginacion.paginaActual+1" :disabled="(paginacion.paginaActual+1 > paginacion.paginas) || cargando"><i class="fa fa-chevron-right"></i> </button>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="input-group">
                  <input type="text" placeholder="Buscar" class="input-sm form-control" v-model="search" ref="search" v-on:keypress.enter="consultar" v-focus>
                  <span class="input-group-btn">
                    <button type="button" class="btn btn-sm btn-primary" :disabled="cargando" @click="consultar">
                      <!-- Ok -->
                      <i class="fa fa-check"></i>
                      </button>
                  </span>

                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th v-for="(item, index) in columnas" :key="index">{{item}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in rows" :key="item.GRUPOID">
                    <td>
                      <router-link :to="{ name: 'usgru', params: { grupoid: item.GrupoID }}" tag="a" class="btn btn-white btn-bitbucket hide">
                      </router-link>
                      <a href="#" class="btn btn-white btn-bitbucket" @click.prevent="details(item)">
                        <i class="fa fa-eye"></i>
                      </a>
                    </td>
                    <td v-for="(value, key, index) in item" :key="index">
                      {{value}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "datatable",
  props: ["tabla"],
  data() {
    return {
      cargando: false,
      rows: [],
      columnas: [],
      search: "",
      cantPorPaginas: 10,
      paginaActual: 1,
      paginacion: {
        paginaActual: 1,
        tamPagina: 10,
        paginas: 0,
        registros: 0
      }
    };
  },
  mounted() {
    // console.log("Rows: ", this.rows);
    this.refresh();
  },
  methods: {
    details(row) {
      this.$emit("viewDetail", row);
      this.$emit("go");
    },
    add() {
      this.$emit("add");
    },
    consultar() {
      if (this.paginaActual === 1) {
        this.refresh();
      } else {
        this.paginaActual = 1;
      }
    },
    refresh() {
      //   alert(this.tabla);
      if (!this.tabla) {
        return;
      }
      this.$refs.search.focus();
      this.cargando = true;
      this.rows = [];
      this.paginacion.registros = 0;
      this.paginacion.paginas = 0;

      const model = {
        Tabla: this.tabla,
        StringABuscar: this.search + "%",
        NumPagina: this.paginacion.paginaActual,
        TamPagina: this.paginacion.tamPagina,
        Columnas: ""
      };
      const json =
        "json=" +
        JSON.stringify({
          model
        });

      // console.log(json);
      this.$http
        .post(`consulta`, json)
        .then(data => {
          // console.log(data.result);
          this.cargando = false;
          this.rows = data.result.recordset;
          this.columnas = this.getColumnsName(this.rows);
          // alert("");
          this.paginacion.paginas = data.result.output.CantPaginas;
          this.paginacion.registros = data.result.output.TotalRegistos;
          // console.log(this.paginacion.paginas);
          // console.log(this.paginacion.registros);
        })
        .catch(function(err) {
          console.log(err);
          this.cargando = false;
        });
    }
  },
  computed: {
    ...mapGetters(["getColumnsName"])
  }
};
</script>

<style>

</style>
