<template>
  <section id="search-section">
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
    <div class="movies-container">
      <div class="card" v-for="result in results" :key="result.id">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="result.posterURL" alt="Image" />
          </figure>
        </div>
        <div class="card-content movie-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ result.title }}</p>
            </div>
          </div>
          <div class="content">{{ result.plot }}</div>
        </div>
      </div>
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
  padding: 0 2em;
  width: 24em;
}
.card {
  width: 15em;
}
.movie-content {
  background-color: #ffffff !important;
}
.movies-container {
  margin-top: 3em;
  padding-bottom: 3em;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  grid-gap: 2em;
  width: 100%;
  height: 100%;
}
</style>