<template>
    <div class="d-flex justify-content-center align-content-center">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Update video</h4>
                <label>Select id</label>
                <select @change="getVideo" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="id">
                    <option v-for="id in allIds" :key="id.id">
                        {{id.id}}
                    </option>
                </select>
                <div class="form-group">
                    <label>Description</label>
                    <textarea v-model="description" class="form-control" rows="3" ></textarea>
                </div>
                <div class="form-group">
                    <label>Link</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fa', 'video']"></font-awesome-icon></span>
                        </div>
                        <input type="text" v-model="link" class="form-control" >
                    </div>
                </div>
                <div class="form-group">
                    <label>Add tag</label>
                    <div class="input-group w-50">
                        <input class="form-control w-50" ref="tagInput" >
                        <div class="input-group-append">
                            <button type="button" @click="addTag()" class="btn">
                                <font-awesome-icon :icon="['fas','plus']"></font-awesome-icon>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Tags</label>
                    <textarea class="form-control"  rows="3" ref="tags" v-model="tags"> </textarea>
                </div>
                <br>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideosUpdate",
        data: function () {
            return {
                description: "",
                tags: "",
                link: "",
                createdAt: "",
                allIds: [],
                id: null
            }
        },
        methods: {
            async getVideo() {
                const utf8Decoder = new TextDecoder("utf-8");

                await fetch(`${process.env.VUE_APP_API_URL_VID}/v1/videos/${this.id}`, {
                    method: "GET",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                }).then(response => {
                    const reader = response.body.getReader();
                    reader.read().then(({done, value}) => {
                        if (!done) {
                            console.log(utf8Decoder.decode(value, {stream: true}));
                            let video = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                            this.description = video.description;
                            this.createdAt = video.createdAt;
                            this.link = video.link;
                            this.tags = "" ;
                            for(const [key, value] of Object.entries(video.tags)){
                                if (key === "0") {
                                    this.tags += value.description;
                                } else {
                                    this.tags +=  "," + value.description;
                                }
                            }

                        }
                    });
                })
            },
            getCorrectDate(date) {
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDay() + 1 < 10 ? "0" + (date.getDay() + 1) : date.getDay() + 1;
                return year + "-" + month + "-" + day;
            },
            async sendForm() {
                this.tags = this.$refs.tags.value;
                this.tags = this.tags.split(",").map((value) =>{
                    return {description: value}
                });

                await fetch(`${process.env.VUE_APP_API_URL_VID}/v1/videos/${this.id}`, {
                    method: "PUT",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify({
                        description: this.description,
                        createdAt: this.createdAt,
                        tags: this.tags,
                        link: this.link
                    })
                }).then((response) => {
                    console.log(response);
                    this.$router.push("/users/read/");
                });
            }
        },
        mounted() {
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL_USR}/v1/users`, {
                method: "GET",
                headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.allIds = JSON.parse(utf8Decoder.decode(value, {stream: true})).map((value) => {
                            return {id: value.id}
                        });
                    console.log(this.allIds)
                });
            })
        }
    }
</script>

<style scoped>

</style>