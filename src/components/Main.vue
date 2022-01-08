<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <router-link to="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span class="fs-5 d-none d-sm-inline">Menu</span>
                    </router-link>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li class="nav-item">
                            <router-link :to="{path:'/users/'}" class="nav-link align-middle px-0" replace>
                                <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Users</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{path:'/notifications/'}" class="nav-link align-middle px-0">
                                <font-awesome-icon :icon="['fas', 'bell']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Notifications</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{path: '/events/'}" class="nav-link align-middle px-0">
                                <font-awesome-icon :icon="['fas', 'calendar']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Events</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{path: '/matchmaking'}" class="nav-link align-middle px-0">
                                <font-awesome-icon :icon="['fas', 'basketball-ball']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Matchmaking</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{path: '/exercises/'}" class="nav-link align-middle px-0">
                                <font-awesome-icon :icon="['fas', 'running']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Exercises</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link align-middle px-0">
                                <font-awesome-icon :icon="['fas', 'trophy']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Leaderboard</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <button onclick="" class="nav-link align-middle px-0">
                                <font-awesome-icon :icon="['fas', 'chart-bar']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Statistics</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{path:'/videos/'}" class="nav-link align-middle px-0">
                                <font-awesome-icon :icon="['fas', 'video']"></font-awesome-icon>
                                <span class="ms-1 d-none d-sm-inline">Videos</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{path: '/activity/'}" class="nav-link align-middle px-0">
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
                        <router-link :to="{path: '/'+selected +'/create/'}" class="btn btn-success" append>CREATE</router-link>
                        <router-link :to="{path: '/'+selected +'/read/'}" class="btn btn-primary" replace>READ</router-link>
                        <router-link :to="{path:'/'+selected + '/update/'}" class="btn btn-warning" style="color: white" replace> UPDATE</router-link>
                        <router-link :to="{path: '/'+selected +'/delete/'}" class="btn btn-danger " replace>DELETE</router-link>
                        <div class="form-check form-switch" style="align-self: center;">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                            <label class="form-check-label" for="flexSwitchCheckChecked" style="color: white">Toggle sick</label>
                        </div>
                    </div>
                </div>
                <router-view>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Main',
        data: function(){
            return{
                selected: "",
                next:null,
                prev: null
            }
        },
        watch:{
            // eslint-disable-next-line no-unused-vars
            $route(to, from){
                this.selected = to.path.split("/")[1];
            }
        }
    }
</script>