<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Create new notification</h4>
                <div class="form-group">
                    <label>From</label>
                    <input v-model="from" class="form-control" type="text">
                </div>
                <div class="form-group">
                    <label>To</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                            v-model="userId">
                        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} {{
                                user.surname
                            }}
                        </option>
                    </select>
                </div>
                <label>Content</label>
                <div class="form-group">
                    <textarea class="form-control" v-model="content" rows="3"></textarea>
                </div>
                <br>
                <button type="submit" class="btn btn-success">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationsCreate",
    data: function () {
        return {
            from: "Basketball APP",
            content: null,
            userId: null,
            users: []
        }
    },
    methods: {
        async sendForm() {
            if (this.userId && this.content) {
                fetch(`${process.env.VUE_APP_API_URL_NOT}/v1/notifications/${this.userId}`, {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "content-type": 'application/json',
                        "apiToken": this.$store.state.apiToken
                    },
                    body: JSON.stringify({
                        from: this.from,
                        to: this.to,
                        content: this.content,
                        userId: this.userId
                    })
                }).then((response) => {
                    console.log(response);
                    this.$toast.success("Successfully sent SMS notification")
                    this.userId = null;
                    this.content = null;
                });
            } else {
                this.$toast.error("Fill out whole form", { duration: 3000 })
            }
        }
    },
    mounted() {
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
                this.$toast.error("Napaka pri pridobivanju podatkov", {duration: 3000})
            })
    }
}
</script>

<style scoped>

</style>