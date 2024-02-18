<template>

    <!-- edit dialog -->

    <Dialog v-model:visible="package_add_dialog" modal class="custum_dialog_width text-center" :draggable="false">

      <div class="main-text">
        <p class="main-title"> {{ $t('Glopal.add_package') }} </p>
        <p class="main-disc"> {{ $t('Glopal.upload_picture_package') }} </p>
      </div>


      <form ref="addpackageForm" @submit.prevent="submitData">

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
                <label class="label">{{$t('Glopal.package_name_arabic')}} </label>
                <input type="text" class="main_input" name="name[ar]" v-model="arName" :placeholder="$t('Glopal.package_name_arabic')">
            </div>

            <div class="form-group">
                <label class="label">{{$t('Glopal.package_name_english')}} </label>
                <input type="text" class="main_input" name="name[en]" v-model="enName" :placeholder="$t('Glopal.package_name_english')">
            </div>


            <div class="form-group">
                <label class="label">{{$t('Glopal.doctor_name')}} </label>
                <input type="text" class="main_input" name="doctor_name" :placeholder="$t('Glopal.doctor_name')">
            </div>

            <div class="form-group">
                <label class="label">{{$t('Glopal.package_expiry_date')}}</label>
                <div class="card flex justify-content-center dropdown_card">
                    <Calendar v-model="calendar_date" :minDate="today" class="cursor-pointer" />
                </div>
            </div>

            <div class="form-group">
              <label class="label">{{ $t("Auth.sections") }}</label>
              <div class="card flex justify-content-center dropdown_card">
                <Dropdown
                  v-model="selectedCities"
                  @change="get_select_service"
                  display="chip"
                  :options="cities"
                  optionLabel="name"
                  :placeholder="$t('Auth.sections')"
                  class="w-full md:w-20rem custum-dropdown"
                />
              </div>
            </div>

            <div class="form-group">
                <label class="label">{{$t('Sidebar.services')}}</label>
              <div class="card flex justify-content-center dropdown_card">
              <MultiSelect v-model="selectedservice" @change="getValues" display="chip" :options="services" optionLabel="name"
               :emptyMessage="$t('Glopal.no_available_options')" :placeholder="$t('Sidebar.services')"
                   class="w-full md:w-20rem custum-dropdown" />
              </div>
            </div>

            <div class="mult-labels mb-2">
              <p class="label mb-0">{{$t('datatable.number_sessions')}}</p>
              <!-- <p class="label">{{this.packagesSessions_num}}</p> -->
              <input type="number" v-model="packagesSessions_num" class="main_input" v-numeric   >
            </div>

            <div class="mult-labels mb-2">
              <p class="label">{{$t('Glopal.Price_total_services')}}</p>
              <p class="label">{{totalService}}</p>
            </div>

            <div class="form-group">
                <label class="label">{{$t('Glopal.discount_percentage')}} </label>
                <input type="number" v-model="inputValue" class="main_input" v-numeric :placeholder="$t('Glopal.enter_discount_percentage')"  @input="updateInput">
                <p class="hint-validate" v-if="resultVaild">{{ $t('Glopal.percentage_valid') }}</p>
            </div>

            <div class="mult-labels mb-2">
              <p class="label">{{$t('Glopal.price_after_discount')}}</p>
              <p class="label">
                {{result}}
                {{$t('Glopal.rs')}}
              </p>
            </div>


          <div class="form-group">
              <label class="label">{{$t('Glopal.package_description')}}</label>
              <textarea class="main_input main_area" name="description[ar]" :placeholder="$t('Glopal.enter_package_description')"></textarea>
          </div>
          
          <div class="form-group">
              <label class="label">{{$t('Glopal.package_terms')}}</label>
              <textarea class="main_input main_area" name="conditions[ar]" :placeholder="$t('Glopal.enter_package_terms')"></textarea>
          </div>


          <div class="radios form-group">
            <label  class="label"> {{$t('Glopal.package_available_installments')}} </label>
            <div class="d-flex gap-3">
              <label class="custom-radio">
                  <input type="radio" name="is_installment" value="1"  class="d-none">
                  <span class="mark"></span>
                  <p class="hint">{{$t('Glopal.yes')}}</p>
              </label>
              <label class="custom-radio">
                  <input type="radio" name="is_installment" value="0"  class="d-none">
                  <span class="mark"></span>
                  <p class="hint">{{$t('Glopal.no')}}</p>
              </label>

            </div>
          </div>

          <div class="radios form-group">
              <label  class="label"> {{$t('Glopal.Choose_gender_package')}} </label>
              <div class="d-flex gap-3">
                <label class="custom-radio">
                    <input type="radio" name="gender" value="male" class="d-none">
                    <span class="mark"></span>
                    <p class="hint">{{$t('Glopal.male')}}</p>
                </label>
                <label class="custom-radio">
                    <input type="radio" name="gender" value="female" class="d-none">
                    <span class="mark"></span>
                    <p class="hint">{{$t('Glopal.female')}}</p>
                </label>
                <label class="custom-radio">
                    <input type="radio" name="gender" value="both" class="d-none">
                    <span class="mark"></span>
                    <p class="hint">الجميع</p>
                </label>
              </div>
          </div>

          <button type="submit" class="custom-btn md mr-auto">
             {{$t('Glopal.add_package')}} 
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
import Calendar from 'primevue/calendar';
import MultiSelect from 'primevue/multiselect';
import UploadImage from "@/components/AuthComponent/ImgUploader.vue";
import Checkbox from "primevue/checkbox";
import axios from 'axios';

