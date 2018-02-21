import { default as components } from "./components";
export const routes = [
  {
    path: "/",
    component: components.Home,
    name: "home",
    children: [
      // #region USGRU
      { path: "usgru", component: components.UsgruList, name: "usgrulist" },
      { path: "usgruadd", component: components.UsgruAdd, name: "usgruadd" },
      {
        path: "usgru/:grupoid",
        component: components.UsgruDetail,
        name: "usgru"
      },
      {
        path: "usgru/:grupoid/edit",
        component: components.UsgruEdit,
        name: "usgruEdit"
      },
      // #endregion
      {
        path: "radicacion/nueva",
        component: components.NuevaRadicacion,
        name: "radicacionNueva"
      },
      { path: "visor", component: components.Visor, name: "visor" },
      { path: "usu", component: components.UsuList, name: "usulist" },
      { path: "perfil", component: components.Perfil, name: "perfil" },
    ]
  },
  { path: "**", redirect: { name: "visor" } }
];
