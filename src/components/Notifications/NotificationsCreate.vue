<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Create new notification</h4>
                <div class="form-group">
                    <label>From</label>
                    <input v-model="from" class="form-control" type="number">
                </div>
                <div class="form-group">
                    <label>To</label>
                    <div class="input-group">
                        <input v-model="to" class="form-control" type="number">
                    </div>
                </div>

                <label>Content</label>
                <div class="form-group">
                    <textarea class="form-control" v-model="content" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>User ID:</label>
                    <div class="input-group">
                        <input v-model="userId" class="form-control" type="text">
                    </div>
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
                from: "",
                to: "",
                content: "",
                userId: "",
                users: []
            }
        },
        methods: {
            async sendForm() {
                if(this.userId===""){
                    fetch(`${process.env.VUE_APP_API_URL_NOT}/v1/notifications`, {
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
                        })
                    }).then((response) => {
                        console.log(response);
                        //this.$router.push("/exercises/read");
                    });
                }else{
                    console.log("hello");
                }
            }
        },mounted(){
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL_USR}/v1/users`, {
                method: "GET",
                headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": 'application/json',
                "apiToken": this.$store.state.apiToken
            }
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.users = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                });
            });
        }
    }
</script>

<style scoped>

</style>