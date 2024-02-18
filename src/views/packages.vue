<template>
  
<div class="container">
  <div class="flex-end-section mb-5">

    <div class="main-text mb-0">
        <p class="main-title">{{ $t('titles.packages') }}</p>
        <p class="main-disc">{{ $t('Glopal.packages_displayed') }}</p>
    </div>

    <div class="section-btns">
      <button class="custom-btn mb-0 add-package" @click="add_package">
        <i class="fas fa-plus plus-icon"></i>
          {{$t('Glopal.add_package')}} 

        </button>
      <button class="filter-btn" @click="filterDialog">
        <img :src="require('@/assets/images/filter-btn.png')" alt="filter-btn">
      </button>
    </div>

  </div>

    <!-- Use mainTable component and bind products and filters as props -->
    <div v-if="!loader">
      <mainTable
        :products="new_products"
        :columns="columns"
        :rows="9"
        :filters="filters"
        @updateFilters="updateFilters"
        @editpackageDatatable="tableData"
        :showSearch="false"
        :DropDownpackageDialog="true"
        :sortable="false"
        :showImage="true"
        :imageProp="image_2"
      />

    </div>


    <filterpackageDialog @packagefiltered="handlePackageFiltered" ref="filter_package_dialog" />
    <addpackageDialog @packageAdded="tableData" ref="add_package_dialog"/>
      <div v-if="loader">
        <mySkelton :SkeletonProducts="SkeletonProducts" />
      </div>
</div>
</template>

<script>
  import mainTable from "@/components/mainTable.vue";
  import addpackageDialog from '@/components/Dialogs/packageDialogs/addpackageDialogs'
  import filterpackageDialog from '@/components/Dialogs/packageDialogs/filterDialog'
  import Skeleton from 'primevue/skeleton';
  import axios from 'axios';
  import mySkelton from "@/components/Skeleton.vue";


export default {
  components: {
    mainTable,
    addpackageDialog,
    filterpackageDialog,
    Skeleton,
    mySkelton,
  },
  data() {
    return {
      loader: false,
      new_products : [],
    };
  },
  created() {
    this.columns = [
      { field: "id", header: this.$t("datatable.number") },
      { field: "image", header: this.$t("datatable.picture") },
      { field: "name", header: this.$t("datatable.package_name") },
      { field: "price", header: this.$t("datatable.price") },
      { field: "gender", header: this.$t("Glopal.gender") },
      { field: "category", header: this.$t("datatable.section") },
      { field: "services_count", header: this.$t("Glopal.number_services") },
      { field: "is_installment", header: this.$t("datatable.installment") },
    ];

    this.SkeletonProducts = new Array(this.columns.length)
  },

  methods: {

    // for filter in main component

  async handlePackageFiltered(filteredData) {
    // Replace the existing data with the filtered data
    this.new_products = filteredData;
  },

    add_package() {
        this.$refs.add_package_dialog.package_add_dialog = true;
    },

    filterDialog() {
        this.$refs.filter_package_dialog.package_filtering_dialog = true;
    },

   async tableData() {
     this.loader = true;
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };
      await axios.get(`provider/packages`, config)
      .then((res) => {
        if (res.data.key == "success") {
          this.new_products = res.data.data.packages;
          console.log(res.data.data.packages);

        } else {
                console.log("failed");
            }
             this.loader = false;
      })

      .catch((e) => {
        console.error(e);
      });
    }
  },

  async mounted() {
    await this.tableData();
  },
};
</script>
