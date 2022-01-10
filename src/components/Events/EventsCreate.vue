<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Create new event</h4>
                <label>Creator ID : </label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="creatorId" >
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} {{ user.surname }}</option>
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
                    <option v-for="user in users" :key="user.id" :value="user">{{ user.name }} {{ user.surname }}</option>
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
                creatorId: null,
                duration: 0,
                eventScope: 'PUBLIC',
                invitees: [],
                startsAt: new Date(),
                users : []
            }
        },
        methods:{
            async sendForm() {
                this.axios.post(`${process.env.VUE_APP_API_URL_EVN}/v1/events`, {
                    creatorId: this.creatorId,
                    duration: this.duration,
                    eventScope: this.eventScope,
                    startsAt: new Date(this.startsAt).toJSON(),
                    invitees: this.invitees.map(i => {
                        return {
                            userId: i.id,
                            name: i.name + " " + i.surname
                        }
                    })
                }, {
                    headers: {
                        apiToken: this.$store.state.apiToken,
                        "Access-Control-Allow-Origin": "*",
                        "content-type": 'application/json'
                    }
                })
                    .then((response) => {
                        console.log(response);
                        this.$router.push("/events");
                    });
            }
        },
        async mounted(){
            this.axios.get(`${process.env.VUE_APP_API_URL_USR}/v1/users`, {
                headers: {
                    apiToken: this.$store.state.apiToken,
                    "Access-Control-Allow-Origin": "*",
                    "content-type": 'application/json'
                }
            })
                .then(response => {
                    this.users = response.data
                })
                .catch(reason => {
                    console.error(reason)
                    this.$toast.error("Napaka pri pridobivanju podatkov", { duration: 3000 })
                })
        }
    }
</script>

<style scoped>

</style>