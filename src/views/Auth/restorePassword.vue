<template>
    <div class="container">
        <Toast />
        <div class="layout-card custom-width">
            <div class="main-text">
                <p class="main-title">{{ $t('Auth.restore_password') }}</p>
                <p class="main-disc">{{ $t('Auth.enter_mobile_receive_code') }}</p>
            </div>
            <div class="row">
                <div class="col-12 col-md-10 mr-auto">
                    <form @submit.prevent="submitData">

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
                                                            :class="`mr-2 flag flag-${slotProps.option.key.toLowerCase()}`"
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
                        <button type="submit" class="custom-btn md mr-auto">
                            {{ $t('Auth.continuation') }}
                            <span class="spinner-border spinner-border-sm custom-spinner" v-if="loading" role="status"
                                aria-hidden="true"></span>
                        </button>
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
        // submitData() {
        //     this.$router.push({ name: 'restorepassword-check-code' });
        // }

        showSuccess(msg) {
            this.$toast.add({ severity: 'success', summary: '', detail: msg, life: 3000 });
        },

        showFail(msg) {
            this.$toast.add({ severity: 'error', summary: '', detail: msg, life: 3000 });
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


        async submitData() {
            this.loading = true
            const fd = new FormData()
            if (this.phone) {
                fd.append("user_name", this.phone)
                fd.append("country_code", this.selectedCountry.key);
            } else {
                fd.append("user_name", this.email)
            }

            await axios.post(`provider/forget-password`, fd)
                .then((res) => {

                    if (res.data.key == 'success') {
                        this.showSuccess(res.data.msg);
                        this.$router.push({ name: 'restorepassword-check-code' });
                        localStorage.setItem("phone", res.data.data.responsible_phone);
                        localStorage.setItem("country_code", res.data.data.responsible_country_code);
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
        await this.get_counntry()
    }
}
</script>
