<template>
  <input
    class="pl-5 ml-5 white--text"
    type="text"
    autofocus
    placeholder="Search..."
    @input="search()"
    v-model.trim="input"
    ref="input"
    @blur.prevent="closeSearchBar()"
  />
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    search() {},
    closeSearchBar() {
      this.$store.commit("SET_DISPLAY_SEARCH_LIST", false);
    },
  },
};
</script>

<style scoped>
input::placeholder {
  color: white;
  opacity: 0.5;
}
</style>