<template>
    <div class="d-flex justify-content-center align-content-center">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Create new match</h4>
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
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MatchmakingCreate",
        data: function () {
            return {
                date: "",
                name:"",
                match: [],
                user: []
            }
        },
        methods:{
            async sendForm() {
                await fetch(`${process.env.VUE_APP_API_URL_MCH}/v1/matchmaking`, {
                    method: "POST",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify({
                        name: this.name,
                        date: new Date(this.date).toJSON(),
                        match: this.match.map((value => {
                            return {userId: parseInt(value)}
                        }))
                    })
                }).then((response) => {
                    console.log(response);
                    this.$router.push("/matchmaking/read/");
                });
            }
        }
        ,mounted(){
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL_USR}/v1/users`, {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.user = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                });
            });
        }
    }
</script>

<style scoped>

</style>