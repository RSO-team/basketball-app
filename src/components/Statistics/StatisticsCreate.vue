<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Create new statistic</h4>
                <label>User: </label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="userId" >
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} {{ user.surname }}</option>
                </select>
                <label>Category</label>
                <input class="form-control" type="text" v-model="category">
                <label> Value</label>
                <input  type="number" class="form-control" v-model="value" required>
                <br>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StatisticsCreate",
        data: function () {
            return{
                stat: [],
                users:[],
                userId: "",
                category:"",
                value: ""
            }
        },
        async mounted() {
            this.axios.get(`${process.env.VUE_APP_API_URL_USR}/v1/users`)
                .then(response => {
                    this.users = response.data;
                })
                .catch(reason => {
                    console.error(reason);
                    this.$toast.error("Napaka pri pridobivanju podatkov", { duration: 3000 });
                })
        },
        methods: {
            async sendForm() {
                this.axios.post(`${process.env.VUE_APP_API_URL_STT}/v1/stats`, {
                    userId: this.creatorId,
                    category: this.category,
                    value: this.value
                })
                .then((response) => {
                    console.log(response);
                    this.$router.push("/stats/read");
                });
        }
        }
    }
</script>

<style scoped>

</style>