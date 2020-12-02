<template>
  <v-app>
    <router-view></router-view>
    <Notification />
  </v-app>
</template>

<script>
// import Login from './components/Auth/Login';
// import Sign from './components/Auth/Sign'
// import Todo from "./components/Todo";
import Notification from './components/Notification'

export default {
  name: "App",

  components: {
    Notification
    // Login,
    // Sign
    // Todo,
  },

  data: () => ({
    //
  }),
};
</script>
