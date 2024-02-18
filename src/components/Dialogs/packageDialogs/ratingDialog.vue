<template>
  <!-- rating dialog -->

  <Dialog v-model:visible="package_rating_dialog" modal class="custum_dialog_width" :draggable="false">
    <div class="text-center">
      <div class="main-text">
        <p class="main-title"> {{ $t('Glopal.customer_reviews_package') }} </p>
      </div>

      <div class="static-rate mb-4">

        <div v-if="loader">
          <Skeleton width="3rem" height=".8rem" class="mb-2 mr-auto"></Skeleton>
        </div>
        <div v-if="!loader">
          <p class="rate-num">{{ main_rate }}</p>
        </div>

        <div class="d-flex justify-content-center gap-2 mb-4 mt-4" v-if="loader">
          <Skeleton shape="circle" size=".8rem" class="mr-2"></Skeleton>
          <Skeleton shape="circle" size=".8rem" class="mr-2"></Skeleton>
          <Skeleton shape="circle" size=".8rem" class="mr-2"></Skeleton>
          <Skeleton shape="circle" size=".8rem" class="mr-2"></Skeleton>
        </div>

        <div class="rate-state m-0" v-if="!loader">
          <div class="clinic_evaluation">
            <star-rating :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]"
              :show-rating="false" :increment="0.5" active-color="#FFB300" :star-size="20" :read-only="true"
              :animate="true" :rounded-corners="true" :rtl="false" :rating="main_rate" :border-width="2"></star-rating>
          </div>
        </div>

        <div class="d-flex justify-content-center gap-2 mb-4 mt-4" v-if="loader">
          <Skeleton width="2rem" height=".8rem" class="mr-2"></Skeleton>
          <Skeleton width="3rem" height=".8rem" class="mr-2"></Skeleton>
        </div>
        <div class="rate-text" v-if="!loader">
          <p>({{ rates_count }})</p>
          <p> {{ $t('Glopal.rating') }} </p>
        </div>
      </div>

      <div class="main-rating-section d-flex justify-content-center gap-3 align-items-center" v-if="loader">
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
        <div>
          <Skeleton width="3rem" height=".8rem" class="mb-3"></Skeleton>
          <Skeleton width="5rem" height=".8rem" class="mr-2"></Skeleton>
        </div>
      </div>

      <div class="main-rating-section" v-if="!loader">
        <div class="rate-section" v-for="rate in rateData.rates" :key="rate">
          <img :src="rate.user.image" alt="img-done" class="user-img">
          <div class="rate-info">
            <p class="user-rate">{{ rate.user.name }}</p>
            <div class="foot-rate">
              <i class="far fa-clock clock-icon"></i>
              <p class="rate-time">{{ rate.created_at }}</p>
              <div class="rate-state sm">
                <star-rating :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]"
                  :show-rating="false" :increment="0.5" active-color="#FFB300" :star-size="12" :read-only="true"
                  :animate="true" :rounded-corners="true" :rtl="false" :rating="rate.rate"
                  :border-width="2"></star-rating>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import axios from 'axios';
import StarRating from 'vue-star-rating'
import Skeleton from 'primevue/skeleton';

export default {
  props: {
    itemId: Number
  },

  components: {
    Dialog,
    StarRating,
    Skeleton
  },
  data() {
    return {
      package_rating_dialog: false,
      loader: false,
      main_rate: 0,
      rateData: {},
      rates_count: 0,
    }
  },

  methods: {
    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    async PackageRate(id) {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };
      this.loader = true;
      await axios
        .get(`provider/packages/${id}/rates`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.loader = false;
            this.rateData = res.data.data;
            this.main_rate = this.rateData.data.avg_rate;
            this.rates_count = this.rateData.data.rates_count;
          } else {
            console.log("failed");

          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },

  updated() {
    this.PackageRate(this.itemId);
  }


};
</script>
