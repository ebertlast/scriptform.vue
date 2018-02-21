export default {
  usu: state => {
    return state.usu
  // if (!localStorage.getItem('kryWebUser')) {
  //   return {}
  // }
  // return JSON.parse(localStorage.getItem('kryWebUser'))['usuario']
  },
  nombreUsuario: state => {
    return state.usu.NOMBRE.substr(
      0,
      state.usu.NOMBRE.indexOf(' ')
    )
  },
  nombreGrupo: state => {
    return state.usu.GRUPO.substr(
      0,
      state.usu.GRUPO.indexOf(' ')
    )
  }
}
