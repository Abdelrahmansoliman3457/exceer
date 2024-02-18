<template>
  <header class="main-header" :class="{ 'auth-padding': !AuthRoute, 'active': isActive }" v-if="showHeader">
    <div class="top-nav">

      <div class="container">
        <div class="main-nav">

          <div class="logo-img" v-if="AuthRoute">
            <img :src="require('@/assets/images/nav-logo.png')" alt="nav-logo">
          </div>

          <div class="navbar-btn" v-else @click="toggleActive">
            <img class="sidmenu-btn" :src="require('@/assets/images/menu_1.png')" alt="sidmenu-btn">
          </div>

          <div class="left">

            <div class="d-flex gap-3" v-if="!AuthRoute">

              <router-link :to="{ name: 'notifications' }">
                <div class="notif-icon" :data-number="notCount">
                  <img class="bell-img" :src="require('@/assets/images/notification-bing.png')" alt="bell-img">
                </div>
              </router-link>

              <div class="auth-hint">
                <div class="d-flex gap-1">
                  <p>{{ $t('Auth.hello') }}</p>
                  <p>{{ nameUser }}</p>
                </div>
                <img :src="require('@/assets/images/waving-hand.png')" alt="">
              </div>
            </div>

            <div class="dropdown drop-lang">
              <a class="dropdown-toggle hint-lang" href="#" data-bs-toggle="dropdown">
                <i class="fas fa-globe icon"></i>
                <div v-if="htmlLang == ''">
                  <p>العربية</p>
                </div>
                <div v-else>
                  <p>{{ htmlLang === 'ar' ? 'العربية' : 'english' }}</p>

                </div>
              </a>

              <ul class="dropdown-menu">
                <button class="dropdown-item" @click="switchLang('ar')">العربيه</button>
                <button class="dropdown-item" @click="switchLang('en')">English</button>
              </ul>
            </div>

          </div>
        </div>
      </div>

    </div>
  </header>

  <Toast />
</template>

<script>
import i18n from '@/i18n';
import axios from 'axios';
export default {
  data() {
    return {
      nameUser: '',
      AuthRoute: true,
      showHeader: true,
      htmlLang: '',
      AllRoutes: [],
      onlyNavbar: [],
      itemToggle: false,
      navBtnActive: false,
      navLinksActive: false,
      navOverlayShow: false,
      isActive: false,
      notCount: 0,
    };
  },

  inject: ["emitter"],

  methods: {

    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    toggleActive() {
      this.$emit('toggle-active');
      this.isActive = !this.isActive
    },

    chageDir(dir) {
      let element = document.querySelector(".html_direction");
      element.setAttribute("lang", dir);
      if (dir == "ar") {
        element.setAttribute("dir", "rtl");
        this.htmlLang = dir;
      }
      if (dir == "en") {
        element.setAttribute("dir", "ltr");
        this.htmlLang = dir;
      }
    },

    switchLang(newLang) {
      // this.language = newLang;
      localStorage.setItem("locale", newLang);
      location.reload();
    },
    async notificationsCount() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };
      await axios.get(`provider/notifications/unread/count`, config).then((res) => {
        if (res.data.key == "success") {
          this.notCount = res.data.data.count;
        }
      })
    }

  },


  async mounted() {

    this.AllRoutes = this.$router.options.routes;

    // single rout
    this.onlyNavbar = this.$router.options.routes.filter(
      (item) => item.slug == "navBar"
    );

    window.sessionKey = localStorage.getItem("locale");
    if (sessionKey) {
      this.chageDir(localStorage.getItem("locale"));
    }

    this.AuthRoute = this.$route.meta.authRout;

    this.nameUser = localStorage.getItem("center_name");

    await this.notificationsCount();

  },

  watch: {
    // Watch for changes in the route
    $route(to, from) {
      if(this.notCount){
        this.notificationsCount()
      }
      // Check if the current route is 'NotFound'
      if (to.name === 'NotFound') {
        // Set your sidebar to false
        this.showHeader = false;
      } else {
        // For other routes, set it based on the route's meta information
        this.AuthRoute = to.meta.authRout;
        this.showHeader = true;
      }
    },

  },

  updated() {
    this.AuthRoute = this.$route.meta.authRout;
    this.nameUser = localStorage.getItem("center_name");
  },
};
</script>

<style lang="scss">
.main-header {
  position: -webkit-sticky;
  /* Safari */
  position: sticky;
  top: 0;
  z-index: 99;
}

.navbar-btn {
  cursor: pointer;

  .sidmenu-btn {
    max-width: 32px;
  }
}
</style>

