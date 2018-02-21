<template>
  <div>
    <div class="col-lg-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title hide">
          <h5>Inline form</h5>
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
          <form role="form" class="form-inline">
            <div class="form-group hide">
              <label for="GrupoID" class="sr-only">Identificador</label>
              <input type="text" placeholder="Identificador" id="GrupoID" class="form-control" ref="GrupoID" v-model="GrupoID" v-on:keypress="confirmado=false">
            </div>
            <div class="form-group">
              <label for="DescripcionGrupo" class="sr-only">Descripción</label>
              <input type="text" placeholder="Descripción" id="DescripcionGrupo" class="form-control" ref="DescripcionGrupo" v-model="DescripcionGrupo" v-on:keypress="confirmado=false"  v-focus>
            </div>
            <button class="btn btn-primary" type="submit" @click.prevent="confirmarEdicion">Aceptar</button>
            <button class="btn btn-default" @click.prevent="$router.go(-1)">Volver</button>
      <!-- <button disabled="disabled">Hola</button> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      confirmado: true,
      GrupoID: "",
      DescripcionGrupo: ""
    };
  },
  mounted() {
    this.setCurrent(`Edición de ${this.usgru.DescripcionGrupo}`);
    if (!this.usgru.GrupoID || this.usgru.GrupoID === "") {
      this.$router.push({ name: "usgrulist" });
    }
    this.GrupoID = this.usgru.GrupoID;
    this.DescripcionGrupo = this.usgru.DescripcionGrupo;
  },

  methods: {
    ...mapActions(["setCurrent", "notification", "setUsgru"]),
    confirmarEdicion() {
      // console.log(this.GrupoID, " - ", this.DescripcionGrupo);
      var model = {
        GrupoID: this.GrupoID,
        DescripcionGrupo: this.DescripcionGrupo
      };
      const json = "json=" + JSON.stringify({ model });
      var self = this;
      self.$http.post(`grupos/actualizar`, json).then(data => {
        // console.log(data);
        if (data.success === true) {
          self.setUsgru(model).then(() => {
            self.notification({
              message: "Registro actualizado en la base de datos"
              // type: "error"
            });
          });
        }
      });
    }
    // getUsgru() {
    //   alert("");
    //   return this.usgru;
    // }
  },
  beforeRouteLeave: (to, from, next) => {
    // var confirmed =
    //   this.GrupoID === this.usgru.GrupoID &&
    //   this.DescripcionGrupo === this.usgru.DescripcionGrupo;
    var confirmado = this.a.data().confirmado;
    if (!confirmado) {
      return next(false);
      if (
        confirm(
          "No ha confirmado los cambios, ¿desea descartarlos?, esta acción no podrá deshacerse."
        )
      ) {
        next(true);
      } else {
        next(false);
      }
    } else {
      next(true);
    }
  },
  computed: {
    ...mapGetters(["usgru"])
  },
  watch: {
    $route(to, from) {
      console.log("route switched");
    }
  }
};
</script>

<style>

</style>
