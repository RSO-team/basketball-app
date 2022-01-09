<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Create new leader board</h4>
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
                    <div class="input-group">
                        <select class="form-select" style="width: 40%" v-model="userId">
                            <option v-for="user in users" :key="user.id" :value="user.userId">
                                {{user.name}}
                            </option>
                        </select>
                        <input class="form-control w-50" v-model="score">
                        <div class="input-group-append">
                            <button type="button" @click="this.addTag" class="btn">
                                <font-awesome-icon :icon="['fas','plus']"></font-awesome-icon>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Scores</label>
                    <textarea class="form-control" readonly rows="3" ref="tags"> </textarea>
                </div>
                <br>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LeaderboardsCreate",
        data: function () {
            return {
                name: "",
                description: "",
                score: "",
                scores:[],
                users: [{name: "Mark", userId: 5}],
                userId: ""
            }
        },
        methods: {
            addTag: function () {
                if (this.$refs.tags.value > 0){
                    this.$refs.tags.value += ","+ JSON.stringify( {userId:this.userId,score:  this.score });
                }else{
                    this.$refs.tags.value += JSON.stringify( {userId:this.userId,score:  this.score });
                }

                this.scores.push({userId:this.userId,score:  this.score });
                this.score = "";
                this.userId = "";
            },
            async sendForm() {

                const res = this.axios.post(`${process.env.VUE_APP_API_URL_LED}/v1/leaderboard`, {
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify({
                        name: this.name,
                        description: this.description,
                        scores: this.scores,
                    })
                }).then((response) => {
                    console.log(response);
                    this.$router.push("/videos/read/");
                });
                console.log(res);
            }
        },
        async mounted() {
            this.axios.get(`${process.env.VUE_APP_API_URL_USR}/v1/users`)
                .then(response => {
                    this.users = response.data
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