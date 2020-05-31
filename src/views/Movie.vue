<template>
  <div id="movie-container" v-if="isLoggedIn && !is_loading">
    <div>
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <h1 id="movie-title">{{ movie.title }}</h1>
          <div id="info-container">
            <div>
              <v-img :src="movie.image" height="300px"></v-img>
              <div>
                <p id="movie-plot">{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div id="review-container">
            <h1 id="add-review-title">Add your review</h1>
          </div>
        </v-col>
      </v-row>
    </div>
    <h1 id="reviews-title">Showing x reviews</h1>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    movieId: function() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      review: "",
      score: "",
      is_loading: true,
      movie: {
        title: "",
        overview: "",
        image: "",
        director: "",
        actors: "",
        average_score: "",
      },
    };
  },
  created() {
    const posterBaseURL = "http://image.tmdb.org/t/p/w185";
    this.$http({
      url: `${process.env.VUE_APP_API_BASE_URL}/movies/${this.movieId}`,
      method: "GET"
    }).then((response) => {
      const movie = response.data;
      movie["image"] = `${posterBaseURL}${movie.poster_path}`;
      this.movie = movie;
      this.is_loading = false;
    });
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
#info-container {
  padding-right: 1em;
  padding-top: 1em;
}
#info-container > div {
  display: flex;
  flex-direction: row;
}
#info-container > div > div {
  padding-left: 1em;
}
#movie-title {
  font-weight: 300;
  font-size: 2em;
}
#add-review-title {
  font-weight: 300;
  font-size: 1.5em;
}
#review-container {
  padding-left: 2em;
}
#reviews-title {
  font-size: 1.5em;
  font-weight: 300;
  padding-top: 2em;
}
</style>