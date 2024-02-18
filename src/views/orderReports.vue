<template>
  <div class="container">
    <div class="flex-end-section mb-5 flex-wrap">
      <div class="main-text mb-0">
        <p class="main-title">{{ $t("Sidebar.order_reports") }}</p>
        <p class="main-disc">{{ $t("Glopal.reports_orders_displayed") }}</p>
      </div>

      <form class="w-auto m-0">
        <div class="section-btns">
          <div
            class="dropdown drop-lang dropdown-table dropdown-export custom-btn sm p-0"
          >
            <div
              class="dropdown-toggle w-100"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ $t("Glopal.download") }}
              <i class="fa-solid fa-download plus-icon marg-end"></i>
            </div>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button
                  type="button"
                  class="dropdown-item"
                  @click="callDownloadPDF"
                >
                  {{ $t("Glopal.download_pdf") }}
                  <i class="far fa-file-pdf export-icon"></i>
                </button>
              </li>
              <li>
                <button type="button" class="dropdown-item" @click="callExel">
                  {{ $t("Glopal.download_xl") }}
                  <i class="far fa-file-excel export-icon"></i>
                </button>
              </li>
            </ul>
          </div>

          <div class="flatpickr-section">
            <flat-pickr
              class="position-relative w-100 main_input"
              v-model="startDate"
              :config="startConfig"
              :placeholder="$t('Glopal.from')"
            />
            <flat-pickr
              class="position-relative w-100 main_input"
              v-model="endDate"
              :config="endConfig"
              @change="filterTable"
              :placeholder="$t('Glopal.to')"
              :disabled="!startDate"
            />
          </div>
        </div>
      </form>
    </div>

    <div v-if="!loader">
      <mainTable
        :products="new_products"
        :columns="columns"
        :rows="7"
        :filters="filters"
        :showSearch="false"
        :DropDownserviceDialog="false"
        :sortable="true"
        ref="dataTableRef"
      />
    </div>

    <div v-if="loader">
      <mySkelton :SkeletonProducts="SkeletonProducts" />
    </div>
  </div>
</template>

<script>
import mainTable from "@/components/mainTable.vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Skeleton from "primevue/skeleton";
import mySkelton from "@/components/Skeleton.vue";
import axios from "axios";

export default {
  components: {
    mainTable,
    flatPickr,
    Skeleton,
    mySkelton,
  },

  data() {
    return {
      new_products: [],
      settlement_successfully_sending: false,
      startDate: null,
      endDate: null,
      startConfig: {
        mode: "single",
        dateFormat: "Y-m-d",
        onClose: this.handleStartDateClose,
        disableMobile: "true",
        maxDate: new Date().fp_incr(0),
      },
      endConfig: {
        mode: "single",
        dateFormat: "Y-m-d",
        onClose: this.handleEndDateClose,
        disableMobile: "true",
      },
      loader: false,
    };
  },

  created() {
    this.columns = [
      { field: "id", header: this.$t("datatable.number") },
      { field: "invoice_number", header: this.$t("orders.order_number") },
      { field: "user_name", header: this.$t("orders.order_owner") },
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

    async filterTable() {
      
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      const fd = new FormData();

      fd.append("interval", this.interval);

      await axios
        .get(
          `provider/reservation-report?start_date=${this.startDate}&end_date=${this.endDate}`,
          config
        )
        .then((res) => {
          if (res.data.key == "success") {
            this.new_products = res.data.data;
          } else {
            this.showFail(res.data.msg);
          }

          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },
    handleStartDateClose(selectedDates, dateStr, instance) {
      // Update the minDate of the end date picker
      this.endConfig.minDate = dateStr;
    },

    callDownloadPDF() {
      // Access the DataTable component using ref
      this.$refs.dataTableRef.downloadPDF();
    },

    callExel() {
      // Access the DataTable component using ref
      this.$refs.dataTableRef.exportCSV();
    },
    async tableData() {
      this.loader = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get(`provider/reservation-report`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.new_products = res.data.data;
          } else {
            console.log("failed");
          }
          this.loader = false;
        })

        .catch((e) => {
          console.error(e);
        });
    },
  },
  async mounted() {
    await this.tableData();
  },
};
</script>

<style lang="scss" scoped>
.export-icon {
  font-size: 17px;
}

.flatpickr-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.plus-icon {
  margin: 0;
  margin-inline-start: 15px;
}

.dropdown-table {
  overflow: visible;

  .dropdown-menu {
    min-width: 100% !important;
    min-height: 70px !important;
  }

  &.custom-btn {
    &:hover {
      color: #fff !important;
    }

    &::before {
      display: none;
    }
  }

  &::before {
    display: none;
  }

  .dropdown-toggle {
    line-height: 40px;

    &::after {
      display: none;
    }
  }
}
</style>
