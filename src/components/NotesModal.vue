<template>
  <v-layout row justify-center align-center>
    <v-dialog v-model="open" max-width="60%" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">Task title</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <NewNote />
          </v-container>
          <v-list three-line subheader>
            <v-subheader>Notes</v-subheader>

            <v-list-item v-for="note in notes" :key="note">
              <v-list-item-content>
                <v-list-item-title>{{ note.note }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action
                ><v-btn icon @click.prevent="deleteNote(note.id)"
                  ><v-icon color="red">mdi-delete</v-icon></v-btn
                ></v-list-item-action
              >
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ma-5" flat color="blue" dark @click="open = !open"
            >Close</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="ma-5"
            flat
            color="red"
            dark
            @click.prevent="deleteTask()"
            >Remove Task</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import NewNote from "./NewNote";
import { db } from "@/firebase/db";

export default {
  name: "NotesModal",
  components: { NewNote },
  data() {
    return {
      note: "",
      arr: [],

      id: "",
      notes: [
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
        // {
        // id: 1,
        // note: 'Some random note'
        // },
      ],
      lists: [],
      listID: 0,
      tasks: [],
    };
  },
  computed: {
    open: {
      get() {
        return this.$store.getters.MODAL;
      },
      set(value) {
        this.$store.commit("SET_MODAL", value);
      },
    },
  },
  methods: {
    async deleteNote(value) {
      let newNotes = this.notes.filter((x) => {
        return x.id !== value;
      });

      this.notes = newNotes;

      this.lists[this.$route.params.id - 1].taskslist[
        this.$route.params.taskId - 1
      ].subtitle = `this task contains ${this.notes.length} notes`;
      this.lists[this.$route.params.id - 1].taskslist[
        this.$route.params.taskId - 1
      ].notes = this.notes;

      await db
        .collection("Users")
        .where("username", "==", this.$store.getters.CURR_USER)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.id = doc.id;
          });
        });

      await db.collection("Users").doc(this.id).update({
        lists: this.lists,
      });
    },
    async deleteTask() {
      let id = this.$route.params.taskId;

      let newTasks = this.tasks.filter((x) => {
        return x.id !== id;
      });

      for (let i = id - 1; i < newTasks.length; i++) {
        newTasks[i].id--;
      }

      this.tasks = newTasks;

      this.lists[this.$route.params.id - 1].taskslist = this.tasks;
      this.lists[this.$route.params.id - 1].tasks--;

      await db
        .collection("Users")
        .where("username", "==", this.$store.getters.CURR_USER)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.id = doc.id;
          });
        });

      await db.collection("Users").doc(this.id).update({
        lists: this.lists,
      });

      this.$store.commit("SET_LISTS", this.lists);
      this.$store.commit("SET_TASKS", this.tasks);

      await this.$router.push(`/list/${this.$route.params.id}`);
    },
  },

  mounted() {
    this.lists = this.$store.getters.LISTS;
    this.listID = this.$store.getters.TASKID - 1;

    this.notes = this.lists[this.listID].taskslist[
      this.$route.params.taskId - 1
    ].notes;
    this.tasks = this.lists[this.$route.params.id - 1].taskslist;

    this.open = this.$store.getters.MODAL;
  },
};
</script>