<template>
  <div id="formLogin">
    <div class="loginColumns animated fadeInDown">
      <div class="row">

        <div class="col-md-6">
          <h2 class="font-bold">Bienvenido a {{appname}}</h2>
          <p style="text-align:center">
            <img src="/src/assets/logo.svg" :alt="appname" width="200px">
          </p>
          <p class="hide">
            Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
          </p>

          <p class="hide">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s.
          </p>

          <p class="hide">
            When an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>

          <p class="hide">
            <small>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</small>
          </p>

        </div>
        <div class="col-md-6">
          <div class="ibox-content">
            <form class="m-t" role="form" action="index.html" :title="`Ingresa tus credenciales para acceder a ${appname}`">
              <div class="form-group">
                <select class="form-control" ref="sedeid" v-focus v-model="sedeid" title="Selecciona tu sede para acceder">
                  <option value="" selected>Selecciona tu Sede</option>
                  <option :value="sede.SEDEID" v-for="sede in sedes" :key="sede.SEDEID">{{sede.RAZONSOCIAL}}</option>
                </select>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Usuario" required="" ref="usuario" v-model="usuario" v-on:keypres.enter="ingresar" title="Usuario">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Clave" required="" ref="clave" v-model="clave" v-on:keypress.enter="ingresar" title="Clave">
              </div>
              <button type="submit" class="btn btn-primary block full-width m-b" @click.prevent="ingresar" :disabled="cargando" title="Click para ingresar">Ingresar</button>
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
              <a href="#" class="hide">
                <small>Forgot password?</small>
              </a>

              <p class="text-muted text-center hide">
                <small>Do not have an account?</small>
              </p>
              <a class="btn btn-sm btn-white btn-block hide" href="#" >Create an account</a>
            </form>
            <p class="m-t">
              <!-- <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> -->
              <small>Ingresa tus credenciales para acceder al sistema</small>
            </p>
          </div>
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="col-md-6">
          Copyright {{companyname}}
        </div>
        <div class="col-md-6 text-right">
          <small>© {{yearscopyrigth}}</small>
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
      sedes: [],
      sedeid: "",
      usuario: "",
      clave: "",
      cargando: false
    };
  },
  mounted() {
    // console.log("this.$store: ", this.$store);
    // console.log("this.$http: ", this.$http);
    // this.notification({ message: "Pruebas de Desarrollo" });
    this.$http.get(`sedes/`).then(data => {
      this.sedes = data.result.recordset;
    });
    $("body").attr("class", "gray-bg");
    this.clearUsu();
  },
  computed: {
    ...mapGetters(["appname", "companyname", "yearscopyrigth"])
  },
  methods: {
    ...mapActions(["notification", "animarDiv", "setUsu", "clearUsu"]),
    ingresar() {
      if (this.sedeid === "") {
        this.animarDiv("formLogin");
        return this.$refs.sedeid.focus();
      }
      if (this.usuario === "") {
        this.animarDiv("formLogin");
        return this.$refs.usuario.focus();
      }
      if (this.clave === "") {
        this.animarDiv("formLogin");
        return this.$refs.clave.focus();
      }
      this.cargando = true;
      var self = this;
      self.$http
        .get(`usuarios/ingresar/${this.sedeid}/${this.usuario}/${this.clave}`)
        .then(response => {
          self.cargando = false;
          if (!response.success) {
            self.$refs.usuario.focus();
            return self.animarDiv("formLogin");
          }
          if (response.result.recordset.length <= 0) {
            self.notification({
              message: "Credenciales incorrectas",
              type: "info"
            });
          } else {
            var usu = response.result.recordset[0];
            self.setUsu(usu).then(() => {
              this.$router.push("/");
            });
          }
        })
        .catch(function(err) {
          self.notification({ message: err, type: "error" });
          self.cargando = false;
          self.animarDiv("formLogin");
        });
      // setTimeout(function() {
      //   self.cargando = false;
      //   console.log(self.usuario, " - ", self.clave);
      // }, 1000);
    }
  }
};
</script>

<style scoped>
input[type="text"] {
  text-transform: uppercase;
}
</style>
