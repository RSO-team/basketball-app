<template>
    <div class="d-flex justify-content-center align-content-center mt-5">
        <div class="d-flex justify-content-around">
            <form style="text-align: left" method="post" @submit.prevent="sendForm">
                <h4>Set API token</h4>
                <div class="form-group mt-4">
                    <input v-model="apiToken" class="form-control" type="text">
                </div>
                <button type="submit" class="btn btn-success mt-2">Change</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "SetApiToken",
    data() {
        return {
            apiToken: this.$store.state.apiToken
        }
    },
    methods: {
        sendForm() {
            this.$store.commit('setToken', this.apiToken)
            this.$toast.info('Token changed successfully!')
        }
    }
}
</script>

<style scoped>

</style>