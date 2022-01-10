<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Delete user</h4>
                <label>Select id</label>
                <select @change="getUser" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="id">
                    <option v-for="id in allIds" :key="id.id">
                        {{id.id}}
                    </option>
                </select>
                <label>Name</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon></span>
                    </div>
                    <input type="text" class="form-control" v-model="name" required readonly>
                </div>
                <label>Surname</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon></span>
                    </div>
                    <input type="text" class="form-control" v-model="surname" required readonly>
                </div>
                <label> Email</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon></span>
                    </div>
                    <input type="email" class="form-control" v-model="email" required readonly>
                </div>
                <label>Birthday</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'calendar']"></font-awesome-icon></span>
                    </div>
                    <input type="date" class="form-control" v-model="birthDay" readonly>
                </div>
                <button type="submit" class="btn btn-danger" >Delete</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UsersDelete",
        data: function () {
            return {
                name: "",
                surname: "",
                email: "",
                birthDay: "",
                allIds: [],
                id: null
            }
        },
        methods: {
            async getUser() {
                const utf8Decoder = new TextDecoder("utf-8");

                await fetch(`${process.env.VUE_APP_API_URL_USR}/v1/users/${this.id}`, {
                    method: "GET",
                    headers: {
                 "Access-Control-Allow-Origin": "*",
                 "content-type": 'application/json',
                 "apiToken": this.$store.state.apiToken
             },
                }).then(response => {
                    const reader = response.body.getReader();
                    reader.read().then(({done, value}) => {
                        if (!done) {
                            let user = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                            this.name = user.name;
                            this.surname = user.surname;
                            this.email = user.email;
                            let bday = new Date(user.birthDay);
                            this.birthDay = this.getCorrectDate(bday);
                        }
                    });
                })
            },
            getCorrectDate(date){
                let year = date.getFullYear();
                let month = date.getMonth()+1 < 10  ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                let day = date.getDay()+1 < 10  ? "0"+(date.getDay()+1) : date.getDay()+1;
                return year + "-" + month +"-"+day;
            },
            async sendForm() {
                await fetch(`${process.env.VUE_APP_API_URL_USR}/v1/users/${this.id}`, {
                    method: "DELETE",
                    headers: {
                 "Access-Control-Allow-Origin": "*",
                 "content-type": 'application/json',
                 "apiToken": this.$store.state.apiToken
             },
                }).then((response) => {
                    console.log(response);
                    this.$router.push("/users/read/");
                });
            }
        },
        mounted() {
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL_USR}/v1/users`, {
                method: "GET",
                headers: {
                 "Access-Control-Allow-Origin": "*",
                 "content-type": 'application/json',
                 "apiToken": this.$store.state.apiToken
             },
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.allIds = JSON.parse(utf8Decoder.decode(value, {stream: true})).map((value) => {
                            return {id: value.id}
                        });
                    console.log(this.allIds)
                });
            })
        }
    }
</script>

<style scoped>

</style>