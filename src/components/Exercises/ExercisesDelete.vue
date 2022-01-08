<template>
    <div class="d-flex justify-content-center align-content-center">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Update exercise</h4>
                <label>Select exercise</label>
                <select @change="getExercise" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="id" >
                    <option v-for="id in allIds" :key="id.id">
                        {{id.id}}
                    </option>
                </select>
                <div class="form-group">
                    <label>Description</label>
                    <input v-model="description" class="form-control " readonly>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <div class="input-group">
                        <input type="text" v-model="name" class="form-control" readonly>
                    </div>
                </div>
                <label>Steps</label>
                <div class="form-group step" v-if="steps.length === 0">
                    <div class="input-group w-100">
                        <input placeholder="description" class="form-control w-50" readonly>
                        <input placeholder="step" class="form-control w-50" readonly>
                    </div>
                </div>
                <div class="form-group step" v-else v-for="step in steps" :key="step.id">
                    <div class="input-group w-100">
                        <input placeholder="description" class="form-control w-50" :value="step.description" readonly>
                        <input placeholder="step" class="form-control w-50" :value="step.name" readonly>
                    </div>
                </div>
                <div class="d-flex justify-content-end w-100">
                    <button type="button" @click="addNewStep()" class="btn">
                        <font-awesome-icon :icon="['fas','plus']"></font-awesome-icon>
                    </button>
                </div>
                <br>
                <button type="submit" class="btn btn-danger">Delete</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExercisesDelete",
        data: function () {
            return {
                allIds: "",
                id: "",
                description: "",
                name: "",
                steps: []
            }
        },methods: {
            getExercise: function () {
                const utf8Decoder = new TextDecoder("utf-8");
                fetch("http://20.72.149.70/exercises/v1/exercises/" + this.id, {
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
            },
            async sendForm() {
                fetch("http://20.72.149.70/exercises/v1/exercises/"+this.id, {
                    method: "DELETE",
                    headers: {"Access-Control-Allow-Origin": "*", "content-type": 'application/json'},

                }).then((response) => {
                    console.log(response);
                    //this.$router.push("/exercises/read");
                });
            }
        }, mounted() {
            const utf8Decoder = new TextDecoder("utf-8");
            fetch("http://20.72.149.70/exercises/v1/exercises", {
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