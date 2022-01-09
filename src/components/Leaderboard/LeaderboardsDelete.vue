<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Delete leader board</h4>
                <label>Select leader board</label>
                <select class="form-select" v-model="leaderboardId" @change="getLeaderboard">
                    <option v-for="leaderboard in leaderboards" :key="leaderboard.id" :value="leaderboard.id">
                        {{leaderboard.name}}
                    </option>
                </select>
                <div class="form-group">
                    <label>Name</label>
                    <input v-model="name" class="form-control">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <div class="input-group">
                        <textarea type="text" v-model="description" class="form-control" rows="2"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label>Add score</label>
                    <div class="input-group" v-for="score in leaderboard.scores" :key="score.id">
                        <input :value="score.userId" class="form-control w-50">
                        <input class="form-control w-50"  :VALUE="score.score">
                    </div>

                </div>
                <br>
                <button type="submit" class="btn btn-danger">Delete</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LeaderboardsDelete",
        data:function () {
            return{
                leaderboards:"",
                leaderboardId:"",
                leaderboard:""
            }
        },methods:{
            async getLeaderboard(){
                await this.axios.get(`${process.env.VUE_APP_API_URL_LED}/v1/leaderboards/${this.leaderboardId}`).then(response=>{
                    this.leaderboard = response.data;
                });
            },
            async sendForm(){
                await this.axios.delete(`${process.env.VUE_APP_API_URL_LED}/v1/leaderboards/${this.leaderboardId}`)
            }
        },async mounted() {
            this.axios.get(`${process.env.VUE_APP_API_URL_LED}/v1/leaderboards`)
                .then(response => {
                    this.leaderboards = response.data
                })
                .catch(reason => {
                    console.error(reason)
                    this.$toast.error("Napaka pri pridobivanju podatkov", {duration: 3000})
                })
        }
    }
</script>

<style scoped>

</style>