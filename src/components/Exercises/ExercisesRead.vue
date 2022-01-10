<template>
    <div id="content">
        <ul v-if="exercises.length" id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in exercises" :key="item.id">
                <p><b>Description: </b>{{item.description}}</p>
                <p><b>Name: </b>{{item.name}}</p>
                <ul class="d-flex flex-column">
                    <p><b>Steps: </b></p>
                    <li v-for="tag in item.steps" :key="(tag.description, tag.id)">
                        <p><b>Name: </b>{{tag.name}}</p>
                        <p><b>Description: </b>{{tag.description}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <div v-else>
            No data to show
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExercisesRead",
        data: function () {
            return{
                exercises: []
            }
        },methods:{
            readableString: function (s) {
                let date = new Date(s);
                return date.toDateString();
            }
        },
        mounted() {
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL_XRC}/v1/exercises`, {
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
                        this.exercises = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                    console.log(this.exercises)
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