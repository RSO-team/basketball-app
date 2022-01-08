<template>
    <div class="d-flex justify-content-center align-content-center">
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
                <br>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExercisesCreate",
        data: function () {
            return {
                description: "",
                name:"",
                steps: []
            }
        }, methods:{
            getSteps: function(){
                let arr =  [].slice.call(document.getElementsByClassName("step"));
                console.log(arr);
                arr = arr.map(value=>{
                    return {description: value.childNodes[0].childNodes[0].value, name: value.childNodes[0].childNodes[1].value}
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
                div.classList.add("input-group", "w-100" );
                input1.classList.add("form-control", "w-50");
                input2.classList.add("form-control", "w-50");
                input1.setAttribute("placeholder", "description");
                input2.setAttribute("placeholder", "step");
                div.appendChild(input1);
                div.appendChild(input2);
                divContainer.appendChild(div);
                [].slice.call(document.getElementsByClassName("step")).at(-1).after(divContainer);
            },
            async sendForm(){
                this.steps = this.getSteps();
                fetch("http://20.72.149.70/exercises/v1/exercises", {
                    method: "POST",
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
        }
    }
</script>

<style scoped>

</style>