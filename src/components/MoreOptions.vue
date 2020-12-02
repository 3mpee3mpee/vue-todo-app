<template>
  <v-layout>
    <v-navigation-drawer v-model="open" absolute right temporary>
      <v-list-item>
        <v-list-item-avatar
          ><img src="https://randomuser.me/api/portraits/men/85.jpg" alt=""
        /></v-list-item-avatar>
        <v-list-item-content
          ><v-list-item-title
            >Empee FrontEnd</v-list-item-title
          ></v-list-item-content
        >
      </v-list-item>
      <v-divider></v-divider>
      <v-form>
        <v-container fluid>
          <v-flex xs12>
            <img
              :src="imageUrl"
              alt=""
              height="150px"
              class="d-block ma-auto mb-4"
            />
            <v-text-field
              color="blue"
              label="Select an image"
              v-model="imageName"
              prepend-icon="mdi-paperclip"
              @click="pickFile()"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
          </v-flex>
          <v-btn
            block
            :loading="loading"
            :disabled="!imageFile"
            @click="uploadFile()"
            >Set as background
            <v-icon right dark>mdi-cloud-upload</v-icon></v-btn
          >
        </v-container>
      </v-form>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/db";

export default {
  name: "MoreOptions",
  data() {
    return {
      lists: [],
      id: "",
      loading: false,
      imageUrl: "",
      imageName: "",
      imageFile: "",
    };
  },
  computed: {
    open: {
      get() {
        return this.$store.getters.drawer;
      },
      set(value) {
        this.$store.commit("setDrawer", value);
      },
    },
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;

      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }

        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    async uploadFile() {
      await this.$store.commit("SET_IMG", this.imageUrl);

      this.lists = this.$store.getters.LISTS;

      this.lists[this.$route.params.id - 1].imgURL = this.imageUrl;

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

      await this.$router.push("/todo");
    },
  },
};
</script>