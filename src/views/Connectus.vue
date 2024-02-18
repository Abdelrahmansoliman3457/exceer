<template>
  <div class="container">
    <div class="main-text">
      <p class="main-title">{{ $t("Sidebar.connect_us") }}</p>
      <p class="main-disc">{{ $t("Glopal.communicate_administration") }}</p>
    </div>

    <form @submit.prevent="contactUs" ref="contactForm">
      <div class="layout-card mt-4 mb-4">
        <div class="row">
          <div class="col-12 col-md-8">
            <div class="form-group">
              <label class="label">{{ $t("Glopal.the_message") }}</label>
              <textarea
                class="main_input main_area"
                name="message"
                :placeholder="$t('Glopal.Please_enter_your_message')"
              ></textarea>
            </div>
          </div>
        </div>
        <button type="submit" class="custom-btn md">
          {{ $t("Glopal.send") }}
          <span
            class="spinner-border spinner-border-sm custom-spinner"
            v-if="loader"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
        <div class="mb-3">او عن طريق:</div>
        <div class="social-cards">
          <a
            v-bind:href="'https://api.whatsapp.com/send?phone=' + phone"
            target="_blank"
          >
            <i class="fa-brands fa-whatsapp"></i>
            <div class="num-email">{{ phone }}</div>
          </a>
          <a :href="'mailto:' + email">
            <i class="fa-regular fa-envelope"></i>
            <div class="num-email">{{ email }}</div>
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      about: "",
      loader: false,
      phone: "",
      email: "",
    };
  },
  methods: {
    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },
    async contactUs() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      const fd = new FormData(this.$refs.contactForm);
      this.loader = true;
      await axios
        .post(`provider/general/contact-us`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.$refs.contactForm.reset();
          } else {
            this.showFail(res.data.msg);
          }
          this.loader = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    async getSocials() {
      await axios
        .get(`/general/admin-contact-data`)
        .then((res) => {
          console.log(res.data);
          this.email = res.data.data.email;
          this.phone = res.data.data.phone;
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  mounted() {
    this.getSocials();
  },
};
</script>
<style scoped>
.social-cards {
  display: flex;
  align-items: center;
  gap: 50px;
  color: #000;
}
.social-cards a {
  color: #000;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}
.social-cards a svg {
  color: #00a19a !important;
  font-size: 19px;
}
.social-cards a:hover {
  transform: translateX(-5px);
}
</style>
