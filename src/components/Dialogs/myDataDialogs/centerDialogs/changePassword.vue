<template>

    <div>
        <Toast />
    </div>

    <Dialog v-model:visible="change_password" modal class="custum_dialog_width" :draggable="false">
        <div class="main-text text-center">
            <p class="main-title">{{ $t('titles.change_password') }}</p>
        </div>
        <form  ref="providerPassword" @submit.prevent="submitData">

            <div class="form-group">
                <label class="label">{{ $t('Glopal.old_password') }} *</label>
                <div class="main_input with_icon">
                    <input :type="inputType('newPassword')" name="old_password" class="custum-input-icon" :placeholder=" $t('Glopal.old_password') ">
                    <button class="static-btn" type="button" @click="togglePasswordVisibility('newPassword')" :class="{ 'active_class': passwordVisible.newPassword }">
                    <i class="far fa-eye icon"></i>
                    </button>
                </div>
            </div>


            <div class="form-group">
                <label class="label">{{ $t('Auth.new_password') }} *</label>
                <div class="main_input with_icon">
                    <input :type="inputType('definitelyNewPassword')" name="password" class="custum-input-icon" :placeholder=" $t('Auth.new_password') ">
                    <button class="static-btn" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                    <i class="far fa-eye icon"></i>
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label class="label">{{ $t('Auth.definitely_new_password') }} *</label>
                <div class="main_input with_icon">
                    <input :type="inputType('definitelyNewPassword_2')" name="password_confirmation" class="custum-input-icon" :placeholder=" $t('Auth.definitely_new_password') ">
                    <button class="static-btn" type="button" @click="togglePasswordVisibility('definitelyNewPassword_2')" :class="{ 'active_class': passwordVisible.definitelyNewPassword_2 }">
                    <i class="far fa-eye icon"></i>
                    </button>
                </div>
            </div>
            <button type="submit" class="custom-btn md mr-auto">
                 {{ $t('Auth.save') }} 
                <span
                    class="spinner-border spinner-border-sm custom-spinner"
                    v-if="loading"
                    role="status"
                    aria-hidden="true"
                ></span>
                 </button>
        </form>
    </Dialog>

    <Dialog v-model:visible="password_changed_successfully" modal class="custum_dialog_width noclose" :draggable="false">
        <div class="text-center">
            <p class="main-title"> {{ $t('Glopal.password_changed_successfully') }} </p>
            <img :src="require('@/assets/images/img-done.png')" alt="img-done" class="img-done">
        </div>
    </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import axios from 'axios';


export default {
    components: {
        Dialog
    },

    data() {
        return {
            loading: false,
            passwordVisible: {
                newPassword: false,
                definitelyNewPassword: false,
                definitelyNewPassword_2: false,
            },
            change_password: false,
            password_changed_successfully: false
        };
    },

    methods: {

        showSuccess(msg) {
        this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
        },
        showFail(error) {
        this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
        },

        async submitData() {
        this.loading = true;
        const fd = new FormData(this.$refs.providerPassword);
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        await axios
            .post(`provider/password/update`, fd, config)
            .then((res) => {
            if (res.data.key == "success") {
                this.showSuccess(res.data.msg);
                this.change_password = false;
                this.password_changed_successfully = true;
                setTimeout(() => {
                    this.password_changed_successfully = false;
                    this.$router.push({name: 'doctorData'})
                }, 10);
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
    }
}
</script>
