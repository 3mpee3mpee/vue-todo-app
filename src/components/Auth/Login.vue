<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8 lg4>
        <v-form>
          <v-card elevation="12">
            <v-toolbar color="blue" dark>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-alert dark color="error" :value="error" icon="mdi-close"
              >The username or the password are incorrect</v-alert
            >
            <v-card-text>
              <v-text-field
                v-model="username"
                color="blue"
                name="login"
                label="Login"
                type="text"
                prepend-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                v-model="password"
                color="blue"
                name="password"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
              ></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn
                to="/signup"
                class="mx-5 my-2 px-5"
                rounded
                color="indigo"
                dark
                >Sign up</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                class="mx-5 my-2 pl-5"
                rounded
                color="blue"
                dark
                @click.prevent="login()"
                >Login<v-icon small right>mdi-arrow-right</v-icon></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "@/firebase/db";

export default {
  name: "login",
  data() {
    return {
      Users: {},
      username: undefined,
      password: undefined,
      error: false,
      data: {},
    };
  },
  methods: {
    async login() {
      await db
        .collection("Users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (this.username !== undefined && this.password !== undefined) {
              if (
                doc.data().username === this.username &&
                doc.data().pass === this.password
              ) {
                this.$store.commit("SET_IS_LOGGED", true);
                this.$store.commit("SET_CURR_USER", this.username);
                this.$store.commit("SET_NOTIFICATION", {
                  display: true,
                  alertClass: "success",
                  timeout: 3000,
                  text: `${this.username}, you have been successfully logged in`,
                });
              }
            }
          });
          if (this.$store.getters.IS_LOGGED === true) {
            this.$router.push("/todo");
          } else {
            this.error = true;
            this.$store.commit("SET_NOTIFICATION", {
              display: true,
              alertClass: "red",
              timeout: 3000,
              text: `Fail to log in. Try one more time`,
            });
          }
        });
    },
  },
  firestore: {
    Users: "Users",
  },
  mounted() {},
};
</script>