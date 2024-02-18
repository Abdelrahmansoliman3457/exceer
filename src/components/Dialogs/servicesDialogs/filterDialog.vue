<template>
  <div>
    <Toast />
  </div>
    <!-- rating dialog -->

    <Dialog v-model:visible="services_filtering_dialog" modal class="custum_dialog_width" :draggable="false">
            <div class="main-text text-center">
              <p class="main-title"> {{$t('Glopal.filter')}} </p>
            </div>
            <p class="main-title mb-4"> {{$t('datatable.section')}} </p>

            <form ref="filterForm" @submit.prevent="submitData">
                <div class="row with-br-bottom mb-4">
                    <div class="col-12 col-md-6" v-for="item in categories" :key="item">
                        <div class="radios form-group">
                            <div class="d-flex gap-3">
                            <label class="custom-radio custom-check">
                                <input type="checkbox" name="opinion" :value="item.id" v-model="checkedIds" class="d-none">
                                <span class="mark">
                                    <i class="fas fa-check icon"></i>
                                </span>
                                <p class="hint">{{item.name}}</p>
                            </label>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="radios form-group">
                    <label  class="label"> {{$t('datatable.price')}} </label>
                    <div class="d-flex gap-3">
                    <label class="custom-radio">
                        <input type="radio" name="price" value="ASC" v-model="price" class="d-none">
                        <span class="mark"></span>
                        <p class="hint">{{$t('Glopal.highest_price')}}</p>
                    </label>

                    <!-- <label class="custom-radio">
                        <input type="radio" name="price" value="0" v-model="price" class="d-none">
                        <span class="mark"></span>
                        <p class="hint">{{$t('Glopal.lowest_price')}}</p>
                    </label> -->

                    </div>
                </div>

                <div class="radios form-group">
                    <label  class="label"> {{$t('datatable.installment')}} </label>
                    <div class="d-flex gap-3">
                    <label class="custom-radio">
                        <input type="radio" name="is_installment" value="1" class="d-none">
                        <span class="mark"></span>
                        <p class="hint">{{$t('Glopal.available')}}</p>
                    </label>
                    <label class="custom-radio">
                        <input type="radio" name="is_installment" value="0" class="d-none">
                        <span class="mark"></span>
                        <p class="hint">{{$t('Glopal.unavailable')}}</p>
                    </label>

                    </div>
                </div>


                <div class="section-btns">
                    <button type="submit" class="custom-btn sm ">
                        {{$t('Glopal.to_be_sure')}} 
                    <span
                        class="spinner-border spinner-border-sm custom-spinner"
                        v-if="loading"
                        role="status"
                        aria-hidden="true"
                    ></span> 
                    </button>

                    <button type="button" class="custom-btn cancel sm" @click="cancellation">{{$t('Glopal.cancellation')}}</button>
                </div>
            </form>

    </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import axios from 'axios';

export default {
  components: {
    Dialog
  },
    data() {
        return {
            services_filtering_dialog: false,
            loading: false,
            checkedIds: [],
            categories: [],
            price: null
        }
  },

  methods: {

    showSuccess(msg) {
      this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
    },
    showFail(error) {
      this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
    },

    cancellation() {
        this.services_filtering_dialog = false
        this.checkedIds = []
        this.price = null
        this.$refs.filterForm.reset()
    },

    async get_classifications() {
      await axios
        .get(`provider/show-all-categories`)
        .then((res) => {
          if (res.data.key == "success") {
            this.categories = res.data.data;
      
          } else {
            console.log("failed");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

    async submitData() {
      this.loading = true;
      
      const fd = new FormData(this.$refs.filterForm);
     const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };

      for (let i = 0; i < this.checkedIds.length; i++) {
        fd.append("category_ids[]", this.checkedIds[i]);
      }

      await axios
        .post(`provider/services/filter`, fd, config)
        .then((res) => {
          if (res.data.key == "success") {
            this.showSuccess(res.data.msg);
            this.services_filtering_dialog = false;
            const sortedServices = res.data.data.services.sort((a, b) => b.price - a.price);
            this.$emit('servicefiltered', sortedServices);
            this.checkedIds = [];
            this.price = null;
            this.$refs.filterForm.reset()
          } else {
            this.showFail(res.data.msg);
          }

          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

  },

 async mounted() {
    await this.get_classifications();

  }


};
</script>