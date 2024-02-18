<template>
  <div class="container">
    <Toast />
    <div class="layout-card custom-width">

        <form ref="centerForm" @submit.prevent="submitData">
        
          <div class="form_imgs mt-5">

              <div class="detailes mb-4 text-center">
                  <label class="label">{{ $t('Auth.center_logo') }} <span class="s-label">*</span> </label>
                    <div class="input_auth">
                        <img :src="require('@/assets/images/send-square.png')" alt="" :class="{'hidden-default' : uploadedImages_1.length > 0}">
                        <UploadImage acceptedFiles="image/*" :newImages="logo" name="logo" @uploaded-images-updated="updateUploadedImages_1" />
                    </div>
              </div>

              <label class="label">{{$t('Auth.pictures_credits')}} <span class="s-label">*</span> </label>

              <div class="sub_imgs">
                  
                  <div class="form-group">
                    <div class="input_auth">
                        <img :src="require('@/assets/images/send-square.png')" alt="" :class="{'hidden-default' : uploadedImages_2.length > 0}">
                        <UploadImage acceptedFiles="image/*" :newImages="images_certificates.length > 0 ? images_certificates[0] : null"  name="images_certificates[]" @uploaded-images-updated="updateUploadedImages_2" @remove-image="handelleRemove"/>
                    </div>
                  </div>
                  
                  <div class="form-group">
                  <div class="input_auth">
                      <img :src="require('@/assets/images/send-square.png')" alt="" :class="{'hidden-default' : uploadedImages_3.length > 0}">
                      <UploadImage acceptedFiles="image/*" :newImages="images_certificates.length > 0 ? images_certificates[1] : null" name="images_certificates[]" @uploaded-images-updated="updateUploadedImages_3" @remove-image="handelleRemove"/>
                  </div>
                  </div>

                  <div class="form-group">
                  <div class="input_auth">
                      <img :src="require('@/assets/images/send-square.png')" alt="" :class="{'hidden-default' : uploadedImages_4.length > 0}">
                      <UploadImage acceptedFiles="image/*" :newImages="images_certificates.length > 0 ? images_certificates[2] : null" name="images_certificates[]" @uploaded-images-updated="updateUploadedImages_4" @remove-image="handelleRemove"/>
                  </div>
                  </div>

                  <div class="form-group">
                  <div class="input_auth">
                      <img :src="require('@/assets/images/send-square.png')" alt="" :class="{'hidden-default' : uploadedImages_5.length > 0}">
                      <UploadImage acceptedFiles="image/*" :newImages="images_certificates.length > 0 ? images_certificates[3] : null" name="images_certificates[]" @uploaded-images-updated="updateUploadedImages_5" @remove-image="handelleRemove"/>
                  </div>
                  </div>

              </div>

          </div>

          <div class="form-group">
              <label class="label">{{$t('Glopal.center_name')}} <span class="s-label">*</span> </label>
              <input type="text" class="main_input" name="name[ar]" v-model="name.ar" :placeholder="$t('Glopal.center_name')">
          </div>

          <div class="form-group">
            <label class="label"
              >{{ $t("Auth.name_center_english") }} *</label
            >
            <input
              type="text"
              class="main_input"
              name="name[en]"
              v-model="name.en"
              :placeholder="$t('Auth.name_center_english')"
            />
          </div>

          <div class="form-group">
              <label class="label">{{$t('Auth.name_manager')}} <span class="s-label">*</span> </label>
              <input type="text" class="main_input" name="responsible_name" v-model="responsible_name" :placeholder="$t('Auth.name_manager')">
          </div>

          <div class="form-group">
              <label class="label">{{$t('Auth.center_phone')}} <span class="s-label">*</span> </label>
              <div class="with-openmodal">
                <div class="with_cun_select">
                  <input type="number" readonly class="main_input" v-numeric name="phone" v-model="phone" :placeholder="$t('Auth.center_phone')">
                </div>
                  <button type="button" class="open-dailog-btn" @click="changeCenterMobileNumber">
                    <i class="fa-regular fa-pen-to-square icon"></i>
                  </button>

              </div>
          </div>


          <div class="form-group">
              <label class="label">{{$t('Auth.officials_mobile')}} <span class="s-label">*</span> </label>
              <div class="with-openmodal">
                <div class="with_cun_select">
                  <input type="number" readonly class="main_input" name="responsible_phone" v-model="responsible_phone" v-numeric :placeholder="$t('Auth.officials_mobile')">
                </div>
                <button type="button" class="open-dailog-btn" @click="changeOfficialMobileNumber">
                  <i class="fa-regular fa-pen-to-square icon"></i>
                </button>

              </div>
          </div>

            <div class="form-group">
                <label class="label">{{ $t('Auth.email') }}</label>
                <input type="email" required class="main_input" name="email" v-model="email" :placeholder="$t('Auth.email')">

            </div>

          <div class="form-group">
              <label class="label">{{$t('Auth.license_number')}} <span class="s-label">*</span> </label>
              <input type="number" v-numeric class="main_input" name="license_number" v-model="license_number" :placeholder="$t('Auth.license_number')">
          </div>

          <div class="form-group">
              <label class="label">{{$t('Auth.tax_number')}} <span class="s-label">*</span> </label>
              <input type="number" v-numeric class="main_input" name="tax_number" v-model="tax_number" :placeholder="$t('Auth.tax_number')">
          </div>


          <div class="form-group">
              <label class="label">{{$t('Auth.geographical_location')}} <span class="s-label">*</span> </label>
              <div class="main_input with_icon">
                <input type="text" class="location_input" name="address" v-model="address" :placeholder="$t('Auth.geographical_location')" label="Show" icon="pi pi-external-link" @click="location_map = true" readonly>
                <i class="fas fa-map-marker-alt icon"></i>
              </div>
          </div>

          <!-- google map modal -->
          <Dialog v-model:visible="location_map" modal :style="{ width: '50vw' }" class="map_dialog" :draggable="false">
            
              <Googlemap height="300px" apiKey="AIzaSyAbj-lMU2tI-ZUC0_Pi6iahLi_rO0lOk5E" 
              @change-address="handellAddress($event)" autocomplete :language="language" class="autocomplete-dropdown" />
              <button
                type="button"
                @click="location_map = false"
                class="custom-btn sm mr-auto mt-4"
              >
                تاكيد
              </button>
          </Dialog>
          
          <div class="form-group">
              <label class="label">{{$t('Auth.sections')}}</label>
              <div class="card flex justify-content-center dropdown_card">
              <MultiSelect v-model="selectedCities" @change="get_specializations" display="chip" :options="cities" optionLabel="name" :placeholder="$t('Auth.sections')"
                   class="w-full md:w-20rem custum-dropdown" />
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
              <label class="label">{{$t('Auth.description_experiences')}} </label>
              <textarea class="main_input main_area" name="description_experiences" v-model="description_experiences" :placeholder="$t('Auth.description_experiences')"></textarea>
          </div>

          <button type="button" @click="submitData" class="custom-btn md mr-auto">
             {{$t('Glopal.save_edits')}}
              <span
                class="spinner-border spinner-border-sm custom-spinner"
                v-if="loading"
                role="status"
                aria-hidden="true"
              ></span> 
             </button>

          <button type="button" class="custom-btn md mr-auto cancel" @click="changePassword"> {{$t('titles.change_password')}} </button>

        </form>
    </div>
  </div>

    <!-- change mobile number in center data dialogs -->
    <centerMobileNumber ref="center_number_change" @changePasswordSuccess="getProfileData"/>
    <!-- change mobile number in official -->
    <officialMobileNumber ref="official_number_change" @changeOfficialPassword="getProfileData"/>
    <!-- save saveModifications -->
    <saveModifications ref="saveModifications" />
    <!-- change password  -->
    <changePassword ref="changePassword" />

    <!-- added verification -->


    
