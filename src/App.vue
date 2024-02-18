<template>
  <nav-bar @toggle-active="toggleActive"></nav-bar>
  <sideBar :isActive="isActive" @toggle-active="toggleActive"/>

    <v-main class="body-containt">
      <div class="with-pt" :class="{'auth-padding': !AuthRoute , 'active': isActive}">
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </v-main>
  

</template>

<script>

import NavBar from "@/components/Layout/NavBar.vue";
import sideBar from "@/components/Layout/sideBar.vue"


export default {
  components: {
    NavBar,
    sideBar
  },
  data() {
    return {
      AuthRoute: true,
      isActive: false,
    };
  },

    methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    }
  },

    watch: {
    // Watch for changes in the route
    $route(to, from) {

      // Handle the event here
      // console.log("Route changed:", to, from);

      this.AuthRoute = to.meta.authRout
    },
  },

  // updated
  mounted() {
    this.AuthRoute = this.$route.meta.authRout;
  }
};
</script>

<style lang="scss">

// ul {
//   list-style: none;
//   display: flex;
//   justify-content: center;
//   gap: 20px;
// }

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'main_font', sans-serif, 'Font Awesome 5 Free';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

ul {
  // padding: 30px;

  a {
    // font-weight: bold;
    // color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.pageView-enter-active {
  animation: fadeRight .5s forwards;
}

.pageView-leave-active {
  animation: fadeRight 0.5s reverse;
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.route-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}


</style>
