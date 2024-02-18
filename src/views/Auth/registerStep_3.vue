<template>
        <div class="container">
            <Toast />
            <div class="layout-card custom-width">
                <div class="main-text">
                    <p class="main-title">{{ $t('Auth.create_account') }}</p>
                    <p class="main-disc">{{ $t('Auth.bank_information') }}</p>
                </div>

                <formStep :isFirstElementActive = "isFirstElementActive" :isSecElementActive = "isSecElementActive" :isThirdElementActive = "isThirdElementActive"/>

                <div class="row">
                    <div class="col-12 col-md-10 mr-auto">
                        <form ref="regestForm" @submit.prevent="submitData">

                            <div class="form-group">
                                <label class="label">{{ $t('Auth.bank_name') }} <span class="s-label">*</span></label>
                                <input type="text"  class="main_input" name="bank_name" v-model="bankName" :placeholder=" $t('Auth.bank_name') ">
                            </div>

                            <div class="form-group">
                                <label class="label">{{ $t('Auth.iban_number') }} <span class="s-label">*</span></label>
                                <input type="text" class="main_input" name="IBAN" v-model="ipanNum" :placeholder=" $t('Auth.iban_number') ">
                            </div>

                            <div class="form-group">
                                <label class="label">{{ $t('Auth.account_holders_name') }} <span class="s-label">*</span></label>
                                <input type="text" class="main_input" name="account_name" v-model="account_name" :placeholder=" $t('Auth.account_holders_name') ">
                            </div>

                            <div class="form-group">
                                <label class="label">{{ $t('Auth.account_number') }} <span class="s-label">*</span></label>
                                <input type="number" v-numeric class="main_input" name="account_number" v-model="numAcc" :placeholder=" $t('Auth.account_number') ">
                            </div>

                            <button type="submit" class="custom-btn md mr-auto">
                                 {{$t('Auth.continuation')}} 
                                <span
                                    class="spinner-border spinner-border-sm custom-spinner"
                                    v-if="loading"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            </button>


                            <Dialog v-model:visible="reg_complete" modal class="custum_dialog_width noclose" :draggable="false">
                                <div class="text-center">
                                    <p class="main-title">{{ $t('Auth.logged_successfully') }}</p>
                                    <img :src="require('@/assets/images/img-done.png')" alt="img-done" class="img-done">
                                </div>
                            </Dialog>
                        </form>
                    </div>
                </div>

            </div>
    </div>
</template>

<script>
import formStep from "@/components/AuthComponent/formStep.vue";
import Dialog from 'primevue/dialog';
import axios from "axios";
export default {
  components: {
    formStep,
    Dialog
  },
    data() {
        return {
            isFirstElementActive: false,
            isSecElementActive: false,
            isThirdElementActive: false,
            reg_complete: false,
            loading: false
        }
  },

    methods: {
        // submitData() {
        //     setTimeout(() => {
        //         this.$router.push({name : 'Home'})
        //     }, 1000);
        // },

        showSuccess(msg) {
        this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
        },

        showFail(error) {
        this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
        },

        async submitData() {
        this.loading = true
        const fd = new FormData(this.$refs.regestForm)
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
        await axios.post(`provider/bank-account/store`, fd, config)
            .then((res) => {
            
            if (res.data.key == 'success') {
                this.reg_complete = true;
                this.showSuccess(res.data.msg);
                setTimeout(() => {
                    this.$router.push({ name: 'Home' })
                }, 1000);
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

    mounted() {
        // When the component is mounted (page is ready), set isFirstElementActive to true
        this.isFirstElementActive = true;
        this.isSecElementActive = true;
        this.isThirdElementActive = true;
    },
};
</script>
