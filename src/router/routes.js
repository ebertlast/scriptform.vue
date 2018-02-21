import { default as modulos } from '../modulos'

export const routes = []

modulos.seguridad.routes.forEach(route => {
  routes.push(route)
})

modulos.principal.routes.forEach(route => {
  routes.push(route)
})

// console.log(modulos.seguridad)
// console.log(routes)
