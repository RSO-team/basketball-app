<template>
    <div id="content">
        <ul id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in activities" :key="item.id">
                <p><b>Name: </b>{{item.name}}</p>
                <p><b>Experience: </b>{{item.experience}}</p>
                <a><b>User ID:</b> {{item.userId}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "ActivityTrackingRead",
        data: function () {
            return{
                activities: ""
            }
        },mounted(){
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL_ATR}/v1/activities`, {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.activities = JSON.parse(utf8Decoder.decode(value, {stream: true}));
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
</style>