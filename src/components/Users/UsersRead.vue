<template>
    <div id="content">
        <ul v-if="user.length" id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in user"
                :key="item.id">
                <span><b>ID: </b>{{ item.id }}</span>
                <span><b>Name: </b>{{ item.name }}</span>
                <span><b>Surname: </b>{{ item.surname }}</span>
                <a><b>Email: </b> {{ item.email }}</a>
                <a><b>Birthday: </b>{{ readableString(item.birthDay) }}</a>
                <b-button class="btn-danger mt-2 w-25" @click="deleteUser(item.id)">Delete</b-button>
            </li>
        </ul>
        <div v-else>
            No data to show
        </div>
    </div>
</template>

<script>
export default {
    name: "UsersRead",
    data: function () {
        return {
            user: []
        }
    },
    methods: {
        readableString: function (s) {
            let date = new Date(s);
            return date.toDateString();
        },
        deleteUser(id) {
            this.axios.delete(`${process.env.VUE_APP_API_URL_USR}/v1/users/${id}`, {
                headers: {
                    apiToken: this.$store.state.apiToken,
                    "Access-Control-Allow-Origin": "*",
                    "content-type": 'application/json'
                }
            })
                .then((response) => {
                    console.log(response);
                    this.getUsers()
                    this.$toast.open("Uspešno izbrisan uporabnik")
                });
        },
        getUsers() {
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
                        this.user = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                    console.log(this.user)
                });
            });
        }
    },
    mounted() {
        this.getUsers()
    },
}
</script>

<style scoped>
#content {
    padding: 20px;
    overflow-y: auto;
}

#dataList {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: left;
}

#dataList > li {
    padding: 20px;
    margin-bottom: 5px;
    border-radius: 16px;
}

</style>