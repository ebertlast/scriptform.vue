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
              <a href="">

                <!-- <div class="alert alert-success alert-dismissable" >
                          Enviar Radicación
                        </div> -->
                <button class="btn btn-primary btn-block m-t" @click.prevent="radicar" v-if="formularioValido" :disabled="cargando" ref="btnRadicar">
                          <i class="fa fa-cloud-upload"></i>
                          Confirmar Envío de Radicación
                        </button>
              </a>
              <div class="alert alert-info alert-dismissable" v-if="(cotizante.NumeroIdentificacion)&&cotizante.NumeroIdentificacion!==''">
                <!-- <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button> -->
                Cotizante identificado como: <b>{{razonSocial}}</b>
              </div>
              <div class="alert alert-danger alert-dismissable" v-if="consultado && !((cotizante.NumeroIdentificacion) && cotizante.NumeroIdentificacion !== '')">
                <!-- <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button> -->
                Cotizante no fue encontrado en la base de datos, recuerda indicar si es una nueva afiliación
              </div>
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
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" class="" ref="paso1">Identifica el Cotizante</a>
                    </h5>
                  </div>
                  <div id="collapseOne" class="panel-collapse collapse in" aria-expanded="true" style="">
                    <div class="panel-body">
                      <div class="form-group">
                        <label class="col-sm-4 control-label">Tipo de Documento de Identidad:</label>

                        <div class="col-sm-8">
                          <select class="form-control m-b" name="account" title="Tipo de Documento de Identidad" v-model="tipoId" ref="tipoId" v-focus>
                            <option value="" selected>Seleccione un Tipo de Documento:</option>
                            <option v-for="item in tids" :key="item.TipoID" :value="item.TipoID">{{item.DescripcionID}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-4 control-label">Número de Identificación</label>

                        <div class="col-sm-8">
                          <div class="input-group">
                            <input type="text" class="form-control" v-model="numeroIdentificacion" ref="numeroIdentificacion" v-on:keyup.enter="identificarCotizante">
                            <span class="input-group-btn">
                              <button type="button" class="btn btn-primary" @click="identificarCotizante" :disabled="cargando">Consultar
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" class="collapsed" aria-expanded="false" ref="paso2">Datos Básicos</a>
                    </h4>
                  </div>
                  <div id="collapseTwo" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                    <div class="panel-body">
                      <form class="form-horizontal">
                        <div class="form-group">
                          <label class="col-sm-3 control-label">¿Es nueva afiliación?</label>

                          <div class="col-sm-9">
                            <input type="checkbox" class="js-switch" v-model="nuevaAfiliacion" />

                            <span v-if="!nuevaAfiliacion" class="text-primary">Ya Se encuentra registrado</span>
                            <span v-if="nuevaAfiliacion" class="text-color: green">Es una nueva Afiliacion</span>
                          </div>
                        </div>

                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                          <label class="col-sm-3 control-label">Cantidad de Beneficiarios</label>

                          <div class="col-sm-3">
                            <!-- <input class="touchspin form-control" type="text" value="" name="" style="display: block;" v-model.number="cantidadBeneficiarios"> -->
                            <input class="form-control" type="number" style="display: block;" v-model.number="cantidadBeneficiarios">
                          </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">Asesor:</label>

                          <div class="col-sm-3">
                            <select class="form-control m-b" name="account" title="Asesor" v-model="asesorId" ref="asesorId">
                                        <option value="" selected></option>
                                        <option v-for="item in ases" :key="item.AsesorID" :value="item.AsesorID">{{item.AsesorID}}</option>
                                      </select>
                          </div>
                          <div class="col-sm-7">
                            <select class="form-control m-b" name="account" title="Asesor" v-model="asesorId" ref="nombreAsesor" v-focus>
                                        <option value="" selected>Elija el asesor responsable de ésta radicación:</option>
                                        <option v-for="item in ases" :key="item.AsesorID" :value="item.AsesorID">{{item.NombreAsesor}}</option>
                                      </select>
                          </div>
                        </div>

                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                          <div class="col-sm-4 col-sm-offset-2">
                            <!-- <button class="btn btn-white" type="submit">Cancel</button> -->
                            <button class="btn btn-primary" @click.prevent="$refs.paso3.click(); $refs.nroFormulario.focus()">Listo</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" class="collapsed" aria-expanded="false" ref="paso3">Datos de Radicación</a>
                    </h4>
                  </div>
                  <div id="collapseThree" class="panel-collapse collapse" aria-expanded="false">
                    <div class="panel-body">
                      <form class="form-horizontal">
                        <div class="form-group">
                          <label class="col-sm-3 control-label">Número de Formulario</label>

                          <div class="col-sm-3">
                            <input class="form-control" type="text" style="display: block;" v-model="nroFormulario" ref="nroFormulario">
                          </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                          <label class="col-sm-3 control-label">Ubicación:</label>

                          <div class="col-sm-2">
                            <select class="form-control m-b" name="account" title="Ubicación" v-model="municipioId" ref="municipioId" v-focus>
                                        <option value="" selected></option>
                                        <option v-for="item in muns" :key="item.MunicipioID" :value="item.MunicipioID">{{item.MunicipioID}}</option>
                                      </select>
                          </div>
                          <div class="col-sm-7">
                            <select class="form-control m-b" name="account" title="Ubicación" v-model="municipioId" ref="descripcionMunicipio">
                                        <option value="" selected>Elije la procedencia de la radicación:</option>
                                        <option v-for="item in muns" :key="item.MunicipioID" :value="item.MunicipioID">{{item.DescripcionMunicipio}} - {{item.DescripcionDepartamento}}</option>
                                      </select>
                          </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                          <label class="col-sm-3 control-label">Código Sticker</label>

                          <div class="col-sm-3">
                            <input class="form-control" type="text" style="display: block;" @input="sticker = $event.target.value.toUpperCase()" title="Sticker" placeholder="Código del Sticker">
                          </div>
                          <div class="col-sm-6">
                            <a href="#" @click.prevent="imprimirCodigoBarras">
                              <barcode :value="sticker" :options="{ displayValue: true }" v-if="sticker!==''" id="canvasStiker"></barcode>
                            </a>

                          </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                          <div class="col-sm-4 col-sm-offset-2">
                            <!-- <button class="btn btn-white" type="submit">Cancel</button> -->
                            <button class="btn btn-primary" @click.prevent="$refs.paso4.click()">Listo</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour" class="collapsed" aria-expanded="false" ref="paso4">Archivo</a>
                    </h4>
                  </div>
                  <div id="collapseFour" class="panel-collapse collapse" aria-expanded="false">
                    <div class="panel-body">
                      <div class="fileinput fileinput-new input-group" data-provides="fileinput">
                        <div class="form-control" data-trigger="fileinput">
                          <i class="glyphicon glyphicon-file fileinput-exists"></i>
                          <span class="fileinput-filename"></span>
                        </div>
                        <span class="input-group-addon btn btn-default btn-file">
                                    <span class="fileinput-new">Elige un archivo PDF</span>
                        <span class="fileinput-exists">Cambiar</span>
                        <input type="file" name="archivo" id="archivo" accept="application/pdf" />
                        </span>
                        <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Descartar</a>
                      </div>
                      <div class="hr-line-dashed" v-if="archivo!==''"></div>
                      <pdf-viewer :src="archivo" v-if="archivo!==''"></pdf-viewer>
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
import { mapActions } from "vuex";
import pdf from "vue-pdf";
import { default as componentes } from "../../../../components";
export default {
  data() {
    return {
      cargando: false,
      consultado: false,
      tids: {},
      ases: {},
      muns: {},
      cotizante: {},
      nuevaAfiliacion: false,
      tipoId: "",
      asesorId: "",
      numeroIdentificacion: "",
      cantidadBeneficiarios: 0,
      nroFormulario: "",
      municipioId: "",
      sticker: "",
      archivo: "" //"/src/assets/Test.pdf"
    };
  },
  mounted() {
    this.setCurrent("Nueva Radicación");
    this.cargando = true;
    this.$http
      .get(`tipoidentificaciones`)
      .then(data => {
        this.tids = data.result.recordset;
      })
      .then(() => {
        this.$http
          .get(`asesores`)
          .then(data => {
            this.ases = data.result.recordset;
            // console.log(this.ases);
          })
          .catch(function(err) {
            this.cargando = false;
          });
      })
      .then(() => {
        this.$http
          .get(`municipios`)
          .then(data => {
            this.cargando = false;
            this.muns = data.result.recordset;
            // console.log(this.muns);
          })
          .catch(function(err) {
            this.cargando = false;
          });
      })
      .catch(function(err) {
        this.cargando = false;
      });
    var elem = document.querySelector(".js-switch");
    var switchery = new Switchery(elem, {
      color: "#1AB394"
    });
    $(".touchspin").TouchSpin({
      // verticalbuttons: true,
      buttondown_class: "btn btn-white",
      buttonup_class: "btn btn-white",
      min: 0
    });
    var self = this;
    $("#archivo").on("change", function($e) {
      // console.log(this.files[0].mozFullPath);
      // var filePath = $(this).val();
      // console.log(filePath);
      // self.archivo = filePath;

      // console.log(this.files[0].mozFullPath);
      // alert($("#archivo").val());

      if ($("#archivo").val() !== "") {
        var file = this.files[0];
        if (file.type.indexOf("pdf") === -1) {
          self.notification({
            message: "No se permiten formatos diferentes a PDF's",
            type: "error"
          });
          // console.log(file.type);
          self.archivo = "";
          return $("#archivo").val("");
        }
        var path = (window.URL || window.webkitURL).createObjectURL(file);
        self.archivo = path;
        // console.log("Path: ", path);
      } else {
        self.archivo = "";
      }
    });

    // console.log(componentes);
  },
  methods: {
    ...mapActions(["setCurrent", "notification"]),
    identificarCotizante() {
      this.consultado = false;
      if (this.tipoId === "") {
        return this.$refs.tipoId.focus();
      }
      if (this.numeroIdentificacion === "") {
        return this.$refs.numeroIdentificacion.focus();
      }
      this.cotizante = {};
      this.$refs.numeroIdentificacion.select();
      this.cargando = true;
      this.$http
        .get(`afiliados/${this.tipoId}/${this.numeroIdentificacion}`)
        .then(data => {
          this.cargando = false;
          if (data.result.recordset.length > 0) {
            this.cotizante = data.result.recordset[0];
            this.$refs.paso2.click();
            this.$refs.asesorId.focus();
          } else {
            this.consultado = true;
          }
        })
        .catch(function(err) {
          this.cargando = false;
        });
    },
    radicar() {
      var self = this;

      const formData = new FormData();
      var file = $("#archivo")[0].files[0];
      formData.append("file", file, file.name);
      // alert(this.cantidadBeneficiarios);
      var model = {
        ASESORID: this.asesorId,
        FORMULARIOID: this.nroFormulario,
        TIPOID: this.tipoId,
        NUMEROIDENTIFICACION: this.numeroIdentificacion,
        NUEVOREGISTRO: this.nuevaAfiliacion ? 1 : 0,
        CANTIDADBENEFICIARIOS: this.cantidadBeneficiarios,
        SERIALSTICKER: this.sticker,
        MUNICIPIOID: this.municipioId
      };
      // console.log(model);
      // const json = "json=" + JSON.stringify({ model });
      formData.append(
        "json",
        JSON.stringify({
          model
        })
      );
      // console.log(formData);

      self.cargando = true;
      self.$http
        .post(`archivos/cargar`, formData)
        .then(data => {
          self.cargando = false;
          // console.log(data);
          self.consultado = false;
          self.cotizante = {};
          self.nuevaAfiliacion = false;
          self.tipoId = "";
          self.asesorId = "";
          self.numeroIdentificacion = "";
          self.cantidadBeneficiarios = 0;
          self.nroFormulario = "";
          self.municipioId = "";
          self.sticker = "";
          self.archivo = "";
          $("#archivo").val("");
          self.$refs.paso1.click();
        })
        .catch(function(err) {
          self.cargando = false;
        });
      // setTimeout(function() {
      //   self.cargando = false;
      //   // self.$router.push('/')
      //   console.log(model);
      // }, 2000);
    },
    imprimirCodigoBarras() {
      const canvas = $("#canvasStiker")[0];
      var url = canvas.toDataURL();
      const image =
        "<html><head><script>function step1(){\n" +
        'setTimeout("step2()", 10);}\n' +
        "function step2(){window.print();window.close()}\n" +
        "</scri" +
        'pt></head><body onload="step1()">\n' +
        '<center><img src="' +
        url +
        '" /></center></body></html>';
      const Pagelink = "about:blank";
      const pwa = window.open(Pagelink, "_new");
      pwa.document.open();
      pwa.document.write(image);
      pwa.document.close();
      return false;
    }
  },
  computed: {
    razonSocial() {
      if (!this.cotizante.NumeroIdentificacion) {
        return "";
      } else {
        return (
          this.cotizante.PrimerNombre +
          " " +
          this.cotizante.SegundoNombre +
          " " +
          this.cotizante.PrimerApellido +
          " " +
          this.cotizante.SegundoApellido +
          " (" +
          this.cotizante.TipoId +
          " - " +
          this.cotizante.NumeroIdentificacion +
          ")"
        );
      }
    },
    formularioValido() {
      if (this.archivo === "") {
        return false;
      }
      if (this.numeroIdentificacion === "") {
        return false;
      }
      if (this.tipoId === "") {
        return false;
      }
      if (this.asesorId === "") {
        return false;
      }
      if (this.nroFormulario === "") {
        return false;
      }
      if (this.municipioId === "") {
        return false;
      }
      if (this.sticker === "") {
        return false;
      }
      return true;
    }
  },
  components: {
    pdf,
    pdfViewer: componentes.PdfViewer
  }
};
</script>

