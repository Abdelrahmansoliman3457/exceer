<template>
  <div class="container">
    <div class="main-text">
      <p class="main-title">{{ $t("Auth.terms_conditions") }}</p>
      <p class="main-disc">{{ $t("Glopal.Here_terms_and_conditions") }}</p>
    </div>

    <div class="layout-card mt-4 mb-4">
      <div class="text-center mb-4">
        <img
          :src="require('@/assets/images/about-logo.png')"
          alt="about-img"
          class="about-img"
        />
      </div>

      <div v-if="!loader">
        <div class="about-title text-center" v-html="privacy"></div>
      </div>

      <div v-if="loader" class="px-4">
        <Skeleton
          height=".6rem"
          class="mb-2"
          v-for="i in 4"
          :key="i"
        ></Skeleton>
        <Skeleton height=".6rem" width="70%" class="mb-2"></Skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Skeleton from "primevue/skeleton";

export default {
  components: {
    Skeleton,
  },
  data() {
    return {
      privacy: "",
      loader: false,
    };
  },
  methods: {
    async getData() {
      // const config = {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // };
      this.loader = true;
      await axios
        .get(`provider/general/terms`)
        .then((res) => {
          if (res.data.key == "success") {
            this.privacy = res.data.data;
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
  },
};
</script>

<style lang="scss">
  .about-title * {
      margin-left: 0 !important;
      margin-right: 0 !important;
  } 
</style>