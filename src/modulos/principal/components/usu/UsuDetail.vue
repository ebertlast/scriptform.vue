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
    <div class="row m-b-lg m-t-lg">
      <div class="col-md-6">
          <div class="profile-image">
              <img src="src/assets/img/avatars/user-default.jpg" class="img-circle circle-border m-b-md" alt="profile">
          </div>
          <div class="profile-info">
              <div class="">
                  <div>
                      <h2 class="no-margins">
                          {{usu.USUARIOID}}
                      </h2>
                      <h4>{{usu.NOMBRE}}</h4>
                      <small>
                          Grupo {{usu.GRUPOID}}.
                      </small>
                      <p>
                        <span class="badge badge-primary" v-if="usu.ACTIVO">Activo</span>
                        <span class="badge badge-danger" v-if="!usu.ACTIVO">Inactivo</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-md-3">
          <table class="table small m-b-xs">
              <tbody>
                  <tr>
                      <td>
                        <button :disabled="cargando" class="btn btn-sm btn-success" @click="$emit('editar')">
                          <i class="fa fa-edit">
                            Editar
                          </i>
                        </button>
                      </td>
                  </tr>
                  <tr>
                      <td>
                        <button :disabled="cargando" class="btn btn-sm btn-danger" @click="borrar">
                          <i class="fa fa-trash">
                            Eliminar
                          </i>
                        </button>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <button :disabled="cargando" class="btn btn-sm btn-white" @click="$emit('volver')">
                          <i class="fa fa-undo">
                            Regresar
                          </i>
                        </button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "usuDetail",
  props: ["usu"],
  data() {
    return {
      cargando: false
    };
  },
  mounted() {
    // console.log(this.usu);
  },
  methods: {
    borrar() {
      return this.$swal(
        "¡Eliminación de usuarios deshabilitada!",
        "El registro no puede ser eliminado de la base de datos. En su lugar inactivelo",
        "error"
      );
      const self = this;
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
            setTimeout(() => {
              self
                .$swal(
                  "¡Eliminado!",
                  "El registro fue eliminado de la base de datos.",
                  "success"
                )
                .then(() => {
                  self.$emit("volver");
                });
              self.cargando = false;
            }, 5000);
            // self.$http
            //   .delete(`grupos/${self.grupoid}`)
            //   .then(response => {
            //     self.cargando = false;
            //     if (response.success) {
            //       self.$swal(
            //         "¡Eliminado!",
            //         "El registro fue eliminado de la base de datos.",
            //         "success"
            //       ).then((result)=>{
            //         self.$router.go(-1);
            //       });
            //     }else{
            //       self.$swal(
            //         "¡Eliminado!",
            //         "El registro no fue eliminado de la base de datos. ¡Vuelve a Intentarlo",
            //         "error"
            //       );
            //     }
            //   })
            //   .catch(error => {
            //     console.log(error);
            //     self.cargando = false;
            //   });
          } else if (result.dismiss === "cancel") {
            self.$swal(
              "Cancelado",
              "Tu información está a salvo conmigo :)",
              "error"
            );
          }
        });
    }
  }
};
</script>

<style>

</style>
