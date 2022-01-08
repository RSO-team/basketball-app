<template>
    <div id="content">
        <ul id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in user" :key="item.id">
                <p><b>Name: </b>{{item.name}}</p>
                <p><b>Surname: </b>{{item.surname}}</p>
                <a><b>Email:</b> {{item.email}}</a>
                <a><b>Birthday:</b>{{readableString(item.birthDay)}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "UsersRead",
        data: function () {
            return {
                user: null
            }
        },
        methods:{
          readableString: function (s) {
              let date = new Date(s);
              return date.toDateString();
          }
        },
        mounted() {
            const utf8Decoder = new TextDecoder("utf-8");
            fetch("http://20.72.149.70/users/v1/users", {
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

        },
    }
</script>

<style scoped>
    #content {
        padding: 20px;
        min-height: 80%;
        max-height: 80%;
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