</template>



<script>

import UploadImage from "@/components/AuthComponent/ImgUploader.vue";
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import formStep from "@/components/AuthComponent/formStep.vue";
import centerMobileNumber from '@/components/Dialogs/myDataDialogs/centerDialogs/centerMobileNumber.vue';
import officialMobileNumber from '@/components/Dialogs/myDataDialogs/centerDialogs/officialMobileNumber.vue';
import saveModifications from '@/components/Dialogs/myDataDialogs/centerDialogs/saveModifications.vue';
import changePassword from '@/components/Dialogs/myDataDialogs/centerDialogs/changePassword.vue';


import axios from "axios";
export default {
    components: {
      formStep,
      UploadImage,
      Dialog,
      Dropdown,
      MultiSelect,
      centerMobileNumber,
      officialMobileNumber,
      saveModifications,
      changePassword,
  },

  data() {
    return {
      loading: false,
      images_certificates: [],
      images : [],
      isKeyTrue: true,
      responsible_phone: '',
      name: {
        en: '',
      },
      name: {
        ar: '',
      },

      specialization: null,
      specializations: [],
      description_experiences: '',
      tax_number: '',

      phone: '',
      email: '',
      loading: false,
      
      responsible_name: '',
      isFirstElementActive: false,
      isSecElementActive: false,
      isThirdElementActive: false,
      enName: '',
      checked: false,
      selectedCity: null,
      location_map: false,
      address: '',
      lat: '',
      lng: '',
      selectedCities: [],
      language: 'ar',
      cities: [],

     uploadedImages_1: [],
     uploadedImages_2: [],
     uploadedImages_3: [],
     uploadedImages_4: [],
     uploadedImages_5: [],
     testArray: [],
     emptyVal: [],
    }
  },

  methods: {
  async handelleRemove(index) {
      this.updateUploadedImages = index;
      
      const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          data: {
              name: String(this.updateUploadedImages.url).slice(String(this.updateUploadedImages.url).lastIndexOf('/') + 1)
          }
      };


        await axios
          .delete(`provider/profile/images_certificates`, config)
          .then((res) => {
            if (res.data.key == "success") {
              this.showSuccess(res.data.msg);
            } else {
              console.log("failed");
              this.showFail(res.data.msg);
            }
          })
          .catch((e) => {
            console.error(e);
          });
    },
    // show success toast
    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    }, 

    // get the array from each input upload image upload
     updateUploadedImages_1(images) {
      this.uploadedImages_1 = images;
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
      this.address = event.address;
      this.lat = event.info.geometry.location.lat();
      this.lng = event.info.geometry.location.lng();
      console.log(this.address, "location")
    },

    // this code formate phone 
    
  removePrefix(phoneNumber) {
    // Check if the phoneNumber starts with "966"
    if (phoneNumber.startsWith("966")) {
      // Remove the first three characters
      return phoneNumber.substring(3);
    }
    // Return the original phoneNumber if it doesn't start with "966"
    return phoneNumber;
  },

    // change mobile number from center number input

    changeCenterMobileNumber() {
      this.$refs.center_number_change.center_mobile_change = true;
    },

    // change mobile number from official number input

    changeOfficialMobileNumber() {
      this.$refs.official_number_change.official_mobile_change = true;
    },

    async submitData() {
      
      this.loading = true;
      const fd = new FormData(this.$refs.centerForm);

      const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };

      fd.append("lat", this.lat);
      fd.append("lng", this.lng);
      fd.append("address", this.address);
      fd.append("is_condition", "1");

      // static
      fd.append("order_duration", 1);

      for (let i = 0; i < this.selectedCities.length; i++) {
        fd.append("category_id[]", this.selectedCities[i].id);
      }
    if (this.specialization && Array.isArray(this.specialization)) {
      for (let i = 0; i < this.specialization.length; i++) {
        fd.append("classification_id[]", this.specialization[i].id);
      }
    }
      

      await axios
        .post(`provider/profile/update`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.$refs.saveModifications.Save_modifications = true
            setTimeout(() => {
              this.$refs.saveModifications.Save_modifications = false
            }, 1000);
          } else {
            this.showFail(res.data.msg);
          }

          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },


    changePassword() {
      this.$refs.changePassword.change_password = true
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

      if(this.selectedCities.length == 0) {
        this.specialization = null
        this.specializations = null
      }

      // this.specialization = null
      
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

    // git profile data 

    async getProfileData() {
      console.log("updateeeeeeeee")
      this.loading = true;
      const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };
      
      await axios
      .get("provider/profile", config)
        .then((res) => {
          if (res.data.key == "success") {
                for(let i = 0; i < res.data.data.images_certificates.length; i++) {
                  this.images_certificates[i] = res.data.data.images_certificates[i].path
                }
      
                this.logo = res.data.data.logo;
                this.name.ar = res.data.data.name.ar;
                this.description_experiences = res.data.data.description_experiences;
                this.license_number = res.data.data.license_number;
                this.name.en = res.data.data.name.en;
                this.tax_number = res.data.data.tax_number;

                this.phone = res.data.data.full_phone;
                this.responsible_name = res.data.data.responsible_name;

                this.email = res.data.data.email;
                this.lat = res.data.data.lat;
                this.lng = res.data.data.lng;
                this.address = res.data.data.address;
                this.image = res.data.data.image;
                this.responsible_phone = res.data.data.responsible_full_phone;
                for(let i = 0; i < res.data.data.category_id.length; i++) {
                  this.emptyVal = res.data.data.category_id[i];
                  this.selectedCities.push(
                    {
                      name: res.data.data.category_id[i].name,
                      id: res.data.data.category_id[i].id
                    }
                  );
                }
      
                this.get_specializations();
                this.specialization = res.data.data.classifications;
            
          } else {
            console.log("failed");
            this.showFail(res.data.msg);
          }
        });
      this.loading = false;
    },
  },
  async beforeMount() {
    await this.get_classifications();
    
  },
 async mounted() {
    // When the component is mounted (page is ready), set isFirstElementActive to true
    this.isFirstElementActive = true;

    const storedLanguage = localStorage.getItem('locale');
    if (storedLanguage === 'en') {
      this.language = 'en';
    }

  
    await this.getProfileData();
  },

  
};

</script>


<style lang="scss">
  .p-multiselect-token:only-child{
    pointer-events: none;
  }
  .p-multiselect-token:has(.p-multiselect-token-label:empty){
    display: none !important;
  }
  .p-multiselect-label-container{
    min-height: 42px !important;
  }
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
    .p-multiselect-items .p-multiselect-item .p-checkbox{
      margin-right: 0;
      margin-inline-end: 10px;
     }
    .p-checkbox-box {
          border: 2px solid #ced4da;
     }
    .p-multiselect-header .p-checkbox, .p-multiselect-header {
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
  .p-multiselect.p-multiselect-chip .p-multiselect-token .p-multiselect-token-icon {
    margin-left: 0;
    margin-inline-start: 5px;
  }

  .with-openmodal {
    display: flex;
    align-items: center;
    gap: 15px;
    .with_cun_select {
      flex-grow: 1;
    }
    .open-dailog-btn {
      padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0px 0px 2px #D9D9D9;
    }
  }

</style>
