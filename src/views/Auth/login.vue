<template>
    <div class="container">
        <Toast />
        <div class="layout-card custom-width">
            <div class="main-text">
                <p class="main-title">{{ $t('Auth.signin') }}</p>
                <p class="main-disc">{{ $t('Auth.mobile_and_password') }}</p>
            </div>

            <div class="row">
                <div class="col-12 col-md-8 mr-auto">
                    <form ref="loginForm" @submit.prevent="submitData">

                        <ul class="nav nav-pills mb-5 tab-btns" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active order-shape" id="pills-home-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                    aria-selected="true">{{ $t('Auth.mobile_number') }}</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link order-shape" id="pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                    aria-selected="false">{{ $t('Auth.email') }}</button>
                            </li>
                        </ul>

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                                aria-labelledby="pills-home-tab">
                                <div class="form-group">
                                    <label class="label">{{ $t('Auth.mobile_number') }} <span class="s-label">*</span></label>
                                    <div class="with_cun_select">
                                        <input type="number" v-numeric class="main_input" v-model="phone"
                                            :placeholder="$t('Auth.mobile_number')">
                                        <div class="card d-flex justify-content-center dropdown_card">
                                            <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name">
                                                <template #value="slotProps">
                                                    <div v-if="slotProps.value" class="flex-group-me">
                                                        <img :alt="slotProps.value.label" :src="slotProps.value.image"
                                                            :class="`mr-2 flag flag-${slotProps.value.key.toLowerCase()}`"
                                                            style="width: 24px" />
                                                        <div>{{ slotProps.value.key }}</div>
                                                    </div>
                                                    <span v-else>
                                                        {{ slotProps.placeholder }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div class="flex-group-me">
                                                        <img :alt="slotProps.option.label" :src="slotProps.option.image"
                                                            :class="`mr-2 flag flag-${slotProps.option.key}`"
                                                            style="width: 24px" />
                                                        <div>{{ slotProps.option.key }}</div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-profile" role="tabpanel"
                                aria-labelledby="pills-profile-tab">
                                <div class="form-group">
                                    <label class="label">{{ $t('Auth.email') }} <span class="s-label">*</span></label>
                                    <input type="email" class="main_input" v-model="email" :placeholder="$t('Auth.email')">
                                </div>
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="label">{{ $t('Auth.password') }} <span class="s-label">*</span></label>
                            <div class="main_input with_icon">
                                <input :type="inputType" class="custum-input-icon" name="password" v-model="password"
                                    :placeholder="$t('Auth.password')">
                                <button class="static-btn" type="button" @click="togglePasswordVisibility"
                                    :class="{ 'active_class': passwordVisible }">
                                    <i class="far fa-eye icon"></i>
                                </button>
                            </div>
                        </div>

                        <router-link to="/restorepassword">
                            <p class="f-password">{{ $t('Auth.forget_password') }}</p>
                        </router-link>

                        <button type="submit" class="custom-btn md mr-auto">
                            {{ $t('Auth.signin') }}
                            <span class="spinner-border spinner-border-sm custom-spinner" v-if="loading" role="status"
                                aria-hidden="true"></span>
                        </button>
                        <div class="new-sign">
                            {{ $t('Auth.dont_have_account') }}
                            <router-link :to="{ name: 'register-step-1' }">{{ $t('Auth.create_account') }}</router-link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import Dropdown from 'primevue/dropdown';
import axios from 'axios';

export default {
    components: {
        Dropdown
    },

    data() {
        return {
            loading: false,
            email: '',
            phone: '',
            name: '',
            password: '',
            passwordVisible: false,
            selectedCountry: {
                key: "+966",
                code: "SA",
                image: require("@/assets/images/Flag.webp"),
            },
            countries: [],
            name_center: '',
        };
    },

    methods: {

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
            this.loading = true
            const fd = new FormData(this.$refs.loginForm)
            if (this.phone) {
                fd.append("user_name", this.phone)
                fd.append("responsible_country_code", this.selectedCountry.key);
            } else {
                fd.append("user_name", this.email)
            }
            fd.append("device_type", "web");
            fd.append('device_id', 15651);
            await axios.post(`provider/login`, fd)
                .then((res) => {

                    if (res.data.key == 'success') {
                        
                        this.showSuccess(res.data.msg);
                        localStorage.setItem('center_name', res.data.data.name.ar);
                        localStorage.setItem("token", res.data.data.token);
                        this.$router.push({ name: 'Home' });
                        if(res.data.data.abilities){
                            localStorage.setItem('abilities', JSON.stringify(res.data.data.abilities));
                        }
                    }
                    else {
                        this.showFail(res.data.msg);
                        if(res.data.data){
                            if (res.data.data.key == 'not_approved') {
                                this.$router.push({ name: 'activateAccount' });
    
                                localStorage.setItem("phone", res.data.data.phone);
                                localStorage.setItem("country_code", res.data.data.country_code);
                                localStorage.setItem("login", true);
                            }
                        }
                    }
                    this.loading = false
                }).catch(e => {
                    console.error(e);
                })
        },

        // get country flag
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
        await this.get_counntry()
    }
};
</script>

<style lang="scss"></style>