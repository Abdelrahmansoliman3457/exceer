<template>
  <div class="container ">
      <div class="main-text">
        <p class="main-title">{{$t('Glopal.home')}}</p>
        <p class="main-disc">{{$t('Glopal.statistics_displayed')}}</p>
      </div>

      <div class="layout-card mt-4 mb-4">
        <div class="row">
          <div class="col-12 col-md-4 mb-4">
            <div class="layout-item">
              <img :src="require('@/assets/images/vector.png')" alt="" class="img">
              <p>{{ homeData.reservationCount }}</p>
              <p>{{ $t('Glopal.total_number_reservations') }}</p>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="layout-item">
              <img :src="require('@/assets/images/card-receive.png')" alt="" class="img">
              <p>{{ homeData.newReservations }}</p>
              <p>{{$t('Glopal.new_reservations')}}</p>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="layout-item">
              <img :src="require('@/assets/images/3square.png')" alt="" class="img">
              <p>{{ homeData.currentReservations }}</p>
              <p>{{$t('Glopal.current_reservations')}}</p>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="layout-item">
              <img :src="require('@/assets/images/video-tick.png')" alt="" class="img">
              <p>{{ homeData.finishedReservations }}</p>
              <p>{{$t('Glopal.expired_reservations')}}</p>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="layout-item">
              <img :src="require('@/assets/images/fatrows.png')" alt="" class="img">
              <p>{{ homeData.serviceCount }}</p>
              <p>{{$t('Glopal.number_services')}}</p>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="layout-item">
              <img :src="require('@/assets/images/award.png')" alt="" class="img">
              <p>{{ homeData.packageCount }}</p>
              <p>{{$t('Glopal.number_packages')}}</p>
            </div>
          </div>
        </div>
      </div>
    
  </div>

</template>

<script>
import axios from "axios";


export default {
  

  components: {

  },

  data() {
    return {
    "homeData": {
      "fake1": 100,
      "fake2": 100,
      "fake3": 100,
      "fake4": 100,
      "fake5": 0,
      "finishedReservations": 0,
      "refusedReservations": 0
     },
      // homeData: null 
    };
  },


  methods: {
   async getHome() {
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };
      await axios.get(`provider/general/home-statistics`, config)
      .then((res) => {
        if (res.data.key == "success") {
          this.homeData = res.data.data;

        } else {
                console.log("failed");
            }
      })

      .catch((e) => {
        console.error(e);
      });
    }
  },

  async mounted() {
    await this.getHome();
  }
};
</script>

<style lang="scss" scoped>
  .layout-item {
      padding: 20px 10px;
      background-image: linear-gradient(to bottom, #00A19A99, #543D8FE5);
      border-radius: 8px;
      height: 100%;
      @media screen and (min-width: 1440px) and (max-width: 2500px) {
        width: 300px;
     }

     @media (max-width: 550px) {
        width: calc(100% - 20px);
     }
      margin: 0 auto;
      .img {
        max-width: 40px;
      }
      p, .img {
        font-size: 15px;
        color: #fff;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
  }
</style>
