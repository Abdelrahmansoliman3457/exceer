<template>
  <!-- delete dialog -->

  <Dialog
    v-model:visible="delete_user"
    modal
    class="custum_dialog_width"
    :draggable="false"
  >
    <div class="text-center">
      <p class="main-title">
        {{ $t("Glopal.do_you_want_to_delete_the_user") }}
      </p>
      <img
        :src="require('@/assets/images/delete_service-img.png')"
        alt="delete_service-img"
        class="img-done"
      />
      <div class="section-btns">
        <button class="custom-btn sm red-bg" @click="successfullydeleteDialog">
          {{ $t("Glopal.yes") }}
          <span
            class="spinner-border spinner-border-sm custom-spinner"
            v-if="loading"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
        <button class="custom-btn sm" @click="canceldeleteDialog">
          {{ $t("Glopal.no") }}
        </button>
      </div>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="successfully_deleting_user"
    modal
    class="custum_dialog_width noclose"
    :draggable="false"
  >
    <div class="text-center">
      <p class="main-title">
        {{ $t("Glopal.The_user_has_been_deleted_successfully") }}
      </p>
      <img
        :src="require('@/assets/images/delete_service-img.png')"
        alt="delete_service-img"
        class="img-done"
      />
    </div>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import axios from "axios";

export default {
  props: {
    itemId: Number,
  },
  components: {
    Dialog,
  },
  data() {
    return {
      delete_user: false,
      successfully_deleting_user: false,
      loading: false,
    };
  },

  methods: {
    async successfullydeleteDialog() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      this.loading = true;
      await axios
        .delete(`provider/abilities/${this.itemId}`, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.$emit("userDeleted", this.itemId);

            this.delete_user = false;
            this.successfully_deleting_user = true;
            setTimeout(() => {
              this.successfully_deleting_user = false;
            }, 1200);
          } else {
            console.log("failed");
          }

          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    canceldeleteDialog() {
      this.delete_user = false;
    },
  },
};
</script>
