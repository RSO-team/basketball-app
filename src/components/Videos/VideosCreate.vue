<template>
    <div class="d-flex justify-content-center align-content-center">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Create new video</h4>
                <div class="form-group">
                    <label >Description</label>
                    <textarea v-model="description" class="form-control"  rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>Link</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fa', 'video']"></font-awesome-icon></span>
                        </div>
                        <input type="text"  v-model="link" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label>Add tag</label>
                    <div class="input-group w-50">
                        <input class="form-control w-50" ref="tagInput">
                        <div class="input-group-append">
                            <button type="button" @click="addTag()" class="btn"><font-awesome-icon :icon="['fas','plus']"></font-awesome-icon></button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Tags</label>
                    <textarea class="form-control"  readonly rows="3" ref="tags"> </textarea>
                </div>
                <br>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoCreate",
        data: function(){
            return{
                link:"",
                description: "",
                tags: ""
            }
        },
        methods:{
            addTag: function () {
                if(this.$refs.tags.value.length > 0){
                    this.$refs.tags.value += ","+this.$refs.tagInput.value;
                }else{
                    this.$refs.tags.value += this.$refs.tagInput.value;
                }

                this.$refs.tagInput.value = "";
            },
            async sendForm(){
                this.tags = this.$refs.tags.value;
                this.tags = this.tags.split(",").map((value) =>{
                    return {description: value}
                });

                const res = await fetch(`${process.env.VUE_APP_API_URL_VID}/v1/videos`, {
                    method: "POST",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify({
                        link: this.link,
                        description: this.description,
                        tags: this.tags,
                        createdAt: new Date().toJSON()
                    })
                }).then((response)=>{
                    console.log(response);
                    this.$router.push("/videos/read/");
                });
                console.log(res);
            }
        }
    }
</script>

<style scoped>

</style>