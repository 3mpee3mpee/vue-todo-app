<template>
  <v-navigation-drawer permanent width="100%">
    <v-toolbar color="blue" dark>
      <v-toolbar-title class="pl-5">Your lists</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list>
      <v-list-item v-if="!isOpen" @click.prevent="openNewListForm()">
        <v-list-item-content class="pl-5">
          Create a new list
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-list-item-action>
          <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-list-item v-if="openNewListFormValue">
        <NewList />
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list class="pl-5" style="height: calc(100% - 141px); overflow-y: scroll">
      <v-list-item
        :to="{ name: 'tasks', params: { id: list.id } }"
        v-for="list in getLists"
        :key="list.id"
        color="blue"
      >
        <v-list-item-content>{{ list.title }}</v-list-item-content>
        <v-spacer></v-spacer>
        <v-list-item-action>{{ list.tasks }}</v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import NewList from "./NewList";
import { mapGetters } from "vuex";
import { db } from "@/firebase/db";

export default {
  name: "List",
  components: { NewList },
  data() {
    return {
      lists: [
        // { id: 1, title: "Hello", tasks: 12 },
        // { id: 2, title: "Hello22", tasks: 40 },
        // { id: 3, title: "Hello232323", tasks: 10 },
        // { id: 4, title: "Hello4131", tasks: 2 },
        // { id: 5, title: "Hello3242", tasks: 36 },
        // { id: 6, title: "Hello4342", tasks: 46 },
        // { id: 7, title: "Hello", tasks: 12 },
        // { id: 8, title: "Hello", tasks: 12 },
        // { id: 9, title: "Hello22", tasks: 40 },
        // { id: 10, title: "Hello232323", tasks: 10 },
        // { id: 11, title: "Hello4131", tasks: 2 },
      ],
    };
  },
  computed: {
    ...mapGetters(["DISPLAY_SEARCH_LIST"]),
    getLists() {
      return this.$store.getters.LISTS;
    },
    openNewListFormValue: {
      get() {
        return this.$store.getters.NEW_LIST_FORM;
      },
      set(value) {
        this.$store.commit("SET_NEW_LIST_FORM", value);
      },
    },
    isOpen() {
      return this.$store.getters.NEW_LIST_FORM;
    },
  },
  methods: {
    toggleSearchList() {
      this.$store.commit("SET_DISPLAY_SEARCH_LIST", !this.DISPLAY_SEARCH_LIST);
    },
    openNewListForm() {
      this.$store.commit("SET_NEW_LIST_FORM", true);
    },
  },
  async created() {
    let curr = this.$store.getters.CURR_USER;
    await db
      .collection("Users")
      .where("username", "==", curr)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          for (let i in doc.data().lists) {
            this.lists.push(doc.data().lists[i]);
          }
        });
      });

    await this.$store.commit("SET_LISTS", this.lists);
  },
};
</script>