export default {
  components: {
    Dropdown,
    Dialog,
    UploadImage,
    Calendar,
    MultiSelect,
    Checkbox
  },
    data() {
      return {
        hiddenImg: true,
        selectedCities: [],
        images: [],
        package_array: [],
        packagesSessions_num: 0,
        loading: false,
        totalService: 0,
        result: 0,
        resultVaild: false,
        inputValue: '',
          services: [],
          selectedservice: [],
          calendar_date: new Date(),
          today: new Date(),
          formattedDate: '',
          uploadedImages: [],
          package_add_dialog: false,
          services_successfully_dialog: false,
          enName: '',
          selectedCity: [],
          category: null,
          multRadio: null,
          cities: [],
          categories: [],
      }
  },

  methods: {

    getValues() {
      this.totalService = 0;
      this.packagesSessions_num = 0;

      for (let i = 0; i < this.selectedservice.length; i++) {
        this.totalService += this.selectedservice[i].price;
        this.packagesSessions_num += this.selectedservice[i].sessions_num;
      }
    },

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

  // handle function of discount percentage
    updateInput() {
      const value = parseInt(this.inputValue);
      
      if (this.inputValue === '') {

        // if inputValue is empty
        
        this.result = 0;
        this.resultVaild = false;
      } else if (!isNaN(value)) {
        const percentage = value / 100;
        this.result = this.result < 0 ? 0 : this.totalService - this.totalService * percentage;
        this.result = parseFloat(this.result.toFixed(2));
        if (this.result < 0) {
          this.inputValue = '';
          this.result = 0;
          this.resultVaild = true;
        } else {
          this.resultVaild = false;
          console.log(this.result);
        }
      }
    },
     
    // custom validation for english text 
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
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };
      await axios
        .get(`provider/categories`, config)
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

    // get services
    async get_select_service() {
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };
      // const fd = new FormData();
      // fd.append("category_ids[]", this.selectedCities.id);

      await axios
        .get(`provider/services?category_id=${this.selectedCities.id}`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.services = res.data.data.services;
          } else {
            console.log("failed");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

    // select_service_price() {

    // },

    // methods get price , and discount price
  // async get_price() {
  
  //    const config = {
  //        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  //    };
    
  //     await axios
  //       .get(`provider/services`, config)
  //       .then((res) => {
  //         if (res.data.key == "success") {
  //           this.package_array = res.data.data.services;
  //           this.totalService = 0;
  //           this.packagesSessions_num = 0;
  //           for (let i = 0; i < this.package_array.length; i++) {
  //             this.totalService += this.package_array[i].price;
  //             this.packagesSessions_num += this.package_array[i].sessions_num;
  //           }
  //         } else {
  //           console.log("failed");
  //         }
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //       });

  //   },

    async submitData() {
      
      this.loading = true;
      const fd = new FormData(this.$refs.addpackageForm);
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };

    if (this.selectedservice !== null && this.selectedservice.length > 0) {
        for(let i = 0; i < this.services.length; i++) {
          fd.append("services_ids[]", this.services[i].id);
        }
    }

    // for(let i = 0; i < this.services.length; i++) {
    //   fd.append("services_ids[]", this.services[i].id);
    // }

    fd.append("image", this.images[0]);
    fd.append("discount_percentage", this.inputValue);
    
    fd.append("expiration_date", this.formattedDate);
    fd.append("total_sessions_num", this.packagesSessions_num);
    fd.append("price", this.totalService);
    fd.append("category_id", this.selectedCities.id);

      await axios
        .post(`provider/packages/store`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
          this.package_add_dialog = false;
          this.services_successfully_dialog = true;
            setTimeout(() => {
                this.services_successfully_dialog = false;
            }, 100);

            this.images = [];
            this.package_array = [];
            this.selectedservice = [];
            this.selectedCities = []
            this.arName = '';
            this.enName = '';
            this.inputValue = '';
            this.result = 0;
            this.calendar_date = null;
            
            this.$emit('packageAdded')
            this.hiddenImg = false
          } else {
            this.showFail(res.data.msg);
          }
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    
    // cuustom data format
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

  },

    watch: {
    calendar_date: {
      handler(newDate) {
        // Update the formattedDate whenever calendar_date changes
        this.formattedDate = this.formatDate(newDate);
      },
      immediate: true, // Call the handler immediately to set the initial value
    },
  },

  computed: {

      // this code dont need it , just for test

      selectedServiceInfo() {
            if (this.selectedservice) {
            const selectedIds = this.selectedservice.map(service => service.id);
            console.log(selectedIds, "llllllllllllllllll");
            console.log(this.selectedservice, "city")
            return { ids: selectedIds};
            } else {
            return { ids: ''};
            }
      },


  },

 async mounted() {
    await this.get_classifications();
    // await this.get_price();
    this.calendar_date = null;
  }



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
</style>
