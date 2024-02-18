<template>
    <div class="container">
        <div class="main-text">
            <p class="main-title">{{ $t("Glopal.outpatient_clinic_appointments") }}</p>
            <p class="main-disc">{{ $t("Glopal.clinic_outpatient_appointments_reviews") }}</p>
        </div>

        <div class="layout-card">
          <form ref="appointmentsForm" @submit.prevent="submitData">
            
            <div class="dialog position-relative">

              <div class="flex--between resp-margin gap-3">
                <span v-if="!NotFound" class="main-title normal">{{this.dayItems.day_name}}</span>
                <div v-if="NotFound" class="main-title normal">{{ $t("Glopal.there_no_appointments") }}</div>
                <flat-pickr
                    class="position-relative main_input w-auto"
                    v-model="selectedDate"
                    :config="flatPickrConfig"
                    @change="get_current_date"
                />
              </div>


            <div class="d-flex gap-2 mb-4 justify-content-center mt-4 flex-wrap" v-if="loader">
                <Skeleton v-for="n in 12" :key="n" width="9rem" height="3rem" class="mr-2"></Skeleton>
            </div>


              <div class="days-radio" @click="Appointment_Booking = true" v-if="!loader">
                <label class="custom-radio" v-for="(day, curent_indix) in dayItems.work_periods" :key="day.id" :data-attr="curent_indix">
                    <input type="radio" name="interval" :value="day.interval" v-model="single_date" :class="{ 'checked': single_date === day.id }" class="d-none">
                      <div class="radio-content lg" :class="{ 'available': day.is_available == false }">{{day.interval}} </div>
                </label>
              </div>

            </div>

            <router-link :to="{ name: 'worktimeUpdate' }">
                <button type="button" class="custom-btn md mr-auto mt-5">{{$t('Glopal.edit')}}</button>
            </router-link>
            <Dialog v-model:visible="Appointment_Booking" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <p class="main-title"> {{ $t('Glopal.book_appointment_slot') }}</p>
                    <img :src="require('@/assets/images/delete_service-img.png')" alt="delete_service-img" class="img-done">
                    <div class="section-btns">
                    <button type="bitton" class="custom-btn sm" @click="submitData"> {{$t('Glopal.yes')}} </button>
                    <button class="custom-btn cancel sm" @click="canceldeleteDialog">{{$t('Glopal.no')}}</button>
                    </div>
                </div>
            </Dialog>
          </form>
        </div>

        
        <Dialog v-model:visible="deleting_Day" modal class="custum_dialog_width noclose" :draggable="false">
            <div class="text-center">
                <p class="main-title">{{ $t('Glopal.appointment_booked_successfully') }}</p>
                <img :src="require('@/assets/images/img-done.png')" alt="img-done" class="img-done">
            </div>
        </Dialog>

    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Arabic } from "flatpickr/dist/l10n/ar";
import axios from 'axios';
import Skeleton from 'primevue/skeleton';

export default {
    components: {
        Dialog,
        flatPickr,
        Skeleton
    },

    data() {
        return {
            NotFound: false,
            loader: false,
            selectedDate: null,
            flatPickrConfig: {
                locale: localStorage.getItem("locale") === "en" ? "default" : Arabic,
                dateFormat: "Y-m-d",
                minDate: "today",
            },
            Appointment_Booking: false,
            deleting_Day: false,
            dayItems: [],
        };
    },

    methods: {

        showSuccess(msg) {
        this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
        },

        showFail(error) {
        this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
        },

        async get_current_date() {
        const fd = new FormData();
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        this.loader = true;
        fd.append("date", this.selectedDate);
        this.dayItems = [];
          await axios
            // .post(`provider/work_times/intervals`, fd, config)
            .post(`provider/appointments/intervals`, fd, config)
            .then((res) => {
              if (res.data.key == "success") {
                  this.dayItems = res.data.data;
                  this.NotFound = false
              } else {
                  console.log("failed");
                  this.NotFound = true
              }
                  this.loader = false;
            })
            .catch((e) => {
              console.error(e);
            });
        },

        canceldeleteDialog() {
            this.Appointment_Booking = false
        },


        async submitData() {
        this.loading = true
        this.Appointment_Booking = false;
        const fd = new FormData(this.$refs.appointmentsForm)

        fd.append('day', this.selectedDate)
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        await axios.post(`provider/appointments/store`, fd, config)
            .then((res) => {
            
            if (res.data.key == 'success') {
                this.showSuccess(res.data.msg);
                this.get_current_date()
                this.deleting_Day = true
                setTimeout(() => {
                    this.deleting_Day = false
                }, 1000)

                localStorage.setItem('selectedRadio', this.single_date);
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
        const currentDate = new Date();
        this.selectedDate = currentDate
        console.log(this.selectedDate, "current date")
        // this.get_current_date()

      const selectedRadio = localStorage.getItem('selectedRadio');
      if (selectedRadio) {
        // Set the value to the radio button
        this.single_date = selectedRadio;
      }
    },
}
</script>

<style lang="scss" scoped>
    .radio-content {
        direction: ltr;
    }
</style>
