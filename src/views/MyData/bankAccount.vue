<template>
    <div class="container">
        <div class="layout-card custom-width">
            <form ref="bankForm" @submit.prevent="submitData">

                <div class="form-group">
                    <label class="label">{{ $t('Auth.bank_name') }} *</label>
                    <input type="text"  class="main_input" name="bank_name" v-model="bank_name" :placeholder=" $t('Auth.bank_name') ">
                </div>

                <div class="form-group">
                    <label class="label">{{ $t('Auth.iban_number') }} *</label>
                    <input type="text" class="main_input" name="IBAN" v-model="IBAN" :placeholder=" $t('Auth.iban_number') ">
                </div>

                <div class="form-group">
                    <label class="label">{{ $t('Auth.account_holders_name') }} *</label>
                    <input type="text" class="main_input" name="account_name" v-model="account_name" :placeholder=" $t('Auth.account_holders_name') ">
                </div>

                <div class="form-group">
                    <label class="label">{{ $t('Auth.account_number') }} *</label>
                    <input type="number" v-numeric class="main_input" name="account_number" v-model="account_number" :placeholder=" $t('Auth.account_number') ">
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
            </form>
        </div>
    </div>

        <!-- saveModifications dialog  -->
        <saveModifications ref="saveModifications" />
</template>

<script>

import saveModifications from '@/components/Dialogs/myDataDialogs/centerDialogs/saveModifications.vue';
import axios from 'axios';
   
export default {
    components: {
        saveModifications
    },

    data() {
        return {
            loading: false,
            bank_name: '',
            IBAN: '',
            account_name: '',
            account_number: '',

        };
    },

    methods: {
        // submitData() {
        //     this.$refs.saveModifications.Save_modifications = true
        //     setTimeout(() => {
        //     this.$refs.saveModifications.Save_modifications = false
        //     }, 1000);
        // },

        showSuccess(msg) {
        this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
        },

        showFail(error) {
        this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
        },

        async BankData() {
        this.loading = true;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        
        await axios
        .get("provider/bank-account/profile", config)
            .then((res) => {
                this.bank_name = res.data.data.bank_name;
                this.IBAN = res.data.data.IBAN;
                this.account_name = res.data.data.account_name;
                this.account_number = res.data.data.account_number;
                
            });
        this.loading = false;
        },

        async submitData() {
        this.loading = true
        const fd = new FormData(this.$refs.bankForm)
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
        await axios.post(`provider/bank-account/update`, fd, config)
            .then((res) => {
            
            if (res.data.key == 'success') {
                this.$refs.saveModifications.Save_modifications = true
                setTimeout(() => {
                this.$refs.saveModifications.Save_modifications = false
                }, 10);
                this.showSuccess(res.data.msg);
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
        await this.BankData();
    }
}
</script>

