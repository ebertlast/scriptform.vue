<template>
  <div>
    <div class="col-lg-8">
      <div class="ibox float-e-margins">
        <div class="ibox-content">
          <form role="form" class="form-inline">
            <div class="form-group">
              <label for="GrupoID" class="sr-only">Código</label>
              <input type="text" placeholder="Código del Grupo" id="GrupoID" class="form-control" v-model="usgru.GrupoID" ref="GrupoID" v-on:keyup.enter="guardar" v-focus>
            </div>
            <div class="form-group">
              <label for="DescripcionGrupo" class="sr-only">Descripción</label>
              <input type="text" placeholder="Descripción" id="DescripcionGrupo" class="form-control" v-model="usgru.DescripcionGrupo" ref="DescripcionGrupo" v-on:keyup.enter="guardar">
            </div>
            <button class="btn btn-primary" type="submit" @click.prevent="guardar">
              <i class="fa fa-check"></i>
              Guardar</button>
            <button class="btn btn-default" type="button" @click.prevent="$router.go(-1)">
              <i class="fa fa-undo"></i>
              Volver</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      usgru: {
        GrupoID: "",
        DescripcionGrupo: ""
      }
    };
  },
  mounted() {
    this.setCurrent("Nuevo Grupo");
  },
  methods: {
    ...mapActions(["setCurrent", "notification"]),
    guardar() {
      if (this.usgru.GrupoID === "") {
        return this.$refs.GrupoID.focus();
      }
      if (this.usgru.DescripcionGrupo === "") {
        return this.$refs.DescripcionGrupo.focus();
      }
      this.usgru.GrupoID = this.usgru.GrupoID.toUpperCase();
      // console.log(this.usgru);
      var self = this;
      const json = "json=" + JSON.stringify({ model: self.usgru });
      // console.log(json);
      self.$http.put(`grupos/nuevo`, json).then(data => {
        // console.log(data);
        self
          .notification({
            message: "Registro agregado a la base de datos"
          })
          .then(() => {
            self.usgru = {
              GrupoID: "",
              DescripcionGrupo: ""
            };
          });
      });
    }
  }
};
</script>

<style>

</style>
