<template>

    <!-- delete dialog -->

    <Dialog v-model:visible="services_delete_dialog" modal class="custum_dialog_width" :draggable="false">
        <div class="text-center">
            <p class="main-title"> {{ $t('Glopal.do_you_want_delete_service') }} </p>
            <img :src="require('@/assets/images/delete_service-img.png')" alt="delete_service-img" class="img-done">
            <div class="section-btns">
              <button class="custom-btn sm red-bg" @click="successfullydeleteDialog">
                 {{$t('Glopal.yes')}} 
                    <span
                        class="spinner-border spinner-border-sm custom-spinner"
                        v-if="loading"
                        role="status"
                        aria-hidden="true"
                    ></span> 
                 </button>
              <button class="custom-btn sm" @click="canceldeleteDialog">{{$t('Glopal.no')}}</button>
            </div>
        </div>
    </Dialog>


    <Dialog v-model:visible="services_successfully_deleting_dialog" modal class="custum_dialog_width noclose" :draggable="false">
        <div class="text-center">
            <p class="main-title"> {{ $t('Glopal.service_deleted_successfully') }} </p>
            <img :src="require('@/assets/images/delete_service-img.png')" alt="delete_service-img" class="img-done">
        </div>
    </Dialog>

</template>

<script>
import Dialog from 'primevue/dialog';
import axios from 'axios';

export default {
  props : {
    itemId: Number
  },
  components: {
    Dialog
  },
    data() {
        return {
            loading: false,
            services_delete_dialog: false,
            services_successfully_deleting_dialog: false
        }
  },

  methods:{

   async successfullydeleteDialog() {
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };
    this.loading = true;
      await axios
        .delete(`provider/services/${this.itemId}`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.loading = false
            this.$emit("serviceDeleted", this.itemId);
            this.services_delete_dialog = false;
            this.services_successfully_deleting_dialog = true;
            setTimeout(() => {
              this.services_successfully_deleting_dialog = false;
            }, 1200);
          } else {
            console.log("failed");

          }
        })
        .catch((e) => {
          console.error(e);
        });
  },

    canceldeleteDialog() {
      this.services_delete_dialog = false
    }

  },

  // updated() {
  //   console.log(this.itemId, "this.itemId000");
  // }


};
</script>
