<template>
  <div class="">
    <div v-if="showSearch" class="search-box mb-4">
      <button class="search-btn">
        <img
          :src="require('@/assets/images/Search.png')"
          alt="search-img"
          class="search-img"
        />
      </button>
      <InputText
        class="input"
        v-model="filters['global'].value"
        :placeholder="$t('orders.Search_customer_name_mobile_number')"
        @input="updateGlobalFilter"
      />
    </div>
    <div class="main-table">
      <DataTable
        :value="products"
        paginator
        :filters="filters"
        :rows="rows"
        :sortable="sortable"
        tableStyle="min-width: 50rem"
        class="my-table"
        id="my_table"
        ref="my_table"
      >
        <template #empty>
          {{ $t("orders.no_records_found") }}
        </template>

        <div v-for="(col, index) in columns" :key="col.field">
          <Column
            :field="col.field"
            :header="col.header"
            :sortable="sortable"
            v-if="col.field !== 'abilities'"
          >
            <!--  if i need to add image it index is one in my data table  -->
            <template v-if="index === 1 && showImage" #body="slotProps">
              <!-- <img :src="slotProps.data[imageProp]" :alt="slotProps.data.image" class="shadow-4 datatable-image-custom" /> -->
              <img
                :src="slotProps.data.image"
                alt="package-img"
                class="shadow-4 datatable-image-custom"
              />
            </template>
          </Column>

          <Column v-if="col.field === 'abilities'" :header="col.header">
            <template #body="slotProps">
              <span
                v-for="(ability, index) in slotProps.data.abilities"
                :key="index"
                >{{ ability.name }}
                <span v-if="index < slotProps.data.abilities.length - 1">
                  -
                </span>
              </span>
            </template>
          </Column>
        </div>

        <!-- in this Column pass dropdown have all dialogs inside service page  -->

        <Column v-if="DropDownserviceDialog" header="">
          <template #body="slotProps">
            <div class="dropdown drop-lang dropdown-table">
              <div
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></div>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <button
                    class="dropdown-item"
                    @click="delete_service_Dialog(slotProps.data.id)"
                    :data_attr="slotProps.data.id"
                  >
                    {{ $t("Glopal.delete") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/trash.png')"
                      alt="delet-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="edit_service_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.edit") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/edit.png')"
                      alt="edit-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="toggleStatus_service($event, slotProps.data.id)"
                  >

                  
                  <!-- <span v-if="!toggl_status">{{ $t("Glopal.cancel_appearance") }}</span>
                  <span v-else>{{ $t("Glopal.show") }}</span> -->
                    <span>
                      {{ slotProps.data.status }}
                    </span>
                    <img
                      :src="
                        require('@/assets/images/dropdown-img/eye-slash.png')
                      "
                      alt="eye-slash-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" @click="togglePriceStatus_service(slotProps.data.id)">

                    {{ slotProps.data.price_status == 1 ? $t("Glopal.hide_price") : $t("Glopal.show_price") }}
                    <img
                      :src="
                        require('@/assets/images/dropdown-img/money-remove.png')
                      "
                      alt="money-remove-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="rate_service_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.ratings") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/star.png')"
                      alt="star-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" @click="details_service_Dialog(slotProps.data.id)">
                    {{$t('Glopal.details')}}
                    <i class="fa-solid fa-circle-info tb-img"></i>
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </Column>

        <!-- in this Column pass dropdown have all dialogs inside package page  -->
        <Column v-if="DropDownpackageDialog" header="">
          <template #body="slotProps">
            <div class="dropdown drop-lang dropdown-table sort-table">
              <div
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></div>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <button
                    class="dropdown-item"
                    @click="delete_package_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.delete") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/trash.png')"
                      alt="delet-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="edit_package_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.edit") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/edit.png')"
                      alt="edit-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="rate_package_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.ratings") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/star.png')"
                      alt="star-img"
                      class="tb-img"
                    />
                  </button>
                </li>

                <li>
                  <button class="dropdown-item" @click="details_package(slotProps.data.id)">
                    {{$t('Glopal.details')}}
                    <i class="fa-solid fa-circle-info tb-img"></i>
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </Column>

        <!-- if i need to add Column for order id -->

        <Column v-if="showOrderId">
          <template #body="slotProps">
            <router-link
              :to="{
                name: 'orderDetails',
                params: { orderId: slotProps.data.id },
              }"
            >
              <div class="table-list">
                <i class="fas fa-ellipsis-h"></i>
                <!-- <p>{{ slotProps.data.id }}</p> -->
              </div>
            </router-link>
          </template>
        </Column>

        <!-- in this Column pass dropdown have all dialogs inside package page  -->
        <Column v-if="DropDownuserRemission" header="">
          <template #body="slotProps">
            <div class="dropdown drop-lang dropdown-table sort-table">
              <div
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></div>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <button
                    class="dropdown-item"
                    @click="delete_user_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.delete") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/trash.png')"
                      alt="delet-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="edit_user_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.edit") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/edit.png')"
                      alt="edit-img"
                      class="tb-img"
                    />
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <!-- ********************** start to service dialog *********************** -->

  <deleteServiceDialog
    ref="delete_service_dialog"
    @serviceDeleted="serviceDeleted"
    :itemId="itemId"
  />
  <editServiceDialog ref="edit_service_dialog" @editserviceDatatable="editserviceDatatable" :itemId="itemId" />
  <ratingServiceDialog ref="rate_service_dialog" :itemId="itemId" />
  <detailsDialogs ref="details_service_dialog" :itemId="itemId" />

  <!-- ********************** start to packages dialogs *********************** -->

  <deletepackageDialog
    ref="delete_package_dialog"
    @packageDeleted="serviceDeleted"
    :itemId="itemId"
  />
  <editpackageDialog ref="edit_package_dialog" @editpackageDatatable="editpackageDatatable" :itemId="itemId" />
  <ratingpackageDialog ref="rate_package_dialog" :itemId="itemId" />
  <packageDetailsDialogs ref="details_package_dialog" :itemId="itemId"/>

  <!-- ********************** start to DeleteUserdialog **********************  -->

  <deleteusereDialog
    ref="delete_user_dialog"
    :itemId="itemId"
    @userDeleted="serviceDeleted"
  />
  <editusereDialog ref="edit_user_dialog" :itemId="itemId" />
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

