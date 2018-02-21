<template>
  <div>
      <div class="row">
          <div class="col-lg-7">
              <div class="ibox float-e-margins">
                  <div class="ibox-content">
                      <div class="row">
                          <div class="col-sm-6 b-r">
                            <!-- <h3 class="m-t-none m-b">Sign in</h3> -->
                              <!-- <p>Sign in today for more expirience.</p> -->
                              <form role="form">
                                  <div class="form-group">
                                    <label>Usuario</label> 
                                    <input type="text" placeholder="Usuario sin espacios" class="form-control" title="Usuario" ref="USUARIOID" :value="usu.USUARIOID.toUpperCase()"
                                    @input="usu.USUARIOID = $event.target.value.toUpperCase()" v-focus >
                                  </div>
                                  <div class="form-group">
                                    <label>Nombres</label> 
                                    <input type="text" placeholder="Nombres del Usuario" class="form-control" 
                                    :value="usu.NOMBRE.toUpperCase()"
                                    @input="usu.NOMBRE = $event.target.value.toUpperCase()" ref="NOMBRE">
                                  </div>
                                   <div class="form-group">
                                    <label>Correo</label> 
                                    <input type="email" placeholder="Correo Electrónico" class="form-control" ref="EMAIL" :value="usu.EMAIL.toLowerCase()"
                                    @input="usu.EMAIL = $event.target.value.toLowerCase()">
                                  </div>
                              </form>
                          </div>
                          <div class="col-sm-6">
                            <!-- <h4>Not a member?</h4> -->
                              <form role="form">
                                  <div class="form-group">
                                    <label>Grupo</label> 
                                    <select name="GRUPOID" id="GRUPOID" ref="GRUPOID" v-model="usu.GRUPOID" class="form-control">
                                      <option :value="item.GrupoID" v-for="(item, index) in grupos" :key="index">
                                        {{item.DescripcionGrupo}}
                                      </option>
                                    </select>
                                  </div>
                                  <div class="form-group">
                                    <label>Sede</label> 
                                    <select name="SEDEID" id="SEDEID" ref="SEDEID" v-model="usu.SEDEID" class="form-control">
                                      <option :value="item.SEDEID" v-for="(item, index) in sedes" :key="index">
                                        {{item.RAZONSOCIAL}}
                                      </option>
                                    </select>
                                  </div>
                                  <div class="from-group">
                                    <label>Activo</label>
                                     <input type="checkbox" ref="ACTIVO" v-model="usu.ACTIVO">
                                  </div>
                                  <div>
                                      <button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="button" @click="guardar"><strong>Guardar</strong></button>
                                      <button class="btn btn-sm btn-white pull-right m-t-n-xs" type="button" @click="$emit('volver')"><strong>Regresar</strong></button>
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
export default {
  props: ["sedes", "grupos"],
  data() {
    return {
      usu: { NOMBRE: "", USUARIOID: "", EMAIL: "" },
      cargando: false
    };
  },
  methods: {
    upper(e) {
      e.target.value = e.target.value.toUpperCase();
    },
    guardar() {
      console.log(this.usu);
    }
  }
};
</script>

<style>

</style>
