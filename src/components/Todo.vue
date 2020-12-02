<template>
  <div>
    <v-container fluid fill-height pl-0 pr-0 pb-0 pt-0 style="height: 100vh">
      <v-layout justify-space-between>
        <v-flex lg3 pr-2>
          <List />
        </v-flex>
        <v-flex lg6 pr-2 pl-2>
          <router-view name="tasks" :key="$route.fullPath"></router-view>
        </v-flex>
        <v-flex lg3 pl-3><OptionsBar /></v-flex>
      </v-layout>
    </v-container>
    <MoreOptions />
  </div>
  <!-- <v-footer color="indigo">
      <v-layout>
          <v-flex white--text text-center class="ma-0 pa-0">
              &copy;2020
              <strong>Empee</strong>
              </v-flex>
      </v-layout>
  </v-footer> -->
</template>

<script>
import List from "./List";
// import Tasks from './Tasks'
import OptionsBar from "./OptionsBar";
// import MoreOptions from "./MoreOptions";
import MoreOptions from "./MoreOptions";

export default {
  name: "todo",
  components: { List, OptionsBar, MoreOptions },
};
</script>