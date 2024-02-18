<template>
    <div>
        <Toast />
    </div>
    <!-- change mobile number  -->
      <Dialog v-model:visible="doctor_mobile_change" modal class="custum_dialog_width" :draggable="false">
          <div class="text-center">
              <p class="main-title"> {{ $t('Glopal.Change_mobile_number') }} </p>
          </div>
          <form ref="doctorPhone" @submit.prevent="submitData">
            <div class="form-group">
                <label class="label">{{$t('Glopal.current_Password')}} *</label>
                <div class="main_input with_icon">
                    <input :type="inputType" name="password" class="custum-input-icon" :placeholder="$t('Glopal.current_Password')">
                    <button class="static-btn" type="button" @click="togglePasswordVisibility" :class="{ 'active_class': passwordVisible }">
                        <i class="far fa-eye icon" ></i>
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label class="label">{{$t('Glopal.new_mobile_number')}} *</label>

                <div class="with_cun_select">
                    <input type="number" v-numeric name="phone" class="main_input" :placeholder="$t('Glopal.new_mobile_number')">
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

            <button type="submit" class="custom-btn md mr-auto">
                {{$t('Glopal.send')}}
                <span
                    class="spinner-border spinner-border-sm custom-spinner"
                    v-if="loading"
                    role="status"
                    aria-hidden="true"
                ></span>
            </button>
          </form>
      </Dialog>

      <validationCode ref="doctor_validation" @verifySuccess_doctor="handleVerifySuccess"/>

</template>

<script>

import Dialog from 'primevue/dialog';

import validationCode from '@/components/Dialogs/myDataDialogs/doctorDialogs/doctorvalidationCode.vue';
import Dropdown from 'primevue/dropdown';
import axios from 'axios';
export default {
  components: {
    Dialog,
    validationCode,
    Dropdown
  },
    data() {
        return {
            loading: false,
            passwordVisible: false,
            official_mobile_change: false,
            selectedCountry: {
                    key: "+966",
                    code: "SA",
                    image: require("@/assets/images/Flag.webp"),
                },
                countries: [],
            doctor_mobile_change: false,
        }
    },

    methods: {

        handleVerifySuccess() {
            this.$emit("changePassword_doctor");  
        },
        submitData() {
            this.doctor_mobile_change = false;
            this.$refs.doctor_validation.activation_code = true;
        },

        togglePasswordVisibility() {
           this.passwordVisible = !this.passwordVisible;
        },

        showSuccess(msg) {
        this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
        },
        showFail(error) {
        this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
        },

        async submitData() {
        this.loading = true;
        const fd = new FormData(this.$refs.doctorPhone);
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        fd.append("country_code", this.selectedCountry.key);
        await axios
            .post(`provider/phone/doctor/update`, fd, config)
            .then((res) => {
            if (res.data.key == "success") {
                this.showSuccess(res.data.msg);
                this.doctor_mobile_change = false;
                this.$refs.doctor_validation.activation_code = true;
            } else {
                this.showFail(res.data.msg);
            }
            this.loading = false;
            })
            .catch((e) => {
            console.error(e);
            });
        },

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

    computed: {
        inputType() {
        return this.passwordVisible ? 'text' : 'password';
        },
    },

   async mounted() {
       await this.get_counntry();
    },
}
</script>
