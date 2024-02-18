<template>
    <div v-if="!loader">
        <mainTable
        :products="new_products"
        :columns="columns"
        :rows="8"
        :filters="filters"
        :showSearch="false"
        :DropDownserviceDialog="false"
        :sortable="true"
        :showOrderId="true" />
    </div>

    <div v-if="loader">
        <mySkelton :SkeletonProducts="SkeletonProducts" />
    </div>
    
</template>

<script>

// import plugin component

import mainTable from "@/components/mainTable.vue";
import Skeleton from 'primevue/skeleton';
import axios from 'axios';
import mySkelton from "@/components/Skeleton.vue";
export default {
    components: {
        mainTable,
        Skeleton,
        mySkelton,
    },

    data() {
        return {
            loader: false,
            new_products: [],
        };
    },

    methods: {
        async tableData() {
        this.loader = true;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        await axios.get(`provider/reservation/finished`, config)
        .then((res) => {
            if (res.data.key == "success") {
            this.new_products = res.data.data.data;
                
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

    created() {
        
        this.columns = [
            { field: 'id', header: this.$t('datatable.number') },
            { field: 'invoice_number', header: this.$t('orders.order_number') },
            { field: 'owner_name', header: this.$t('orders.order_owner') },
            { field: 'price', header: this.$t('orders.order_value') },
            { field: 'booking_value', header: this.$t('orders.Booking_application_commission') },
            { field: 'tax_value', header: this.$t('orders.value_Added') },
            { field: 'total', header: this.$t('orders.total') },
            { field: 'created_at', header: this.$t('orders.the_date') },
        ];

        this.SkeletonProducts = new Array(this.columns.length)
    },

    computed: {
        // Generate the product route link
        generateProductLink() {
            return (orderId) => {
                return { name: 'orderDetails', params: { orderId } };
            };
        },
    },

    async mounted() {
        await this.tableData();
    },

}
</script>

<style lang="scss">

.main-table {
   border: 1px solid #dddddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.10);
    border-radius: 10px;
    overflow: hidden;
}

.p-datatable .p-datatable-thead > tr > th {
    background-color: #00A19A;
    color: #fff;
}

.my-table {
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

