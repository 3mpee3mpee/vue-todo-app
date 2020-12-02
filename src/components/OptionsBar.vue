<template>
  <v-card v-if="show" height="100%" rounded="0">
    <v-toolbar color="pink" dark>
      <v-toolbar-title>Options</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-group
        v-for="(item, index) in items"
        :key="index"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <v-list-item slot="activator">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="subItem in item.items" :key="subItem" class="ml-4">
          <v-list-item-content
            v-on="
              item.action === 'mdi-sort-variant'
                ? { click: () => sort(subItem.by) }
                : { click: () => filter(subItem.by) }
            "
          >
            <v-list-item-title style="cursor: pointer">{{
              subItem.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-group prepend-icon="mdi-image-multiple" no-action>
        <v-list-item slot="activator">
          <v-list-item-content
            ><v-list-item-title
              >List Options</v-list-item-title
            ></v-list-item-content
          >
        </v-list-item>
        <v-list-item class="ml-4" @click.prevent="displayNotification">
          <v-list-item-content>
            <v-list-item-title>Remove list</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="ml-4" @click.prevent="openDrawer()">
          <v-list-item-content>
            <v-list-item-title>Change background</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import { db } from "@/firebase/db";

export default {
  name: "OptionsBar",
  components: {},
  data() {
    return {
      open: true,
      isFiltered: false,
      isSorted: false,
      id: undefined,
      idDoc: "",
      tasks: [],
      items: [
        {
          action: "mdi-sort-variant",
          title: "Sort by",
          active: true,
          items: [{ title: "Name", by: "name" }],
        },
        {
          action: "mdi-filter-variant",
          title: "Filter by",
          active: false,
          items: [
            { title: "Remaining", by: "remaining" },
            { title: "Completed", by: "completed" },
            { title: "All", by: "all" },
          ],
        },
      ],
    };
  },
  computed: {
    show() {
      return this.$route.params.id;
    },
    drawer() {
      return this.$store.getters.drawer();
    },
  },
  methods: {
    compareAsc(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    },
    compareDes(a, b) {
      if (a.title < b.title) {
        return 1;
      }
      if (a.title > b.title) {
        return -1;
      }
      return 0;
    },
    sort(value) {
      if (value == "name") {
        this.isFiltered = !this.isFiltered;
        this.tasks = this.$store.getters.TASKS;
        this.$store.commit("SET_FILTER", this.isFiltered);
        this.isFiltered
          ? this.$store.commit("SET_TASKS", this.tasks.sort(this.compareAsc))
          : this.$store.commit("SET_TASKS", this.tasks.sort(this.compareDes));
      }
    },
    filter(value) {
      if (value == "remaining") {
        this.tasks = this.$store.getters.LISTS;
        this.isSorted = !this.isSorted;
        this.$store.commit("SET_SORTED", this.isSorted);
        let sortedByRemaining = this.tasks[
          this.$route.params.id - 1
        ].taskslist.filter((x) => {
          return x.isComplete == false;
        });
        this.$store.commit("SET_TASKS", sortedByRemaining);
        this.tasks = this.$store.getters.TASKS;
      }
      if (value == "completed") {
        this.tasks = this.$store.getters.LISTS;
        this.isSorted = !this.isSorted;
        this.$store.commit("SET_SORTED", this.isSorted);
        let sortedByRemaining = this.tasks[
          this.$route.params.id - 1
        ].taskslist.filter((x) => {
          return x.isComplete == true;
        });
        this.$store.commit("SET_TASKS", sortedByRemaining);
        this.tasks = this.$store.getters.TASKS;
      }
      if (value == "all") {
        this.tasks = this.$store.getters.LISTS;
        this.tasks = this.tasks[this.$route.params.id - 1].taskslist;
        this.isSorted = !this.isSorted;
        this.$store.commit("SET_SORTED", this.isSorted);
        this.$store.commit("SET_TASKS", this.tasks);
      }
    },
    openDrawer() {
      this.$store.commit("setDrawer", true);
    },
    async displayNotification() {
      let lists = this.$store.getters.LISTS;

      let id = this.$route.params.id;

      let newLists = lists.filter((x) => {
        return x.id !== id;
      });

      for (let i = id - 1; i < newLists.length; i++) {
        newLists[i].id--;
      }

      lists = newLists;

      this.$store.commit("SET_LISTS", lists);

      await db
        .collection("Users")
        .where("username", "==", this.$store.getters.CURR_USER)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.idDoc = doc.id;
          });
        });

      await db.collection("Users").doc(this.idDoc).update({
        lists: lists,
      });

      await this.$router.push("/todo");

      this.$store.commit("SET_NOTIFICATION", {
        display: true,
        alertClass: "success",
        timeout: 3000,
        text: "List removed",
      });
    },
  },
  mounted() {
    this.isFiltered = this.$store.getters.IS_FILTER;
    this.isSorted = this.$store.getters.IS_SORTED;
    this.tasks = this.$store.getters.TASKS;
    this.id = this.$route.params.id;
  },
};
</script>


