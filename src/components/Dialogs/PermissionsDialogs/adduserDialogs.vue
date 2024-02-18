<template>
  <Dialog
    v-model:visible="addUser_dialog"
    modal
    class="custum_dialog_width text-center"
    :draggable="false"
  >
    <form @submit.prevent="submitData" ref="addForm">
      <div class="detailes mb-4 text-center">
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
            <div class="hidden-img" v-for="(img, i) in images" :key="img.name">
              <img src="" :class="`img${i}`" :alt="img.name" />
              <span class="remove-img" @click="removeImage(i)">
                <i class="fas fa-trash-alt"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="label">{{ $t("datatable.user_name") }} </label>
        <input
          type="text"
          class="main_input"
          name="responsible_name"
          v-model="responsible_name"
          :placeholder="$t('datatable.user_name')"
        />
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Auth.mobile_number") }}</label>
        <div class="with_cun_select">
          <input
            type="number"
            v-numeric
            class="main_input"
            name="responsible_phone"
            v-model="responsible_phone"
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
        <label class="label">{{ $t("Auth.email") }}</label>
        <input
          type="text"
          class="main_input"
          name="email"
          :placeholder="$t('Auth.email')"
        />
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Auth.password") }}</label>
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
        <label class="label">{{ $t("Auth.defin_password") }} *</label>
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

      <div class="row mb-4">
        <div class="col-12">
          <p class="main-title mb-4">{{ $t("datatable.permissions") }}</p>
        </div>
        <div
          class="col-12 col-md-6"
          v-for="(ability, index) in abilities"
          :key="ability.id"
        >
          <div class="radios form-group">
            <div class="d-flex gap-3">
              <label class="custom-radio custom-check">
                <input
                  type="checkbox"
                  name="opinion"
                  value="true"
                  v-model="abilitiesChecked['ability' + index]"
                  class="d-none"
                />
                <span class="mark">
                  <i class="fas fa-check icon"></i>
                </span>
                <p class="hint">{{ ability.name }}</p>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="custom-btn md mr-auto">
        {{ $t("Glopal.add_user") }}
        <span
          class="spinner-border spinner-border-sm custom-spinner"
          v-if="loading"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    </form>
  </Dialog>

  <Dialog
    v-model:visible="addUserSuccessfully"
    modal
    class="custum_dialog_width noclose"
    :draggable="false"
  >
    <div class="text-center">
      <p class="main-title">{{ $t("Glopal.user_added_successfully") }}</p>
      <img
        :src="require('@/assets/images/img-done.png')"
        alt="img-done"
        class="img-done"
      />
    </div>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import UploadImage from "@/components/AuthComponent/ImgUploader.vue";
import Dropdown from "primevue/dropdown";
import axios from "axios";

export default {
  components: {
    Dialog,
    UploadImage,
    Dropdown,
  },

  data() {
    return {
      responsible_name: "",
      password: "",
      password_confirmation: "",
      responsible_phone: "",  
      images: [],
      passwordVisible: {
        newPassword: false,
        definitelyNewPassword: false,
      },
      addUser_dialog: false,
      addUserSuccessfully: false,
      abilities: [],
      abilitiesChecked: {},
      loading: false,
      uploadedImages: [],
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
    togglePasswordVisibility(key) {
      this.passwordVisible[key] = !this.passwordVisible[key];
    },
    inputType(key) {
      return this.passwordVisible[key] ? "text" : "password";
    },

    async getList() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      await axios
        .get(`provider/abilities/list`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.abilities = res.data.data;
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

    async submitData() {
      this.loading = true;
      const fd = new FormData(this.$refs.addForm);
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      let count = 0;
      for (let i = 0; i < this.abilities.length; i++) {
        if (this.abilitiesChecked["ability" + i]) {
          fd.append(`abilities[${count}]`, `${i + 1}`);
          count++;
        }
      }
       if(this.images[0]){

         fd.append("logo", this.images[0]);
       }
      fd.append("responsible_country_code", this.selectedCountry.key);

      await axios
        .post(`provider/abilities/store`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.addUserSuccessfully = true;
            this.addUser_dialog = false;
            setTimeout(() => {
              this.addUserSuccessfully = false;
            }, 1500);
            this.hiddenImg = false;
            this.$emit("userAdded");
            this.responsible_phone = "";
            this.images = [];
            this.password = "";
            this.password_confirmation = "";
            this.abilitiesChecked = {}
            this.responsible_name = "";
            this.$refs.addForm.reset();
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
    await this.get_counntry();
    await this.getList();
  },
};
</script>
