<template>
  <div class="container">
    <Toast />
    <div class="layout-card custom-width">
      <div class="main-text">
        <p class="main-title">{{ $t('Auth.activate_account') }}</p>
        <p class="main-disc">{{ $t('Auth.enter_verification_code') }}</p>
      </div>

      <label class="label">{{ $t('Auth.verification_code') }} *</label>

      <form @submit.prevent="submitData" ref="verificationCode">
        <div style="display: flex; flex-direction: row" class="layout-activate">
          <v-otp-input ref="otpInput" v-model:value="bindModal" input-classes="otp-input" separator=" " :num-inputs="6"
            :should-auto-focus="true" :conditionalClass="['one', 'two', 'three', 'four']" :is-input-num="true"
            @on-change="handleOnChange" @on-complete="handleOnComplete" />
        </div>

        <button type="submit" class="custom-btn md mr-auto">
          {{ $t('Auth.continuation') }}
          <span class="spinner-border spinner-border-sm custom-spinner" v-if="loading" role="status"
            aria-hidden="true"></span>
        </button>

        <button type="button" class="f-password  text-center resend-code-btn" @click="resendCode">{{
          $t('Auth.not_receive_code') }}</button>
      </form>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import VOtpInput from "vue3-otp-input";

export default {
  components: {
    VOtpInput,
  },
  data() {
    return {
      otpInput: null,
      bindModal: "",
      loading: false
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
      const fd = new FormData();
      fd.append("code", this.bindModal);
      fd.append("device_type", "web");
      fd.append("phone", localStorage.getItem("phone"));
      fd.append("country_code", localStorage.getItem("country_code"));
      await axios
        .post(`provider/verify-code`, fd)
        .then((res) => {
          if (res.data.key == "success") {
            if (localStorage.getItem('login')) {
              this.$router.push({ name: "Home" });
              let lKeys = ['login', 'phone', 'country_code'];

              lKeys.forEach((key) => {
                localStorage.removeItem(key);
              });

              localStorage.setItem('abilities', JSON.stringify(res.data.data.abilities));

            } else {
              this.$router.push({ name: "register-step-2" });
            }
            localStorage.setItem("token", res.data.data.token);
            this.showSuccess(res.data.msg);
          } else {
            this.showFail(res.data.msg);
          }
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    async resendCode() {
      const fd = new FormData();
      fd.append("phone", localStorage.getItem("phone"));
      fd.append("country_code", localStorage.getItem("country_code"));
      await axios
        .post(`provider/resend-code`, fd)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            console.log("success");
          } else {
            this.showFail(res.data.msg)
            console.log("failed");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

  },
  mounted() {
    this.otpInput = this.$refs.otpInput;
  },
};
</script>


<style lang="scss">
.layout-activate {
  justify-content: center;
  margin: 25px 0;

  >div {
    gap: 10px;
    flex-wrap: wrap;
    flex-direction: row-reverse;
  }
}

.otp-input {
  width: 50px;
  height: 40px;
  padding: 5px;
  font-size: 20px;
  border-radius: 6px;
  border: 1px solid #D9D9D9;
  text-align: center;
  margin: 0;

  &::placeholder {
    font-size: 15px;
    text-align: center;
    font-weight: 600;
  }

  &:focus-visible {
    outline: 2px solid #00A19A;
  }
}

.otpInput-container {
  margin-bottom: 15px;

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.otp-input.is-complete {
  border-color: #229EDB;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>