// ******** import file font as a string (base 64) to handle export pdf arabic By (Ramadan) ************* //
import * as CairoRegular from "@/assets/webfonts/Cairo-VariableFont_wght-normal.js";

// &&&&&&&&&&&&&&&&&& this importants sources for dailogs of the serviceDialogs only &&&&&&&&&&&&&&&&&&&&&&&

import deleteServiceDialog from "@/components/Dialogs/servicesDialogs/deleteDialog";
import editServiceDialog from "@/components/Dialogs/servicesDialogs/editDialog";
import ratingServiceDialog from "@/components/Dialogs/servicesDialogs/ratingDialog";

import detailsDialogs from "@/components/Dialogs/servicesDialogs/detailsDialogs.vue";

// &&&&&&&&&&&&&&&&&& this importants sources for dailogs of the packagesDialogs only &&&&&&&&&&&&&&&&&&&&&&&

import deletepackageDialog from "@/components/Dialogs/packageDialogs/deleteDialog";
import editpackageDialog from "@/components/Dialogs/packageDialogs/editDialog";
import ratingpackageDialog from "@/components/Dialogs/packageDialogs/ratingDialog.vue";

import packageDetailsDialogs from "@/components/Dialogs/packageDialogs/detailsDialogs";

// &&&&&&&&&&&&&&&&&& this importants sources for user permission only &&&&&&&&&&&&&&&&&&&&&&&

import deleteusereDialog from "@/components/Dialogs/PermissionsDialogs/deleteUser.vue";
import editusereDialog from "@/components/Dialogs/PermissionsDialogs/edituserDialogs.vue";

