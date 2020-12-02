<template>
  <div style="height: 100%">
    <v-card style="height: 100%; overflow: hidden" rounded="0">
      <v-toolbar color="blue" dark>
        <v-toolbar-title class="pl-5"
          >List: {{ lists[this.$route.params.id - 1].title }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click.prevent="searchStatus = !searchStatus"
          v-if="!searchStatus"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
        <v-text-field
          v-model.trim="search"
          color="blue"
          style="margin-top: 1.7rem"
          solo-inverted
          autofocus
          @blur.prevent="searchStatus = !searchStatus"
          append-icon="mdi-magnify"
          placeholder="Search task..."
          v-else
        ></v-text-field>
      </v-toolbar>
      <v-list two-line :style="styleString">
        <template v-for="task in searchFilter">
          <Task :key="task.id" :taskslist="task" :index="key" />
        </template>
      </v-list>

      <v-divider></v-divider>
      <v-card-actions>
        <v-layout>
          <v-flex>
            <NewTask />
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
    <router-view name="notes" :key="$route.fullPath"></router-view>
  </div>
</template>


<script>
import Task from "./Task";
import NewTask from "./NewTask";
// import NotesModal from "./NotesModal";

export default {
  name: "Tasks",
  components: { Task, NewTask },
  data() {
    return {
      imgUrl: "",
      tasks: [],
      searchStatus: false,
      lists: [],
      search: "",
    };
  },
  computed: {
    styleString() {
      return `height: calc(100% - 141px); overflow-y: scroll; background-image: url(${this.imgUrl}); background-size: cover;`;
    },
    listId() {
      return this.$route.params.id;
    },
    searchFilter() {
      return this.$store.getters.TASKS.filter((elem) => {
        return elem.title.toUpperCase().includes(this.search.toUpperCase());
      });
    },
  },
  mounted() {
    let listget = [];
    listget = this.$store.getters.LISTS;

    this.$store.commit(
      "SET_TASKS",
      listget[this.$route.params.id - 1].taskslist
    );
    this.$store.commit("SET_TASK_ID", this.listId);
    this.tasks = this.$store.getters.TASKS;
    this.lists = this.$store.getters.LISTS;

    this.imgUrl = this.lists[this.$route.params.id - 1].imgURL;
  },
};
</script>