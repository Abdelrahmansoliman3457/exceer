<template>
  <!-- edit dialog -->

  <Dialog
    v-model:visible="package_edit_dialog"
    modal
    class="custum_dialog_width text-center"
    :draggable="false"
  >
    <div class="main-text">
      <p class="main-title">{{ $t("Glopal.edit_package") }}</p>
      <p class="main-disc">{{ $t("Glopal.upload_picture_package") }}</p>
    </div>

    <form ref="editpackageForm" @submit.prevent="submitData">
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
        <label class="label">{{ $t("Glopal.package_name_arabic") }} </label>
        <input
          type="text"
          class="main_input"
          name="name[ar]"
          v-model="name.ar"
          :placeholder="$t('Glopal.package_name_arabic')"
        />
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Glopal.package_name_english") }} </label>
        <input
          type="text"
          class="main_input"
          name="name[en]"
          v-model="name.en"
          :placeholder="$t('Glopal.package_name_english')"
        />
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Glopal.doctor_name") }} </label>
        <input
          type="text"
          class="main_input"
          name="doctor_name"
          v-model="doctor_name"
          :placeholder="$t('Glopal.choose_doctor_name')"
        />
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Glopal.package_expiry_date") }}</label>
        <div class="card flex justify-content-center dropdown_card">
          <Calendar v-model="calendar_date" :minDate="today" class="cursor-pointer" />
        </div>
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Auth.sections") }}</label>
        <div class="card flex justify-content-center dropdown_card">
          <Dropdown
            v-model="selectedCities"
            @change="get_select_service(selectedCities.id)"
            display="chip"
            :options="cities"
            optionLabel="name"
            :placeholder="$t('Auth.sections')"
            class="w-full md:w-20rem custum-dropdown"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Sidebar.services") }}</label>
        <div class="card flex justify-content-center dropdown_card">
          <MultiSelect
            v-model="selectedservice"
            @change="getValues"
            display="chip"
            :options="services"
            optionLabel="name"
            :placeholder="$t('Sidebar.services')"
            class="w-full md:w-20rem custum-dropdown"
          />
        </div>
      </div>

      <div class="mult-labels mb-2">
        <p class="label">{{ $t("datatable.number_sessions") }}</p>
        <p class="label">{{ this.packagesSessions_num }}</p>
      </div>

      <div class="mult-labels mb-2">
        <p class="label">{{ $t("Glopal.Price_total_services") }}</p>
        <p class="label">{{ totalService }}</p>
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Glopal.discount_percentage") }} </label>
        <input
          type="number"
          v-model="inputValue"
          class="main_input"
          v-numeric
          :placeholder="$t('Glopal.enter_discount_percentage')"
          @input="updateInput"
        />
        <p class="hint-validate" v-if="resultVaild">
          {{ $t("Glopal.percentage_valid") }}
        </p>
      </div>

      <div class="mult-labels mb-2">
        <p class="label">{{ $t("Glopal.price_after_discount") }}</p>
        <p class="label">
          {{ result }}
          {{ $t("Glopal.rs") }}
        </p>
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Glopal.package_description") }}</label>
        <textarea
          class="main_input main_area"
          name="description[ar]"
          v-model="description.ar"
          :placeholder="$t('Glopal.enter_package_description')"
        ></textarea>
      </div>

      <div class="form-group">
        <label class="label">{{ $t("Glopal.package_terms") }}</label>
        <textarea
          class="main_input main_area"
          name="conditions[ar]"
          v-model="conditions.ar"
          :placeholder="$t('Glopal.enter_package_terms')"
        ></textarea>
      </div>

      <div class="radios form-group">
        <label class="label">
          {{ $t("Glopal.package_available_installments") }}
        </label>
        <div class="d-flex gap-3">
          <label class="custom-radio">
            <input
              type="radio"
              name="is_installment"
              v-model="is_installment"
              class="d-none"
              value="1"
            />
            <span class="mark"></span>
            <p class="hint">{{ $t("Glopal.yes") }}</p>
          </label>
          <label class="custom-radio">
            <input
              type="radio"
              name="is_installment"
              v-model="is_installment"
              class="d-none"
              value="0"
            />
            <span class="mark"></span>
            <p class="hint">{{ $t("Glopal.no") }}</p>
          </label>
        </div>
      </div>

      <div class="radios form-group">
        <label class="label"> {{ $t("Glopal.Choose_gender_package") }} </label>
        <div class="d-flex gap-3">
          <label class="custom-radio">
            <input
              type="radio"
              name="gender"
              v-model="gender"
              value="male"
              class="d-none"
            />
            <span class="mark"></span>
            <p class="hint">{{ $t("Glopal.male") }}</p>
          </label>
          <label class="custom-radio">
            <input
              type="radio"
              name="gender"
              v-model="gender"
              value="female"
              class="d-none"
            />
            <span class="mark"></span>
            <p class="hint">{{ $t("Glopal.female") }}</p>
          </label>
          <label class="custom-radio">
            <input
              type="radio"
              name="gender"
              v-model="gender"
              value="both"
              class="d-none"
            />
            <span class="mark"></span>
            <p class="hint">الجميع</p>
          </label>
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
    v-model:visible="services_successfully_dialog"
    modal
    class="custum_dialog_width noclose"
    :draggable="false"
  >
    <div class="text-center">
      <p class="main-title">{{ $t("Glopal.package_modified_successfully") }}</p>
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
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import MultiSelect from "primevue/multiselect";
import UploadImage from "@/components/AuthComponent/ImgUploader.vue";
import axios from "axios";
export default {
  props: {
    itemId: Number,
  },
  components: {
    Dropdown,
    Dialog,
    UploadImage,
    Calendar,
    MultiSelect,
  },
  data() {
    return {
      doctor_name: "",
      is_installment: null,
      gender: false,
      selectedCities: null,
      selectedCitiesId: null,
      formattedDate: "",
      description: {
        ar: "",
      },
      conditions: {
        ar: "",
      },
      name: {
        en: "",
      },
      name: {
        ar: "",
      },
      loading: false,
      calendar_date: new Date(),
      totalService: 0,
      result: 0,
      resultVaild: false,
      inputValue: null,
      services: [],
      selectedservice: [],
      date: null,
      uploadedImages: [],
      package_edit_dialog: false,
      services_successfully_dialog: false,
      enName: "",
      selectedCity: null,
      category: null,
      multRadio: null,
      today: new Date(),
      cities: [],
      categories: [],
      packagesSessions_num: 0,
    };
  },

  methods: {
    getValues() {
      this.totalService = 0;
      this.packagesSessions_num = 0;
      for (let i = 0; i < this.selectedservice.length; i++) {
        this.totalService += Number(this.selectedservice[i].price);
        this.packagesSessions_num += Number(
          this.selectedservice[i].sessions_num
        );
      }

      if(this.selectedservice.length == 0) {
        this.inputValue = 0
      }
      this.updateInput()
    },
    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    // handle function of discount percentage
    updateInput() {
      const value = parseInt(this.inputValue);

      if (this.inputValue === "") {
        // if inputValue is empty

        this.result = 0;
        this.resultVaild = false;
      } else if (!isNaN(value)) {
        const percentage = value / 100;
        this.result =
          this.result < 0
            ? 0
            : this.totalService - this.totalService * percentage;
            
        this.result = parseFloat(this.result.toFixed(2));
        if (this.result < 0) {
          this.inputValue = "";
          this.result = 0;
          this.resultVaild = true;
        } else {
          this.resultVaild = false;
        }
      }
      
    },

    updateUploadedImages(images) {
      this.uploadedImages = images;
    },
    

    validateEnglishText() {
      // Regular expression to match English text only (letters, spaces, and punctuation)
      const regex = /^[A-Za-z\s.,!?'"-]*$/;

      if (!regex.test(this.enName)) {
        // If the input doesn't match the regex, remove non-English characters
        this.enName = this.enName.replace(/[^A-Za-z\s.,!?'"-]/g, "");
      }
    },


    // methods get price , and discount price
    // async get_price() {
    //   const config = {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //   };

    //   await axios
    //     .get(`provider/services`, config)
    //     .then((res) => {
    //       if (res.data.key == "success") {
    //         this.package_array = res.data.data.services;
    //         this.totalService = 0;
    //         this.packagesSessions_num = 0;
    //         for (let i = 0; i < this.package_array.length; i++) {
    //           this.totalService += this.package_array[i].price;
    //           // this.packagesSessions_num += this.package_array[i].sessions_num;
    //         }
    //       } else {
    //         console.log("failed");
    //       }
    //     })
    //     .catch((e) => {
    //       console.error(e);
    //     });
    // },

    // get category
    async get_classifications() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get(`provider/categories`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.cities = res.data.data;
            for (let i = 0; i < this.cities.length; i++) {
              if (this.cities[i].id == this.selectedCitiesId) {
                this.selectedCities = this.cities[i];
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

    // get services
    async get_service() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      await axios
        .get(`provider/services`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.services = [];
            for (let i = 0; i < res.data.data.services.length; i++) {
              this.services.push({
                id: res.data.data.services[i].id,
                name: res.data.data.services[i].name,
                price: res.data.data.services[i].price,
                sessions_num: res.data.data.services[i].sessions_num,
              });
            }
          } else {
            console.log("failed");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

    // get select services
    async get_select_service(myId) {
      this.selectedservice = null;
      this.services = [];
      
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      await axios
        .get(`provider/services?category_id=${myId}`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.selectedService = res.data.data.services;
            // this.totalService = 0;
            // this.packagesSessions_num = 0;
            for (let i = 0; i < res.data.data.services.length; i++) {
              // this.totalService += res.data.data.services[i].price;
              // this.packagesSessions_num +=
              //   res.data.data.services[i].sessions_num;
              this.services.push({
                id: res.data.data.services[i].id,
                name: res.data.data.services[i].name,
                price: res.data.data.services[i].price,
                sessions_num: res.data.data.services[i].sessions_num,
              });

              console.log();
            }
            this.updateInput();
          } else {
            console.log("failed");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

    formatDate(date) {
      if (!date || !(date instanceof Date)) {
        // Handle the case where date is null, undefined, or not a Date instance
        return '';
      }

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },

    async submitData() {
     this.formattedDate = this.formatDate(this.calendar_date);
      this.loading = true;
      const fd = new FormData(this.$refs.editpackageForm);
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      for (let i = 0; i < this.selectedservice.length; i++) {
        fd.append("services_ids[]", this.selectedservice[i].id);
      }

      fd.append("is_installment", this.is_installment);
      if(this.inputValue == null || this.inputValue == 0) {
        fd.append("discount_percentage", 0);
      } else {
        fd.append("discount_percentage", this.inputValue);
      }
      if(this.formattedDate) {
        fd.append("expiration_date", this.formattedDate);
      } else {
        fd.append("expiration_date", this.calendar_date);
      }
      
      fd.append("sessions_num", this.packagesSessions_num);
      fd.append("price", this.totalService);

      fd.append("category_id", this.selectedCities.id);
      
      await axios
        .post(`provider/packages/${this.itemId}/update`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.package_edit_dialog = false;
            this.$emit("editpackageDatatable");
          } else {
            this.showFail(res.data.msg);
          }
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    async getPackage(packId) {
      this.image = [];
      this.loader = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get(`provider/packages/${packId}/show`, config)
        .then((res) => {
          this.loader = false;
          if (res.data.key == "success") {
            // get sesstion number
              // this.packagesSessions_num = res.data.data.total_sessions_num;
              console.log(this.calendar_date, res.data.data.expiration_date)
              this.calendar_date = res.data.data.expiration_date;
              this.image = res.data.data.image;
              this.name.en = res.data.data.name.en;
              this.name.ar = res.data.data.name.ar;
              this.description.ar = res.data.data.description.ar;
              this.description.en = res.data.data.description.en;
              this.price = res.data.data.price;
              this.sessions_num = res.data.data.sessions_num;
              this.doctor_name = res.data.data.doctor_name;
              if(res.data.data.is_installment) {
                this.is_installment = 1
              } else {
                this.is_installment = 0
              }
              // this.is_installment = res.data.data.is_installment;
              this.selectedCitiesId = res.data.data.category_id;
              this.inputValue = res.data.data.discount_percentage;
              this.conditions.ar = res.data.data.conditions.ar;
              this.gender = res.data.data.gender_code;
              this.updateInput();
              this.get_classifications();
              // this.get_service();
              this.get_select_service(res.data.data.category_id);
              this.selectedservice = res.data.data.services;
              this.totalService = res.data.data.services_count;
              this.packagesSessions_num =  res.data.data.total_sessions_num;
          }
        })

        .catch((e) => {
          console.error(e);
        });
    },
  },


    watch: {
    // calendar_date: {
    //   handler(newDate) {
    //     // Update the formattedDate whenever calendar_date changes
    //     this.formattedDate = this.formatDate(newDate);
    //   },
    //   immediate: true, // Call the handler immediately to set the initial value
    // },
  },

  async mounted() {
    // await this.get_classifications();
    // await this.get_price();
    this.getValues()
    this.formatDate()
  },

  updated() {
    this.getPackage(this.itemId);
    this.get_classifications();
  },

  created() {
    // Set the initial value for formattedDate
    // this.formattedDate = this.formatDate(this.calendar_date);
  },
};
</script>

<style lang="scss">
.p-dropdown-panel {
  .p-dropdown-items {
    .p-dropdown-item {
      display: flex;
      > div {
        gap: 10px;
      }
    }
  }
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
