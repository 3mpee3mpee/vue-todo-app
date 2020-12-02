<template>
  <v-list-item @click="pushLink()">
    <v-list-item-action>
      <v-btn icon @click="renameTask">
        <v-icon color="pink">mdi-pencil</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-content v-if="!renameTaskState" @click="openModal()">
      <v-list-item-title>{{ taskslist.title }}</v-list-item-title>
      <v-list-item-subtitle>{{ taskslist.subtitle }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content v-else>
      <v-text-field
        v-model="newTaskName"
        @keydown.enter="submitTask()"
        @blur="closeTask()"
        placeholder="Rename task"
        autofocus
        style="max-width: 90%"
      ></v-text-field>
    </v-list-item-content>
    <v-list-item-action-text>
      <v-btn icon v-if="taskslist.isComplete" @click.prevent="taskComplete()"
        ><v-icon color="green">mdi-checkbox-marked-circle</v-icon></v-btn
      >
      <v-btn icon v-else @click.prevent="taskIsNotComplete()"
        ><v-icon color="grey">mdi-checkbox-marked-circle</v-icon></v-btn
      >
    </v-list-item-action-text>
  </v-list-item>
</template>


<script>
import { db } from "@/firebase/db";

export default {
  name: "Task",
  data() {
    return {
      renameTaskState: false,
      lists: [],
      id: "",
      newTaskName: "",
      listID: 0,
      taskID: 0,
    };
  },
  props: {
    taskslist: Object,
    index: Number,
  },
  methods: {
    pushLink() {
      this.$router.push({
        name: "notes",
        params: {
          taskId: this.taskslist.id,
        },
      });
    },
    toggle(index) {
      console.log(index);
    },
    openModal() {
      this.$router.push({
        name: "notes",
        params: {
          taskId: this.taskslist.id,
        },
      });

      this.$store.commit("SET_MODAL", true);
    },
    renameTask() {
      this.renameTaskState = true;
    },
    closeTask() {
      this.renameTaskState = false;
    },
    async submitTask() {
      this.lists[this.listID].taskslist[this.taskID].title = this.newTaskName;

      await db
        .collection("Users")
        .where("username", "==", this.$store.getters.CURR_USER)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.id = doc.id;
          });
          db.collection("Users").doc(this.id).update({
            lists: this.lists,
          });
        });

      this.newTaskName = "";
      this.renameTaskState = false;
    },
    async taskComplete() {
      let listArr = this.$store.getters.LISTS;

      listArr[this.$route.params.id - 1].taskslist[
        this.$route.params.taskId - 1
      ].isComplete = false;

      this.lists = listArr;

      await this.$store.commit("SET_LISTS", this.lists);

      await db
        .collection("Users")
        .where("username", "==", this.$store.getters.CURR_USER)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.id = doc.id;
          });
          db.collection("Users").doc(this.id).update({
            lists: this.lists,
          });
        });
    },
    async taskIsNotComplete() {
      let listArr = this.$store.getters.LISTS;

      listArr[this.$route.params.id - 1].taskslist[
        this.$route.params.taskId - 1
      ].isComplete = true;

      this.lists = listArr;

      await this.$store.commit("SET_LISTS", this.lists);

      await db
        .collection("Users")
        .where("username", "==", this.$store.getters.CURR_USER)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.id = doc.id;
          });
          db.collection("Users").doc(this.id).update({
            lists: this.lists,
          });
        });
    },
  },

  mounted() {
    this.lists = this.$store.getters.LISTS;
    this.listID = this.$route.params.id - 1;
    this.taskID = this.$route.params.taskId - 1;
  },
};
</script>