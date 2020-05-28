<template>
  <div id="home-container">
    <div v-if="!isLoggedIn" id="presentation-container">
      <h1 id="site-title">Movie Reviews</h1>
      <h2 id="site-slogan">Don’t waste your time with lame movies, check our site first!</h2>
      <div id="icons-container">
        <v-icon color="#b08adc" x-large>mdi-movie-edit</v-icon>
        <v-icon color="#b08adc" x-large>mdi-account-group</v-icon>
        <v-icon color="#b08adc" x-large>mdi-popcorn</v-icon>
      </div>
    </div>
    <SearchBar />
  </div>
</template>
<script>
import SearchBar from "../components/SearchBar";
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  components: {
    SearchBar
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=swap");
#home-container {
  height: 100%;
  width: 100%;
  color: var(--grey);
  padding: 2em;
}
#presentation-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#site-title {
  font-weight: 400;
  padding-top: 1em;
  font-size: 3em;
}
#site-slogan {
  padding-top: 1em;
  font-weight: 300;
}
#icons-container {
  padding: 2em 0;
  display: flex;
  justify-content: space-between;
  width: 10em;
}
</style>