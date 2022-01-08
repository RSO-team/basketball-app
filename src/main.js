import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUser, faBell, faCalendar, faBasketballBall, faRunning,faTrophy,faCrosshairs,faChartBar, faVideo, faPlus, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueRouter from 'vue-router'
import UsersCreate from "@/components/Users/UsersCreate";
import UsersRead from "@/components/Users/UsersRead";
import UsersUpdate from "@/components/Users/UsersUpdate";
import UserDelete from "@/components/Users/UserDelete";

import VideosCreate from "@/components/Videos/VideosCreate";
import VideosRead from "@/components/Videos/VideosRead";
import VideosUpdate from "@/components/Videos/VideosUpdate";
import VideosDelete from "@/components/Videos/VideosDelete";

import ActivityTrackingCreate from "@/components/ActivityTracking/ActivityTrackingCreate";
import ActivityTrackingRead from "@/components/ActivityTracking/ActivityTrackingRead";
import ActivityTrackingUpdate from "@/components/ActivityTracking/ActivityTrackingUpdate";
import ActivityTrackingDelete from "@/components/ActivityTracking/ActivityTrackingDelete";

import EventsCreate from "@/components/Events/EventsCreate";
import EventsRead from "@/components/Events/EventsRead";
import EventsUpdate from "@/components/Events/EventsUpdate";
import EventsDelete from "@/components/Events/EventsDelete";

import ExercisesCreate from "@/components/Exercises/ExercisesCreate";
import ExercisesDelete from "@/components/Exercises/ExercisesDelete";
import ExercisesRead from "@/components/Exercises/ExercisesRead";
import ExercisesUpdate from "@/components/Exercises/ExercisesUpdate";

import MatchmakingCreate from "@/components/Matchmaking/MatchmakingCreate";
import MatchmakingRead from "@/components/Matchmaking/MatchmakingRead";
import MatchmakingUpdate from "@/components/Matchmaking/MatchmakingUpdate";
import MatchmakingDelete from "@/components/Matchmaking/MatchmakingDelete";

import NotificationRead from "@/components/Notifications/NotificationRead";
import NotificationsCreate from "@/components/Notifications/NotificationsCreate";


library.add(faUser, faBell, faCalendar, faBasketballBall, faRunning,faTrophy,faCrosshairs,faChartBar, faVideo,faPlus, faEnvelope);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.component("font-awesome-icon", FontAwesomeIcon);

const routes = [
  {path: '/users/create', component: UsersCreate, name: 'UsersCreate'},
  {path: '/users/read', component: UsersRead, name: 'UsersRead'},
  {path: '/users/update', component: UsersUpdate, name: 'UsersUpdate'},
  {path: '/users/delete', component: UserDelete, name: 'UserDelete'},

  {path: '/videos/create', component: VideosCreate, name: 'VideosCreate'},
  {path: '/videos/read', component: VideosRead, name: 'VideosRead'},
  {path: '/videos/update', component: VideosUpdate, name: 'VideosUpdate'},
  {path: '/videos/delete', component: VideosDelete, name: 'VideosDelete'},

  {path: '/activity/create', component: ActivityTrackingCreate, name: 'ActivityCreate'},
  {path: '/activity/read', component: ActivityTrackingRead, name: 'ActivityRead'},
  {path: '/activity/update', component: ActivityTrackingUpdate, name: 'ActivityUpdate'},
  {path: '/activity/delete', component: ActivityTrackingDelete, name: 'ActivityDelete'},

  {path: '/events/create', component: EventsCreate, name: 'EventsCreate'},
  {path: '/events/read', component: EventsRead, name: 'EventsRead'},
  {path: '/events/update', component: EventsUpdate, name: 'EventsUpdate'},
  {path: '/events/delete', component: EventsDelete, name: 'EventsDelete'},

  {path: '/exercises/create', component: ExercisesCreate, name: 'ExercisesCreate'},
  {path: '/exercises/read', component: ExercisesRead, name: 'ExercisesRead'},
  {path: '/exercises/update', component: ExercisesUpdate, name: 'ExercisesUpdate'},
  {path: '/exercises/delete', component: ExercisesDelete, name: 'ExercisesDelete'},

  {path: '/matchmaking/create', component:MatchmakingCreate, name: 'MatchmakingCreate'},
  {path: '/matchmaking/read', component: MatchmakingRead, name: 'MatchmakingRead'},
  {path: '/matchmaking/update', component: MatchmakingUpdate, name: 'MatchmakingUpdate'},
  {path: '/matchmaking/delete', component: MatchmakingDelete, name: 'MatchmakingDelete'},

  {path: '/notifications/create', component:NotificationsCreate, name: 'NotificationsCreate'},
  {path: '/notifications/read', component: NotificationRead, name: 'NotificationRead'},
];
const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
