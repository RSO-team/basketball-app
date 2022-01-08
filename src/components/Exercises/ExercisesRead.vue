<template>
    <div id="content">
        <ul id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in exercises" :key="item.id">
                <p><b>Description: </b>{{item.description}}</p>
                <p><b>Name: </b>{{item.name}}</p>
                <ul class="d-flex flex-column">
                    <p><b>Steps: </b></p>
                    <li v-for="tag in item.steps" :key="(tag.description, tag.id)">
                        <p><b>Name:</b>{{tag.name}}</p>
                        <p><b>Description:</b>{{tag.description}}</p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "ExercisesRead",
        data: function () {
            return{
                exercises: ""
            }
        },methods:{
            readableString: function (s) {
                let date = new Date(s);
                return date.toDateString();
            }
        },
        mounted() {
            const utf8Decoder = new TextDecoder("utf-8");
            fetch("http://20.72.149.70/exercises/v1/exercises", {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
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