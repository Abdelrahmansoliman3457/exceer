<template>
    <div class="container position-relative">

      <div class="flex-end-section mb-5">

        <div class="main-text mb-5">

          <p class="main-title">{{ $t('titles.appointment_requests') }}</p>

          <!-- this text for new order -->
          <p v-if="Neworder" class="main-disc">{{ $t('orders.new_orders_and_details') }}</p>

          <!-- this text for for current order -->
          <p v-if="CurrentOrder" class="main-disc">{{ $t('orders.see_the_current_one_details') }}</p>

          <!-- this code for finished order -->
          <p v-if="FinishedOrder" class="main-disc">{{ $t('orders.see_finished_orders_details') }}</p>
          
          <p class="main-disc" v-if="cancelorder">{{ $t('orders.here_canceled_orders_details') }}</p>
        </div>

      </div>

    <div class="route-parent">
      
      <router-link :to="{name: 'new-order'}" class="order-shape">
          {{$t('orders.new_appointments')}}
      </router-link>

      <router-link :to="{name: 'current-order'}" class="order-shape">
          {{$t('orders.current_appointments')}}
      </router-link>

      <router-link :to="{name: 'finished-order'}" class="order-shape">
          {{$t('orders.expired_appointments')}}
      </router-link>

      <router-link :to="{name: 'cancel-order'}" class="order-shape">
          {{$t('orders.canceled_orders')}}
      </router-link>
    </div>

    <router-view></router-view>
    
    </div>
</template>

<script>


export default {
  data() {
    return {
      Neworder: true,
      CurrentOrder: false,
      FinishedOrder: false,
      cancelorder: false
    };
  },

  methods: {
    handleRouteChange(routeName) {
      this.Neworder = routeName === 'new-order';
      this.CurrentOrder = routeName === 'current-order';
      this.FinishedOrder = routeName === 'finished-order';
      this.cancelorder = routeName === 'cancel-order';

    }
  },

    watch: {
    $route(to, from) {
      // Handle the event here
      const routeName = to.name;
      this.handleRouteChange(routeName);
    },
  },


    mounted() {
    // Check the initial route on component mount
    const initialRouteName = this.$route.name;
    this.handleRouteChange(initialRouteName);
  },


}
</script>
