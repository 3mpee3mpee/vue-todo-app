<template>
  <v-container pt-0 pr-0 pb-0 pl-0>
    <v-form ref="form" @submit.prevent="submit()"
      ><v-text-field
        @blur="closeForm()"
        append-icon="mdi-plus"
        solo
        ref="input"
        v-model="title"
        placeholder="Title"
        :rules="[rules.required]"
      ></v-text-field
    ></v-form>
  </v-container>
</template>

<script>
import { db } from "@/firebase/db";

export default {
  data() {
    return {
      title: "",
      rules: {
        required: (value) => !!value || "Required",
      },
      lists: [],
      tasks: [],
      id: "",
    };
  },
  methods: {
    async submit() {
      let data = {
        id: this.lists.length + 1,
        title: this.title,
        tasks: 0,
        taskslist: [],
        imgURL: null,
      };
      await this.lists.push(data);

      await db
        .collection("Users")
        .where("username", "==", this.$store.getters.CURR_USER)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.id = doc.id;
          });
        });
      db.collection("Users").doc(this.id).update({
        lists: this.lists,
      });
    },
    closeForm() {
      this.$store.commit("SET_NEW_LIST_FORM", false);
    },
  },
  computed() {},
  mounted() {
    this.$refs.input.focus();
    this.lists = this.$store.getters.LISTS;
  },
};
</script>