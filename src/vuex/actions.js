export default {
  animarDiv: ({ commit }, idDiv, animation = 'shake') => {
    $('#' + idDiv)
      .removeClass()
      .addClass(animation + ' animated')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass()
      })
  },
  /**
   * Despliegue de mensajes tipo notificaciones >> https://notifyjs.com/
   * @param message Mensaje que se mostrará en el cuerpo de la notificación
   * @param type Tipo de notificación: success [default] (verde), error (rojo), warning (amarillo), info (azul))
   * @param positionClass Posición de la pantalla donde se desplegará la notificación: top-right, bottom-right  (Default), bottom-left,
   * top-full-width, bottom-full-width, top-center, bottom-center
   */
  notificacion({ commit }, message, title = '' , type = 'success' , positionClass = 'top right') {
    toastr.options = {
      'closeButton': true,
      'debug': false,
      'progressBar': true,
      'preventDuplicates': true,
      'positionClass': 'toast-top-right',
      'onclick': null,
      'showDuration': '400',
      'hideDuration': '1000',
      'timeOut': '7000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut',
      icon: {
        error: 'fa fa-close',
        info: 'fa fa-info',
        success: 'something',
        warning: 'something'
      }
    }
    // console.log(message)
    switch (type) {
      case 'success':
        toastr.success(message, title)
        break
      case 'error':
        toastr.error(message, title)
        break
      case 'warning':
        toastr.warning(message, title)
        break
      case 'info':
        toastr.info(message, title)
        break
      default:
        toastr.success(message, title)
    }
  },
  notification({ commit }, payLoad) {
    // console.log('payLoad.message: ', payLoad.message)
    // console.log(this)
    var message = (payLoad.message) ? payLoad.message : '',
      title = (payLoad.title) ? payLoad.title : '',
      type = (payLoad.type) ? payLoad.type : 'success',
      positionClass = (payLoad.positionClass) ? payLoad.positionClass : 'top right'
    toastr.options = {
      'closeButton': true,
      'debug': false,
      'progressBar': true,
      'preventDuplicates': true,
      'positionClass': 'toast-top-right',
      'onclick': null,
      'showDuration': '400',
      'hideDuration': '1000',
      'timeOut': '7000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut',
      icon: {
        error: 'fa fa-close',
        info: 'fa fa-info',
        success: 'something',
        warning: 'something'
      }
    }
    // console.log(message)
    switch (type) {
      case 'success':
        toastr.success(message, title)
        break
      case 'error':
        toastr.error(message, title)
        break
      case 'warning':
        toastr.warning(message, title)
        break
      case 'info':
        toastr.info(message, title)
        break
      default:
        toastr.success(message, title)
    }
  }
}
