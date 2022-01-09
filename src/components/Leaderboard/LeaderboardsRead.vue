<template>
    <div id="content">
        <ul id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in stats" :key="item.id">
                <p><b>ID: </b>{{item.id}}</p>
                <p><b>Name: </b>{{item.name}}</p>
                <p><b>Description: </b>{{item.description}}</p>
                <div v-for="score in item.scores" :key="score.id">
                    <p><b>ID: </b> {{score.id}}</p>
                    <p><b>User ID: </b> {{score.userId}}</p>
                    <p><b>Score: </b> {{score.score}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "LeaderboardsRead",
        data: function () {
            return {
                leaderboard: []
            }
        },
        async mounted() {
            this.axios.get(`${process.env.VUE_APP_API_URL_STT}/v1/stats`)
                .then(response => {
                    this.leaderboard = response.data
                })
                .catch(reason => {
                    console.error(reason)
                    this.$toast.error("Napaka pri pridobivanju podatkov", {duration: 3000})
                })
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

    #dataList > li > ul {
        padding: 0;
    }

    #dataList > li > ul > li {
        list-style-type: none;
        padding: 10px;
    }
</style>