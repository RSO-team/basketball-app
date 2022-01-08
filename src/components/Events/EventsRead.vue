<template>
    <div id="content">
        <ul id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in events" :key="item.id">
                <p><b>Creator id: </b>{{item.creatorId}}</p>
                <p><b>Starts at: </b>{{new Date(item.startsAt).toUTCString()}}</p>
                <a><b>Event scope:</b> {{item.eventScope}}</a>
                <ul class="d-flex justify-content-start">
                    <p><b>Invitees: </b></p>
                    <li v-for="(invitee, index) in item.invitees" :key="index">
                        <p v-if="index >= 1">
                            ,{{invitee.userId}}
                        </p>
                        <p v-else>
                            {{invitee.userId}}
                        </p>

                    </li>
                </ul>

            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "EventsRead",
        data: function () {
            return{
                events: ""
            }
        },mounted(){
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL_EVN}/v1/events`, {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.events = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                });
            });
        }
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
    #dataList > li > ul{
        padding: 0;
    }
    #dataList > li > ul > li {
        list-style-type: none;
        padding: 0;
    }
</style>