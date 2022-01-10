<template>
    <div id="content">
        <ul v-if="notification.length" id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in notification" :key="item.id">
                <p><b>To: </b>{{item.receiver}}</p>
                <p><b>From: </b>{{item.sender}}</p>
                <p><b>Content: </b>{{item.content}}</p>
                <p><b>Send at: </b>{{new Date(item.sentAt).toUTCString()}}</p>
            </li>
        </ul>
        <div v-else>
            No data to show
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotificationRead",
        data: function () {
            return {
                notification: []
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
            fetch(`${process.env.VUE_APP_API_URL_NOT}/v1/notifications`, {
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
                        this.notification = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                });
            });

        }
    }
</script>

<style scoped>
    #content {
        padding: 20px;
        min-height: 80%;
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