<template>
  <div class="container">
    <div class="main-text">
      <p class="main-title">{{ $t("Sidebar.about_application") }}</p>
      <p class="main-disc">{{ $t("Glopal.details_about_the_application") }}</p>
    </div>

    <div class="layout-card mt-4 mb-4">
      <div class="text-center mb-4">
        <img :src="require('@/assets/images/about-logo.png')" alt="about-img" class="about-img" />
      </div>


      <div v-if="!loader">
        <div class="about-title text-center" v-html="about"></div>
      </div>

      <div v-if="loader" class="px-4">
        <Skeleton height=".6rem" class="mb-2" v-for="i in 4" :key="i"></Skeleton>
        <Skeleton height=".6rem" width="70%" class="mb-2"></Skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Skeleton from 'primevue/skeleton';

export default {
  components: {
    Skeleton
  },
  data() {
    return {
      about: '',
      loader: false
    };
  },
  methods: {
    async getData() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };
      this.loader = true;
      await axios
        .get(`provider/general/about`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.about = res.data.data;
          } else {
            console.log("failed");
          }
          this.loader = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  async mounted() {
    await this.getData();
  }
}
</script>
