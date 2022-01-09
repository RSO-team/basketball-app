<template>
    <div id="content">
        <ul v-if="events.length" id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in events" :key="item.id">
                <span class="my-1"><b>Creator id: </b>{{ item.creatorId }}</span>
                <span class="my-1"><b>Starts at: </b>{{ new Date(item.startsAt).toUTCString() }}</span>
                <span class="my-1"><a><b>Event scope: </b> {{ item.eventScope }}</a></span>
                <span class="my-1"><b>Invitees: </b> {{ item.invitees.map(i => i.userId).join(', ') }}</span>
                <b-button class="mt-1" @click=" sendNotifications(item)">Pošlji obvestila udeležencem</b-button>
            </li>
        </ul>
        <div v-else>
            No data to show
        </div>
    </div>
</template>

<script>
export default {
    name: "EventsRead",
    data: function () {
        return {
            events: {}
        }
    },
    mounted() {
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
    },
    methods: {
        sendNotifications(item) {
            if (item.invitees.length === 0) {
                this.$toast.error('No invitees to send to', {duration: 3000})
                return
            }
            const data = item.invitees.map(i => {
                return {
                    userId: i.userId,
                    from: "Basketball App",
                    content: `Vabljen na igro ob ${item.startsAt}`
                }
            })
            this.axios.post(`${process.env.VUE_APP_API_URL_NOT}/v1/notifications/list`, data, {
                headers: {
                    "Access-Control-Allow-Origin": '*',
                    "apiToken": process.env.VUE_APP_API_TOKEN
                }
            })
            .then(response => {
                console.log(response)
                this.$toast.open("Uspešno poslano", { duration: 3000 })
            })
            .catch(reason => {
                console.error(reason)
                this.$toast.error("Napaka pri pošiljanju", { duration: 3000 })
            })
        }
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
        padding: 0;
    }
</style>