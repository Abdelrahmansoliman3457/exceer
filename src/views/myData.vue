<template>
    <div class="container position-relative">

      <div class="flex-end-section mb-5">

        <div class="main-text mb-5">

          <p class="main-title">{{ $t('Sidebar.my_data') }}</p>

          <!-- this text for new order -->
          <p v-if="centerData" class="main-disc">{{ $t('Glopal.modify_central_data') }}</p>

          <!-- this text for for current order -->
          <p v-if="doctorData" class="main-disc">{{ $t('Glopal.here_edit_your_data') }}</p>

          <!-- this code for finished order -->
          <p v-if="bankAccount" class="main-disc">{{ $t('Glopal.modify_bank_account_information') }}</p>
        </div>

      </div>

  <div class="route-parent">
    
    <router-link :to="{name: 'centerData'}" class="order-shape">
        {{$t('Glopal.center_data')}}
    </router-link>

    <router-link :to="{name: 'doctorData'}" class="order-shape">
        {{$t('Glopal.Doctors_data')}}
    </router-link>

    <router-link :to="{name: 'bankAccount'}" class="order-shape">
        {{$t('Glopal.bank_account')}}
    </router-link>
  </div>

    <router-view></router-view>
    
    </div>
</template>

<script>


export default {
  data() {
    return {
      centerData: false,
      doctorData: false,
      bankAccount: false,
    };
  },

  mounted() {
    // Check the initial route on component mount
    const initialRouteName = this.$route.name;
    this.handleRouteChange(initialRouteName);
  },
  watch: {
    $route(to, from) {
      const routeName = to.name;
      this.handleRouteChange(routeName);
    },
  },
  methods: {
    handleRouteChange(routeName) {
      this.centerData = routeName === 'centerData';
      this.doctorData = routeName === 'doctorData';
      this.bankAccount = routeName === 'bankAccount';
    },
  },


}
</script>
