<template>
    <div id="content">
        <ul v-if="matchmaking.length" id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="match in matchmaking" :key="match.id">
                <span class="my-1"><b>Date: </b>{{new Date(match.date).toUTCString()}}</span>
                <span class="my-1"><b>Name: </b>{{match.name}}</span>
                <span class="my-1"><b>Steps: </b> {{ match.match.map(i => i.userId).join(', ') }}</span>
            </li>
        </ul>
        <div v-else>
            No data to show
        </div>
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
                headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": 'application/json',
                "apiToken": this.$store.state.apiToken
            }
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.matchmaking = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                });
            });

        }
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
    #dataList > li > ul{
        padding: 0;
    }
    #dataList > li > ul > li {
        list-style-type: none;
        padding: 10px;
    }
</style>