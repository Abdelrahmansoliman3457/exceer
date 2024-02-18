<template>
  <div class="container">
    <Toast />

    <div class="layout-card custom-width">
      <div class="main-text">
        <p class="main-title">{{ $t("Auth.create_account") }}</p>
        <p class="main-disc">{{ $t("Auth.enter_data") }}</p>
      </div>

      <formStep :isFirstElementActive="isFirstElementActive" />

      <div class="row">
        <div class="col-12 col-md-10 mr-auto">
          <form ref="regestForm" @submit.prevent="submitData">
            <!-- if you need make it multible pass this prop  IsMultible="multible" :customProp="true" -->

            <!-- <UploadImage  acceptedFiles="image/*" name="images" IsMultible="multible" :customProp="true" @uploaded-images-updated="updateUploadedImages_22" />  -->

            <div class="form_imgs mt-5">
              <div class="detailes mb-4 text-center">
                <label class="label"
                  >{{ $t("Auth.center_logo") }}
                  <span class="s-label">*</span></label
                >
                <div class="input_auth">
                  <div class="d-flex gap-3 flex-wrap">
                    <label for="uploadImgs" class="upload-label blue">
                      <input
                        id="uploadImgs"
                        type="file"
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
                      <img src="" :class="`img${i}`" :alt="img.name" />

                      <span class="remove-img" @click="removeImage(i)">
                        <i class="fas fa-trash-alt"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <label class="label"
                >{{ $t("Auth.pictures_credits") }}
                <span class="s-label">*</span></label
              >

              <div class="sub_imgs">
                <div class="form-group">
                  <div class="input_auth">
                    <img
                      :src="require('@/assets/images/send-square.png')"
                      alt=""
                      :class="{ 'hidden-default': uploadedImages_2.length > 0 }"
                    />
                    <UploadImage
                      acceptedFiles="image/*"
                      name="images_certificates[]"
                      @uploaded-images-updated="updateUploadedImages_2"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <div class="input_auth">
                    <img
                      :src="require('@/assets/images/send-square.png')"
                      alt=""
                      :class="{ 'hidden-default': uploadedImages_3.length > 0 }"
                    />
                    <UploadImage
                      acceptedFiles="image/*"
                      name="images_certificates[]"
                      @uploaded-images-updated="updateUploadedImages_3"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <div class="input_auth">
                    <img
                      :src="require('@/assets/images/send-square.png')"
                      alt=""
                      :class="{ 'hidden-default': uploadedImages_4.length > 0 }"
                    />
                    <UploadImage
                      acceptedFiles="image/*"
                      name="images_certificates[]"
                      @uploaded-images-updated="updateUploadedImages_4"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <div class="input_auth">
                    <img
                      :src="require('@/assets/images/send-square.png')"
                      alt=""
                      :class="{ 'hidden-default': uploadedImages_5.length > 0 }"
                    />
                    <UploadImage
                      acceptedFiles="image/*"
                      name="images_certificates[]"
                      @uploaded-images-updated="updateUploadedImages_5"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Auth.name_center_arabic") }}
                <span class="s-label">*</span></label
              >
              <input
                type="text"
                class="main_input"
                name="name[ar]"
                v-model="name_center"
                :placeholder="$t('Auth.name_center_arabic')"
              />
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Auth.name_center_english") }}
                <span class="s-label">*</span></label
              >
              <input
                type="text"
                class="main_input"
                name="name[en]"
                v-model="enName"
                :placeholder="$t('Auth.name_center_english')"
              />
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Auth.name_manager") }}
                <span class="s-label">*</span></label
              >
              <input
                type="text"
                class="main_input"
                name="responsible_name"
                :placeholder="$t('Auth.name_manager')"
              />
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Auth.center_phone") }}
                <span class="s-label">*</span></label
              >
              <div class="with_cun_select">
                <input
                  type="number"
                  v-numeric
                  class="main_input"
                  name="phone"
                  v-model="phone"
                  :placeholder="$t('Auth.center_phone')"
                />
                <div class="card d-flex justify-content-center dropdown_card">
                  <Dropdown
                    v-model="country_code"
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
              <label class="label"
                >{{ $t("Auth.officials_mobile") }}
                <span class="s-label">*</span></label
              >
              <div class="with_cun_select">
                <input
                  type="number"
                  v-numeric
                  class="main_input"
                  name="responsible_phone"
                  v-model="responsible_phone"
                  :placeholder="$t('Auth.officials_mobile')"
                />
                <div class="card d-flex justify-content-center dropdown_card">
                  <Dropdown
                    v-model="selectedCountry_2"
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
              <label class="label">{{ $t("Auth.email") }}</label>
              <input
                type="email"
                required
                class="main_input"
                name="email"
                v-model="email"
                :placeholder="$t('Auth.email')"
                :pattern="emailPattern"
              />
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Auth.license_number") }}
                <span class="s-label">*</span></label
              >
              <input
                type="number"
                v-numeric
                class="main_input"
                name="license_number"
                v-model="licenseNum"
                :placeholder="$t('Auth.license_number')"
              />
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Auth.tax_number") }}
                <span class="s-label">*</span></label
              >
              <input
                type="number"
                v-numeric
                class="main_input"
                name="tax_number"
                v-model="taxNum"
                :placeholder="$t('Auth.tax_number')"
              />
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Auth.geographical_location") }}
                <span class="s-label">*</span></label
              >
              <div class="main_input with_icon">
                <input
                  type="text"
                  class="location_input"
                  name="address"
                  :placeholder="$t('Auth.geographical_location')"
                  label="Show"
                  icon="pi pi-external-link"
                  @click="location_map = true"
                  readonly
                  v-model="this.location"
                />
                <i class="fas fa-map-marker-alt icon"></i>
              </div>
            </div>

            <!-- google map modal -->
            <Dialog
              v-model:visible="location_map"
              modal
              :style="{ width: '50vw' }"
              class="map_dialog"
              :draggable="false"
            >
              <Googlemap
                height="300px"
                apiKey="AIzaSyAbj-lMU2tI-ZUC0_Pi6iahLi_rO0lOk5E"
                @change-address="handellAddress($event)"
                autocomplete
                :language="language"
                class="autocomplete-dropdown"
              />
              <button
                type="button"
                @click="location_map = false"
                class="custom-btn sm mr-auto mt-4"
              >
                تاكيد
              </button>
            </Dialog>

            <div class="form-group">
              <label class="label">{{ $t("Auth.sections") }}</label>
              <div class="card flex justify-content-center dropdown_card">
                <MultiSelect
                  v-model="selectedCities"
                  @change="get_specializations"
                  display="chip"
                  :options="cities"
                  optionLabel="name"
                  :placeholder="$t('Auth.sections')"
                  class="w-full md:w-20rem custum-dropdown"
                />
                <!-- <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" :placeholder="$t('Auth.sections')" class="w-full md:w-14rem custum-dropdown" /> -->
              </div>
            </div>

            <div class="form-group">
              <label class="label">{{ $t("Auth.the_specialization") }}</label>
              <div class="card flex justify-content-center dropdown_card">
                <MultiSelect
                  v-model="specialization"
                  display="chip"
                  :options="specializations"
                  optionLabel="name"
                  :placeholder="$t('Auth.the_specialization')"
                  class="w-full md:w-20rem custum-dropdown"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="label">{{
                $t("Auth.description_experiences")
              }}</label>
              <textarea
                class="main_input main_area"
                name="description_experiences"
                :placeholder="$t('Auth.description_experiences')"
              ></textarea>
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Auth.password") }} <span class="s-label">*</span></label
              >
              <div class="main_input with_icon">
                <input
                  :type="inputType('newPassword')"
                  class="custum-input-icon"
                  name="password"
                  v-model="password"
                  :placeholder="$t('Auth.password')"
                />
                <button
                  class="static-btn"
                  type="button"
                  @click="togglePasswordVisibility('newPassword')"
                  :class="{ active_class: passwordVisible.newPassword }"
                >
                  <i class="far fa-eye icon"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="label"
                >{{ $t("Auth.defin_password") }}
                <span class="s-label">*</span></label
              >
              <div class="main_input with_icon">
                <input
                  :type="inputType('definitelyNewPassword')"
                  class="custum-input-icon"
                  name="password_confirmation"
                  v-model="password_confirmation"
                  :placeholder="$t('Auth.password')"
                />
                <button
                  class="static-btn"
                  type="button"
                  @click="togglePasswordVisibility('definitelyNewPassword')"
                  :class="{
                    active_class: passwordVisible.definitelyNewPassword,
                  }"
                >
                  <i class="far fa-eye icon"></i>
                </button>
              </div>
            </div>

            <div class="radios form-group check-inner">
              <div class="d-flex gap-3">
                <label class="custom-radio custom-check">
                  <input
                    type="checkbox"
                    name="is_condition"
                    v-model="checked"
                    class="d-none"
                  />
                  <span class="mark">
                    <i class="fas fa-check icon"></i>
                  </span>
                  <p class="check-text hint">
                    {{ $t("Auth.agree") }}
                    <router-link
                      :to="{ name: 'termsAndConditions' }"
                      target="_blank"
                      class="anchor"
                    >
                      {{ $t("Auth.terms_conditions") }}
                    </router-link>
                  </p>
                </label>
              </div>
            </div>

            <button
              type="button"
              @click="submitData"
              class="custom-btn md mr-auto"
            >
              {{ $t("Auth.continuation") }}
              <span
                class="spinner-border spinner-border-sm custom-spinner"
                v-if="loading"
                role="status"
                aria-hidden="true"
              ></span>
            </button>

            <div class="new-sign">
              {{ $t("Auth.already_have_account") }}
              <router-link :to="{ name: 'login' }">{{
                $t("Auth.signin")
              }}</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadImage from "@/components/AuthComponent/ImgUploader.vue";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import Checkbox from "primevue/checkbox";
