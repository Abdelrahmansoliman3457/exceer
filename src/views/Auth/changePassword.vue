<template>
    <div class="container">
        <Toast />
        <div class="layout-card custom-width">
            <div class="main-text">
                <p class="main-title">{{ $t('Auth.restore_password') }}</p>
                <p class="main-disc">{{ $t('Auth.enter_new_password') }}</p>
            </div>
            <div class="row">
                <div class="col-12 col-md-10 mr-auto">
                    <form ref="changepassword" @submit.prevent="submitData">

                        <div class="form-group">
                            <label class="label">{{ $t('Auth.new_password') }} <span class="s-label">*</span></label>
                            <div class="main_input with_icon">
                                <input :type="inputType('newPassword')" class="custum-input-icon" name="password" :placeholder="$t('Auth.new_password')">
                                <button class="static-btn" type="button" @click="togglePasswordVisibility('newPassword')" :class="{ 'active_class': passwordVisible.newPassword }">
                                <i class="far fa-eye icon"></i>
                                </button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">{{ $t('Auth.definitely_new_password') }} <span class="s-label">*</span></label>
                            <div class="main_input with_icon">
                                <input :type="inputType('definitelyNewPassword')" name="password_confirmation" class="custum-input-icon" :placeholder="$t('Auth.definitely_new_password')">
                                <button class="static-btn" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                                <i class="far fa-eye icon"></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="custom-btn md mr-auto"> {{ $t('Auth.save') }} </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    data() {
        return {
            loading: false,
            passwordVisible: {
                newPassword: false,
                definitelyNewPassword: false,
            },
        }
    },

    methods: {
        // submitData() {
            
        //     this.$router.push({ name: 'login' });
        // },

    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    async submitData() {
      this.loading = true;
      const fd = new FormData(this.$refs.changepassword);
       fd.append("phone", localStorage.getItem("phone"));
       fd.append("country_code", localStorage.getItem("country_code"));
      await axios
        .post(`provider/reset-password`, fd)
        .then((res) => {
          if (res.data.key == "success") {
            this.$router.push({ name: "login" });
            this.showSuccess(res.data.msg);
            localStorage.removeItem("phone");
            localStorage.removeItem("country_code");
          } else {
            this.showFail(res.data.msg);
          }
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    togglePasswordVisibility(key) {
        this.passwordVisible[key] = !this.passwordVisible[key];
    },
    inputType(key) {
        return this.passwordVisible[key] ? 'text' : 'password';
    },
    },
}
</script>
