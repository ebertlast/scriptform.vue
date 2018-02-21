import axios from 'axios'
import join from 'url-join'
import { URL_API } from '../const'
import { default as store } from '../vuex'
import { router } from '../router'
// #region Incrustar Token en las solicitudes
var isAbsoluteURLRegex = /^(?:\w+:)\/\//
axios.interceptors.request.use(function (config) {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(URL_API, config.url)
  }
  // console.log(config.url)
  var token = store.getters.usu.TOKEN || null
  // console.log(token)
  if (token) {
    config.headers['authorization'] = 'Bearer ' + token
  }
  config.headers['Expires'] = '-1'
  return config
})
// #endregion

// #region interceptar las Respuestas
axios.interceptors.response.use(
  response => {
    // console.log('*************************************************************')

    // console.log('Ebert: ', response)
    if (response.data.success === false && response.data.message) {
      store.dispatch('notification', { message: response.data.message, type: 'info' })
    }
    if (response.data.logout && response.data.logout === true) {
      router.push({ name: 'ingresar' })
    }
    if (response.data.token && response.data.token !== '') {
      // console.log(store.getters.usu.usuario)
      // alert(response.data.token)
      store.dispatch('setToken', response.data.token || response.data.TOKEN)
      // alert('')
    }
    return response.data
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // dispatch('logOut')
        // notify('Session expired')
        // alert('Session expired')
        store.dispatch('notification', { message: error.response.data.message || 'Session expired', type: 'info' })
      }
      else if (error.response.status === 404) {
        store.dispatch('notification',
          {
            message: `El servidor web responsable de aceptar las peticiones a la URL (${error.response.config.url}) no está en funcionamiento o hay problemas de conexión ó la URL se enlazó de forma incorrecta`,
            type: 'error'
          })
        // alert(`El servidor web responsable de aceptar las peticiones a la URL (${error.response.config.url}) no está en funcionamiento o hay problemas de conexión ó la URL se enlazó de forma incorrecta`)
      }
      else if (error.response.status === 500) {
        console.log(error.response)
        store.dispatch('notification',
          {
            message: `Error en el servidor ([${error.response.data.error.code}] - ${error.response.data.error.originalError.info.message})`,
            type: 'error'
          })
      } else {
        // console.log(error.response.data)
        if (error.response.data.success === false && error.response.data.message || error.response.data.error) {
          store.dispatch('notification', { message: error.response.data.message || error.response.data.error, type: 'error' })
        } else {
          store.dispatch('notification',
            {
              message: error.response,
              type: 'error'
            })
          console.log(error.response)
          return Promise.reject(error.response)
        }
      }
    } else if (error.request) {
      // console.log('error: ', error)
      // notify('Server down')
      // alert('Server down')
      store.dispatch('notification',
        {
          message: 'Server down',
          type: 'error'
        })
    } else {
      // notify('Unexpected error')
      // alert('Unexpected error')
      store.dispatch('notification',
        {
          message: `Unexpected error: ${error}`,
          type: 'error'
        })
    }
  }
)
// #endregion

export const http = axios
