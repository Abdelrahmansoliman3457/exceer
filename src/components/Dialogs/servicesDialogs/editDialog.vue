<template>

    <!-- edit dialog -->

    <Dialog v-model:visible="services_edit_dialog" modal class="custum_dialog_width text-center" :draggable="false">
        <div class="main-text">
          <p class="main-title"> {{ $t('Glopal.edit_service') }} </p>
          <p class="main-disc"> {{ $t('Glopal.picture_service') }} </p>
        </div>


        <form ref="editServiceForm" @submit.prevent="submitData">
          
            <div class="form-group text-center">
              
              <div class="input_auth">
                <img :src="require('@/assets/images/send-square.png')" alt="upload-image" :class="{'hidden-default' : uploadedImages.length > 0}">
                <UploadImage acceptedFiles="image/*" :newImages="image" name="image" @uploaded-images-updated="updateUploadedImages"/>
              </div>
            </div>

              <div class="form-group">
                  <label class="label">{{$t('Glopal.service_name_arabic')}} </label>
                  <input type="text" class="main_input" name="name[ar]" v-model="name.ar" :placeholder="$t('Glopal.service_name_arabic')">
              </div>

              <div class="form-group">
                  <label class="label">{{$t('Glopal.service_name_english')}} </label>
                  <input type="text" class="main_input" name="name[en]" v-model="name.en" :placeholder="$t('Glopal.service_name_english')">
              </div>

              <div class="form-group">
                  <label class="label">{{$t('Glopal.service_price')}} </label>
                  <input type="number" v-numeric name="price" v-model="price" class="main_input" :placeholder="$t('Glopal.choose_service_price')">
              </div>

              <div class="form-group">
                  <label class="label">{{$t('Glopal.doctor_name')}} </label>
                  <input type="text"  class="main_input" name="doctor_name" v-model="doctor_name" :placeholder="$t('Glopal.choose_doctor_name')">
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
                  <input type="number" v-numeric class="main_input" name="sessions_num" v-model="sessions_num" :placeholder="$t('Glopal.choose_number_sessions')">
              </div>

            <div class="form-group">
                <label class="label">{{$t('Glopal.service_description')}}</label>
                <textarea class="main_input main_area" name="description[ar]" v-model="description.ar" :placeholder="$t('Glopal.enter_service_description')"></textarea>
            </div>
            
            <div class="form-group">
                <label class="label">{{$t('Glopal.terms_service')}}</label>
                <textarea class="main_input main_area" name="conditions[ar]" v-model="conditions.ar" :placeholder="$t('Glopal.choose_terms_service')"></textarea>
            </div>


            <div class="radios form-group">
              <label  class="label"> {{$t('Glopal.available_installments')}} </label>
              <div class="d-flex gap-3">
                <label class="custom-radio">
                    <input type="radio" name="is_installment" value="1" v-model="is_installment_2" class="d-none">
                    <span class="mark"></span>
                    <p class="hint">{{$t('Glopal.yes')}}</p>
                </label>
                <label class="custom-radio">
                    <input type="radio" name="is_installment" value="0" v-model="is_installment_2" class="d-none">
                    <span class="mark"></span>
                    <p class="hint">{{$t('Glopal.no')}}</p>
                </label>

              </div>
            </div>

            <button type="submit" class="custom-btn md mr-auto">
               {{$t('Glopal.edit_service')}}
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
            <p class="main-title"> {{$t('Glopal.service_edited_successfully')}} </p>
            <img :src="require('@/assets/images/img-done.png')" alt="img-done" class="img-done">
        </div>
    </Dialog>

</template>

<script>
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import UploadImage from "@/components/AuthComponent/ImgUploader.vue";
import axios from 'axios';

export default {
  props : {
    itemId: Number
  },
  components: {
    Dropdown,
    Dialog,
    UploadImage
  },
    data() {
        return {
          loading: false,
            image:[],

            name: {
              en: '',
              ar: '',
            },
            description: {
                ar: '',
            },
            conditions: {
                ar: '',
            },
            specialization: null,
            specializations: [
            ],
            price: '',
            doctor_name: '',
            sessions_num: 0,
            is_installment_2: null,
            services_edit_dialog: false,
            uploadedImages: [],
            services_add_dialog: false,
            services_successfully_dialog: false,
            selectedCities: [],
            category: null,
            multRadio: null,
            cities: [],
            categories: [],
        }
  },

  methods: {

    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    successfullyeditDialog() {
      this.services_edit_dialog = false;
      this.services_successfully_dialog = true;
      setTimeout(() => {
        this.services_successfully_dialog = false;
      }, 10);
    },

     updateUploadedImages(images) {
      
      this.uploadedImages = images;
    },

    async submitData() {
      
      this.loading = true;
      const fd = new FormData(this.$refs.editServiceForm);
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };
     
      fd.append("category_id", this.selectedCities.id);
      fd.append("classification_id", this.specialization.id);

      if(this.is_installment_2){
        fd.append("is_installment", this.is_installment_2);
      }
      await axios
        .post(`provider/services/${this.itemId}/update`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.services_edit_dialog = false;
            this.$emit("editserviceDatatable");
          } else {
            this.showFail(res.data.msg);
          }

          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    async getService(servId) {
        this.image = []
        this.loader = true;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        await axios.get(`provider/services/${servId}/show`, config)
        .then((res) => {
          if (res.data.key == "success") {
              console.log(res.data.data)
              if(res.data.data.is_installment) {
                this.is_installment_2 = 1
              } else {
                this.is_installment_2 = 0
              }
              if(res.data.data.image) {
                this.image = res.data.data.image
              }
              // this.image = res.data.data.image;
              this.name.en = res.data.data.name.en;
              this.name.ar = res.data.data.name.ar;
              this.description.ar = res.data.data.description.ar;
              this.conditions.ar = res.data.data.conditions.ar;
              this.doctor_name = res.data.data.doctor_name;
              this.sessions_num = res.data.data.sessions_num;
              this.selectedCities = res.data.data.category_id;
              this.price = res.data.data.price;
              this.get_classifications();
              this.get_specializations();
              this.specialization = res.data.data.classification_id;
            
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
            this.cities = res.data.data;
          if (res.data.key == "success") {
            for(let i = 0; i < this.cities.length; i++) {
                if(this.cities[i].id == this.selectedCities) {
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
    
    // test commit 

    // get specializations
    async get_specializations() {
      const fd = new FormData();
      fd.append("category_id[]", this.selectedCities);
      await axios
        .post(`provider/get-classifications`, fd)
        .then((res) => {
          if (res.data.key == "success") {
            this.specializations = res.data.data;
            for(let i = 0; i < this.specializations.length; i++) {
                if(this.specializations[i].id == this.specialization) {
                    this.specialization = this.specializations[i];
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

  },

  updated() {
    this.getService(this.itemId);
    this.get_classifications();
  },

};
</script>
