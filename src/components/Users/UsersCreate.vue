<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Create new user</h4>
                <label>Name</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon></span>
                    </div>
                    <input type="text" class="form-control" v-model="name" required>
                </div>
                <label>Surname</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon></span>
                    </div>
                    <input type="text" class="form-control" v-model="surname" required>
                </div>
                <label> Email</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'envelope']"></font-awesome-icon></span>
                    </div>
                    <input type="email" class="form-control" v-model="email" required>
                </div>
                <label>Birthday</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'calendar']"></font-awesome-icon></span>
                    </div>
                    <input type="date" class="form-control" v-model="birthDay" required>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UsersCreate",
        data: function(){
            return{
                name: "",
                surname: "",
                email: "",
                birthDay: ""
            }
        },
        methods: {
            async sendForm() {
                console.log();
                 await fetch(`${process.env.VUE_APP_API_URL_USR}/v1/users`, {
                    method: "POST",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify({
                        name: this.name,
                        surname: this.surname,
                        email: this.email,
                        birthDay: new Date(this.birthDay).toJSON()
                    })
                }).then((response) => {
                    console.log(response);
                    this.$router.push("/users/read/");
                });
            }
        }
    }
</script>

<style scoped>

</style>