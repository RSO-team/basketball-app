<template>
    <div class="d-flex justify-content-center align-content-center">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Delete match</h4>
                <select @change="getMatch" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="matchId">
                    <option v-for="event in matchIds" :key="event.id">{{event.id}}</option>
                </select>
                <label>Name</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="name" required>
                </div>
                <label>Date</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'calendar']"></font-awesome-icon></span>
                    </div>
                    <input  type="datetime-local" class="form-control" v-model="date" required>
                </div>
                <label>Match</label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="match" multiple>
                    <option v-for="user in user" :key="user.id">{{user.id}}</option>
                </select>
                <button type="submit" class="btn btn-danger">Delete</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MatchmakingDelete",
        data: function () {
            return {
                date: "",
                name:"",
                matchIds: [],
                match:[],
                user: [],
                matchId: ""
            }
        },
        methods:{
            getCorrectDate(date) {
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDay() + 1 < 10 ? "0" + (date.getDay() + 1) : date.getDay() + 1;
                let hour = date.getHours() < 10 ? "0" + (date.getHours()) : date.getHours();
                let minute = date.getMinutes() < 10 ? "0" + (date.getMinutes()) : date.getMinutes();
                return year + "-" + month + "-" + day + "T" + hour + ":" + minute;
            },
            async getMatch(){
                const utf8Decoder = new TextDecoder("utf-8");
                await fetch('http://20.72.149.70/matchmaking/v1/matchmaking/'+this.matchId, {
                    method: "GET",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                }).then((response) => {
                    const reader = response.body.getReader();
                    reader.read().then(({done, value}) => {
                        if (!done){
                            let match = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                            this.name = match.name;
                            this.date = this.getCorrectDate(new Date(match.date));
                            this.match = match.match.map(value=>{
                                return value.userId.toString()
                            })
                        }

                    });
                });
            },
            async sendForm() {
                await fetch('http://20.72.149.70/matchmaking/v1/matchmaking/'+this.matchId, {
                    method: "DELETE",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'}
                })
            }
        }
        ,mounted(){
            const utf8Decoder = new TextDecoder("utf-8");
            fetch("http://20.72.149.70/users/v1/users", {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.user = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                });
            });
            fetch("http://20.72.149.70/matchmaking/v1/matchmaking", {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.matchIds = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                });
            });
        }
    }
</script>

<style scoped>

</style>