<template>
    <div>
        <p>My profile page</p>
        <button @click="$router.push({name: 'Home'})">go to home</button>
        <p>Name is :{{$route.params.userName}}</p>
        <hr>
        <ul>
            <li>
                <router-link :to="{name: ''}">My Learnings

                </router-link>
            </li>
            <li>
                <router-link :to="{name: ''}">My wishlist</router-link>
            </li>
        </ul>
        <hr>

        <div class="container">
            <router-view/>
        </div>










        <!-- <p>id is: {{$route.params.userId}}</p>
        <hr>
        <p> gender is:{{ this.$route.query.gender }}</p>
        <p>age is :{{ this.$route.query.age }}</p> -->


    </div>
</template>

<script>


export default {
    mounted() {
        console.log(this.$route.params.userId)
        console.log(this.$route)
    }
}
</script>

<style scoped>
    ul {
        display: flex;
        justify-content: center;
        gap: 20px;
        list-style: none;
    }
</style>