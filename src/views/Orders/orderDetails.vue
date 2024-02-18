<template>
  <div class="container">

    <div class="main-text mb-4">
      <p class="main-title">{{ $t("titles.appointment_requests") }}</p>

      <!-- this text for new order -->
      <p v-if="order.status == 0" class="main-disc">
        {{ $t("orders.new_order_details") }}
      </p>

      <!-- this text for for current order -->
      <p v-if="order.status == 1" class="main-disc">
        {{ $t("orders.current_order_details") }}
      </p>

      <!-- this code for finished order -->
      <p v-if="order.status == 4" class="main-disc">
        {{ $t("orders.details_completed_order") }}
      </p>

      <!-- this code for cancled order -->
      <p v-if="order.status == 2" class="main-disc">ملغى</p>
    </div>

    <ul class="steps order-steps">
      <li :class="{ 'step-item': true, active: order.status == 0 }">
        <div class="icon-done">
          <i class="fas fa-check icon"></i>
        </div>
        <span class="progress-label"> {{ $t("orders.new") }} </span>
      </li>

      <li :class="{ 'step-item': true, active: order.status == 1 || order.status == 4}">
        <div class="icon-done">
          <i class="fas fa-check icon"></i>
        </div>
        <span class="progress-label">{{ $t("orders.current") }}</span>
      </li>

      <li :class="{ 'step-item': true, active: order.status == 4 }">
        <div class="icon-done">
          <i class="fas fa-check icon"></i>
        </div>
        <span class="progress-label">{{ $t("orders.finished") }}</span>
      </li>
    </ul>

    <div class="layout-card">
      <!-- skelton section -->
      <div class="d-flex align-items-center gap-3 mb-4" v-if="loader">
        <Skeleton shape="circle" size="5rem" class="mr-2"></Skeleton>
        <div>
          <Skeleton width="15rem" height=".8rem" class="mb-3"></Skeleton>
          <Skeleton width="15rem" height=".8rem" class="mb-3"></Skeleton>
        </div>
      </div>

      <div class="d-flex align-items-center gap-3 mb-4" v-if="loader">
        <Skeleton shape="circle" size="5rem" class="mr-2"></Skeleton>
        <div>
          <Skeleton width="15rem" height=".8rem" class="mb-3"></Skeleton>
          <Skeleton width="15rem" height=".8rem" class="mb-3"></Skeleton>
        </div>
      </div>

      <div
        class="d-flex justify-content-center flex-column gap-2 mb-4 mt-4"
        v-if="loader"
      >
        <Skeleton
          v-for="i in 8"
          :key="i"
          width="100%"
          height=".8rem"
          class="mb-3"
        ></Skeleton>
      </div>

      <div class="customer-info sub-layout" v-if="!loader">
        <div class="info">
          <div class="side-img">
            <img :src="this.orderDetails.owner_image" alt="" class="img" />
          </div>
          <div class="side-info">
            <h4 class="order-title">{{ this.orderDetails.invoice_number }}</h4>
            <h4 class="order-title">{{ this.orderDetails.owner_name }}</h4>
            <div class="d-flex gap-2">
              <img src="@/assets/images/sm-order-img.png" alt="order-img" />
              <span class="hint main-cl">{{
                this.orderDetails.reservation_status_text
              }}</span>
            </div>
          </div>
        </div>

        <div class="gender">
          <div class="d-flex gap-2">
            <i class="fa-regular fa-user"></i>
            <span class="order-title">{{
              this.orderDetails.owner_gander
            }}</span>
          </div>
          <div class="d-flex gap-2">
            <i class="fa-regular fa-hourglass"></i>
            <span class="order-title"
              >{{ this.orderDetails.owner_age }} {{ $t("orders.year") }}</span
            >
          </div>
        </div>

        <div class="sub-info gender">
          <div class="order-title normal main-cl main-bg bg center-class">
            {{ this.orderDetails.reservation_status_text }}
          </div>
          <div class="main-bg bg gap-2 d-flex align-items-center">
            <i class="fa-solid fa-phone main-cl"></i>
            <span class="order-title normal main-cl mb-0">{{
              this.orderDetails.owner_phone
            }}</span>
          </div>
        </div>
      </div>

      <!-- هنا ها يتعرض الخدمات او الباقات -->

      <p class="main-title mb-3" v-if="!loader">
        {{ $t("orders.details") }} {{ this.orderDetails.item_type }}
      </p>

      <div class="customer-info sub-layout" v-if="!loader">
        <div class="info">
          <div class="side-img">
            <img
              :src="this.orderDetails.item_image"
              alt="item_image"
              class="img lg"
            />
          </div>
          <div class="side-info">
            <h4 class="order-title">{{ this.orderDetails.item_name }}</h4>
            <div class="d-flex gap-2">
              <!-- هنا ها يتعرض الخدمات او الباقات -->

              <!-- <span class="hint line-through">250.00 ر.س</span> -->

              <span class="hint main-cl"
                >{{ this.orderDetails.item_price }} {{ $t("Glopal.rs") }}</span
              >
            </div>
          </div>
        </div>

        <div class="sub-info gender">
          <div class="order-title normal main-cl main-bg bg center-class">
            {{ this.orderDetails.item_category }}
          </div>
          <div class="gap-2 d-flex align-items-center" >
            <div class="order-title normal main-cl mb-0"
              ><span v-if="this.orderDetails.item_type_orignal == 'service' ">{{ this.orderDetails.session_number }} {{$t('Glopal.sessions')}}</span>
              <span v-if="this.orderDetails.item_type_orignal == 'package' ">{{ this.orderDetails.package_services_count }} {{$t('Glopal.single_service')}}</span>
               
              </div
            >
          </div>
        </div>
      </div>

      <p class="main-title mb-3" v-if="!loader">{{ $t("orders.comments") }}</p>

      <div class="sub-layout" v-if="!loader">
        <p class="main-title normal gray-cl">
          {{ this.orderDetails.notes }}
        </p>
      </div>

      <p class="main-title mb-3" v-if="!loader">
        {{ $t("orders.payment_method") }}
      </p>

      <div class="sub-layout" v-if="!loader">
        <p class="main-title normal normal gray-cl mb-0">
          <i class="fa-regular fa-credit-card order-icon"></i>
          {{ this.orderDetails.payment_type_text }}
        </p>
      </div>

      <div class="section-details mb-4" v-if="!loader">
        <p class="main-title mb-3">{{ $t("orders.appointment_details") }}</p>

        <div class="sub-layout">
          <div class="customer-info with-brb">
            <div class="main-title normal mb-0">
              {{ $t("orders.appointment_date") }}
            </div>

            <div class="main-title normal mb-0">
              {{ this.orderDetails.day }}
            </div>
          </div>

          <div class="customer-info with-brb">
            <div class="main-title normal mb-0">
              {{ $t("orders.Appointment_time") }}
            </div>

            <div class="main-title normal mb-0" style="direction: ltr">
              {{ this.orderDetails.interval }}
            </div>
          </div>
        </div>
      </div>

      <div class="section-details mb-4" v-if="!loader">
        <p class="main-title mb-3">{{ $t("orders.order_summary") }}</p>

        <div class="sub-layout">
          <div class="customer-info with-brb">
            <div class="main-title normal mb-0">
              {{ $t("orders.order_value") }}
            </div>

            <div class="main-title normal mb-0">
              {{ this.orderDetails.total }} {{ $t("Glopal.rs") }}
            </div>
          </div>

          <div class="customer-info with-brb">
            <div class="main-title normal mb-0">
              {{ $t("orders.Booking_application_commission") }}
            </div>

            <div class="main-title normal mb-0">
              {{ this.orderDetails.booking_value }} {{ $t("Glopal.rs") }}
            </div>
          </div>

          <div class="customer-info with-brb">
            <div class="main-title normal mb-0">
              {{ $t("orders.tax_value") }}
            </div>

            <div class="main-title normal mb-0 main-cl">
              {{ this.orderDetails.tax_value }} {{ $t("Glopal.rs") }}
            </div>
          </div>

          <div class="customer-info with-brb">
            <div class="main-title normal mb-0">
              {{ $t("orders.discount_coupon") }}
            </div>

            <div class="main-title normal mb-0 purple">
              {{ this.orderDetails.discount }} {{ $t("Glopal.rs") }}
            </div>
          </div>

          <div class="customer-info with-brb">
            <div class="main-title normal mb-0">
              {{ $t("orders.total_price") }}
            </div>

            <div class="main-title normal mb-0 purple">
              {{ this.orderDetails.net_total }} {{ $t("Glopal.rs") }}
            </div>
          </div>

          <div class="customer-info with-brb">
            <div class="main-title normal mb-0">
              {{ $t("orders.Payment_required_coupon") }}
            </div>

            <div class="main-title normal mb-0 purple">
              {{ this.orderDetails.requested_pay_value }} {{ $t("Glopal.rs") }}
            </div>
          </div>

          <div class="customer-info with-brb">
            <div class="main-title normal mb-0">
              {{ $t("orders.remaining_amount") }}
            </div>

            <div class="main-title normal mb-0 purple">
              {{ this.orderDetails.remaining }} {{ $t("Glopal.rs") }}
            </div>
          </div>
        </div>
      </div>

      <p class="main-title mb-3" v-if="!loader">{{ $t("orders.address") }}</p>

      <div class="sub-layout" v-if="!loader">
        <p class="main-title normal normal gray-cl mb-0">
          <i class="fa-solid fa-location-dot order-icon"></i>
          {{ this.orderDetails.address }}
        </p>
      </div>

      <div class="section-btns mt-5" v-if="!loader">
        <button
          type="button"
          class="custom-btn md"
          v-if="this.orderDetails.reservation_status == 0"
          @click="acceptReservation"
        >
          {{ $t("orders.reservation_confirmation") }}
        </button>

        <button
          class="custom-btn cancel md test_button"
          @click="reg_complete = true"
          v-if="this.orderDetails.reservation_status == 0"
        >
          {{ $t("orders.suggest_another_appointment_client") }}
        </button>

        <button
          class="custom-btn xl"
          v-if="this.orderDetails.reservation_status == 5"
          @click="startReservation"
        >
          {{ $t("orders.amount_paid_order_started") }}
        </button>

        <button
          class="custom-btn md"
          v-if="this.orderDetails.reservation_status == 1"
          @click="finishedOrder"
        >
          {{ $t("orders.request_completed") }}
        </button>

        <button
          class="custom-btn md"
          v-if="this.orderDetails.reservation_status == 4"
          @click="view_rating"
        >
          {{ $t("orders.view_customer_rating") }}
        </button>
      </div>

      <!-- start to dialog of orders -->

      <!-- chose day and send it -->

      <Dialog
        v-model:visible="reg_complete"
        modal
        class="custum_dialog_width"
        :draggable="false"
      >
        <div class="text-center">
          <p class="main-title">{{ $t("orders.booking_date") }}</p>

          <form @submit.prevent="send_date">
            <div class="dialog position-relative">
              <flat-pickr
                class="position-relative w-100 mb-3"
                v-model="selectedDate"
                :config="flatPickrConfig"
              />
              <div class="mt-4">
                <button type="submit" class="custom-btn md mr-auto">
                  {{ $t("Auth.continuation") }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Dialog>

      <!-- chose time inside date i chosed it  -->

      <Dialog
        v-model:visible="radios_dialog"
        modal
        class="custum_dialog_width md"
        :draggable="false"
      >
        <div class="text-center">
          <p class="main-title mb-4">{{ $t("orders.booking_date") }}</p>

          <form ref="appointmentsForm" @submit.prevent="submitData_2">
            <div class="dialog position-relative">
              <div class="flex--between resp-margin gap-3">
                <span v-if="!NotFound" class="main-title normal">
                  {{this.dayItems.day_name}}</span>
                <div v-if="NotFound" class="main-title normal">
                  {{ $t("Glopal.there_no_appointments") }}
                </div>
              </div>

              <div class="days-radio" v-if="!loader">
                <label
                  class="custom-radio"
                  v-for="(day, curent_indix) in dayItems.work_periods"
                  :key="day.id"
                  :data-attr="curent_indix"
                >
                  <input
                    type="radio"
                    name="interval"
                    :value="day.interval"
                    v-model="single_date"
                    :class="{ 'available': day.is_available == false }"
                    class="d-none available_radio"
                  />
                  <div class="radio-content lg">{{ day.interval }}</div>
                </label>
              </div>

              <div class="mt-5">
                <button
                  type="submit"
                  class="custom-btn md mr-auto"
                  :disabled="NotFound"
                  :class="{ 'disabled-class': NotFound }"
                >
                  {{ $t("orders.send_appointment") }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Dialog>

      <!-- order has been Sent -->
      <Dialog
        v-model:visible="orderSent"
        modal
        class="custum_dialog_width noclose"
        :draggable="false"
      >
        <div class="text-center">
          <p class="main-title">{{ $t("orders.appointment_sent_client") }}</p>
          <img
            :src="require('@/assets/images/img-done.png')"
            alt="img-done"
            class="img-done"
          />
        </div>
      </Dialog>

      <Dialog
        v-model:visible="view_customer_rating"
        modal
        class="custum_dialog_width"
        :draggable="false"
      >
        <div class="text-center">
          <p class="main-title mb-4">{{ $t("Glopal.customer_reviews") }}</p>

          <div class="clinic_evaluation">
            <p class="main-title mb-0">{{ $t("Glopal.clinic_evaluation") }}</p>
            <star-rating
              :star-points="[
                23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
                19, 31, 17,
              ]"
              :show-rating="false"
              :increment="0.5"
              active-color="rgba(84, 61, 143, 1)"
              :star-size="22"
              :read-only="true"
              :animate="true"
              :rounded-corners="true"
              :rtl="false"
              :rating="rateData[0] ? rateData[0].rate : 0"
              :border-width="3"
            ></star-rating>
          </div>

          <div class="sub-layout mt-5 mb-5" v-if="rateData[0] && rateData[0].message">
            {{ rateData[0].message }}
          </div>

          <div class="clinic_evaluation">
            <p class="main-title mb-0">{{ $t("Glopal.service_evaluation") }}</p>
            <star-rating
              :star-points="[
                23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
                19, 31, 17,
              ]"
              :show-rating="false"
              :increment="0.5"
              active-color="rgba(84, 61, 143, 1)"
              :star-size="22"
              :read-only="true"
              :animate="true"
              :rounded-corners="true"
              :rtl="false"
              :rating="rateData[1]?.rate || 0"
              :border-width="3"
            ></star-rating>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Arabic } from "flatpickr/dist/l10n/ar";
