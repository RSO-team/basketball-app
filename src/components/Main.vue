<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <div class="col-auto col-md-3 col-xl-2 px-0 mx-0 bg-dark">
                <div class="d-flex flex-column align-items-start align-items-sm-start text-white min-vh-100">
                    <router-link to="/" class="d-flex align-items-start px-3 py-2 text-white text-decoration-none">
                        <span class="fs-5 d-none d-sm-inline">Menu</span>
                    </router-link>

                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start align-items-sm-start w-100" id="menu">
                        <li class="nav-item w-100" :class="[{selected: this.selected === 'users'}]">
                            <router-link :to="'/users'" class="nav-link align-content-start menu-item">
                                <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Users</span>
                            </router-link>
                        </li>
                        <li class="nav-item w-100" :class="[{selected: this.selected === 'notifications'}]">
                            <router-link :to="'/notifications'" class="nav-link align-middle px-3">
                                <font-awesome-icon :icon="['fas', 'bell']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Notifications</span>
                            </router-link>
                        </li>
                        <li class="nav-item w-100" :class="[{selected: this.selected === 'events'}]">
                            <router-link :to="'/events'" class="nav-link align-middle px-3">
                                <font-awesome-icon :icon="['fas', 'calendar']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Events</span>
                            </router-link>
                        </li>
                        <li class="nav-item w-100" :class="[{selected: this.selected === 'matchmaking'}]">
                            <router-link :to="'/matchmaking'" class="nav-link align-middle px-3">
                                <font-awesome-icon :icon="['fas', 'basketball-ball']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Matchmaking</span>
                            </router-link>
                        </li>
                        <li class="nav-item w-100" :class="[{selected: this.selected === 'exercises'}]">
                            <router-link :to="'/exercises'" class="nav-link align-middle px-3">
                                <font-awesome-icon :icon="['fas', 'running']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Exercises</span>
                            </router-link>
                        </li>
                        <li class="nav-item w-100" :class="[{selected: this.selected === 'leaderboard'}]">
                            <router-link :to="'/leaderboard'" class="nav-link align-middle px-3">
                                <font-awesome-icon :icon="['fas', 'trophy']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Leaderboard</span>
                            </router-link>
                        </li>
                        <li class="nav-item w-100" :class="[{selected: this.selected === 'stats'}]">
                            <router-link :to="'/stats'" class="nav-link align-middle px-3">
                                <font-awesome-icon :icon="['fas', 'chart-bar']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Statistics</span>
                            </router-link>
                        </li>
                        <li class="nav-item w-100" :class="[{selected: this.selected === 'videos'}]">
                            <router-link :to="'/videos'" class="nav-link align-middle px-3">
                                <font-awesome-icon :icon="['fas', 'video']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Videos</span>
                            </router-link>
                        </li>
                        <li class="nav-item w-100" :class="[{selected: this.selected === 'activity'}]">
                            <router-link :to="'/activity'" class="nav-link align-middle px-3">
                                <font-awesome-icon :icon="['fas', 'crosshairs']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Activity tracking</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col px-0">
                <div class="d-flex justify-content-center bg-dark" style="padding: 2px;">
                    <div class="d-flex justify-content-around w-100" >
                        <router-link :to="'/'+selected +'/create/'" class="btn btn-success" append>CREATE</router-link>
                        <router-link :to="'/'+selected +'/read/'" class="btn btn-primary" replace>READ</router-link>
                        <router-link :to="'/'+selected + '/update/'" class="btn btn-warning" style="color: white" replace> UPDATE</router-link>
                        <router-link :to="'/'+selected +'/delete/'" class="btn btn-danger " replace>DELETE</router-link>
                    </div>
                </div>
                <router-view class="content">
                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Main',
        data: function () {
            return {
                selected: "users"
            }
        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            $route(to) {
                this.selected = to.path.split("/")[1];
            }
        }
    }
</script>
<style>
.content {
    max-height: calc(100vh - 42px);
}
.selected {
    background: #2b2f33;
}
.menu-item {
    /*align-items: start;*/
    /*padding-left: 12px !important;*/
    /*padding-right: 30px !important;*/
}
</style>