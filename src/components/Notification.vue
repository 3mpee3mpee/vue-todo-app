<template>
  <v-snackbar
    :color="NOTIFICATION.class"
    v-model="snackbar"
    bottom
    right
    :timeout="NOTIFICATION.timeout"
  >
    <v-layout justify-space-between align-center>
      <v-icon>mdi-bell-ring</v-icon>

      <span class="font-weight-black overline px-5">{{
        NOTIFICATION.text
      }}</span>

      <v-btn flat dark @click.prevent="snackbar = false" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-layout>
  </v-snackbar>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "notification",
  computed: {
    ...mapGetters(["NOTIFICATION"]),
    snackbar: {
      get() {
        return this.$store.getters.NOTIFICATION.display;
      },
      set(value) {
        this.$store.commit("SET_NOTIFICATION", {
          display: value,
        });
      },
    },
  },
};
</script>