export default {
  components: {
    DataTable,
    Column,
    InputText,
    Dropdown,
    Dialog,

    // this identification components all for ServiceDialogs

    deleteServiceDialog,
    editServiceDialog,
    ratingServiceDialog,
    detailsDialogs,

    // this identification components all for packageDialogs

    deletepackageDialog,
    editpackageDialog,
    ratingpackageDialog,
    packageDetailsDialogs,

    // this identification components all for userpermissionDialogs
    deleteusereDialog,
    editusereDialog,
  },
  props: {
    products: Array,
    columns: Array,
    filters: Object,
    currency: String,
    rows: Number,
    showSearch: {
      type: Boolean,
      default: true, // Show search by default, change to false when you want to hide it
    },
    DropDownserviceDialog: {
      type: Boolean,
      default: false, // hide DropDownserviceDialog by default, change to true when you want to show it
    },
    DropDownpackageDialog: {
      type: Boolean,
      default: false, // hide DropDownpackageDialog by default, change to true when you want to show it
    },
    showImage: {
      type: Boolean,
      default: false, // hide showImage by default, change to true when you want to show it
    },
    sortable: {
      type: Boolean,
      default: true, // show sortable by default, change to false when you want to hide it
    },
    imageProp: {
      type: String,
      required: false,
      default: "image_2", // Set a default value if needed
    },
    showOrderId: {
      type: Boolean,
      default: false, // hide showOrderId by default, change to true when you want to show it
    },
    DropDownuserRemission: {
      type: Boolean,
      default: false, // hide DropDownuserRemission by default, change to true when you want to show it
    },
  },

  data() {
    return {
      itemId: 0,
      filters: null,
      toggl_status: false,
      toggl_status_price: false,
    };
  },
  methods: {

    editserviceDatatable() {
      this.$emit("editserviceDatatable");
    },

    editpackageDatatable() {
      this.$emit("editpackageDatatable");
    },
    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: "contains" },
        name: {
          operator: "and",
          constraints: [{ value: null, matchMode: "startsWith" }],
        },
        // ... other filters
      };
    },

    // updateGlobalFilter() {
    //   // Emit the updated filters to the parent component
    //   this.$emit('updateFilters', this.filters);
    // },

    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    // ******************* methods of service dialog only ***********************

    add_service_Dialog() {
      this.$refs.add_service_dialog.services_add_dialog = true;
    },
    filter_service_Dialog() {
      this.$refs.filter_service_dialog.services_filtering_dialog = true;
    },
    edit_service_Dialog(id) {
      this.$refs.edit_service_dialog.services_edit_dialog = true;
      this.itemId = id;
    },
    delete_service_Dialog(id) {
      this.$refs.delete_service_dialog.services_delete_dialog = true;
      this.itemId = id;
    },
    rate_service_Dialog(id) {
      this.itemId = id;
      this.$refs.rate_service_dialog.services_rating_dialog = true;
    },

    details_service_Dialog(id) {
      this.itemId = id;
      this.$refs.details_service_dialog.services_details = true;
      
    },

    // ******************* methods of package dialog only ***********************

    add_package() {
      this.$refs.add_package_dialog.package_add_dialog = true;
    },

    filterDialog() {
      this.$refs.filter_package_dialog.package_filtering_dialog = true;
    },

    delete_package_Dialog(id) {
      this.$refs.delete_package_dialog.package_delete_dialog = true;
      this.itemId = id;
    },

    edit_package_Dialog(id) {
      this.$refs.edit_package_dialog.package_edit_dialog = true;
      this.itemId = id;
    },

    rate_package_Dialog(id) {
      this.itemId = id;
      this.$refs.rate_package_dialog.package_rating_dialog = true;
      console.log(this.itemId, "id");
    },

    details_package(id) {
      this.$refs.details_package_dialog.package_details = true;
      this.itemId = id;
    },

    // ******************* methods of userpermission dialog only ***********************

    delete_user_Dialog(id) {
      this.$refs.delete_user_dialog.delete_user = true;
      this.itemId = id;
    },

    edit_user_Dialog(id) {
      this.$refs.edit_user_dialog.edit_user = true;
      this.itemId = id;
    },

    // start to make download pdf function how to use it ? if u need to use it glopaly u can make button with downloadPDF ,
    // if you want to use it in some child component you can call this function with ref component and call it this.your(Ref).downloadPDF
    downloadPDF() {
      const doc = new jsPDF();
      var callAddFont = function () {
        doc.addFileToVFS("Cairo-VariableFont_wght-normal.ttf", CairoRegular);
        doc.addFont(
          "Cairo-VariableFont_wght-normal.ttf",
          "Cairo-VariableFont_wght",
          "normal"
        );
      };
      jsPDF.API.events.push(["addFonts", callAddFont]);
      doc.setFont("Cairo-VariableFont_wght", "normal");
      const table = document.getElementById("my_table");

      // Hide the filter row and filter inputs before exporting
      const filterRow = table.querySelector("thead tr.p-filter-row");
      if (filterRow) {
        filterRow.style.display = "none";
      }

      const filterInputs = table.querySelectorAll(".p-column-filter");
      if (filterInputs) {
        filterInputs.forEach((input) => {
          input.style.display = "none";
        });
      }

      const testHeads = [];
      table
        .querySelectorAll("thead th")
        .forEach((th) => testHeads.push(th.textContent.trim()));
      const headers = testHeads.reverse();

      const testData = [];
      table.querySelectorAll("tbody tr").forEach((tr) => {
        const rowData = [];
        tr.querySelectorAll("td").forEach((td) =>
          rowData.push(td.textContent.trim())
        );
        testData.push(rowData.reverse());
      });
      const data = testData;

      doc.setDirection = "rtl";
      const cellPadding = 1;
      const tableWidth = doc.internal.pageSize.width - cellPadding * 2;
      const colWidths = data[0].map((_, i) => tableWidth / data[0].length);
      const tableOptions = {
        startY: 10,
        margin: { top: 20, bottom: 10, left: 10, right: 10 },
        theme: "striped",
        tableLineColor: 200,
        float: "rtl",
        headStyles: {
          font: "Cairo-VariableFont_wght",
          align: "center",
          whiteSpace: "nowrap",
        },
        columnStyles: colWidths.map(() => ({ cellPadding, valign: "center" })),
        bodyStyles: {
          font: "Cairo-VariableFont_wght",
          dir: "rtl",
          lang: "ar",
          align: "center",
          whiteSpace: "nowrap",
        },

        didDrawPage: () => {
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(8);
          doc.text(
            "Page " + pageCount,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 10,
            { align: "center" }
          );
          
        },
      };
      doc.autoTable({
        head: [headers],
        body: data,
        ...tableOptions,
      });

      // Restore the filter row and filter inputs after exporting
      if (filterRow) {
        filterRow.style.display = "table-row";
      }

      if (filterInputs) {
        filterInputs.forEach((input) => {
          input.style.display = "block"; // Use "block" or "inline" based on your styling
        });
      }

      doc.save("download.pdf");
    },

    exportCSV() {
      this.$refs.my_table.exportCSV();
    },

    // this methods is for delete service from table
    serviceDeleted(id) {
      let index = this.products.findIndex((service) => service.id === id);
      this.products.splice(index, 1);
      console.log(index, "index");
    },

    async toggleStatus_service(e , id) {
      if (e.currentTarget.querySelector("span").innerHTML === this.$t("Glopal.show")) {
        e.currentTarget.querySelector("span").innerHTML = this.$t("Glopal.cancel_appearance");
      } else {
        e.currentTarget.querySelector("span").innerHTML = this.$t("Glopal.show");
      }
      this.itemId = id;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      this.loading = true;
      await axios
        .get(`provider/services/${this.itemId}/toggleStatus`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.toggl_status = !this.toggl_status;
            // this.$emit("serviceDeleted", this.itemId);
            this.showSuccess(res.data.msg);
            
          } else {
            console.log("failed");
            this.showFail(res.data.msg);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

    async togglePriceStatus_service(id) {
      this.itemId = id;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      this.loading = true;
      await axios
        .get(`provider/services/${this.itemId}/togglePriceStatus`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.$emit("someEvent");
            this.showSuccess(res.data.msg);
          } else {
            console.log("failed");
            this.showFail(res.data.msg);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },

  created() {
    this.initFilters();
  },
};
</script>

<style lang="scss">
.p-datatable-wrapper {
  border-radius: 10px;
}

.p-datatable .p-datatable-thead > tr > th {
  background-color: #00a19a;
  color: #fff;
}

.my-table {
  border: 1px solid #dddddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;

  .p-column-header-content {
    justify-content: center;

    .p-column-title {
      font-size: 13px;
    }
  }

  .p-datatable-tbody > tr > td {
    text-align: center;
  }
}
</style>
