// #region Cargas Diferidas - Lazy Loading
const PdfViewer = resolve => {
  require.ensure(['./PdfViewer.vue'], () => {
    resolve(require('./PdfViewer.vue'))
  }, 'comun')
}
const PdfPreview = resolve => {
  require.ensure(['./PdfPreview.vue'], () => {
    resolve(require('./PdfPreview.vue'))
  }, 'comun')
}
const BorrarRegistro = resolve => {
  require.ensure(['./BorrarRegistro.vue'], () => {
    resolve(require('./BorrarRegistro.vue'))
  }, 'comun')
}
const Datatable = resolve => {
  require.ensure(['./Datatable.vue'], () => {
    resolve(require('./Datatable.vue'))
  }, 'comun')
}
// #endregion
export default {
  PdfViewer: PdfViewer,
  BorrarRegistro: BorrarRegistro,
  PdfPreview: PdfPreview,
  Datatable: Datatable,
}
