<template>
  <div id="movie-container" v-if="isLoggedIn">
    <div>
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <div>
            <h1 id="movie-title">Movie title</h1>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div>
            <h1 id="add-review-title">Add your review</h1>
          </div>
        </v-col>
      </v-row>
    </div>
    <SearchBar />
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
};
</script>
<style>
#movie-container {
  height: 100%;
  width: 100%;
  color: var(--grey);
  padding: 2em;
}
#movie-title {
  font-weight: 300;
  font-size: 2em;
}
#add-review-title {
  font-weight: 300;
  font-size: 1.5em;
}
</style>