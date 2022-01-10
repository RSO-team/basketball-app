<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Create new exercise</h4>
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
                <div class="form-group step">
                    <div class="input-group w-100">
                        <input placeholder="description" class="form-control w-50">
                        <input placeholder="step" class="form-control w-50">
                    </div>
                </div>
                <div class="d-flex justify-content-end w-100">
                    <button type="button" @click="addNewStep()" class="btn">
                        <font-awesome-icon :icon="['fas','plus']"></font-awesome-icon>
                    </button>
                </div>

                <div class="d-flex justify-content-start w-100">
                    <b-button v-if="addVideo" @click="addVideo = !addVideo" class="btn">
                        Remove video
                    </b-button>
                    <b-button v-else @click="addVideo = !addVideo" class="btn">
                        Add video
                    </b-button>
                </div>

                <div v-if="addVideo">
                    <div class="form-group mt-2">
                        <label>Video link</label>
                        <div class="input-group">
                            <input type="text" v-model="video.link" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea v-model="video.description" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Tags - split them by comma</label>
                        <input type="text" v-model="video.tagsField" class="form-control">
                    </div>
                </div>
                <br>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "ExercisesCreate",
    watch: {
        'video.tagsField'() {
            this.video.tags = this.video.tagsField.split(',').map(t => {
                return {
                    description: t.trim()
                }
            })
        }
    },
    data: function () {
        return {
            description: "",
            name: "",
            steps: [],
            addVideo: false,
            video: {
                link: null,
                description: null,
                tags: [],
                tagsField: null
            }
        }
    }, methods: {
        getSteps: function () {
            let arr = [].slice.call(document.getElementsByClassName("step"));
            console.log(arr);
            arr = arr.map(value => {
                return {
                    description: value.childNodes[0].childNodes[0].value,
                    name: value.childNodes[0].childNodes[1].value
                }
            });
            console.log(arr);
            return arr;
        },
        addNewStep: function () {
            let div = document.createElement("div");
            let divContainer = document.createElement("div");
            let input1 = document.createElement("input");
            let input2 = document.createElement("input");
            divContainer.classList.add("form-group", "step");
            div.classList.add("input-group", "w-100");
            input1.classList.add("form-control", "w-50");
            input2.classList.add("form-control", "w-50");
            input1.setAttribute("placeholder", "description");
            input2.setAttribute("placeholder", "step");
            div.appendChild(input1);
            div.appendChild(input2);
            divContainer.appendChild(div);
            [].slice.call(document.getElementsByClassName("step")).at(-1).after(divContainer);
        },
        async sendForm() {
            this.steps = this.getSteps();
            const data = {
                description: this.description,
                name: this.name,
                steps: this.steps
            }
            if (this.addVideo) {
                data['video'] = this.video
            }
            this.axios.post(`${process.env.VUE_APP_API_URL_XRC}/v1/exercises`, data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "content-type": 'application/json',
                        "apiToken": this.$store.state.apiToken
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.$toast.info("Uspešno dodano", {duration: 3000})
                    this.$router.push("/exercises");
                })
                .catch(reason => {
                    console.error(reason);
                    this.$toast.error("Napaka pri dodajanju", {duration: 3000})
                })
        }
    }
}
</script>

<style scoped>

</style>