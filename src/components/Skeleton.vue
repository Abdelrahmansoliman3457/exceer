<template>

    <div>
        <!-- <Skeleton width="100%" height="500px" class="mb-2" /> -->
    </div>
    

  <div class="main-table">
    <DataTable :value="SkeletonProducts">
      <!-- Header Row -->

      <!-- Body Columns -->
      <Column class="static_column" field="code" v-for="col in SkeletonProducts" :key="col" :header="$t('Auth.Loading')">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<style lang="scss">
    .static_column {
        .p-column-title {
            font-size: 13px;
        }
    }
    
    .p-column-header-content {
        justify-content: center;
    }
</style>

<script>

import Skeleton from 'primevue/skeleton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
export default {

  props: {
    SkeletonProducts: {
      type: Array,
      required: true,
    },
  },
    
    components: {
        Skeleton,
        DataTable,
        Column,
        
    },
    data() {

    }
}
</script>




