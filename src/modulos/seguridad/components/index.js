// #region Cargas Diferidas - Lazy Loading
const Ingresar = resolve => {
  require.ensure(['./Ingresar.vue'], () => {
    resolve(require('./Ingresar.vue'))
  }, 'seguridad')
}
// #endregion
export default {Ingresar}
