<template>
  <div id="wrapper">
    <nav class="navbar-default navbar-static-side" role="navigation" v-if="false">
      <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
          <li class="nav-header">
            <div class="dropdown profile-element">
              <span>
                  <img alt="image" class="img-circle" src="/src/assets/img/avatars/user-default.jpg" width="50px" />
                </span>
              <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                <span class="clear">
                    <span class="block m-t-xs">
                      <strong class="font-bold">{{usu.NOMBRE | capitalize}}</strong>
                    </span>
                <span class="text-muted text-xs block">{{usu.GRUPO | capitalize}}
                      <b class="caret"></b>
                    </span>
                </span>
              </a>
              <ul class="dropdown-menu animated fadeInRight m-t-xs">
                <li>
                  <a href="profile.html">Perfil</a>
                </li>
                <li>
                  <a href="contacts.html">Contacts</a>
                </li>
                <li>
                  <a href="mailbox.html">Mailbox</a>
                </li>
                <li class="divider"></li>
                <li>
                  <a href="login.html">Logout</a>
                </li>
              </ul>
            </div>
            <div class="logo-element">
              {{appnamesmall}}
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="navbar-default navbar-static-side" role="navigation">
      <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 100%;">
        <div class="sidebar-collapse" style="overflow: hidden; width: auto; height: 100%;">
          <ul class="nav metismenu" id="side-menu" style="">
            <li class="nav-header">
              <div class="dropdown profile-element">
                <span>
                          <img alt="image" class="img-circle" src="/src/assets/img/avatars/user-default.jpg" width="50px" />
                        </span>
                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                  <span class="clear">
                            <span class="block m-t-xs">
                              <strong class="font-bold">
                                <small>
                                  {{usu.NOMBRE | capitalize}}
                                </small>
                              </strong>
                            </span>
                  <span class="text-muted text-xs block">
                              <small>
                                {{usu.GRUPO | capitalize}}
                              </small>
                              <b class="caret"></b>
                            </span>
                  </span>
                </a>
                <ul class="dropdown-menu animated fadeInRight m-t-xs">
                  <li>
                    <router-link tag="a" :to="{name:'perfil'}">Perfil</router-link>
                  </li>
                  <!-- <li>
                    <a href="contacts.html">Contacts</a>
                  </li>
                  <li>
                    <a href="mailbox.html">Mailbox</a>
                  </li> -->
                  <li class="divider"></li>
                  <li>
                    <router-link tag="a" :to="{name:'ingresar'}">Cerrar Sesión</router-link>
                  </li>
                </ul>
              </div>
              <div class="logo-element">
                {{appnamesmall}}
              </div>
            </li>
            <router-link tag="li" :to="{name: 'bienvenidaKonfiguracion'}" class="hide">
              <a href="#">
                <i class="fa fa-gears"></i>
                <span class="nav-label">Configuraciones</span>
              </a>
            </router-link>
            <router-link tag="li" :to="{name:'visor'}" active-class="active">
              <a href="#">
                <i class="fa fa-eye"></i>
                <span class="nav-label">Visor</span>
              </a>
            </router-link>
            <router-link tag="li" :to="{name:'radicacionNueva'}" active-class="active">
              <a href="#">
                <i class="fa fa-cloud-upload"></i>
                <span class="nav-label">Nueva Radicación</span>
              </a>
            </router-link>


            <!-- <li class="active"> -->
            <li>
              <a href="#">
                <i class="fa fa-desktop"></i>
                <span class="nav-label">Sistema</span>
                <span class="fa arrow"></span>
              </a>
              <!-- <ul class="nav nav-second-level collapse in" style=""> -->
              <ul class="nav nav-second-level collapse" style="">
                <!-- <li class="active"> -->
                <li>
                  <a href="#">Usuarios
                            <span class="fa arrow"></span>
                          </a>
                  <!-- <ul class="nav nav-third-level collapse in" style=""> -->
                  <ul class="nav nav-third-level collapse" style="" active-class="in">

                    <router-link :to="{name:'usgrulist'}" tag="li" active-class="active">
                      <a href="#">Grupos</a>
                    </router-link>

                    <router-link :to="{name:'usulist'}" tag="li" active-class="active">
                      <a href="#">Usuarios</a>
                    </router-link>
                  </ul>
                </li>
              </ul>
            </li>

          </ul>

        </div>
        <div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 106.066px;"></div>
        <div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.9; z-index: 90; right: 1px;"></div>
      </div>
    </nav>
    <div id="page-wrapper" class="gray-bg">
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top  " role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#">
              <i class="fa fa-bars"></i>
            </a>
            <form role="search" class="navbar-form-custom hide" action="search_results.html">
              <div class="form-group">
                <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">
              </div>
            </form>
          </div>
          <ul class="nav navbar-top-links navbar-right">
            <li>
              <span class="m-r-sm text-muted welcome-message">Bienvenido a {{appname}}.</span>
            </li>
            <li class="dropdown hide">
              <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                <i class="fa fa-envelope"></i>
                <span class="label label-warning">16</span>
              </a>
              <ul class="dropdown-menu dropdown-messages">
                <li>
                  <div class="dropdown-messages-box">
                    <a href="profile.html" class="pull-left">
                      <img alt="image" class="img-circle" src="/src/assets/img/a7.jpg">
                    </a>
                    <div class="media-body">
                      <small class="pull-right">46h ago</small>
                      <strong>Mike Loreipsum</strong> started following
                      <strong>Monica Smith</strong>.
                      <br>
                      <small class="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                    </div>
                  </div>
                </li>
                <li class="divider"></li>
                <li>
                  <div class="dropdown-messages-box">
                    <a href="profile.html" class="pull-left">
                      <img alt="image" class="img-circle" src="/src/assets/img/a4.jpg">
                    </a>
                    <div class="media-body ">
                      <small class="pull-right text-navy">5h ago</small>
                      <strong>Chris Johnatan Overtunk</strong> started following
                      <strong>Monica Smith</strong>.
                      <br>
                      <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                    </div>
                  </div>
                </li>
                <li class="divider"></li>
                <li>
                  <div class="dropdown-messages-box">
                    <a href="profile.html" class="pull-left">
                      <img alt="image" class="img-circle" src="/src/assets/img/profile.jpg">
                    </a>
                    <div class="media-body ">
                      <small class="pull-right">23h ago</small>
                      <strong>Monica Smith</strong> love
                      <strong>Kim Smith</strong>.
                      <br>
                      <small class="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                    </div>
                  </div>
                </li>
                <li class="divider"></li>
                <li>
                  <div class="text-center link-block">
                    <a href="mailbox.html">
                      <i class="fa fa-envelope"></i>
                      <strong>Read All Messages</strong>
                    </a>
                  </div>
                </li>
              </ul>
            </li>
            <li class="dropdown hide">
              <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                <i class="fa fa-bell"></i>
                <span class="label label-primary">8</span>
              </a>
              <ul class="dropdown-menu dropdown-alerts">
                <li>
                  <a href="mailbox.html">
                    <div>
                      <i class="fa fa-envelope fa-fw"></i> You have 16 messages
                      <span class="pull-right text-muted small">4 minutes ago</span>
                    </div>
                  </a>
                </li>
                <li class="divider"></li>
                <li>
                  <a href="profile.html">
                    <div>
                      <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                      <span class="pull-right text-muted small">12 minutes ago</span>
                    </div>
                  </a>
                </li>
                <li class="divider"></li>
                <li>
                  <a href="grid_options.html">
                    <div>
                      <i class="fa fa-upload fa-fw"></i> Server Rebooted
                      <span class="pull-right text-muted small">4 minutes ago</span>
                    </div>
                  </a>
                </li>
                <li class="divider"></li>
                <li>
                  <div class="text-center link-block">
                    <a href="notifications.html">
                      <strong>See All Alerts</strong>
                      <i class="fa fa-angle-right"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </li>


            <router-link tag="li" to="/ingresar">
              <a href="#">
                <i class="fa fa-sign-out"></i> Cerrar Sesión
              </a>
            </router-link>
          </ul>

        </nav>
      </div>
      <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
          <h2>{{current}}</h2>
          <ol class="breadcrumb hide">
            <li>
              <a href="index.html">This is</a>
            </li>
            <li class="active">
              <strong>Breadcrumb</strong>
            </li>
          </ol>
        </div>
        <div class="col-sm-8 hide">
          <div class="title-action">
            <a href="" class="btn btn-primary">This is action area</a>
          </div>
        </div>
      </div>

      <div class="wrapper wrapper-content">
        <transition enter-active-class="animated fadeIn" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </div>
      <div class="footer">
        <div class="pull-right">
          {{appname}}
          <strong>{{appnamesmall}}</strong>.
        </div>
        <div>
          <strong>Copyright</strong> {{companyname}} &copy; {{yearscopyrigth}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "usu",
      "appname",
      "companyname",
      "yearscopyrigth",
      "appnamesmall",
      "current"
    ])
  },
  mounted() {
    // console.log("current: ", this.current);
    $("body").attr(
      "class",
      // "fixed-sidebar no-skin-config full-height-layout pace-done mini-navbar"
      "fixed-sidebar no-skin-config full-height-layout pace-done"
    );
    if (typeof cargarInspinia === "function") {
      cargarInspinia();
    }
  }
};
</script>
