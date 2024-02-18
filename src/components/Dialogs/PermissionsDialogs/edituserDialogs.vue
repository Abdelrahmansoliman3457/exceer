<template>
  <Dialog
    v-model:visible="edit_user"
    modal
    class="custum_dialog_width text-center"
    :draggable="false"
  >
    <form @submit.prevent="submitData" ref="editForm">
      <div class="form-group text-center">
        <div class="input_auth">
          <img
            :src="require('@/assets/images/send-square.png')"
            alt="upload-image"
            :class="{ 'hidden-default': uploadedImages.length > 0 }"
          />
          <UploadImage
            acceptedFiles="image/*"
            :newImages="image"
            name="image"
            @uploaded-images-updated="updateUploadedImages"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="label">{{ $t("datatable.user_name") }} </label>
        <input
          type="text"
          name="responsible_name"
          v-model="user.responsible_name"
          class="main_input"
          :placeholder="$t('datatable.user_name')"
        />
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Auth.mobile_number") }}</label>
        <div class="with_cun_select">
          <input
            type="number"
            name="responsible_phone"
            v-numeric
            v-model="user.responsible_phone"
            class="main_input"
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
          name="email"
          class="main_input"
          v-model="user.email"
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
                  :checked="myAbilitiesChecked.includes(ability.id)"
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
        {{ $t("Glopal.save_edits") }}
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
    v-model:visible="editUserSuccessfully"
    modal
    class="custum_dialog_width noclose"
    :draggable="false"
  >
    <div class="text-center">
      <p class="main-title">
        {{ $t("Glopal.modifications_saved_successfully") }}
      </p>
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
  props: {
    itemId: Number,
  },

  data() {
    return {
      image: "",
      passwordVisible: {
        newPassword: false,
        definitelyNewPassword: false,
      },
      edit_user: false,
      editUserSuccessfully: false,
      uploadedImages: [],
      abilities: [],
      myAbilitiesChecked: [],
      abilitiesChecked: {},
      user: {},
      selectedCountry: {
        key: "+966",
        code: "SA",
        image: require("@/assets/images/Flag.webp"),
      },
      countries: [],
      loading: false,
    };
  },

  methods: {
    updateUploadedImages(images) {
      this.uploadedImages = images;
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
    async submitData() {
      this.loading = true;
      const fd = new FormData(this.$refs.editForm);
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      let count = 0;
      for (let i = 0; i < this.abilities.length; i++) {
        if (
          this.abilitiesChecked["ability" + i] ||
          (this.myAbilitiesChecked.includes(this.abilities[i].id) &&
            this.abilitiesChecked["ability" + i] == undefined)
        ) {
          fd.append(`abilities[${count}]`, `${i + 1}`);
          count++;
        }
      }

      fd.append("responsible_country_code", this.selectedCountry.key);

      await axios
        .post(
          `provider/abilities/${this.itemId}/update?_method=put`,
          fd,
          config
        )
        .then((res) => {
          if (res.data.key == "success") {
            this.editUserSuccessfully = true;
            this.edit_user = false;
            setTimeout(() => {
              this.editUserSuccessfully = false;
            }, 1500);
            // this.hiddenImg = false;

            this.$emit("userEdited");
          } else {
            this.showFail(res.data.msg);
          }
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    async getUser(servId) {
      this.myAbilitiesChecked = [];
      this.loader = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get(`provider/abilities/${servId}/show`, config)
        .then((res) => {
          if (res.data.key == "success") {
              this.user = res.data.data;
              this.image = res.data.data.logo;
              this.get_counntry(res.data.data.country_code);
              for (let i = 0; i < res.data.data.abilities.length; i++) {
                this.myAbilitiesChecked.push(res.data.data.abilities[i].id);
              }
            
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    // get country flag
    async get_counntry(code) {
      await axios
        .get(`user/countries`)
        .then((res) => {
          if (res.data.key == "success") {
            this.countries = res.data.data;
            for (let i = 0; i < this.countries.length; i++) {
              if (this.countries[i].key == `+${code}`) {
                this.selectedCountry = this.countries[i];
              }
            }
          } else {
            console.log("failed");
          }
        })
        .catch((e) => {
          console.error(e);
        });
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
  },
  async updated() {
    await this.getUser(this.itemId);
  },
  async mounted() {
    await this.getList();
  },
};
</script>
