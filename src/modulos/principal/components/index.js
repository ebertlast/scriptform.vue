// #region Cargas Diferidas - Lazy Loading
const Home = resolve => {
  require.ensure(['./Home.vue'], () => {
    resolve(require('./Home.vue'))
  }, 'principal')
}
// #region USGRU
const UsgruList = resolve => {
  require.ensure(['./usgru/List.vue'], () => {
    resolve(require('./usgru/List.vue'))
  }, 'usgru')
}
const UsgruDetail = resolve => {
  require.ensure(['./usgru/UsgruDetail.vue'], () => {
    resolve(require('./usgru/UsgruDetail.vue'))
  }, 'usgru')
}
const UsgruEdit = resolve => {
  require.ensure(['./usgru/UsgruEdit.vue'], () => {
    resolve(require('./usgru/UsgruEdit.vue'))
  }, 'usgru')
}
const UsgruAdd = resolve => {
  require.ensure(['./usgru/UsgruAdd.vue'], () => {
    resolve(require('./usgru/UsgruAdd.vue'))
  }, 'usgru')
}
// #endregion

// #region USU
const UsuList = resolve => {
  require.ensure(['./usu/List.vue'], () => {
    resolve(require('./usu/List.vue'))
  }, 'usu')
}
const Perfil = resolve => {
  require.ensure(['./usu/Perfil.vue'], () => {
    resolve(require('./usu/Perfil.vue'))
  }, 'usu')
}
// #endregion
// #region Visor y Radicaciones
const NuevaRadicacion = resolve => {
  require.ensure(['./radicacion/Nueva.vue'], () => {
    resolve(require('./radicacion/Nueva.vue'))
  }, 'radicaciones')
}
const Visor = resolve => {
  require.ensure(['./visor/Consulta.vue'], () => {
    resolve(require('./visor/Consulta.vue'))
  }, 'visor')
}
// #endregion
// #endregion

export default {
  Home,
  NuevaRadicacion,
  Visor,
  UsgruAdd,
  UsgruList,
  UsgruDetail,
  UsgruEdit,
  UsuList,
  Perfil
}
