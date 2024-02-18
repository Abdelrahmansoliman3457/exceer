<template>
  <div class="container">
    <div class="flex-end-section mb-5">
      <div class="main-text mb-0">
        <p class="main-title">{{ $t("Sidebar.user_permissions") }}</p>
        <p class="main-disc">{{ $t("Glopal.permissions_displayed") }}</p>
      </div>

      <div class="section-btns">
        <button class="custom-btn mb-0" @click="addUser">
          <i class="fas fa-plus plus-icon"></i>
          {{ $t("Glopal.add_user") }}
        </button>
      </div>
    </div>

    <div v-if="!loader">
      <mainTable
        :products="new_products"
        :columns="columns"
        :rows="8"
        :filters="filters"
        :showSearch="false"
        :sortable="false"
        :DropDownuserRemission="true"
      />
    </div>

    <div v-if="loader">
      <mySkelton :SkeletonProducts="SkeletonProducts" />
    </div>

    <adduserDialog ref="AdduserDialog" @userAdded="tableData" />
  </div>
</template>

<script>
import mainTable from "@/components/mainTable.vue";
import adduserDialog from "@/components/Dialogs/PermissionsDialogs/adduserDialogs.vue";
import Skeleton from "primevue/skeleton";
import axios from "axios";
import mySkelton from "@/components/Skeleton.vue";

export default {
  components: {
    mainTable,
    adduserDialog,
    Skeleton,
    mySkelton,
  },

  data() {
    return {
      new_products: [],
      loader: false,
    };
  },

  created() {
    this.columns = [
      { field: "id", header: this.$t("datatable.number") },
      { field: "responsible_name", header: this.$t("datatable.user_name") },
      { field: "email", header: this.$t("Auth.email") },
      { field: "abilities", header: this.$t("datatable.permissions") },
    ];
    this.SkeletonProducts = new Array(this.columns.length);
  },

  methods: {
    addUser() {
      this.$refs.AdduserDialog.addUser_dialog = true;
    },

    async tableData() {
      this.loader = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get(`provider/abilities`, config)
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
