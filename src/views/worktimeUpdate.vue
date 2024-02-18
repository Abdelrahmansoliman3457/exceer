<template>
  <div class="container">
    <div>
      <Toast />
    </div>
    <div class="main-text">
      <p class="main-title">{{ $t("Sidebar.times_work") }}</p>
      <p class="main-disc">{{ $t("orders.the_working_hours") }}</p>
    </div>
    <div class="layout-card">
      <form ref="workTime" @submit.prevent="submitData">
        <div class="row mb-4">
          <div class="col-12 col-md-5">
            <div class="form-group">
              <label class="label">{{ $t('Glopal.reservation_duration') }}</label>
              <div class="main_input with_icon">
                <input
                  v-numeric
                  type="number"
                  class="input"
                  placeholder="1"
                  v-model="interval"
                />
                <span class="hint-text">{{ $t('Glopal.hour') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-8">
            <div class="main-select-date">

              <div class="select-time">
                <div class="flex-grow-1">
                  <p class="label">{{ $t('Glopal.day') }}</p>
                  <div class="form-group">
                      <input v-model="workTimes.Saturday.day" :placeholder="workTimes.Saturday.placeholder" class="main_input nofocus" readonly :disabled=" workTimes.Saturday.is_holiday"/>
                  </div>
                </div>

                <div>
                  <p class="label">{{ $t('Glopal.from') }}</p>
                  <div class="dropdown_card form-group time-calender">
                    <i class="fa-regular fa-clock icon"></i>
                    <flat-pickr :config="flatPickrConfig" v-model="workTimes.Saturday.from" showTime timeOnly />
                  </div>
                </div>

                <div>
                  <p class="label">{{ $t('Glopal.to') }}</p>
                  <div class="dropdown_card form-group time-calender">
                    <i class="fa-regular fa-clock icon"></i>
                    <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Saturday.to" showTime  />
                  </div>
                </div>

                <div class="panel-body form-group">  
                   
                    <label class="switch">
                        <input type="checkbox" v-model="workTimes.Saturday.is_holiday">
                        <div class="slider round"></div>
                    </label>
                    <p class="font-3">{{ $t('Glopal.vacation') }}</p>
                </div>

              </div>

              <div class="select-time">
                <div class="flex-grow-1">
                  <div class="form-group">
                      <input v-model="workTimes.Sunday.day"  :placeholder="workTimes.Sunday.placeholder" class="main_input nofocus" readonly :disabled=" workTimes.Sunday.is_holiday"/>
                  </div>
                </div>


                <div class="dropdown_card form-group time-calender">
                  <i class="fa-regular fa-clock icon"></i>
                  <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Sunday.from" showTime  timeOnly/>
                </div>

                <div>

                  <div class="dropdown_card form-group time-calender">
                    <i class="fa-regular fa-clock icon"></i>
                    <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Sunday.to" showTime  />
                  </div>
                </div>

                <div class="panel-body form-group">  
                   
                    <label class="switch">
                        <input type="checkbox" v-model="workTimes.Sunday.is_holiday" value="off">
                        <div class="slider round"></div>
                    </label>
                    <p class="font-3">{{ $t('Glopal.vacation') }}</p>
                </div>

              </div>

              <div class="select-time">
                <div class="flex-grow-1">
                  <div class="form-group">
                      <input v-model="workTimes.Monday.day" :placeholder="workTimes.Monday.placeholder" class="main_input nofocus" readonly :disabled="workTimes.Monday.is_holiday"/>
                  </div>
                </div>


                <div class="dropdown_card form-group time-calender">
                  <i class="fa-regular fa-clock icon"></i>
                  <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Monday.from" showTime  timeOnly/>
                </div>

                <div>

                  <div class="dropdown_card form-group time-calender">
                    <i class="fa-regular fa-clock icon"></i>
                    <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Monday.to" showTime  />
                  </div>
                </div>

                <div class="panel-body form-group">  
                   
                    <label class="switch">
                        <input type="checkbox" v-model="workTimes.Monday.is_holiday" value="on">
                        <div class="slider round"></div>
                    </label>
                    <p class="font-3">{{ $t('Glopal.vacation') }}</p>
                </div>

              </div>

              <div class="select-time">
                <div class="flex-grow-1">
                  <div class="form-group">
                      <input v-model="workTimes.Tuesday.day"  :placeholder="workTimes.Tuesday.placeholder" class="main_input nofocus" readonly :disabled="workTimes.Tuesday.is_holiday"/>
                  </div>
                </div>


                <div class="dropdown_card form-group time-calender">
                  <i class="fa-regular fa-clock icon"></i>
                  <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Tuesday.from" showTime  timeOnly/>
                </div>

                <div>

                  <div class="dropdown_card form-group time-calender">
                    <i class="fa-regular fa-clock icon"></i>
                    <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Tuesday.to" showTime  />
                  </div>
                </div>

                <div class="panel-body form-group">  
                   
                    <label class="switch">
                        <input type="checkbox" v-model="workTimes.Tuesday.is_holiday"  value="on">
                        <div class="slider round"></div>
                    </label>
                    <p class="font-3">{{ $t('Glopal.vacation') }}</p>
                </div>

              </div>

              <div class="select-time">
                <div class="flex-grow-1">
                  <div class="form-group">
                      <input v-model="workTimes.Wednesday.day" :placeholder="workTimes.Wednesday.placeholder" class="main_input nofocus" readonly :disabled="workTimes.Wednesday.is_holiday"/>
                  </div>
                </div>


                <div class="dropdown_card form-group time-calender">
                  <i class="fa-regular fa-clock icon"></i>
                  <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Wednesday.from" showTime  timeOnly/>
                </div>

                <div>

                  <div class="dropdown_card form-group time-calender">
                    <i class="fa-regular fa-clock icon"></i>
                    <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Wednesday.to" showTime  />
                  </div>
                </div>

                <div class="panel-body form-group">  
                   
                    <label class="switch">
                        <input type="checkbox" v-model="workTimes.Wednesday.is_holiday" value="on">
                        <div class="slider round"></div>
                    </label>
                    <p class="font-3">{{ $t('Glopal.vacation') }}</p>
                </div>

              </div>

              <div class="select-time">
                <div class="flex-grow-1">
                  <div class="form-group">
                      <input v-model="workTimes.Thursday.day" :placeholder="workTimes.Thursday.placeholder" class="main_input nofocus" readonly  :disabled="workTimes.Thursday.is_holiday"/>
                  </div>
                </div>


                <div class="dropdown_card form-group time-calender">
                  <i class="fa-regular fa-clock icon"></i>
                  <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Thursday.from" showTime  timeOnly />
                </div>

                <div>

                  <div class="dropdown_card form-group time-calender">
                    <i class="fa-regular fa-clock icon"></i>
                    <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Thursday.to" showTime   />
                  </div>
                </div>

                <div class="panel-body form-group">  
                   
                    <label class="switch">
                        <input type="checkbox" v-model="workTimes.Thursday.is_holiday" value="on">
                        <div class="slider round"></div>
                    </label>
                    <p class="font-3">{{ $t('Glopal.vacation') }}</p>
                </div>

              </div>

              <div class="select-time">
                <div class="flex-grow-1">
                  <div class="form-group">
                      <input v-model="workTimes.Friday.day" :placeholder="workTimes.Friday.placeholder" class="main_input nofocus" readonly :disabled="workTimes.Friday.is_holiday"/>
                  </div>
                </div>


                <div class="dropdown_card form-group time-calender">
                  <i class="fa-regular fa-clock icon"></i>
                  <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Friday.from" showTime  timeOnly/>
                </div>

                <div>

                  <div class="dropdown_card form-group time-calender">
                    <i class="fa-regular fa-clock icon"></i>
                    <flat-pickr :config="flatPickrConfig"  v-model="workTimes.Friday.to" showTime  />
                  </div>
                </div>

                <div class="panel-body form-group">  
                   
                    <label class="switch">
                        <input type="checkbox" v-model="workTimes.Friday.is_holiday" value="on">
                        <div class="slider round"></div>
                    </label>
                    <p class="font-3">{{ $t('Glopal.vacation') }}</p>
                </div>

              </div>

            </div>
          </div>
        </div>

          <button type="submit" class="custom-btn md mr-auto mt-4">
          {{ $t('Auth.save') }}
              <span
                  class="spinner-border spinner-border-sm custom-spinner"
                  v-if="loading"
                  role="status"
                  aria-hidden="true"
              ></span>
          </button>

        
      </form>

      <Dialog v-model:visible="time_saved" modal class="custum_dialog_width noclose" :draggable="false">
          <div class="text-center">
              <p class="main-title"> {{ $t('Glopal.service_added_successfully') }} </p>
              <img :src="require('@/assets/images/img-done.png')" alt="img-done" class="img-done">
          </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Dialog from 'primevue/dialog';
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from 'axios';


export default {
  components: {
    Dropdown,
    Calendar,
    Dialog,
    flatPickr
  },
  data() {
    return {
      
      flatPickrConfig: {
        enableTime: true, // Enable time selection
        noCalendar: true, // Disable calendar
        dateFormat: 'H:i', // Set the desired time format
        // Additional Flatpickr options can be added here
      },

      interval: "",
      workTimes: {
        Saturday: {
          placeholder: this.$t("Glopal.saturday"),
          day: "",
          from: '', 
          to: '', 
          is_holiday: false, 
        },
        Sunday: {
          placeholder: this.$t("Glopal.sunday"),
          day: "",
          from: '', 
          to: '', 
          is_holiday: false, 
        },
        Monday: {
          placeholder: this.$t("Glopal.monday"),
          day: "",
          from: '', 
          to: '', 
          is_holiday: false, 
        },
        Tuesday: {
          placeholder: this.$t("Glopal.tuesday"),
          day: "",
          from: '', 
          to: '', 
          is_holiday: false, 
        },
        Wednesday: {
          placeholder: this.$t("Glopal.wednesday"),
          day: "",
          from: '', 
          to: '', 
          is_holiday: false, 
        },
        Thursday: {
          placeholder: this.$t("Glopal.thursday"),
          day: "",
          from: '', 
          to: '', 
          is_holiday: false, 
        },
        Friday: {
          placeholder: this.$t("Glopal.friday"),
          day: "",
          from: '', 
          to: '', 
          is_holiday: false, 
        },
      
      },
      loading: false,
      workTimesUpdated: [],
      
    };
  },

  methods: {

    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    async workTimeData() {
        
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        // this.workTimesUpdated = [];
        await axios.get(`provider/work_times`, config)
        .then((res) => {
            if (res.data.key == "success") {
                this.workTimesUpdated = res.data.data;
                if(res.data.data.length > 0) {
                    this.interval = res.data.data.interval;

                    this.workTimes.Saturday.from = this.workTimesUpdated[0].from;
                    this.workTimes.Saturday.to = this.workTimesUpdated[0].to;
                    this.workTimes.Saturday.is_holiday = this.workTimesUpdated[0].is_holiday_code;
                    

                    this.workTimes.Sunday.from = this.workTimesUpdated[1].from;
                    this.workTimes.Sunday.to = this.workTimesUpdated[1].to;
                    this.workTimes.Sunday.is_holiday = this.workTimesUpdated[1].is_holiday_code;


                    this.workTimes.Monday.from = this.workTimesUpdated[2].from;
                    this.workTimes.Monday.to = this.workTimesUpdated[2].to;
                    this.workTimes.Monday.is_holiday = this.workTimesUpdated[2].is_holiday_code;


                    this.workTimes.Tuesday.from = this.workTimesUpdated[3].from;
                    this.workTimes.Tuesday.to = this.workTimesUpdated[3].to;
                    this.workTimes.Tuesday.is_holiday = this.workTimesUpdated[3].is_holiday_code;


                    this.workTimes.Wednesday.from = this.workTimesUpdated[4].from;
                    this.workTimes.Wednesday.to = this.workTimesUpdated[4].to;
                    this.workTimes.Wednesday.is_holiday = this.workTimesUpdated[4].is_holiday_code;


                    this.workTimes.Thursday.from = this.workTimesUpdated[5].from;
                    this.workTimes.Thursday.to = this.workTimesUpdated[5].to;
                    this.workTimes.Thursday.is_holiday = this.workTimesUpdated[5].is_holiday_code;

 
                    this.workTimes.Friday.from = this.workTimesUpdated[6].from;
                    this.workTimes.Friday.to = this.workTimesUpdated[6].to;
                    this.workTimes.Friday.is_holiday = this.workTimesUpdated[6].is_holiday_code;
                }
                // this.interval = res.data.data[0].interval;


            } else {
                console.log("failed");
            }

        })

        .catch((e) => {
            console.error(e);
        });
    },


    async submitData() {
      const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
      };

      this.loading = true;
      const fd = new FormData(this.$refs.workTime);

      fd.append("interval", this.interval);
      fd.append("work_times[Saturday][day]", "Saturday");
      fd.append("work_times[Saturday][from]", this.workTimes.Saturday.from);
      fd.append("work_times[Saturday][to]", this.workTimes.Saturday.to);
      if(this.workTimes.Saturday.is_holiday == true){
        fd.append("work_times[Saturday][is_holiday]", 1);
      } else {
        fd.append("work_times[Saturday][is_holiday]", 0);
      }
      // fd.append("work_times[Saturday][is_holiday]", this.workTimes.Saturday.is_holiday);

      fd.append("work_times[Sunday][day]", "Sunday");
      fd.append("work_times[Sunday][from]", this.workTimes.Sunday.from);
      fd.append("work_times[Sunday][to]", this.workTimes.Sunday.to);
      if(this.workTimes.Sunday.is_holiday == true){
        fd.append("work_times[Sunday][is_holiday]", 1);
      } else {
        fd.append("work_times[Sunday][is_holiday]", 0);
      }
      // fd.append("work_times[Sunday][is_holiday]", this.workTimes.Sunday.is_holiday);

      fd.append("work_times[Monday][day]", "Monday");
      fd.append("work_times[Monday][from]", this.workTimes.Monday.from);
      fd.append("work_times[Monday][to]", this.workTimes.Monday.to);
      if(this.workTimes.Monday.is_holiday == true){
        fd.append("work_times[Monday][is_holiday]", 1);
      } else {
        fd.append("work_times[Monday][is_holiday]", 0);
      }
      // fd.append("work_times[Monday][is_holiday]", this.workTimes.Monday.is_holiday);

      fd.append("work_times[Tuesday][day]", "Tuesday");
      fd.append("work_times[Tuesday][from]", this.workTimes.Tuesday.from);
      fd.append("work_times[Tuesday][to]", this.workTimes.Tuesday.to);
      if(this.workTimes.Tuesday.is_holiday == true){
        fd.append("work_times[Tuesday][is_holiday]", 1);
      } else {
        fd.append("work_times[Tuesday][is_holiday]", 0);
      }
      // fd.append("work_times[Tuesday][is_holiday]", this.workTimes.Tuesday.is_holiday);

      fd.append("work_times[Wednesday][day]", "Wednesday");
      fd.append("work_times[Wednesday][from]", this.workTimes.Wednesday.from);
      fd.append("work_times[Wednesday][to]", this.workTimes.Wednesday.to);
      if(this.workTimes.Wednesday.is_holiday == true){
        fd.append("work_times[Wednesday][is_holiday]", 1);
      } else {
        fd.append("work_times[Wednesday][is_holiday]", 0);
      }
      // fd.append("work_times[Wednesday][is_holiday]", this.workTimes.Wednesday.is_holiday);

      fd.append("work_times[Thursday][day]", "Thursday");
      fd.append("work_times[Thursday][from]", this.workTimes.Thursday.from);
      fd.append("work_times[Thursday][to]", this.workTimes.Thursday.to);
      if(this.workTimes.Thursday.is_holiday == true){
        fd.append("work_times[Thursday][is_holiday]", 1);
      } else {
        fd.append("work_times[Thursday][is_holiday]", 0);
      }
      // fd.append("work_times[Thursday][is_holiday]", this.workTimes.Thursday.is_holiday);

      fd.append("work_times[Friday][day]", "Friday");
      fd.append("work_times[Friday][from]", this.workTimes.Friday.from);
      fd.append("work_times[Friday][to]", this.workTimes.Friday.to);
      if(this.workTimes.Friday.is_holiday == true){
        fd.append("work_times[Friday][is_holiday]", 1);
      } else {
        fd.append("work_times[Friday][is_holiday]", 0);
      }
      // fd.append("work_times[Friday][is_holiday]", this.workTimes.Friday.is_holiday);


      await axios
        .post(`provider/work_times/store`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
              this.showSuccess(res.data.msg);
              setTimeout(() => {
                this.$router.push({name: 'externalAppointments'})
              }, 300);
          } else {
            this.showFail(res.data.msg);
          }

          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    // async submitData() {
    //   const config = {
    //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
    //   };

    //   this.loading = true;
    //   const fd = new FormData();

    //   fd.append("interval", this.interval);
    //   fd.append("work_times[Saturday][day]", this.workTimes.Saturday.day);
    //   fd.append("work_times[Saturday][from]", this.workTimes.Saturday.from);
    //   fd.append("work_times[Saturday][to]", this.workTimes.Saturday.to);
    //   fd.append("work_times[Saturday][is_holiday]", this.workTimes.Saturday.is_holiday);

    //   fd.append("work_times[Sunday][day]", this.workTimes.Sunday.day);
    //   fd.append("work_times[Sunday][from]", this.workTimes.Sunday.from);
    //   fd.append("work_times[Sunday][to]", this.workTimes.Sunday.to);
    //   fd.append("work_times[Sunday][is_holiday]", this.workTimes.Sunday.is_holiday);

    //   fd.append("work_times[Monday][day]", this.workTimes.Monday.day);
    //   fd.append("work_times[Monday][from]", this.workTimes.Monday.from);
    //   fd.append("work_times[Monday][to]", this.workTimes.Monday.to);
    //   fd.append("work_times[Monday][is_holiday]", this.workTimes.Monday.is_holiday);

    //   fd.append("work_times[Tuesday][day]", this.workTimes.Tuesday.day);
    //   fd.append("work_times[Tuesday][from]", this.workTimes.Tuesday.from);
    //   fd.append("work_times[Tuesday][to]", this.workTimes.Tuesday.to);
    //   fd.append("work_times[Tuesday][is_holiday]", this.workTimes.Tuesday.is_holiday);

    //   fd.append("work_times[Wednesday][day]", this.workTimes.Wednesday.day);
    //   fd.append("work_times[Wednesday][from]", this.workTimes.Wednesday.from);
    //   fd.append("work_times[Wednesday][to]", this.workTimes.Wednesday.to);
    //   fd.append("work_times[Wednesday][is_holiday]", this.workTimes.Wednesday.is_holiday);

    //   fd.append("work_times[Thursday][day]", this.workTimes.Thursday.day);
    //   fd.append("work_times[Thursday][from]", this.workTimes.Thursday.from);
    //   fd.append("work_times[Thursday][to]", this.workTimes.Thursday.to);
    //   fd.append("work_times[Thursday][is_holiday]", this.workTimes.Thursday.is_holiday);

    //   fd.append("work_times[Friday][day]", this.workTimes.Friday.day);
    //   fd.append("work_times[Friday][from]", this.workTimes.Friday.from);
    //   fd.append("work_times[Friday][to]", this.workTimes.Friday.to);
    //   fd.append("work_times[Friday][is_holiday]", this.workTimes.Friday.is_holiday);
      

    //   await axios
    //     .put(`provider/work_times/update`, fd, config)
    //     .then((res) => {
    //       if (res.data.key == "success") {

    //         this.showSuccess(res.data.msg);

    //       } else {
    //         this.showFail(res.data.msg);
    //       }

    //       this.loading = false;
    //     })
    //     .catch((e) => {
    //       console.error(e);
    //     });
    // },
  },

  async mounted() {
    await this.workTimeData();
  },

  
};
</script>

<style lang="scss" scoped>

.flatpickr-input {
  background-color: transparent;
  padding-inline-start: 30px;
  }
.p-dropdown-item {
  font-size: 14px;
}

.panel-body {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #dddddd;
    box-shadow: 0px 0px 2px #D9D9D9;
    border-radius: 6px;
    gap: 10px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 15.7px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border: 1px solid rgba(0, 161, 154, 1);
}

.slider:before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    left: 4px;
    bottom: 3px;
    background-color: rgba(0, 161, 154, 1);
    transition: 0.4s;
}

input:checked + .slider {
  background-color: gray;
  border-color: gray;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
  background-color: #fff;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.dropdown_card {
  &.card {
    height: 40px;
    overflow: hidden;
  }
}


.disabled-calender, input:disabled {
    background-color: #dddd;
}

</style>

