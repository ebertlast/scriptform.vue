<template>
  <div>
    <div class="ibox-content">
      <div class="row">
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
        <div class="col-md-7">

          <h2 class="font-bold m-b-xs">
            {{usgru.DescripcionGrupo}}
          </h2>
          <div class="m-t-md">
            <h2 class="product-main-price">{{usgru.GrupoID}}
              <!-- <small class="text-muted">Exclude Tax</small> -->
            </h2>
          </div>
          <hr>

          <div>
            <div class="btn-group">
              <button class="btn btn-white btn-sm" @click="$router.go(-1)" :disabled="cargando">
                <i class="fa fa-undo"></i> Volver</button>
                <router-link tag="button" class="btn btn-success btn-sm" :to="{ name: 'usgruEdit', params: { grupoid: usgru.GrupoID }}" :disabled="cargando">
                  <i class="fa fa-edit"></i>
                  Editar
                </router-link>
              <!-- <button class="btn btn-success btn-sm">
                <i class="fa fa-edit"></i> Editar </button> -->
              <button class="btn btn-danger btn-sm" @click="eliminar" :disabled="cargando">
                <i class="fa fa-trash"></i> Eliminar </button>
            </div>
          </div>



        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      cargando: false,
      grupoid: this.$route.params.grupoid
      // grupo: this.getUsgru
      // ...mapState(["usgru"])
    };
  },
  mounted() {
    // this.$http.get(`grupos/${this.grupoid}`).then(data => {
    //   this.grupo = data.result.recordset[0];
    //   // this.grupo=
    this.setCurrent(`Datos del grupo ${this.usgru.DescripcionGrupo}`);
    // });
    // console.log(this.$route.params);
    // console.log(this.getUsgru());
    // console.log(this.usgru);
    if (!this.usgru.GrupoID || this.usgru.GrupoID === "") {
      this.$router.push({ name: "usgrulist" });
    }
  },
  computed: {
    ...mapGetters(["usgru"])
  },
  methods: {
    ...mapActions(["setCurrent"]),
    eliminar() {
      const self = this;
      // console.log(self.$swal);
      if (true) {
        self
          .$swal({
            title: "¿Confirma que desea realmente eliminar el registro?",
            text: "¡Ésta acción no podrá deshacerse!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡deseo hacerlo!",
            cancelButtonText: "No, ¡cancelar!",
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            buttonsStyling: false,
            reverseButtons: true
          })
          .then(result => {
            if (result.value) {
              self.cargando = true;
              // setTimeout(() => {
              //   self.$swal(
              //     "¡Eliminado!",
              //     "El registro fue eliminado de la base de datos.",
              //     "success"
              //   );
              //   self.cargando = false;
              // }, 5000);
              self.$http
                .delete(`grupos/${self.grupoid}`)
                .then(response => {
                  self.cargando = false;
                  if (response.success) {
                    self.$swal(
                      "¡Eliminado!",
                      "El registro fue eliminado de la base de datos.",
                      "success"
                    ).then((result)=>{
                      self.$router.go(-1);
                    });
                  }else{
                    self.$swal(
                      "¡Eliminado!",
                      "El registro no fue eliminado de la base de datos. ¡Vuelve a Intentarlo",
                      "error"
                    );
                  }
                })
                .catch(error => {
                  console.log(error);
                  self.cargando = false;
                });
            } else if (result.dismiss === "cancel") {
              self.$swal(
                "Cancelado",
                "Tu información está a salvo conmigo :)",
                "error"
              );
            }
          });
      } else {
        const ipAPI = "https://api.ipify.org?format=json";

        self.$swal
          .queue([
            {
              title: "Your public IP",
              confirmButtonText: "Show my public IP",
              text: "Your public IP will be received " + "via AJAX request",
              showLoaderOnConfirm: true,
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              cancelButtonText: "No, cancelar!",
              preConfirm: () => {
                return $.get(ipAPI).then(data => {
                  self.$swal.insertQueueStep(data.ip);
                });
              }
            }
          ])
          .then(result => {
            if (result.value) {
            } else {
            }
          });
      }
    }
  }
};
</script>

<style>

</style>
