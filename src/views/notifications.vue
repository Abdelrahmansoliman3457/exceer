<template>
    <div class="container">
        <div class="main-text mb-4">
            <p class="main-title">{{ $t('Glopal.notifications') }}</p>
            <p class="main-disc">{{ $t('Glopal.here_see_the_notifications') }}</p>
        </div>
        <div class="layout-card">
            <!-- <button v-for="result in results" :key="result.id" class="sub-layout d-flex" @click.prevent="navigateToRoute(result)">
            <img :src="require('@/assets/images/notification-img.png')" alt="customer-img" class="customer-img">
            <p>{{ result.comment }}</p>
            <p>{{ result.number }}</p>
        </button> -->

            <div v-if="!loading">

                <div v-for="(result, index) in notifications" :key="result.index" class="main-notification">

                    <!--***** Route To Order Details *****-->
                    <div class="notification-layout sub-layout" v-if="result.data.reservation_id">
                        <router-link class="notif-route"
                            :to="{ name: 'orderDetails', params: { orderId: result.data.reservation_id } }">
                            <div class="hint-notif-img">
                                <img :src="require('@/assets/images/notification-img.png')" alt="customer-img"
                                    class="customer-img">
                                <p class="notif-num">!</p>
                            </div>
                            <p class="not-comment">{{ result.body }}</p>
                        </router-link>
                        <button class="delete-btn" @click="removenotifation(index)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>

                    <!--***** No Route *****-->
                    <div class="notification-layout sub-layout" v-else>
                        <div class="notif-route">
                            <div class="hint-notif-img">
                                <img :src="require('@/assets/images/notification-img.png')" alt="customer-img"
                                    class="customer-img">
                                <p class="notif-num">!</p>
                            </div>
                            <p class="not-comment">{{ result.body }}</p>
                        </div>
                        <button class="delete-btn" @click="removenotifation(index)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>

                </div>

                <p class="main-text text-center mb-0" v-if="notifications.length === 0"> {{ $t('Glopal.no_notifications') }}
                </p>

            </div>

            <!--***** Skeleton *****-->
            <div v-if="loading">
                <div class="notification-layout sub-layout" v-for="i in 5" :key="i">
                    <div class="notif-route">
                        <div class="hint-notif-img">
                            <skeleton width="40px" height="40px" />
                        </div>
                        <skeleton width="12rem" height=".7rem" />
                    </div>
                    <skeleton width="40px" height="40px" />
                </div>
            </div>

            <!--***** Paginator *****-->
            <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5" dir="ltr" />


        </div>
    </div>
</template>

<script>
import Paginator from 'primevue/paginator';
import axios from 'axios';
import Skeleton from 'primevue/skeleton';

export default {
    components: {
        Paginator,
        Skeleton,
    },
    data() {
        return {
            notifications: [],
            loading: false,
            currentPage: 1,
            pageLimit: null,
            totalPage: null,
        }
    },

    methods: {
        showSuccess(msg) {
            this.$toast.add({ severity: "success", detail: `${msg}`, life: 3000 });
        },
        showFail(error) {
            this.$toast.add({ severity: "error", detail: `${error}`, life: 3000 });
        },
        // Get notifications
        async getNotifications() {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
            this.loading = true;
            await axios.get(`provider/notifications?page=${this.currentPage}`, config).then(res => {
                if (res.data.key == "success") {
                    this.notifications = res.data.data.notifications.data;
                    this.totalPage = res.data.data.notifications.pagination.total_items;
                    this.pageLimit = res.data.data.notifications.pagination.per_page;
                }
                this.loading = false;
            }).catch(err => {
                console.error(err);
            });
        },

        // Paginate Function
        onPaginate(e) {
            this.loading = true;
            this.currentPage = e.page + 1;
            window.scrollTo(0, 0);
            this.getNotifications();
        },

        removenotifation(index) {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
            axios.delete(`provider/notifications/${this.notifications[index].id}`, config).then(res => {
                if (res.data.key == "success") {
                    this.notifications.splice(index, 1);
                    this.showSuccess(res.data.msg);
                } else {
                    this.showFail(res.data.msg);
                }
            })
        },
    },
    async mounted() {
        await this.getNotifications();
    }
}

</script>

<style lang="scss" scoped>
.notification-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.main-notification {
    &:not(:last-child) {
        margin-bottom: 23px;
    }
}

.notif-route {
    display: flex;
    align-items: center;
    gap: 25px;
    flex-grow: 1;
}

.sub-layout {
    padding: 15px;
}

.not-comment {
    font-size: 15px;
    color: #000;
}

.delete-btn {
    background: transparent;
    border: 1px solid #EB5757;
    border-radius: 4px;
    color: #EB5757;
    font-size: 15px;
    width: 40px;
    height: 40px;
    text-align: center;

    span, .pi-icon{
        margin-inline: auto;
    }
}
</style>