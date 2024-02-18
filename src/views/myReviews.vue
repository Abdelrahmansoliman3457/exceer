<template>
    <div class="container">
        <div class="main-text">
            <p class="main-title">{{ $t('Sidebar.my_reviews') }}</p>
            <p class="main-disc">{{ $t('Glopal.customer_reviews_presented') }}</p>
        </div>

        <div class="layout-card mt-4 mb-4" v-if="!loading">

            <p class="rate-num text-center">{{ avg_rate }}</p>

            <div class="rate-state m-0">
                <div class="clinic_evaluation">
                    <star-rating
                        :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]"
                        :show-rating="false" :increment="0.5" active-color="#FFB300" :star-size="20" :read-only="true"
                        :animate="true" :rounded-corners="true" :rtl="false" :rating="avg_rate"
                        :border-width="2"></star-rating>
                </div>
            </div>

            <div class="rate-text">
                <p>({{ rates_count }})</p>
                <p> {{ $t('Glopal.rating') }} </p>
            </div>

            <div v-for="review in rates" :key="review.id" class="sec-reviews">
                <img :src="review.user.image" alt="customer-img" class="customer-img">
                <div class="info">
                    <p class="title">{{ review.user.name }}</p>
                    <div class="hint-info">
                        <i class="far fa-clock clock"></i>
                        <span class="hint-text">{{ review.created_at }}</span>
                        <div class="rev-icon sm-icon position-relative">
                            <star-rating :show-rating="false" :increment="0.5" :rating="review.rate" :star-size="20"
                                :read-only="true" :animate="true" :rtl="false"></star-rating>
                        </div>
                    </div>
                    <p class="disc">{{ review.message }}</p>
                </div>
            </div>

        </div>

        <div class="layout-card mt-4 mb-4" v-if="loading">

            <skeleton width="5rem" height=".7rem" class="mx-auto" />

            <div class="rate-state my-2">
                <div class="clinic_evaluation gap-2">
                    <skeleton width="1.5rem" v-for="i in 5" :key="i" class="mx-auto" />
                </div>
            </div>

            <div class="rate-text">
                <skeleton width="5rem" height=".7rem" class="mx-auto" />
            </div>

            <div v-for="i in 4" :key="i" class="sec-reviews align-items-center">
                <skeleton shape="circle" size="5rem" class="customer-img" />
                <div class="info">
                    <skeleton width="5rem" height=".7rem" class="mb-4" />
                    <div class="hint-info gap-3">
                        <skeleton width="7rem" height=".7rem" class="mx-auto" />
                        <skeleton width="5rem" height=".7rem" class="mx-auto" />
                    </div>
                </div>
            </div>

            <!-- <div class="paginate-parent">
                <Paginator :rows="10" :totalRecords="120"></Paginator>
            </div> -->
        </div>
    </div>
</template>

<script>

import StarRating from 'vue-star-rating';
import Paginator from 'primevue/paginator';
import axios from 'axios';
import Skeleton from 'primevue/skeleton';

export default {
    components: {
        StarRating,
        Paginator,
        Skeleton,
    },
    data() {
        return {
            rates: [],
            avg_rate: 0,
            rates_count: 0,
            loading: false
        };
    },
    methods: {
        async getRate() {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
            this.loading = true;
            await axios
                .get(`provider/rates`, config)
                .then((res) => {
                    if (res.data.key == "success") {
                        this.avg_rate = res.data.data.data.avg_rate;
                        this.rates_count = res.data.data.data.rates_count;
                        this.rates = res.data.data.rates;
                    } else {
                        console.log("failed");
                    }
                    this.loading = false;
                })
                .catch((e) => {
                    console.error(e);
                });
        },
    },
    async mounted() {
        await this.getRate();
    }
}
</script>

<style lang="scss">
.vue-star-rating {
    gap: 5px;
    flex-direction: row-reverse;
}

.p-paginator-page-options,
.p-paginator-page-input {
    display: none;
}
</style>


