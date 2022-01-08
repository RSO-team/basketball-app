<template>
    <div id="content">
        <ul id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="match in matchmaking" :key="match.id">
                <p><b>Date: </b>{{new Date(match.date).toUTCString()}}</p>
                <p><b>Name: </b>{{match.name}}</p>
                <ul class="d-flex flex-row flex-wrap">
                    <p><b>Steps: </b></p>
                    <li v-for="tag in match.match" :key="(tag.description, tag.id)">
                        <p><b>User ID:</b>{{tag.userId}}</p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "MatchmakingRead",
        data: function () {
            return{
                matchmaking: ""
            }
        },methods:{
            readableString: function (s) {
                let date = new Date(s);
                return date.toDateString();
            }
        },
        mounted() {
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL_MCH}/v1/matchmaking`, {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.matchmaking = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                    console.log(this.exercises)
                });
            });

        }
    }
</script>

<style scoped>
    #content {
        padding: 20px;
        min-height: 80%;
        max-height: 90%;
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
    #dataList > li > ul{
        padding: 0;
    }
    #dataList > li > ul > li {
        list-style-type: none;
        padding: 10px;
    }
</style>