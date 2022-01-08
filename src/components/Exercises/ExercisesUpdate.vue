<template>
    <div class="d-flex justify-content-center align-content-center">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Update exercise</h4>
                <label>Select exercise</label>
                <select @change="getExercise" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="id">
                    <option v-for="id in allIds" :key="id.id">
                        {{id.id}}
                    </option>
                </select>
                <div class="form-group">
                    <label>Description</label>
                    <input v-model="description" class="form-control">
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <div class="input-group">
                        <input type="text" v-model="name" class="form-control">
                    </div>
                </div>
                <label>Steps</label>
                <div class="form-group step" v-if="steps.length === 0">
                    <div class="input-group w-100">
                        <input placeholder="description" class="form-control w-50">
                        <input placeholder="step" class="form-control w-50">
                    </div>
                </div>
                <div class="form-group step" v-else v-for="step in steps" :key="step.id">
                    <div class="input-group w-100">
                        <input placeholder="description" class="form-control w-50" :value="step.description">
                        <input placeholder="step" class="form-control w-50" :value="step.name">
                    </div>
                </div>
                <div class="d-flex justify-content-end w-100">
                    <button type="button" @click="addNewStep()" class="btn">
                        <font-awesome-icon :icon="['fas','plus']"></font-awesome-icon>
                    </button>
                </div>
                <br>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExercisesUpdate",
        data: function () {
            return {
                allIds: "",
                id: "",
                description: "",
                name: "",
                steps: []
            }

        },
        methods: {
            getExercise: function () {
                const utf8Decoder = new TextDecoder("utf-8");
                fetch(`${process.env.VUE_APP_API_URL_XRC}/v1/exercises/${this.id}`, {
                    method: "GET",
                    headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
                }).then((response) => {
                    const reader = response.body.getReader();
                    reader.read().then(({done, value}) => {
                        if (!done) {
                            let exercise = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                            this.description = exercise.description;
                            this.name = exercise.name;
                            this.steps = exercise.steps;
                        }
                    });
                });
            },getSteps: function(){
                let arr =  [].slice.call(document.getElementsByClassName("step"));
                console.log(arr);
                arr = arr.map(value=>{
                    return {description: value.childNodes[0].childNodes[0].value, name: value.childNodes[0].childNodes[1].value}
                });
                console.log(arr);
                return arr;
            },
            async sendForm() {
                this.steps = this.getSteps();
                fetch(`${process.env.VUE_APP_API_URL_XRC}/v1/exercises/${this.id}`, {
                    method: "PUT",
                    headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'},
                    body: JSON.stringify({
                        description: this.description,
                        name: this.name,
                        steps: this.steps
                    })
                }).then((response) => {
                    console.log(response);
                    //this.$router.push("/exercises/read");
                });
            }

        },
        mounted() {
            const utf8Decoder = new TextDecoder("utf-8");
            fetch(`${process.env.VUE_APP_API_URL_XRC}/v1/exercises`, {
                method: "GET",
                headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'}
            }).then((response) => {
                const reader = response.body.getReader();
                reader.read().then(({done, value}) => {
                    if (!done)
                        this.allIds = JSON.parse(utf8Decoder.decode(value, {stream: true}));
                });
            });
        }
    }
</script>

<style scoped>

</style>