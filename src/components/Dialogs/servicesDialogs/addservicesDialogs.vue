<template>
  <div>
    <Toast />
  </div>

    <!-- edit dialog -->

    <Dialog v-model:visible="services_add_dialog" modal class="custum_dialog_width text-center" :draggable="false">

      <div class="main-text">
        <p class="main-title"> {{ $t('Glopal.add_service') }} </p>
        <p class="main-disc"> {{ $t('Glopal.upload_picture_service') }} </p>
      </div>


      <form ref="addServiceForm" @submit.prevent="submitData">

            <div class="detailes mb-4 text-center">
                <div class="input_auth">
                    <div class="d-flex gap-3 flex-wrap">
                        <label for="uploadImgs" class="upload-label blue">
                            <input id="uploadImgs" type="file" accept="image/*" class="hidden-input"
                                @change="uploadImgs">
                                <img :src="require('@/assets/images/send-square.png')" />
                        </label>

                        <div class='hidden-img' v-for="(img, i) in images" :key="img.name">
                            <img src='' :class="`img${i}`" :alt="img.name" />

                            <span class='remove-img' @click="removeImage(i)">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="label">{{$t('Glopal.service_name_arabic')}} </label>
                <input type="text" class="main_input" name="name[ar]" v-model="arName" :placeholder="$t('Glopal.service_name_arabic')">
            </div>

            <div class="form-group">
                <label class="label">{{$t('Glopal.service_name_english')}} </label>
                <input type="text" class="main_input" name="name[en]" v-model="enName" :placeholder="$t('Glopal.service_name_english')">
            </div>

            <div class="form-group">
                <label class="label">{{$t('Glopal.service_price')}} </label>
                <input type="number" name="price" v-numeric class="main_input" :placeholder="$t('Glopal.choose_service_price')">
            </div>

            <div class="form-group">
                <label class="label">{{$t('Glopal.doctor_name')}} </label>
                <input type="text" name="doctor_name" class="main_input" :placeholder="$t('Glopal.choose_doctor_name')">
            </div>

            <div class="form-group">
              <label class="label">{{ $t("Auth.sections") }}</label>
              <div class="card flex justify-content-center dropdown_card">
                <Dropdown
                  v-model="selectedCities"
                  @change="get_specializations"
                  display="chip"
                  :options="cities"
                  optionLabel="name"
                  :placeholder="$t('Auth.sections')"
                  class="w-full md:w-20rem custum-dropdown"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="label">{{ $t("Auth.the_specialization") }}</label>
              <div class="card flex justify-content-center dropdown_card">
                <Dropdown
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
                <label class="label">{{$t('datatable.number_sessions')}} </label>
                <input type="number" name="sessions_num" v-numeric class="main_input" :placeholder="$t('Glopal.choose_number_sessions')">
            </div>

          <div class="form-group">
              <label class="label">{{$t('Glopal.service_description')}}</label>
              <textarea class="main_input main_area" name="description[ar]" :placeholder="$t('Glopal.enter_service_description')"></textarea>
          </div>
          
          <div class="form-group">
              <label class="label">{{$t('Glopal.terms_service')}}</label>
              <textarea class="main_input main_area" name="conditions[ar]" :placeholder="$t('Glopal.choose_terms_service')"></textarea>
          </div>


          <div class="radios form-group">
            <label  class="label"> {{$t('Glopal.available_installments')}} </label>
            <div class="d-flex gap-3">
              <label class="custom-radio">
                  <input type="radio" name="is_installment" value="1" class="d-none">
                  <span class="mark"></span>
                  <p class="hint">{{$t('Glopal.yes')}}</p>
              </label>
              <label class="custom-radio">
                  <input type="radio" name="is_installment" value="0" class="d-none">
                  <span class="mark"></span>
                  <p class="hint">{{$t('Glopal.no')}}</p>
              </label>

            </div>
          </div>

          <button type="submit" class="custom-btn md mr-auto">
              {{$t('Glopal.add_service')}}
              <span
                class="spinner-border spinner-border-sm custom-spinner"
                v-if="loading"
                role="status"
                aria-hidden="true"
              ></span> 
          </button>

      </form>
    </Dialog>


    <Dialog v-model:visible="services_successfully_dialog" modal class="custum_dialog_width noclose" :draggable="false">
        <div class="text-center">
            <p class="main-title"> {{ $t('Glopal.service_added_successfully') }} </p>
            <img :src="require('@/assets/images/img-done.png')" alt="img-done" class="img-done">
        </div>
    </Dialog>

</template>

<script>
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import UploadImage from "@/components/AuthComponent/ImgUploader.vue";
import MultiSelect from "primevue/multiselect";
import Checkbox from "primevue/checkbox";
import axios from 'axios';

export default {
  components: {
    Dropdown,
    Dialog,
    UploadImage,
    Checkbox,
    MultiSelect,
  },
    data() {
        return {
            images  : [],
            uploadedImages: [],
            loading: false,
            services_add_dialog: false,
            services_successfully_dialog: false,
            enName: '',
            selectedCities: [],
            category: null,
            cities: [
                { name: 'New York', code: 'NY' },
                { name: 'Rome', code: 'RM' },
                { name: 'London', code: 'LDN' },
                { name: 'Istanbul', code: 'IST' },
                { name: 'Paris', code: 'PRS' }
            ],
            categories: [
                { name: 'New York', code: 'NY' },
                { name: 'Rome', code: 'RM' },
                { name: 'London', code: 'LDN' },
                { name: 'Istanbul', code: 'IST' },
                { name: 'Paris', code: 'PRS' }
            ],

            specialization: null,
            specializations: [
            ],
        }
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
            reader.addEventListener('load', function () {
                document.querySelector(`.img${i}`).src = reader.result;
            }.bind(this), false);

            reader.readAsDataURL(this.images[i]);
        }

        // Reset the value of the file input to clear the selection
        e.target.value = null;
    },

  // Remove Img
    removeImage(index) {
        this.images.splice(index, 1);
    },

    validateEnglishText() {
        // Regular expression to match English text only (letters, spaces, and punctuation)
        const regex = /^[A-Za-z\s.,!?'"-]*$/;

        if (!regex.test(this.enName)) {
        // If the input doesn't match the regex, remove non-English characters
        this.enName = this.enName.replace(/[^A-Za-z\s.,!?'"-]/g, "");
        }
    },

    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
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
      fd.append("category_id[]", this.selectedCities.id);
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
      const fd = new FormData(this.$refs.addServiceForm);
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };

      fd.append("image", this.images[0]);
      fd.append("category_id", this.selectedCities.id);
      
      if(this.specialization != null){
        fd.append("classification_id", this.specialization.id);
      }

      await axios
        .post(`provider/services/store`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.services_add_dialog = false;
            this.services_successfully_dialog = true;
          setTimeout(() => {
            this.services_successfully_dialog = false;
          }, 100);

            this.arName = '';
            this.enName = '';
            this.selectedCities = [];
            this.images = [];

            this.specialization = null

            this.$emit('serviceAdded')
            
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
    await this.get_classifications();
  }


};
</script>
