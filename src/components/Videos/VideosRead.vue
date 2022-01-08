<template>
    <div id="content">
        <ul id="dataList">
            <li class="bg-dark d-flex flex-column align-content-around" style="color: white" v-for="item in videos" :key="item.id">
                <p><b>Description: </b>{{item.description}}</p>
                <p><b>Created at: </b>{{item.createdAt}}</p>
                <a><b>Video link:</b> {{item.link}}</a>
                <ul class="d-flex">
                    <p><b>Tags: </b></p>
                    <li v-for="(tag, index) in item.tags" :key="(tag.description, tag.id)">
                        <p v-if="index >= 1">
                            ,{{tag.description}}
                        </p>
                        <p v-else>
                            {{tag.description}}
                        </p>

                    </li>
                </ul>

            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "VideosRead",
        data: function () {
            return {
                videos: null
            }
        },
        mounted() {
            const utf8Decoder = new TextDecoder("utf-8");
            fetch("http://20.72.149.70/videos/v1/videos", {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.videos = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                    console.log(this.videos)
                });
            });

        },
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
        padding: 0;
    }
</style>