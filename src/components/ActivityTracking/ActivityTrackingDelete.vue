<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form @submit.prevent="sendForm" style="text-align: left" method="post">
                <h4>Delete activity</h4>
                <label>Select activity id</label>
                <select @change="getActivity" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="activityId">
                    <option v-for="id in allActivitiesIds" :key="id.id">
                        {{id.id}}
                    </option>
                </select>
                <label>User id</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon></span>
                    </div>
                    <input type="text" class="form-control" v-model="userId" required readonly>
                </div>
                <label>Name</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon></span>
                    </div>
                    <input type="text" class="form-control" v-model="name" required readonly>
                </div>
                <label>Experience</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="height: 100%"><font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon></span>
                    </div>
                    <input type="text" class="form-control" v-model="experience" required readonly>
                </div>
                <button type="submit" class="btn btn-danger">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ActivityTrackingUpdate",
        data: function () {
            return {
                allUserIds: [],
                allActivitiesIds: [],
                activityId: "",
                experience: "",
                name: "",
                userId:""
            }
        },
        methods: {
            getActivity: function () {
                const utf8Decoder = new TextDecoder("utf-8");
                fetch(`${process.env.VUE_APP_API_URL_ATR}/v1/activities/${this.activityId}`, {
                    method: "GET",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                }).then((response) => {
                    const reader = response.body.getReader();
                    reader.read().then(({done, value}) => {
                        if (!done){
                            let activity = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                            this.name = activity.name;
                            this.experience = activity.experience;
                            this.userId = activity.userId;
                        }
                    });
                });
            },
            sendForm : function () {
                fetch(`${process.env.VUE_APP_API_URL_ATR}/v1/activities/${this.activityId}`, {
                    method: "DELETE",
                    headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
                }).then(()=>{
                    this.$router.push("/activities/read")
                })
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
                        this.allUserIds = JSON.parse(utf8Decoder.decode(value, {stream: true})).map((value) => {
                            return {id: value.id}
                        });
                });
            });
            fetch(`${process.env.VUE_APP_API_URL_ATR}/v1/activities`, {
                method: "GET",
                headers: {"content-type": 'application/json', 'Access-Control-Allow-Origin': '*'},
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.allActivitiesIds = JSON.parse(utf8Decoder.decode(value, {stream: true})).map((value) => {
                            return {id: value.id}
                        });
                });
            });
        }
    }
</script>

<style scoped>

</style>