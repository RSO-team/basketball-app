<template>
    <div id="content">
        <ul id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in stats" :key="item.id">
                <p><b>ID: </b>{{item.id}}</p>
                <p><b>User ID: </b>{{item.userId}}</p>
                <p><b>value: </b>{{item.value}} {{item.category}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "StatisticsRead",
        data: function () {
            return{
                stats: []
            }
        },
        async mounted() {
            this.axios.get(`${process.env.VUE_APP_API_URL_STT}/v1/stats`)
                .then(response => {
                    this.stats = response.data
                })
                .catch(reason => {
                    console.error(reason)
                    this.$toast.error("Napaka pri pridobivanju podatkov", { duration: 3000 })
                })
        }
    }
</script>

<style scoped>

</style>

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