import formStep from "@/components/AuthComponent/formStep.vue";

import axios from "axios";

export default {
  components: {
    formStep,
    UploadImage,
    Dialog,
    Dropdown,
    Checkbox,
    MultiSelect,
  },

  data() {
    return {
      email: "",
      name_center: "",
      responsible_phone: "",
      loading: false,
      images: [],
      passwordVisible: {
        newPassword: false,
        definitelyNewPassword: false,
      },
      isFirstElementActive: false,
      isSecElementActive: false,
      isThirdElementActive: false,
      enName: "",
      checked: false,
      selectedCity: null,
      location_map: false,
      location: "",
      lat: "",
      lng: "",
      language: "ar",
      selectedCities: [],
      cities: [],

      specialization: null,
      specializations: [],

      selectedCountry_2: {
        key: "+966",
        code: "SA",
        image: require("@/assets/images/Flag.webp"),
      },
      country_code: {
        key: "+966",
        code: "SA",
        image: require("@/assets/images/Flag.webp"),
      },
      countries: [],
      uploadedImages_2: [],
      uploadedImages_3: [],
      uploadedImages_4: [],
      uploadedImages_5: [],
    };
  },

  methods: {
    //  upload single image method
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

    togglePasswordVisibility(key) {
      this.passwordVisible[key] = !this.passwordVisible[key];
    },
    inputType(key) {
      return this.passwordVisible[key] ? "text" : "password";
    },

    // get the array from each input upload image upload
    updateUploadedImages(images) {
      this.uploadedImages_1 = images;
      console.log(this.logo[0], "1 array");
    },

    updateUploadedImages_2(images) {
      this.uploadedImages_2 = images;
    },

    updateUploadedImages_3(images) {
      this.uploadedImages_3 = images;
    },

    updateUploadedImages_4(images) {
      this.uploadedImages_4 = images;
    },

    updateUploadedImages_5(images) {
      this.uploadedImages_5 = images;
    },

    // Regular expression to match English text only (letters, spaces, and punctuation)
    validateEnglishText() {
      const regex = /^[A-Za-z\s.,!?'"-]*$/;

      if (!regex.test(this.enName)) {
        // If the input doesn't match the regex, remove non-English characters
        this.enName = this.enName.replace(/[^A-Za-z\s.,!?'"-]/g, "");
      }
    },

    // function handlle to get lat , lng location google map
    handellAddress(event) {
      this.location = event.address;
      this.lat = event.info.geometry.location.lat();
      this.lng = event.info.geometry.location.lng();
      console.log(this.location, "location");
      console.log(this.lat, "lat");
      console.log(this.lng, "lng");
    },
    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
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

    // get category
    async get_classifications() {
      await axios
        .get(`provider/show-all-categories`)
        .then((res) => {
          if (res.data.key == "success") {
            this.cities = res.data.data;
          } else {
            console.log("failed");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

    // get specializations
    async get_specializations() {
      const fd = new FormData();

      for (let i = 0; i < this.selectedCities.length; i++) {
        fd.append("category_id[]", this.selectedCities[i].id);
      }
      await axios
        .post(`provider/get-classifications`, fd)
        .then((res) => {
          if (res.data.key == "success") {
            this.specializations = res.data.data;
          } else {
            console.log("failed");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

    async submitData() {
      this.loading = true;
      const formData = new FormData(this.$refs.regestForm);
      formData.append("logo", this.images[0]);
      formData.append("lat", this.lat);
      formData.append("lng", this.lng);
      formData.append("address", this.location);
      formData.append("is_condition", Number(this.checked));
      formData.append("country_code", this.country_code.key);
      formData.append("responsible_country_code", this.selectedCountry_2.key);

      // static
      formData.append("order_duration", 1);

      for (let i = 0; i < this.selectedCities.length; i++) {
        formData.append("category_id[]", this.selectedCities[i].id);
      }
      if (this.specialization && Array.isArray(this.specialization)) {
        for (let i = 0; i < this.specialization.length; i++) {
          formData.append("classification_id[]", this.specialization[i].id);
        }
      }

      await axios
        .post(`provider/register`, formData)
        .then((res) => {
          if (res.data.key == "success") {
            localStorage.setItem("phone", res.data.data.responsible_phone);
            localStorage.setItem("country_code", res.data.data.country_code);
            localStorage.setItem("country_image", this.country_code.image);
            localStorage.setItem(
              "country_code_2",
              res.data.data.responsible_country_code
            );
            localStorage.setItem(
              "country_image_2",
              this.selectedCountry_2.image
            );
            localStorage.setItem("center_name", this.name_center);
            this.showSuccess(res.data.msg);
            setTimeout(() => {
              this.$router.push({ name: "activateAccount" });
            }, 10);
          } else {
            this.showFail(res.data.msg);
          }

          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },

  async mounted() {
    // When the component is mounted (page is ready), set isFirstElementActive to true
    this.isFirstElementActive = true;

    const storedLanguage = localStorage.getItem("locale");
    if (storedLanguage === "en") {
      this.language = "en";
    }

    await this.get_counntry();
    await this.get_classifications();

    // if(this.$route.name == 'register-step-1'){
    //   localStorage.removeItem('token')
    // }
  },
};
</script>

<style lang="scss">
.uploaded-block {
  display: inline-block;
  margin: 10px;
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}

.form_imgs {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 15px 0;
}

.sub_imgs {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.GoogleMap {
  background-color: #fff !important;
  .SearchArea {
    border: 0 !important;
    input {
      background-color: #fff !important;
      border-radius: 10px;
      border: 1px solid #229edb !important;
      font-size: 12px;
      margin-bottom: 13px;
    }
  }
}

.pac-container {
  z-index: 6666;
}

.p-multiselect-panel {
  .p-multiselect-items .p-multiselect-item .p-checkbox {
    margin-right: 0;
    margin-inline-end: 10px;
  }
  .p-checkbox-box {
    border: 2px solid #ced4da;
  }
  .p-multiselect-header .p-checkbox,
  .p-multiselect-header {
    display: none;
  }
  .p-multiselect-close {
    margin-inline-start: auto;
  }
}
.p-multiselect:not(.p-disabled).p-focus {
  box-shadow: none !important;
}
.p-multiselect-token {
  margin-right: 0;
  margin-inline-end: 7px;
}
.p-multiselect.p-multiselect-chip
  .p-multiselect-token
  .p-multiselect-token-icon {
  margin-left: 0;
  margin-inline-start: 5px;
}
</style>
