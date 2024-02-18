<template>
  <div class="sidebar" v-if="!AuthRoute && showHeader" :class="{ 'active': isActive }">

    <div class="colse-icon" @click="$emit('toggle-active')"><i class="fas fa-times"></i></div>

    <div class="sidebar-logo">
      <router-link :to="{ name: 'Home' }">
        <img :src="require('@/assets/images/nav-logo.png')" alt="nav-logo">
      </router-link>

      <div class="sidebar-text">
        <p class="purple">{{ $t('Sidebar.aksir') }}</p>
        <p>{{ $t('Sidebar.center_control_panel') }}</p>
      </div>

    </div>

    <ul ref="linksList" class="links">
      <router-link class="link" ref="HomeLink" :to="{ name: 'Home' }" :class="{ active: isLinkActive('Home') }"
        @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/home-img.png')" alt="nav-logo">
          {{ $t('Sidebar.home') }}
        </div>
      </router-link>

      <router-link class="link" v-if="abilities  == null || abilities.some(e => e.id === 2)" ref="servicesLink" :to="{ name: 'services' }" :class="{ active: isLinkActive('services') }"
        @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/fatrows.png')" alt="nav-logo">
          {{ $t('Sidebar.services') }}
        </div>
      </router-link>

      <router-link class="link" v-if="abilities  == null || abilities.some(e => e.id === 1)" ref="packagesLink" :to="{ name: 'packages' }" :class="{ active: isLinkActive('packages') }"
        @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/award.png')" alt="nav-logo">
          {{ $t('Sidebar.packages') }}
        </div>
      </router-link>

      <router-link class="link" v-if="abilities  == null || abilities.some(e => e.id === 4)" ref="ordersLink" :to="{ name: 'orders' }"
        :class="{ active: isLinkActive('orders') || $route.name === 'orderDetails' }" @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/task-square.png')" alt="nav-logo">
          {{ $t('Sidebar.appointment_requests') }}
        </div>
      </router-link>

      <router-link class="link" v-if="abilities  == null || abilities.some(e => e.id === 4)" ref="worktimeLink" :to="{ name: 'worktime' }" :class="{ active: isLinkActive('worktime') }"
        @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/clock.png')" alt="nav-logo">
          {{ $t('Sidebar.times_work') }}
        </div>
      </router-link>

      <router-link class="link" v-if="abilities  == null || abilities.some(e => e.id === 4)" ref="externalAppointmentsLink" :to="{ name: 'externalAppointments' }"
        :class="{ active: isLinkActive('externalAppointments') }" @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/calendar-tick.png')" alt="nav-logo">
          {{ $t('Sidebar.external_appointments') }}
        </div>
      </router-link>

      <router-link class="link" ref="myDataLink" :to="{ name: 'myData' }" :class="{ active: isLinkActive('myData') }"
        @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/hashtag.png')" alt="nav-logo">
          {{ $t('Sidebar.my_data') }}
        </div>
      </router-link>

      <router-link class="link" ref="myReviewsLink" :to="{ name: 'myReviews' }"
        :class="{ active: isLinkActive('myReviews') }" @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/star.png')" alt="nav-logo">
          {{ $t('Sidebar.my_reviews') }}
        </div>
      </router-link>

      <router-link class="link" ref="financialtransactionsLink" :to="{ name: 'financialtransactions' }"
        :class="{ active: isLinkActive('financialtransactions') }" @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/empty-wallet-change.png')" alt="nav-logo">
          {{ $t('Sidebar.financial_transactions') }}
        </div>
      </router-link>

      <router-link class="link" v-if="abilities == null || abilities.some((e) => e.id === 4 && e.id === 1 && e.id === 2 && e.id === 3)" ref="orderReportsLink" :to="{ name: 'orderReports' }"
        :class="{ active: isLinkActive('orderReports') }" @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/receipt-item.png')" alt="nav-logo">
          {{ $t('Sidebar.order_reports') }}
        </div>
      </router-link>

      <router-link class="link" v-if="abilities == null || abilities.some((e) => e.id === 4 && e.id === 1 && e.id === 2 && e.id === 3)" ref="userPermissionsLink" :to="{ name: 'userPermissions' }"
        :class="{ active: isLinkActive('userPermissions') }" @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/profile-2user.png')" alt="nav-logo">
          {{ $t('Sidebar.user_permissions') }}
        </div>
      </router-link>

      <router-link class="link" ref="aboutApplicationLink" :to="{ name: 'aboutApplication' }"
        :class="{ active: isLinkActive('aboutApplication') }" @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/warning-2.png')" alt="nav-logo">
          {{ $t('Sidebar.about_application') }}
        </div>
      </router-link>

      <router-link class="link" ref="termsConditionsLink" :to="{ name: 'termsConditions' }"
        :class="{ active: isLinkActive('termsConditions') }" @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/note-2.png')" alt="nav-logo">
          {{ $t('Sidebar.terms_and_Conditions') }}
        </div>
      </router-link>

      <router-link class="link" ref="ConnectusLink" :to="{ name: 'Connectus' }"
        :class="{ active: isLinkActive('Connectus') }" @click="handleResize">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/message-text.png')" alt="nav-logo">
          {{ $t('Sidebar.connect_us') }}
        </div>
      </router-link>

      <button class="link w-100" @click="logout">
        <div class="hint-img">
          <img :src="require('@/assets/images/sidebar-img/logout.png')" alt="nav-logo">
          {{ $t('Sidebar.sign_out') }}
        </div>
      </button>

    </ul>
  </div>

  <div class="overlay-sidebar" @click="$emit('toggle-active')" :class="{ 'show': isActive }"></div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['isActive'],
  data() {
    return {
      AuthRoute: true,
      showHeader: true,
      abilities: null
    };
  },



  mounted() {
    // On component mount, check if there is a stored active link
    const storedActiveLink = localStorage.getItem('activeLink');

    if (storedActiveLink) {
      // Scroll to the stored active link
      this.scrollToActiveLink(storedActiveLink);
    }

    if(localStorage.getItem('abilities')){
      this.abilities = JSON.parse(localStorage.getItem('abilities')) || null
    } else{
      this.abilities = null
    }
  },
  // watch: {
  //   // Watch for changes in the route
  //   $route(to, from) {

  //   }
  // },

  methods: {
    // handleResize tiggle sidebar when window resize to less than 1200px active class 
    
    handleResize() {
      if (window.innerWidth <= 1200) {
        this.$emit('toggle-active')
      }
    },

    // this methods isLinkActive pass active class each route clicked ans set class active in localStorage
    isLinkActive(route) {
      const isActive = this.$route.matched.some((record) => record.name === route);

      if (isActive) {
        const refName = `${route}Link`;
        this.scrollToActiveLink(refName);

        // Store the active link in localStorage
        localStorage.setItem('activeLink', refName);
      }

      return isActive;
    },

    // this methods add alink in the end for each route to make scroll to center of element i clicked
    scrollToActiveLink(refName) {
      // Wait for the next tick to ensure that the DOM has been updated
      this.$nextTick(() => {
        const linkRef = this.$refs[refName];
        // Scroll to the active link with smooth behavior
        if (linkRef && linkRef.$el) {
          linkRef.$el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },
    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    async logout() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };

      await axios
        .post(`provider/logout`, '' ,config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            localStorage.removeItem("token");
            this.$router.push({ name: "login" });
            localStorage.removeItem("abilities");
          } else {
            this.showFail(res.data.msg);
          }
          this.loader = false;
        })
        .catch((e) => {
          console.error(e);
        });
    }
  },



  watch: {
    // Watch for changes in the route
    
    $route(to, from) {
      
    if (localStorage.getItem("abilities")) {
          this.abilities = JSON.parse(localStorage.getItem("abilities")) || null;
        } else {
          this.abilities = null;
        }
      // Check if the current route is 'NotFound'
      if (to.name === 'NotFound') {
        // Set your sidebar to false
        this.showHeader = false;
        console.log("not found")
      } else {
        // For other routes, set it based on the route's meta information
        this.AuthRoute = to.meta.authRout;
        this.showHeader = true;
      }

    },

  },

  updated() {
    this.AuthRoute = this.$route.meta.authRout;
  },

  // updated
  // mounted() {
  //   this.AuthRoute = this.$route.meta.authRout;
  // }
};


</script>


<style lang="scss" scoped>.colse-icon {
  cursor: pointer;
}

.links {
  scroll-behavior: smooth;

}</style>