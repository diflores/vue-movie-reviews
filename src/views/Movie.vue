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
                <p>{{ movie.overview }}</p>
                <p>Language: {{ movie.spoken_languages[0].name }}</p>
                <p>Date: {{ movie.release_date }}</p>
                <br>
                <p id="bolder">Cast: {{ movie.actors }}</p>
                <p id="bolder">Director: {{ movie.director }}</p>
                <p id="bolder">Average score: {{ movie.vote_average }}/10</p>
                <br>
                <v-chip-group column>
                  <v-chip v-for="genre in movie.genres" :key="genre.id">
                    {{ genre.name }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div id="review-container">
            <h1 id="add-review-title">Add your review</h1>
            <v-textarea
              outlined
              color="#b08adc"
              v-model="review"
            ></v-textarea>
            <div>
              <div>
                <h3 id="score-title">Score:</h3>
                <v-select
                  outlined
                  :items="scores"
                  color="#b08adc"
                  :value="5"
                  v-model="score"
                ></v-select>
              </div>
              <v-btn
                elevation="0"
                id="login-button"
                @click="submit_review"
                :loading="is_loading_submit"
              >Submit</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="reviews.length">
      <h1 id="reviews-title">Showing {{ reviews.length }} review(s)</h1>
    </div>
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
      score: 5,
      is_loading: true,
      is_loading_submit: false,
      scores: [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10],
      movie: {
        title: "",
        overview: "",
        image: "",
        director: "",
        actors: "",
        vote_average: "",
      },
      reviews: [],
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
      this.$http({
        url: `${process.env.VUE_APP_API_BASE_URL}/movies/${this.movieId}/credits`,
        method: "GET"
      }).then((response) => {
        const credits = response.data;
        this.movie["actors"] = credits.cast.slice(0, 5).map((actor) => actor.name).join(", ");
        this.movie["director"] = credits.crew.find((person) => person.job === "Director").name;
        this.is_loading = false;
      });
    });
    this.$http({
      url: `${process.env.VUE_APP_API_BASE_URL}/movies/${this.movieId}/reviews`,
      method: "GET"
    }).then((response) => {
      console.log(response.data);
      this.reviews = response.data;
    });
  },
  methods: {
    submit_review: function () {
      this.is_loading_submit = true;
      let data = {
        review: this.review,
        rating: this.score,
        movie_id: this.movieId,
      };
      this.$store
        .dispatch("create_review", data)
        .then(() => {
          this.is_loading_submit = false;
          this.review = "";
          this.score = 5;
        });
    },
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
}
#info-container > div > div {
  padding-left: 1em;
}
#movie-title {
  font-weight: 300;
  font-size: 2em;
}
#bolder {
  font-weight: 400;
}
#add-review-title {
  font-weight: 300;
  font-size: 1.5em;
  padding-top: 2em;
  padding-bottom: 1em;
}
#review-container {
  padding-left: 2em;
}
#review-container > div {
  display: flex;
  justify-content: space-between;
}
#review-container > div > div {
  display: flex;
}
#reviews-title {
  font-size: 1.5em;
  font-weight: 300;
  padding-top: 2em;
}
#score-title {
  font-weight: 300;
  padding-top: 1em;
  padding-right: 1em;
}
</style>