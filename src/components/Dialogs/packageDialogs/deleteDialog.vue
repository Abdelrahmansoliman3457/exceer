<template>

    <!-- delete dialog -->

    <Dialog v-model:visible="package_delete_dialog" modal class="custum_dialog_width" :draggable="false">
        <div class="text-center">
            <p class="main-title"> {{ $t('Glopal.want_delete_package') }} </p>
            <img :src="require('@/assets/images/delete_service-img.png')" alt="delete_service-img" class="img-done">
            <div class="section-btns">
              <button class="custom-btn sm red-bg" @click="successfullydeleteDialog"> {{$t('Glopal.yes')}} </button>
              <button class="custom-btn sm" @click="canceldeleteDialog">{{$t('Glopal.no')}}</button>
            </div>
        </div>
    </Dialog>


    <Dialog v-model:visible="services_successfully_deleting_dialog" modal class="custum_dialog_width noclose" :draggable="false">
        <div class="text-center">
            <p class="main-title"> {{ $t('Glopal.package_deleted_successfully') }} </p>
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
            package_delete_dialog: false,
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
          .delete(`provider/packages/${this.itemId}`, config)
          .then((res) => {
            if (res.data.key == "success") {
              this.$emit("packageDeleted", this.itemId);
              this.package_delete_dialog = false;
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
      this.package_delete_dialog = false
    }

  },

  // updated() {
  //   console.log(this.itemId, "this.itemId000");
  // }

};
</script>
