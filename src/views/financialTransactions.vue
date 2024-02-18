<template>
  <div class="container">
    <div class="flex-end-section mb-5">
      <div class="main-text mb-0">
        <p class="main-title">{{ $t("Sidebar.financial_transactions") }}</p>
        <p class="main-disc">
          {{ $t("Glopal.financial_transactions_displayed") }}
        </p>
      </div>

      <div class="section-btns">
        <button class="custom-btn mmd cancel mb-0">
          {{ $t(`Glopal.your_wallet_balance`) }} {{ wallet_balance }}
          {{ $t(`Glopal.rs`) }}
        </button>

        <button class="custom-btn mmd mb-0" @click="sent_settlement">
          {{ $t("Glopal.settlement_request") }}
          <span
            class="spinner-border spinner-border-sm custom-spinner"
            v-if="loaderBtn"
            role="status"
          ></span>
        </button>
      </div>
    </div>
    <div v-if="!loader">
      <div v-if="new_products.length">
        <mainTable
          :products="new_products"
          :columns="columns"
          :currency="currency"
          :rows="7"
          :filters="filters"
          :showSearch="false"
          :DropDownserviceDialog="false"
          :sortable="true"
        />
      </div>

      <div v-else class="text-center">لا يوجد معاملات حتى الان</div>
    </div>
    <div v-else>
      <mySkelton :SkeletonProducts="SkeletonProducts" />
    </div>

    <!-- dialog settlement request  -->
    <Dialog
      v-model:visible="settlement_successfully_sending"
      modal
      class="custum_dialog_width noclose"
      :draggable="false"
    >
      <div class="text-center">
        <p class="main-title">
          {{ $t("Glopal.settlement_request_sent_dministration") }}
        </p>
        <img
          :src="require('@/assets/images/img-done.png')"
          alt="delete_service-img"
          class="img-done"
        />
      </div>
    </Dialog>
  </div>
</template>

<script>
import mainTable from "@/components/mainTable.vue";
import Dialog from "primevue/dialog";
import Skeleton from "primevue/skeleton";
import axios from "axios";
import mySkelton from "@/components/Skeleton.vue";

export default {
  components: {
    mainTable,
    Dialog,
    Skeleton,
    mySkelton,
  },

  data() {
    return {
      new_products: [],
      currency: "ر.س",
      loader: false,
      loaderBtn: false,
      wallet_balance: 0,
      settlement_successfully_sending: false,
    };
  },

  created() {
    this.columns = [
      { field: "id", header: this.$t("datatable.number") },
      { field: "invoice_number", header: this.$t("orders.order_number") },
      { field: "order_amount", header: this.$t("orders.order_value") },
      {
        field: "booking_value",
        header: this.$t("orders.Booking_application_commission"),
      },
      { field: "added_value_tax", header: this.$t("orders.value_Added") },
      { field: "net_total", header: this.$t("orders.total") },
      { field: "order_date", header: this.$t("orders.the_date") },
    ];
    this.SkeletonProducts = new Array(this.columns.length);
  },

  methods: {
    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },
    async sent_settlement() {
      this.loaderBtn = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .post(`provider/finanicial-transactions/store`, "", config)
        .then((res) => {
          if (res.data.key == "success") {
            this.settlement_successfully_sending = true;
            setTimeout(() => {
              this.settlement_successfully_sending = false;
            }, 1500);
          } else {
            this.showFail(res.data.msg);
          }
          this.loaderBtn = false;
        })

        .catch((e) => {
          console.error(e);
        });
    },
    async tableData() {
      this.loader = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get(`provider/finanicial-transactions`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.new_products = res.data.data.financialTransactions;
            this.wallet_balance = res.data.data.wallet_balance;
            this.currency = res.data.data.financialTransactions[0].currency;
          } else {
            console.log("failed");
          }
          this.loader = false;
        })
        

        .catch((e) => {
          console.error(e);
        });
        this.loader = false;
    },
  },
  async mounted() {
    await this.tableData();
  },
};
</script>
