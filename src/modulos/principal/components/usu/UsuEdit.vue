<template>
    <div>
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
        <div class="row">
            <div class="col-lg-7">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-6 b-r">
                                <h3 class="m-t-none m-b">{{usuario.USUARIOID}}</h3>
                                <form role="form">
                                    <div class="form-group"><label>Nombres</label> <input type="text" placeholder="Nombres" title="Nombres" class="form-control" v-model="usuario.NOMBRE" ref="NOMBRE"></div>
                                    <div class="form-group"><label>Correo</label> <input type="email" placeholder="Correo Electrónico" title="Correo Electrónico" class="form-control" v-model="usuario.EMAIL" ref="EMAIL"></div>
                                </form>
                            </div>
                            <div class="col-sm-6">
                                    <form role="form">
                                    <div class="form-group">
                                        <label>Grupo</label> 
                                        <select class="form-control" name="GrupoID" id="GrupoID" title="Grupo" v-model="usuario.GRUPOID" ref="GRUPOID">
                                            <option :value="item.GrupoID" v-for="(item, index) in grupos" :key="index">{{item.DescripcionGrupo}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group"><label>Sede</label> 
                                        <select name="SedeID" id="SedeID" title="Sede" class="form-control" v-model="usuario.SEDEID" ref="SEDEID">
                                            <option value="SedeID" v-for="(item, index) in sedes" :key="index">
                                                {{item.RAZONSOCIAL}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="activo">Activo</label>
                                        <input type="checkbox" ref="ACTIVO" v-model="usuario.ACTIVO">
                                    </div>
                                    <div>
                                        <button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit" @click.prevent="guardar" ref="btnGuardar" :disabled="cargando"><strong>Guardar</strong></button>
                                    </div>
                                    <div>
                                        <button class="btn btn-sm btn-white pull-right m-t-n-xs" type="button" @click.prevent="$emit('volver'); $emit('refrescar')" ref="btnRegresar" :disabled="cargando"><strong>Regresar</strong></button>
                                    </div>
                                </form>
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
export default {
  props: ["usu", "sedes", "grupos"],
  data() {
    return {
      usuario: {},
      // sedes: [],
      // grupos: [],
      cargando: false
    };
  },
  mounted() {
    // this.$http
    //   .get(`sedes`)
    //   .then(response => {
    //     this.sedes = response.result.recordset;
    //     this.$http.get(`grupos`).then(response => {
    //       this.grupos = response.result.recordset;
    //     });
    //   })
    //   .catch(() => {});
    this.usuario = this.usu;
  },
  watch: {
    usu() {
      this.usuario = this.usu;
    }
  },
  methods: {
    ...mapActions(["notification"]),
    guardar() {
      if (this.usuario.NOMBRE === "") {
        return this.$refs.NOMBRE.focus();
      }
      if (this.usuario.EMAIL === "") {
        return this.$refs.EMAIL.focus();
      }
      if (this.usuario.GRUPOID === "") {
        return this.$refs.GRUPOID.focus();
      }
      if (this.usuario.SEDEID === "") {
        return this.$refs.SEDEID.focus();
      }
      const self = this;
      const json = "json=" + JSON.stringify({ model: this.usuario });
      this.cargando = true;
      this.$http
        .post("usuarios/actualizar", json)
        .then(response => {
          this.cargando = false;
          if (response.success) {
            self.notification({
              message: "Registro actualizado en la base de datos"
            });
          } else {
            self.notification({
              message:
                "Registro no pudo ser actualizado en la base de datos. ¡Vuelve a intentarlo!",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.cargando = false;
        });
    }
  }
};
</script>

<style>

</style>
