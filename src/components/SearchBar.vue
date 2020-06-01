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
    <div v-if="!results.length">
      <h1 id="results-title">Today's featured movies</h1>

      <h1 v-if="most_popular_movies.length" id="discover-title">Most popular movies</h1>
      <div class="movies-container">
        <Card
          v-for="result in most_popular_movies" :key="result.id"
          :card-title="result.title"
          :card-subtitle="result.plot"
          :card-image="result.posterURL"
          :on-click="() => { redirect_movie(result.id) }"
        ></Card>
      </div>

      <h1 v-if="most_popular_kids_movies.length" id="discover-title">Most popular kids movies</h1>
      <div class="movies-container">
        <Card
          v-for="result in most_popular_kids_movies" :key="result.id"
          :card-title="result.title"
          :card-subtitle="result.plot"
          :card-image="result.posterURL"
          :on-click="() => { redirect_movie(result.id) }"
        ></Card>
      </div>

      <h1 v-if="best_movies_2019.length" id="discover-title">Best movies from 2019</h1>
      <div class="movies-container">
        <Card
          v-for="result in best_movies_2019" :key="result.id"
          :card-title="result.title"
          :card-subtitle="result.plot"
          :card-image="result.posterURL"
          :on-click="() => { redirect_movie(result.id) }"
        ></Card>
      </div>
    </div>

    <h1 v-if="results.length" id="results-title">Movie Search Results</h1>
    <div class="movies-container">
      <Card
        v-for="result in results" :key="result.id"
        :card-title="result.title"
        :card-subtitle="result.plot"
        :card-image="result.posterURL"
        :on-click="() => { redirect_movie(result.id) }"
      ></Card>
    </div>
  </section>
</template>
<script>
import Card from "./Card";
import { parseResults } from "../utils";
export default {
  components: {
    Card,
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  data() {
    return {
      movie: "",
      results: [],
      best_movies_2019: [],
      most_popular_movies: [],
      most_popular_kids_movies: [],
    };
  },
  created() {
    if (this.isLoggedIn) {
      this.$http({
        url: `${process.env.VUE_APP_API_BASE_URL}/discover-movie`,
        params: { sort_by: "popularity.desc" },
        method: "GET"
      }).then((response) => {
        this.most_popular_movies = parseResults(response);
      });
      
      this.$http({
        url: `${process.env.VUE_APP_API_BASE_URL}/discover-movie`,
        params: { certification_country: "US", certification: "G", sort_by: "popularity.desc" },
        method: "GET"
      }).then((response) => {
        this.most_popular_kids_movies = parseResults(response);
      });

      this.$http({
        url: `${process.env.VUE_APP_API_BASE_URL}/discover-movie`,
        params: { primary_release_year: 2019, sort_by: "vote_average.desc", vote_count_gte: 1000 },
        method: "GET"
      }).then((response) => {
        this.best_movies_2019 = parseResults(response);
      });
    }
  },
  methods: {
    search: function() {
      const movieTitle = this.movie;
      this.$http({
        url: `${process.env.VUE_APP_API_BASE_URL}/search-movie`,
        params: { movie_title: movieTitle },
        method: "GET"
      }).then((response) => {
        this.results = parseResults(response);
      });
    },
    redirect_movie: function (movie_id) {
      this.$router.push(`/movie/${movie_id}`).catch(() => null);
    },
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
#discover-title {
  font-weight: 400;
  color: var(--secondary-color);
  padding-top: 2em;
}
#results-title {
  font-weight: 300;
}
.movies-container {
  margin: 2em 0 2em;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(18em, 1fr));
  grid-gap: 2em;
  width: 100%;
  height: 100%;
}
</style>