<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Update event</h4>
                <label>Select event</label>
                <select @change="getEvent" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="eventId">
                    <option v-for="event in events" :key="event.id">{{event.id}}</option>
                </select>
                <label>Creator ID : </label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="creatorId">
                    <option v-for="user in user" :key="user.id">{{user.id}}</option>
                </select>
                <label>Duration</label>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" v-model="duration" required>
                </div>
                <label>Event scope</label>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="eventScope">
                    <option>PUBLIC</option>
                    <option>PRIVATE</option>
                    <option>SHARED</option>
                </select>
                <label> Starts at</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'calendar']"></font-awesome-icon></span>
                    </div>
                    <input type="datetime-local" class="form-control" v-model="startsAt" required>
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
        name: "EventsUpdate",
        data: function () {
            return {
                creatorId: "",
                duration: "",
                eventScope: "",
                invitees: [],
                startsAt: "",
                user: "",
                events: "",
                eventId: ""
            }
        }, methods: {
            async sendForm() {

                fetch(`${process.env.VUE_APP_API_URL_EVN}/v1/events/${this.eventId}`, {
                    method: "PUT",
                    headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'},
                    body: JSON.stringify({
                        creatorId: this.creatorId,
                        duration: parseInt(this.duration),
                        eventScope: this.eventScope,
                        startsAt:new Date(this.startsAt).toJSON(),
                        invitees: this.invitees.map(value => {
                            return {userId: parseInt(value)};
                        })
                    })
                }).then(()=>{
                    this.$router.push("/events/read");
                });
            },
            async getEvent() {
                const utf8Decoder = new TextDecoder("utf-8");

                fetch(`${process.env.VUE_APP_API_URL_EVN}/v1/events/${this.eventId}`, {
                    method: "GET",
                    headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
                }).then((response) => {
                    const reader = response.body.getReader();
                    reader.read().then(({done, value}) => {
                        if (!done) {
                            let event = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                            this.creatorId = event.creatorId;
                            this.duration = event.duration;
                            this.eventScope = event.eventScope;
                            this.startsAt = this.getCorrectDate(new Date(event.startsAt));
                            this.invitees = event.invitees.map(value => {
                                return value.userId.toString();
                            });
                        }
                    });
                });
            },
            getCorrectDate(date) {
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDay() + 1 < 10 ? "0" + (date.getDay() + 1) : date.getDay() + 1;
                let hour = date.getHours() < 10 ? "0" + (date.getHours()) : date.getHours();
                let minute = date.getMinutes() < 10 ? "0" + (date.getMinutes()) : date.getMinutes();
                return year + "-" + month + "-" + day + "T" + hour + ":" + minute;
            },
        },
        mounted() {
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
            fetch(`${process.env.VUE_APP_API_URL_EVN}/v1/events`, {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.events = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                });
            });
        }
    }
</script>

<style scoped>

</style>