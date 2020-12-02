<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8 lg4>
        <v-form>
          <v-card elevation="12">
            <v-toolbar color="blue" dark>
              <v-toolbar-title>Signup Form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert :value="userExists" color="error" icon="mdi-alert" dark
                >This user already exist, try a different set of data</v-alert
              >

              <v-text-field
                name="login"
                v-model="username"
                color="blue"
                label="Login"
                type="text"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                name="email"
                v-model="email"
                color="blue"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                name="password"
                color="blue"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                :rules="[rules.required]"
                v-model="pass"
              ></v-text-field>
              <v-text-field
                name="password"
                color="blue"
                label="Confirm Password"
                type="password"
                prepend-icon="mdi-lock "
                :rules="[rules.required]"
                v-model="check"
                :error="!valid()"
              ></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn
                to="/login"
                class="mx-5 my-2 px-5"
                dark
                rounded
                color="black"
                >Login</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                class="mx-5 my-2 pl-5"
                dark
                rounded
                color="success"
                @click.prevent="register()"
                >Register<v-icon small right>mdi-arrow-up</v-icon></v-btn
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
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required",
        email: (value) => {
          const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      pass: "",
      check: "",
      username: "",
      email: "",
      userExists: false,
    };
  },
  methods: {
    async register() {
      if (this.username && this.email && this.pass) {
        await db
          .collection("Users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (
                doc.data().username === this.username ||
                doc.data().email === this.email
              ) {
                this.userExists = true;
                console.log(this.username + this.email);
              } else {
                db.collection("Users").add({
                  username: this.username,
                  email: this.email,
                  pass: this.pass,
                });
                this.$router.push("/login");
              }
            });
          });
      }

      return (this.userExists = true);
    },

    valid() {
      return this.pass === this.check;
    },
  },
  firestore: {
    Users: db.collection("Users"),
  },
};
</script>