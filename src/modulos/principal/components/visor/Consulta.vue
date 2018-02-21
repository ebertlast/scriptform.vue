<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="ibox float-e-margins">

          <div class="ibox-title hide">
            <h5>Collaps panels</h5>
            <div class="ibox-tools">
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">
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
              <a class="close-link">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
          <div class="ibox-content">
            <div class="panel-body">
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
              <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h5 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" ref="collapseOne" aria-expanded="true" class="">Radicaciones</a>
                    </h5>
                  </div>
                  <div id="collapseOne" class="panel-collapse collapse in" aria-expanded="true" style="">
                    <div class="panel-body">
                      <div class="">
                        <div class="row">
                          <div class="col-sm-5 m-b-xs">
                            <select class="input-sm form-control input-s-sm inline" v-model="cantPorPaginas" :disabled="cargando||paginacion.paginas===1||registros.length<=0">
                                    <option value="10" selected>10 FILAS POR PÁGINA</option>
                                    <option value="25">25 FILAS POR PÁGINA</option>
                                    <option value="50">50 FILAS POR PÁGINA</option>
                                    <option value="100">100 FILAS POR PÁGINA</option>
                                  </select>
                          </div>
                          <div class="col-sm-4 m-b-xs">
                            <div data-toggle="buttons" class="btn-group">
                              <button type="button" class="btn btn-white" @click="paginaActual=paginacion.paginaActual-1" :disabled="(paginacion.paginaActual === 1) || cargando"><i class="fa fa-chevron-left"></i></button>
                              <button class="btn btn-white" v-if="!(paginacion.paginaActual === 1)" @click="paginaActual=paginacion.paginaActual-1" :disabled="cargando">{{paginacion.paginaActual-1}}</button>
                              <button class="btn btn-white active" :disabled="cargando">{{paginacion.paginaActual}}</button>
                              <button class="btn btn-white" @click="paginaActual=paginacion.paginaActual+1" v-if="!(paginacion.paginaActual+1 > paginacion.paginas)" :disabled="cargando">{{paginacion.paginaActual+1}}</button>
                              <button type="button" class="btn btn-white" @click="paginaActual=paginacion.paginaActual+1" :disabled="(paginacion.paginaActual+1 > paginacion.paginas) || cargando"><i class="fa fa-chevron-right"></i> </button>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="input-group">
                              <input type="text" placeholder="Buscar" class="input-sm form-control" v-model="search" ref="search" v-on:keypress.enter="consultar" v-focus>
                              <span class="input-group-btn">
                                      <button type="button" class="btn btn-sm btn-primary" :disabled="cargando" @click="consultar">
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
                              <tr v-for="(item, i) in registros" :key="i">
                                <td>
                                  <a href="#" class="btn btn-white btn-bitbucket" @click.prevent="detail(item)">
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
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" ref="archivo" class="collapsed" aria-expanded="false">Visor</a>
                    </h4>
                  </div>
                  <div id="collapseTwo" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                    <div class="panel-body">
                      <preview :archivoid="archivoId" :sticker="sticker" v-if="archivoId && archivoId!==''"></preview>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import Preview from "./Preview";
import { default as componentes } from "../../../../components";

export default {
  data() {
    return {
      cargando: false,
      registros: [],
      columnas: [],
      search: "",
      cantPorPaginas: 10,
      paginaActual: 1,
      paginacion: {
        paginaActual: 1,
        tamPagina: 10,
        paginas: 0,
        registros: 0
      },
      archivoId: "",
      sticker: ""
    };
  },
  mounted() {
    this.setCurrent("Visor");
    this.refrescarTabla();
  },
  computed: {
    ...mapGetters(["getColumnsNameTitles"])
  },
  methods: {
    consultar() {
      if (this.paginaActual === 1) {
        this.refrescarTabla();
      } else {
        this.paginaActual = 1;
      }
    },
    ...mapActions(["setCurrent"]),
    refrescarTabla() {
      this.cargando = true;
      this.registros = [];
      this.paginacion.registros = 0;
      this.paginacion.paginas = 0;
      const model = {
        Tabla: "VWS_ARCHIVOS",
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

      this.$http
        .post(`consulta`, json)
        .then(data => {
          // console.log(data.result);
          this.cargando = false;
          this.registros = data.result.recordset;
          // console.log("Registros: ", this.registros);
          this.columnas = this.getColumnsNameTitles(this.registros);
          // console.log("Columnas: ", this.columnas);
          this.paginacion.paginas = data.result.output.CantPaginas;
          this.paginacion.registros = data.result.output.TotalRegistos;
          // console.log(this.paginacion.paginas);
          // console.log(this.paginacion.registros);
        })
        .catch(err => {
          console.log(err);
          this.cargando = false;
        });
    },
    detail(item) {
      this.archivoId = "";
      this.sticker = item.SerialSticker;
      this.archivoId = item.ArchivoId;
      this.$refs.archivo.click();
    }
  },
  components: {
    Preview: componentes.PdfPreview,
    pdfViewer: componentes.PdfViewer
  }
};
</script>

<style>

</style>
