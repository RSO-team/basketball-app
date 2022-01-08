<template>
    <div class="d-flex justify-content-center align-content-center">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Create new event</h4>
                <label>Creator ID : </label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="creatorId" >
                    <option v-for="user in user" :key="user.id">{{user.id}}</option>
                </select>
                <label>Duration</label>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" v-model="duration" required>
                </div>
                <label>Event scope</label>
                <select  class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="eventScope">
                   <option>PUBLIC</option>
                   <option>PRIVATE</option>
                   <option>SHARED</option>
                </select>
                <label> Starts at</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'calendar']"></font-awesome-icon></span>
                    </div>
                    <input  type="datetime-local" class="form-control" v-model="startsAt" required>
                </div>
                <label>Invitees</label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="invitees" multiple>
                    <option v-for="user in user" :key="user.id">{{user.id}}</option>
                </select>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EventsCreate",
        data: function () {
            return {
                creatorId: "",
                duration:"",
                eventScope: "",
                invitees: [],
                startsAt:"",
                user : ""
            }
        },
        methods:{
            async sendForm() {
                console.log();
                await fetch(`${process.env.VUE_APP_API_URL}/events/v1/events`, {
                    method: "POST",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify({
                        creatorId: this.creatorId,
                        duration: this.duration,
                        eventScope: this.eventScope,
                        startsAt: new Date(this.startsAt).toJSON(),
                        invitees: this.invitees.map((value => {
                            return {id: parseInt(value)}
                        }))
                    })
                }).then((response) => {
                    console.log(response);
                    this.$router.push("/events/read/");
                });
            }
        }
        ,mounted(){
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL}/users/v1/users`, {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.user = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                    console.log(this.user)
                });
            });
        }
    }
</script>

<style scoped>

</style>