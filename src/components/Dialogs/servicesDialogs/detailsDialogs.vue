<template>

    <!-- details dialog -->

    <Dialog v-model:visible="services_details" modal class="custum_dialog_width" :draggable="false">
        <div class="text-center" v-if="!loader">
            <p class="main-title mb-4"> {{ detailsData.detailsname }}</p>
            <img :src="detailsData.detailsimg" alt="service-image" class="service-img-dialog mb-4">
            
            <div class="main-text mb-4">
                <p class="main-title">{{ $t('Glopal.service_description') }}</p>
                <p class="main-disc">{{ detailsData.description }}</p>
            </div>

            <div class="main-text mb-4">
                <p class="main-title">{{ $t('Glopal.terms_service') }}</p>
                <p class="main-disc">{{ detailsData.conditions }}</p>
            </div>
        </div>


        <div class="d-flex justify-content-center align-items-center flex-column gap-2 mb-4 mt-4" v-if="loader">
            <Skeleton width="6rem" height="1rem" class="mb-3"></Skeleton>
            <Skeleton width="7rem" height="6rem" class="mb-3"></Skeleton>

            <Skeleton width="4rem" height="1rem" class="mb-3"></Skeleton>
            <Skeleton width="5rem" height="1rem" class="mb-3"></Skeleton>

            <Skeleton width="4rem" height="1rem" class="mb-3"></Skeleton>
            <Skeleton width="5rem" height="1rem" class="mb-3"></Skeleton>
        </div>

        
    </Dialog>




</template>

<script>
import Dialog from 'primevue/dialog';
import axios from 'axios';
import Skeleton from 'primevue/skeleton';

export default {
    props : {
        itemId: Number
    },
  components: {
    Dialog,
    Skeleton
  },
    data() {
        return {
            loader: false,
            services_details: false,
            detailsData: {
                detailsname: '',
                detailsimg: '',
                conditions: '',
                description: '',
            },
        }
  },

  methods: {
    async getdetails(detailsId) {
        this.loader = true;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        await axios.get(`provider/services/${detailsId}/show`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.loader = false;
              this.detailsData.detailsData = res.data.data;
              this.detailsData.detailsname = res.data.data.name.ar
              this.detailsData.description = res.data.data.description.ar
              this.detailsData.conditions = res.data.data.conditions.ar
              if(res.data.data.image) {
                this.detailsData.detailsimg = res.data.data.image
              }
          }
        })

        .catch((e) => {
            console.error(e);
        });
    },
  },

  updated() {
    this.getdetails(this.itemId);
  }
};
</script>
