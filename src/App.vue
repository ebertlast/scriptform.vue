<template>
  <div id="app">
    <transition enter-active-class="animated fadeIn"
      mode="out-in"
      appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    ...mapActions(["initUsu"])
  },
  mounted() {
    this.initUsu();
  }
};
</script>

<style lang="scss">
.hide {
  display: none;
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }

// h1, h2 {
//   font-weight: normal;
// }

// ul {
//   list-style-type: none;
//   padding: 0;
// }

// li {
//   display: inline-block;
//   margin: 0 10px;
// }

// a {
//   color: #42b983;
// }
</style>
