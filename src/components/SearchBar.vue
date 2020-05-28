<template>
  <section v-if="isLoggedIn" id="search-section">
    <div id="search-container">
      <v-text-field
        single-line
        outlined
        color="#b08adc"
        v-model="movie"
        placeholder="Search a movie"
        type="search"
        @click:append="search"
        append-icon="mdi-magnify"
      ></v-text-field>
    </div>
    <h1 v-if="results.length" id="results-title">Movie Search Results</h1>
    <div class="movies-container">
      <v-card
        class="mx-auto"
        max-width="350"
        v-for="result in results" :key="result.id"
      >
        <v-img
          :src="result.posterURL"
          height="200px"
          contain
        ></v-img>
        <v-card-title id="card-title">
          {{ result.title }}
        </v-card-title>
        <v-card-subtitle id="card-subtitle">
          {{ result.plot }}
        </v-card-subtitle>
      </v-card>
    </div>
  </section>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  data() {
    return {
      movie: "",
      results: []
    };
  },
  methods: {
    search: function() {
      const movieTitle = this.movie;
      const posterBaseURL = "http://image.tmdb.org/t/p/w185";
      this.$http({
        url: `${process.env.VUE_APP_API_BASE_URL}/search-movie`,
        params: { movie_title: movieTitle },
        method: "GET"
      }).then(response => {
        this.results = [];
        response.data.results.forEach(movie => {
          if (movie.poster_path) {
            const result = {};
            result["posterURL"] = `${posterBaseURL}${movie.poster_path}`;
            result["id"] = movie.id;
            result["title"] = movie.title;
            result["plot"] =
              movie.overview.length > 140
                ? movie.overview.substring(0, 140).trimRight() + "..."
                : movie.overview;
            this.results.push(result);
          }
        });
      });
    }
  }
};
</script>
<style>
#search-section {
  display: flex;
  flex-direction: column;
  width: 100%;
}
#search-container{
  display: flex;
  flex-direction: row;
  width: 24em;
}
#results-title {
  font-weight: 300;
}
#card-title {
  color: var(--grey);
  font-weight: 400;
}
#card-subtitle {
  color: var(--grey);
  font-weight: 300;
}
.movies-container {
  margin-top: 2em;
  padding-bottom: 3em;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  grid-gap: 2em;
  width: 100%;
  height: 100%;
}
</style>