<template>
  <div class="container">
    <!-- Use mainTable component and bind products and filters as props -->
      <div class="flex-end-section mb-5">

        <div class="main-text mb-0">
            <p class="main-title">{{ $t('Sidebar.services') }}</p>
            <p class="main-disc">{{ $t('Glopal.services_offered') }}</p>
        </div>

        <div class="section-btns">
          <button class="custom-btn mb-0" @click="addDialog">
            <i class="fas fa-plus plus-icon"></i>
             {{$t('Glopal.add_service')}} 

            </button>
          <button class="filter-btn" @click="filterDialog">
            <img :src="require('@/assets/images/filter-btn.png')" alt="filter-btn">
          </button>
        </div>

      </div>
      <div v-if="!loader">
        <mainTable
          :products="new_products"
          :columns="columns"
          :rows="10"
          :filters="filters"
          @updateFilters="updateFilters"
          @editserviceDatatable="tableData"
          @some-event="callback"
          :showSearch="false"
          :DropDownserviceDialog="true"
          :sortable="false"
          ref="dataTableRef"
        />

      </div>
      
      <filterserviceDialog @servicefiltered="handleServiceFiltered" ref="filter_service_dialog" />
      <addserviceDialog @serviceAdded="tableData" ref="add_service_dialog"/>
      <div v-if="loader">
        <mySkelton :SkeletonProducts="SkeletonProducts" />
      </div>
  </div>

 
</template>

<script>
import mainTable from "@/components/mainTable.vue";
import filterserviceDialog from "@/components/Dialogs/servicesDialogs/filterDialog"
import addserviceDialog from "@/components/Dialogs/servicesDialogs/addservicesDialogs.vue"
import Skeleton from 'primevue/skeleton';
import axios from 'axios';
import mySkelton from "@/components/Skeleton.vue";



export default {
  
  components: {
    mainTable,
    filterserviceDialog,
    addserviceDialog,
    Skeleton,
    mySkelton,
  },
  data() {
    return {

      new_products : [],

      loader: false,

    };
  },
  created() {
    this.columns = [
        { field: 'id', header: this.$t('datatable.number') },
        { field: 'name', header: this.$t('datatable.servname') },
        { field: 'price', header: this.$t('datatable.price') },
        { field: 'category', header: this.$t('datatable.section') },
        { field: 'classification', header: this.$t('datatable.category') },
        { field: 'sessions_num', header: this.$t('datatable.number_sessions') },
        { field: 'is_installment', header: this.$t('datatable.installment') },
    ];

    this.SkeletonProducts = new Array(this.columns.length)
  },

  methods: {

  callback(){
    this.tableData()
  },

  // handle function of service filtering to get data from api and update the table :D
  async handleServiceFiltered(filteredData) {
    // Replace the existing data with the filtered data
    this.new_products = filteredData;
  },
    addDialog() {
        this.$refs.add_service_dialog.services_add_dialog = true;
    },

    filterDialog() {
        this.$refs.filter_service_dialog.services_filtering_dialog = true;
    },

   async tableData() {
     this.loader = true;
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };
      await axios.get(`provider/services`, config)
      .then((res) => {
        if (res.data.key == "success") {
          this.new_products = res.data.data.services;

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
