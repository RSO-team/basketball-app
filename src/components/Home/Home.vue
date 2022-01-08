<template>
  <div class="container">
    <div class="row">
      <div class="col-4 offset-4">
        <div class="mt-4">Hello to our lil project</div>
        <div class="mt-2">Go to our subpages:</div>
        <div>
          <router-link to="/users" class="d-block mt-2">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span class="ms-1 d-none d-sm-inline">Users</span>
          </router-link>
          <router-link to="/notifications" class="d-block mt-2">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span class="ms-1 d-none d-sm-inline">Notifications</span>
          </router-link>
          <router-link to="/events" class="d-block mt-2">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span class="ms-1 d-none d-sm-inline">Events</span>
          </router-link>
          <router-link to="/matchmaking" class="d-block mt-2">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span class="ms-1 d-none d-sm-inline">Matchmaking</span>
          </router-link>
          <router-link to="/exercises" class="d-block mt-2">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span class="ms-1 d-none d-sm-inline">Exercises</span>
          </router-link>
          <router-link to="/leaderboard" class="d-block mt-2">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span class="ms-1 d-none d-sm-inline">Leaderboard</span>
          </router-link>
          <router-link to="/statistics" class="d-block mt-2">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span class="ms-1 d-none d-sm-inline">Statistics</span>
          </router-link>
          <router-link to="/videos" class="d-block mt-2">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span class="ms-1 d-none d-sm-inline">Videos</span>
          </router-link>
          <router-link to="/activity" class="d-block mt-2">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span class="ms-1 d-none d-sm-inline">Activity tracking</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home.vue",
}
</script>

<style scoped>

</style>