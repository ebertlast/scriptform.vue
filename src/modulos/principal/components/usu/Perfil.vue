<template>
  <div>
      <div class="row m-b-lg m-t-lg">
            <div class="col-md-4">
                <div class="profile-image">
                    <img src="src/assets/img/avatars/user-default.jpg" class="img-circle circle-border m-b-md" alt="profile">
                </div>
                <div class="profile-info">
                    <div class="">
                        <div>
                            <h2 class="no-margins">
                                {{usu.NOMBRE|capitalize}}
                            </h2>
                            <h4>{{usu.GRUPO|capitalize}}</h4>
                            <small>
                                Usuario: {{usu.USUARIOID}}
                                <br>
                                Email: {{usu.EMAIL}}
                                <br>
                                Sede: {{usu.SEDE|capitalize}}
                                <br>

                            </small>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div id="formulario">
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
                <div class="col-md-3">
                    <div class="ibox">
                        <div class="ibox-content">
                            <h3>Actualizar contraseña</h3>

                            <p class="small">
                                La contraseña nueva será enviada a su correo
                            </p>

                            <div class="form-group">
                                <label>Contraseña Actual</label>
                                <input type="password" class="form-control" placeholder="Contraseña actual" title="Clave secreta actual" v-model="claveActual" v-focus ref="claveActual" v-on:keypress.enter="guardar">
                            </div>
                            <div class="form-group">
                                <label>Contraseña Nueva</label>
                                <input type="password" class="form-control" placeholder="Contraseña Nueva" title="Clave secreta nueva" v-model="claveNueva" ref="claveNueva" v-on:keypress.enter="guardar">
                            </div>
                            <button class="btn btn-primary btn-block" @click="guardar" :disabled="cargando">Actualizar Clave Secreta</button>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 hide">
                <small>Sales in last 24h</small>
                <h2 class="no-margins">206 480</h2>
                <div id="sparkline1"><canvas style="display: inline-block; width: 247.25px; height: 50px; vertical-align: top;" width="247" height="50"></canvas></div>
            </div>
        </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// console.log(mapGetters);
export default {
  data() {
    return {
      cargando: false,
      claveActual: "",
      claveNueva: ""
    };
  },
  mounted() {
    this.setCurrent("Mi perfil");
    console.log("Usuario: ", this.usu);
    // console.log("Getters: ");
  },
  methods: {
    ...mapActions(["setCurrent", "animarDiv", "notification"]),
    guardar() {
      if (this.claveActual === "") {
        this.animarDiv("formulario");
        return this.$refs.claveActual.focus();
      }
      if (this.claveNueva === "") {
        this.animarDiv("formulario");
        return this.$refs.claveNueva.focus();
      }

      const self = this;
      this.cargando = true;
      //   console.log(this.usuario);
      //   this.usu.CLAVE = this.claveNueva;
      var model = {
        USUARIOID: this.usu.USUARIOID,
        CLAVE: this.claveNueva,
        EMAIL: this.usu.EMAIL
      };
      //   delete model.TOKEN;
      const json = "json=" + JSON.stringify({ model });
      //   console.log(json);
      this.$http
        .post(`usuarios/cambiarclave/${this.claveActual}`, json)
        .then(response => {
          this.cargando = false;
          //   console.log(response);
          if (response.success) {
            this.notification({
              message:
                "Clave secreta actualizada, ¡Ingresa con tu nueva clave!",
              type: "info"
            }).then(() => {
              this.$router.push({ name: "ingresar" });
            });
          } else {
            this.animarDiv("formulario");
            this.notification({
              message: "Registro no actualizado, ¡Vuelve a intentarlo!",
              type: "error"
            });
          }
        })
        .catch(error => {
          this.animarDiv("formulario");
          console.log(error);
          this.cargando = false;
          return this.$refs.claveActual.select();
        });
      //   setTimeout(() => {
      //     self.cargando = false;
      //     // self.animarDiv("formulario");
      //     self.$router.push({ name: "ingresar" });
      //   }, 2000);
    }
  },
  computed: {
    ...mapGetters(["usu"])
  }
};
</script>

<style>

</style>
