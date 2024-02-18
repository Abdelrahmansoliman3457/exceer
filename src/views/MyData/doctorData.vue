<template>
    <div class="container">
        <div class="layout-card custom-width">
          <div class="form_imgs mt-5">
            <form  ref="profileDoctor" @submit.prevent="submitData">
                <div class="form-group text-center">
                    <label class="label">{{$t('Glopal.image_doctor')}}</label>
                    <div class="input_auth">
                        <img :src="require('@/assets/images/send-square.png')" alt="" :class="{'hidden-default' : uploadedImages_1.length > 0}">
                        <UploadImage acceptedFiles="image/*" :newImages="image" name="image" @uploaded-images-updated="updateUploadedImages"/>
                    </div>
                </div>

                <div class="form-group">
                    <label class="label">{{$t('Glopal.name_doctor_Arabic')}}</label>
                    <input type="text" class="main_input" name="name[ar]" v-model="name.ar" :placeholder="$t('Glopal.name_doctor_Arabic')">
                </div>

                <div class="form-group">
                    <label class="label">{{$t('Glopal.name_doctor_english')}}</label>
                    <input type="text" class="main_input" name="name[en]" v-model="name.en" :placeholder="$t('Glopal.name_doctor_english')">
                </div>

                <div class="form-group">
                    <label class="label">{{$t('Auth.mobile_number')}}</label>
                    <div class="with-openmodal">
                    <div class="with_cun_select">
                        <input type="number" class="main_input" readonly name="phone" v-model="phone" v-numeric :placeholder="$t('Auth.mobile_number')">
                        <!-- <div class="card d-flex justify-content-center dropdown_card">
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
                        </div> -->
                    </div>
                        <button type="button" class="open-dailog-btn" @click="changeNumber">
                        <i class="fa-regular fa-pen-to-square icon"></i>
                        </button>

                    </div>
                </div>

                <div class="form-group">
                    <label class="label">{{$t('Auth.email')}} </label>
                    <input type="email" class="main_input" name="email" v-model="email" :placeholder="$t('Auth.email')">
                </div>

                <button type="submit" class="custom-btn md mr-auto">
                    {{$t('Auth.save')}} 
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

    <!-- change mobile number dialog -->
    <doctorMobileNumber ref="changenumber" @changePassword_doctor="doctorprofile"/>
    
    <!-- saveModifications dialog  -->
    <saveModifications ref="saveModifications" />
</template>

<script>

import UploadImage from "@/components/AuthComponent/ImgUploader.vue";
import Dropdown from 'primevue/dropdown';
import doctorMobileNumber from '@/components/Dialogs/myDataDialogs/doctorDialogs/doctorMobileNumber.vue';
import saveModifications from '@/components/Dialogs/myDataDialogs/centerDialogs/saveModifications.vue';
import axios from 'axios';
import Skeleton from 'primevue/skeleton';

export default {
    components: {
        UploadImage,
        Dropdown,
        doctorMobileNumber,
        saveModifications,
        Skeleton
    },
    data() {
        return {
            loader: false,
            loading: false,
            name: {
                ar: '',
                en: '',
            },
            email: '',
            phone: '',
            uploadedImages_1: [],
            enName: '',
            selectedCountry: {
            key: "+966",
            code: "SA",
            image: require("@/assets/images/Flag.webp"),
            },
            countries: [],
        };
    },

    methods: {

        showSuccess(msg) {
        this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
        },
        showFail(error) {
        this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
        },
        updateUploadedImages(images) {
        this.uploadedImages_1 = images;
        console.log(this.uploadedImages_1, "1 array")
        },

        // Regular expression to match English text only (letters, spaces, and punctuation)
        validateEnglishText() {
            const regex = /^[A-Za-z\s.,!?'"-]*$/;

            if (!regex.test(this.enName)) {
            // If the input doesn't match the regex, remove non-English characters
            this.enName = this.enName.replace(/[^A-Za-z\s.,!?'"-]/g, "");
            }
        },

        changeNumber() {
            this.$refs.changenumber.doctor_mobile_change = true;
        },

        // get doctor profile
        async doctorprofile() {
            console.log("emit from verification")
            this.loader = true;
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
            await axios.get(`provider/doctor/profile`, config)
            .then((res) => {
                console.log(res.data.data.phone)
                this.loader = false;
                this.image = res.data.data.image;
                this.email = res.data.data.email;
                this.phone = res.data.data.phone;
                this.name.en = res.data.data.name.en;
                this.name.ar = res.data.data.name.ar;
                

            })

            .catch((e) => {
                console.error(e);
            });
        },

        async submitData() {
            this.loading = true
            const fd = new FormData(this.$refs.profileDoctor)

            fd.append("country_code", this.selectedCountry.key);
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
            await axios.post(`provider/doctor/update`, fd, config)
            .then((res) => {
                
                if (res.data.key == 'success') {
                this.showSuccess(res.data.msg);
                this.$refs.saveModifications.Save_modifications = true
                setTimeout(() => {
                this.$refs.saveModifications.Save_modifications = false
                }, 10);
                }
                else {
                this.showFail(res.data.msg);
                }
                this.loading = false
            }).catch(e => {
                console.error(e);
            })
        },

    },

  async mounted() {
    await this.doctorprofile();
  },
}
</script>


<style lang="scss">
  .form_imgs {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 15px 0;
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