import StarRating from "vue-star-rating";
import axios from "axios";
import Skeleton from "primevue/skeleton";

export default {
  components: {
    Dialog,
    flatPickr,
    StarRating,
    Skeleton,
  },

  data() {
    return {
      NotFound: false,
      dayItems: [],
      loader: false,
      amount_has_been_paid: false,
      orderDetails: [],
      rating: null,
      rating_2: null,
      reg_complete: false,
      radios_dialog: false,
      orderSent: false,
      view_customer_rating: false,
      selectedDate: null,
      date: null,
      flatPickrConfig: {
        locale: localStorage.getItem("locale") === "en" ? "default" : Arabic,
        dateFormat: "Y-m-d",
        inline: true,
        minDate: "today",
      },
      order: {
        status: "", // Set the status property to an appropriate value
      },

      data: {
        id: 6,
        number: "#96363243",
        order_status: 2,
        type: "for_all",
        status: null,
        service: "dr-otto-bergnaum",
        request_date: "الاثنين 6 نوفمبر 2023",
        duration: "10 ايام",
        tax_value: 1.19,
        price: 14.3,
        app_rate: 1.19,
        final_total: 14.3,
        images: [
          {
            name: "1699266716_2507.png",
            link: require("@/assets/images/service-image.png"),
          },
          {
            name: "1699266716_2638.png",
            link: require("@/assets/images/my-img.jpg"),
          },
        ],
        provider: {
          id: 9,
          name: "abdoprovider",
          image:
            "https://maak-lancer.com/public/storage/images/providers/1699262277_9422.jpg",
        },
        is_direct: 0,
        details: "fajkljlk",
        from_price: 10,
        to_price: 1000,
        is_negotiate: 1,
        room_id: 5,
      },

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

    // get reservation details
    async reservationDetails() {
      this.loader = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get(`provider/reservation/${this.orderId}/details`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.orderDetails = res.data.data;
            if (this.orderDetails.reservation_status == 0) {
              this.order.status = 0;
            } else if (this.orderDetails.reservation_status == 1) {
              this.order.status = 1;
            } else if (this.orderDetails.reservation_status == 2) {
              this.order.status = 2;
            } else if (this.orderDetails.reservation_status == 4) {
              this.order.status = 4;
            }
          } else {
            console.log("failed");
          }
          this.loader = false;
        })

        .catch((e) => {
          console.error(e);
        });
    },

    // book_appointment method
    async submitData_2() {
      this.loading = true;
      this.Appointment_Booking = false;
      const fd = new FormData(this.$refs.appointmentsForm);
      fd.append("day", this.selectedDate);
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      await axios
        .post(
          `provider/reservation/${this.orderId}/book_appointment`,
          fd,
          config
        )
        .then((res) => {
          if (res.data.key == "success") {
            this.send_date();
            localStorage.setItem('selectedRadio', this.single_date);
            this.showSuccess(res.data.msg);
            this.reservationDetails();
            this.orderSent = true;
            setTimeout(() => {
              this.orderSent = false;
              this.radios_dialog = false;
            }, 500);
          } else {
            this.showFail(res.data.msg);
          }
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    // send date to reservation
    async send_date() {
      const fd = new FormData();
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      this.loader = true;
      fd.append("date", this.selectedDate);
      this.dayItems = [];
      await axios
        // .post(`provider/reservation/intervals`, fd, config)
        .post(`provider/appointments/intervals`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.dayItems = res.data.data;
            this.NotFound = false;
            this.reg_complete = false;
            this.radios_dialog = true;
            this.showSuccess(res.data.msg);
          } else {
            console.log("failed");
            this.NotFound = true;
            this.showFail(res.data.msg);
          }
          this.loader = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    // start to acceptReservation
    async acceptReservation() {
      // this.loader = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .post(`provider/reservation/${this.orderId}/accept`, "", config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.orderDetails.reservation_status = 5;
            this.reservationDetails();
          } else {
            console.log("failed");
            this.showFail(res.data.msg);
          }
          // this.loader = false;
        })

        .catch((e) => {
          console.error(e);
        });
    },

    // start to startReservation
    async startReservation() {
      // this.loader = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .post(`provider/reservation/${this.orderId}/start`, "", config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.orderDetails.reservation_status = 1;
            this.reservationDetails();
          } else {
            console.log("failed");
            this.showFail(res.data.msg);
          }
          // this.loader = false;
        })

        .catch((e) => {
          console.error(e);
        });
    },

    // start to finishedOrder
    async finishedOrder() {
      // this.loader = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .post(`provider/reservation/${this.orderId}/finish`, "", config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.orderDetails.reservation_status = 4;
            this.reservationDetails();
          } else {
            console.log("failed");
            this.showFail(res.data.msg);
          }
          // this.loader = false;
        })

        .catch((e) => {
          console.error(e);
        });
    },

    // view customer rating

    async view_rating() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      // this.loader = true;
      await axios
        .get(`provider/reservation/${this.orderId}/rate`, config)
        .then((res) => {
          if (res.data.key == "success") {
            // this.loader = false;
            this.view_customer_rating = true;
            this.rateData = res.data.data;
            console.log(this.rateData, "rateData");
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
    orderId() {
      return this.$route.params.orderId;
    },
  },

  async mounted() {
    await this.reservationDetails();
    const currentDate = new Date();
    this.selectedDate = currentDate.toISOString().split("T")[0];
    console.log(this.selectedDate, "current date");
  },
};
</script>

<style lang="scss">
.disabled-class {
  cursor: no-drop;
}
.flatpickr-calendar {
  margin: 0 auto;
}

.vue-star-rating {
  gap: 5px;
  flex-direction: row-reverse;
}
.radio-content {
    direction: ltr;
}

  input:checked ~ .radio-content {
    &.lg {
      color: #fff;
      background-color: var(--main);
    }
  }

</style>
