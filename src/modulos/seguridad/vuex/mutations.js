// import { router } from '../../../router'
// import { router } from '../../../router/index'
// console.log('Ebert: ', router)
import { USUARIO_STORAGE } from '../../../const'
export default {
  setUsu: (state, usu) => {
    state.usu = usu
    localStorage.removeItem(USUARIO_STORAGE)
    localStorage.setItem(USUARIO_STORAGE, JSON.stringify({ usuario: usu }))
  },
  initUsu: (state) => {
    if (!localStorage.getItem(USUARIO_STORAGE)) {
      state.usu = {}
    } else {
      state.usu = JSON.parse(localStorage.getItem(USUARIO_STORAGE))['usuario']
    }
  },
  setToken: (state, token) => {
    var usu = null
    if (JSON.parse(localStorage.getItem(USUARIO_STORAGE))) {
      usu = JSON.parse(localStorage.getItem(USUARIO_STORAGE))['usuario']
    }
    if (usu) {
      state.usu = JSON.parse(localStorage.getItem(USUARIO_STORAGE))['usuario']
      state.usu.TOKEN = token
      localStorage.removeItem(USUARIO_STORAGE)
      localStorage.setItem(USUARIO_STORAGE, JSON.stringify({ usuario: state.usu }))
    }
  },
  clearUsu: (state) => {
    state.usu = {}
    if (JSON.parse(localStorage.getItem(USUARIO_STORAGE))) {
      localStorage.removeItem(USUARIO_STORAGE)
    // router.push('/ingresar')
    }
  }

}
