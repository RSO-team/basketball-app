<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Delete new statistic</h4>
                <label>Select statistic id</label>
                <select class="form-select" v-model="statId" required @select="getStat">
                    <option v-for="stat in stats" :key="stat.id"> {{stat.id}}</option>
                </select>
                <label>User: </label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="userId" disabled>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} {{ user.surname }}</option>
                </select>
                <label>Category</label>
                <input class="form-control" type="text" v-model="category" readonly>
                <label> Value</label>
                <input  type="number" class="form-control" v-model="value" readonly>
                <br>
                <button type="submit" class="btn btn-danger">Delete</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StatisticsDelete",
        data: function () {
            return{
                userId: "",
                category: "",
                value: "",
                stats:[],
                statId:""
            }
        },
        methods:{
            async getStat(){
                this.axios.delete(`${process.env.VUE_APP_API_URL_STT}/v1/stats/`+this.statId, {
                    headers: {
                        apiToken: this.$store.state.apiToken,
                        "Access-Control-Allow-Origin": "*",
                        "content-type": 'application/json'
                    }
                }).
                    then(response =>{
                    console.error(response);
                    this.$toast.success("Izbrisano", {duration:2000});
                }).catch(reason => {
                    console.error(reason);
                    this.$toast.error("Napaka pri pridobivanju podatkov", { duration: 3000 })
                })
            }
        },
        async mounted() {
            this.axios.get(`${process.env.VUE_APP_API_URL_STT}/v1/stats`, {
                headers: {
                    apiToken: this.$store.state.apiToken,
                    "Access-Control-Allow-Origin": "*",
                    "content-type": 'application/json'
                }
            })
                .then(response => {
                    this.stats = response.data;
                })
                .catch(reason => {
                    console.error(reason);
                    this.$toast.error("Napaka pri pridobivanju podatkov", { duration: 3000 })
                })
        }
    }
</script>

<style scoped>

</style>