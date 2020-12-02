<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="task"
      solo
      color="blue"
      label="Add a new task"
      append-icon="mdi-plus"
    ></v-text-field>
  </v-form>
</template>

<script>
import { db } from "@/firebase/db";

export default {
  name: "NewTask",
  data() {
    return {
      task: "",
      id: "",
      taskID: 0,

      lists: [],
    };
  },
  methods: {
    async submit() {
      let data = {
        id: this.lists[this.taskID].taskslist.length + 1,
        isComplete: false,
        subtitle: `this task contains 0 notes`,
        title: this.task,
        notes: [],
      };
      this.lists[this.taskID].tasks++;
      await this.lists[this.taskID].taskslist.push(data);

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

      this.task = "";
    },
  },
  mounted() {
    this.lists = this.$store.getters.LISTS;
    this.taskID = this.$route.params.id - 1;
    return this.taskID;
  },
};
</script>