<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Update leader board</h4>
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
                    <label>Update score</label>
                    <div class="input-group" v-for="score in scores" :key="score.id">
                        <select class="form-select" :value="score.userID">
                            <option v-for="user in users" :key="user.id">
                                Name: {{user.name}}, Id: {{user.id}}
                            </option>
                        </select>
                        <input class="form-control w-50" :VALUE="score.score">
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
        name: "LeaderboardsUpdate",
        data: function () {
            return {
                leaderboards: "",
                leaderboardId: "",
                description: "",
                scores: "",
                name: "",
                users: []
            }
        }, methods: {
            async getLeaderboard() {
                await this.axios.get(`${process.env.VUE_APP_API_URL_LED}/v1/leaderboards/${this.leaderboardId}`, {
                    headers: {
                        apiToken: this.$store.state.apiToken,
                        "Access-Control-Allow-Origin": "*",
                        "content-type": 'application/json'
                    }
                }).then(response => {
                    this.description = response.data.description;
                    this.scores = response.data.scores;
                    this.name = response.data.name;
                });
            },
            async sendForm() {
                this.axios.put(`${process.env.VUE_APP_API_URL_LED}/v1/leaderboards/${this.leaderboardId}`, {
                    name: this.name,
                    description: this.description,
                    scores: this.scores
                })
            }
        }, async mounted() {
            this.axios.get(`${process.env.VUE_APP_API_URL_LED}/v1/leaderboards`, {
                headers: {
                    apiToken: this.$store.state.apiToken,
                    "Access-Control-Allow-Origin": "*",
                    "content-type": 'application/json'
                }
            })
                .then(response => {
                    this.leaderboards = response.data
                })
                .catch(reason => {
                    console.error(reason)
                    this.$toast.error("Napaka pri pridobivanju podatkov", {duration: 3000})
                });
            this.axios.get(`${process.env.VUE_APP_API_URL_USR}/v1/users`, {
                headers: {
                    apiToken: this.$store.state.apiToken,
                    "Access-Control-Allow-Origin": "*",
                    "content-type": 'application/json'
                }
            }).then(response => {
                this.users = response.data;
            })
        }
    }
</script>

<style scoped>

</style>