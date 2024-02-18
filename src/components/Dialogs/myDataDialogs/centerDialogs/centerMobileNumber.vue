<template>
    <div>
        <Toast />
    </div>
    <!-- change mobile number  -->
      <Dialog v-model:visible="center_mobile_change" modal class="custum_dialog_width" :draggable="false">
          <div class="text-center">
              <p class="main-title"> {{ $t('Glopal.Change_mobile_number') }} </p>
          </div>
          <form ref="providerPhone" @submit.prevent="submitData">
            <div class="form-group">
                <label class="label">{{$t('Glopal.current_Password')}} *</label>
                <div class="main_input with_icon">
                    <input :type="inputType" class="custum-input-icon" name="password" :placeholder="$t('Glopal.current_Password')">
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

      <validationCode ref="center_validation" @verifySuccess="handleVerifySuccess"/>

</template>

<script>

import Dialog from 'primevue/dialog';

import validationCode from '@/components/Dialogs/myDataDialogs/centerDialogs/centervalidationCode.vue';

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
            center_mobile_change: false,
            passwordVisible: false,
            selectedCountry: {
                    key: "+966",
                    code: "SA",
                    image: require("@/assets/images/Flag.webp"),
                },
                countries: [
                    {
                    key: "+966",
                    code: "SA",
                    image: require("@/assets/images/messi.gif"),
                    },
                    {
                    key: "+20",
                    code: "Eg",
                    image: require("@/assets/images/messi.gif"),
                    },
                    {
                    key: "+20",
                    code: "Eg",
                    image: require("@/assets/images/messi.gif"),
                    },
                    {
                    key: "+20",
                    code: "Eg",
                    image: require("@/assets/images/messi.gif"),
                    },
                    {
                    key: "+20",
                    code: "Eg",
                    image: require("@/assets/images/messi.gif"),
                    },
                    {
                    key: "+20",
                    code: "Eg",
                    image: require("@/assets/images/messi.gif"),
                    },
                    {
                    key: "+20",
                    code: "Eg",
                    image: require("@/assets/images/messi.gif"),
                    },
                ],
        }
    },

    methods: {

    handleVerifySuccess() {
      this.$emit("changePasswordSuccess");
    },

        showSuccess(msg) {
        this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
        },
        showFail(error) {
        this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
        },

        togglePasswordVisibility() {
           this.passwordVisible = !this.passwordVisible;
        },

        async submitData() {
        this.loading = true;
        const fd = new FormData(this.$refs.providerPhone);
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        fd.append("country_code", this.selectedCountry.key);
        await axios
            .post(`provider/phone/update`, fd, config)
            .then((res) => {
            if (res.data.key == "success") {

                this.showSuccess(res.data.msg);
                this.center_mobile_change = false;
                this.$refs.center_validation.activation_code = true;
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
