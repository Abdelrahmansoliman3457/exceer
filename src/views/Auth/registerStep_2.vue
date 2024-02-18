<template>
  <div class="container">
    <Toast />
    <div class="layout-card custom-width">
      <div class="main-text">
        <p class="main-title">{{ $t("Auth.create_account") }}</p>
        <p class="main-disc">{{ $t("Auth.enter_your_data") }}</p>
      </div>

      <formStep
        :isFirstElementActive="isFirstElementActive"
        :isSecElementActive="isSecElementActive"
      />

      <div class="row">
        <div class="col-12 col-md-10 mr-auto">
          <form ref="regestForm" @submit.prevent="submitData">
            <div class="detailes mt-4 mb-4 text-center">
              <label class="label"
                >{{ $t("Auth.upload_picture_doctor") }}
              </label>
              <div class="input_auth">
                <div class="d-flex gap-3 flex-wrap">
                  <label for="uploadImgs" class="upload-label blue">
                    <input
                      id="uploadImgs"
                      type="file"
                      name="image"
                      accept="image/*"
                      class="hidden-input"
                      @change="uploadImgs"
                    />
                    <img :src="require('@/assets/images/send-square.png')" />
                  </label>

                  <div
                    class="hidden-img"
                    v-for="(img, i) in images"
                    :key="img.name"
                  >
                    <!-- <img src='' :class="`img${i}`" :alt="img.name" /> -->
                    <img :src="img.url" :class="`img${i}`" :alt="img.name" />
                    <span class="remove-img" @click="removeImage(i)">
                      <i class="fas fa-trash-alt"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Glopal.name_doctor_Arabic") }}
              </label>
              <input
                type="text"
                class="main_input"
                name="name[ar]"
                v-model="arName"
                :placeholder="$t('Glopal.name_doctor_Arabic')"
              />
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Glopal.name_doctor_english") }}
              </label>
              <input
                type="text"
                class="main_input"
                name="name[en]"
                v-model="enName"
                :placeholder="$t('Glopal.name_doctor_english')"
              />
            </div>

            <div class="form-group">
              <label class="label">{{ $t("Auth.mobile_number") }} </label>
              <div class="with_cun_select">
                <input
                  type="number"
                  v-numeric
                  class="main_input"
                  name="phone"
                  v-model="centerNum"
                  :placeholder="$t('Auth.mobile_number')"
                />
                <div class="card d-flex justify-content-center dropdown_card">
                  <Dropdown
                    v-model="selectedCountry"
                    :options="countries"
                    optionLabel="name"
                  >
                    <template #value="slotProps">
                      <div v-if="slotProps.value" class="flex-group-me">
                        <img
                          :alt="slotProps.value.label"
                          :src="slotProps.value.image"
                          :class="`mr-2 flag flag-${slotProps.value.key.toLowerCase()}`"
                          style="width: 24px"
                        />
                        <div>{{ slotProps.value.key }}</div>
                      </div>
                      <span v-else>
                        {{ slotProps.placeholder }}
                      </span>
                    </template>
                    <template #option="slotProps">
                      <div class="flex-group-me">
                        <img
                          :alt="slotProps.option.label"
                          :src="slotProps.option.image"
                          :class="`mr-2 flag flag-${slotProps.option.key.toLowerCase()}`"
                          style="width: 24px"
                        />
                        <div>{{ slotProps.option.key }}</div>
                      </div>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="label">{{ $t("Auth.email") }} </label>
              <input
                type="email"
                class="main_input"
                name="email"
                v-model="email"
                :placeholder="$t('Auth.email')"
              />
            </div>

            <button type="submit" class="custom-btn md mr-auto">
              {{ $t("Auth.continuation") }}
              <span
                class="spinner-border spinner-border-sm custom-spinner"
                v-if="loading"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formStep from "@/components/AuthComponent/formStep.vue";
import UploadImage from "@/components/AuthComponent/ImgUploader.vue";
import Dropdown from "primevue/dropdown";
import axios from "axios";

export default {
  components: {
    formStep,
    UploadImage,
    Dropdown,
  },
  data() {
    return {
      loading: false,
      isFirstElementActive: false,
      isSecElementActive: false,
      isThirdElementActive: false,
      enName: "",
      arName: "",
      centerNum: "",
      images: [],
      selectedCountry: {
        key: "+966",
        code: "SA",
        image: require("@/assets/images/Flag.webp"),
      },
      countries: [],
    };
  },

  methods: {
    uploadImgs(e) {
      this.images = [];
      var selectedImgs = e.target.files;

      // Process selected images
      for (let i = 0; i < selectedImgs.length; i++) {
        this.images.push(selectedImgs[i]);
      }

      // Display images
      for (let i = 0; i < this.images.length; i++) {
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function () {
            document.querySelector(`.img${i}`).src = reader.result;
          }.bind(this),
          false
        );

        reader.readAsDataURL(this.images[i]);
      }

      // Reset the value of the file input to clear the selection
      e.target.value = null;
    },

    // Remove Img
    removeImage(index) {
      this.images.splice(index, 1);
    },

    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    validateEnglishText() {
      // Regular expression to match English text only (letters, spaces, and punctuation)
      const regex = /^[A-Za-z\s.,!?'"-]*$/;

      if (!regex.test(this.enName)) {
        // If the input doesn't match the regex, remove non-English characters
        this.enName = this.enName.replace(/[^A-Za-z\s.,!?'"-]/g, "");
      }
    },

    // handle methods to send data

    async submitData() {
      this.loading = true;
      const fd = new FormData(this.$refs.regestForm);
      if (this.images[0]) {
        fd.append("image", this.images[0]);
      }
      fd.append("country_code", this.selectedCountry.key);
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .post(`provider/doctor/store`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.$router.push({ name: "register-step-3" });
          } else {
            this.showFail(res.data.msg);
          }
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    // get country flag
    async get_counntry() {
      await axios
        .get(`user/countries`)
        .then((res) => {
          if (res.data.key == "success") {
            this.countries = res.data.data;
          } else {
            console.log("failed");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },

  async mounted() {
    // When the component is mounted (page is ready), set isFirstElementActive to true
    this.isFirstElementActive = true;
    this.isSecElementActive = true;
    await this.get_counntry();
  },
};
</script>

<style lang="scss"></style>
