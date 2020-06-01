<template>
  <div id="profile-container" v-if="isLoggedIn && !is_loading">
    <div v-if="reviews.length">
      <h1>{{this.fullName}}</h1>
      <h2 id="reviews-title">{{ `Reviews (${reviews.length})` }}</h2>
      <v-row>
        <v-col cols="12" sm="6" v-for="movie_review in reviews" :key="movie_review.id">
          <div id="display-in-row">
            <p id="review-date">{{ movie_review.created_at.slice(0, 10)}}</p>
          </div>
          <div>
            <h3>
              <a
                class="movie-anchor"
                @click="redirect_movie(movie_review.movie_id)"
              >{{movie_review.movie_name}}</a>
            </h3>
          </div>
          <p>{{ movie_review.review }}</p>
          <p id="bolder">Score: {{ movie_review.rating }}/10</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    userId: function() {
      return this.$route.params.id;
    },
    fullName: function() {
      return `${this.user.first_name} ${this.user.last_name}`;
    }
  },
  data() {
    return {
      is_loading: true,
      user: {},
      reviews: []
    };
  },
  created() {
    this.$http({
      url: `${process.env.VUE_APP_API_BASE_URL}/users/profile/${this.userId}`,
      method: "GET"
    })
      .then(response => {
        this.user = response.data;
        this.$http({
          url: `${process.env.VUE_APP_API_BASE_URL}/users/${this.userId}/reviews`,
          method: "GET"
        }).then(resp => {
          this.reviews = resp.data;
          console.log(this.reviews);
          this.is_loading = false;
        });
      })
      .catch(err => console.log(err));
  },
  methods: {
    redirect_movie: function(movie_id) {
      this.$router.push(`/movie/${movie_id}`).catch(() => null);
    }
  }
};
</script>
<style>
#profile-container {
  height: 100%;
  width: 100%;
  color: var(--grey);
  padding: 2em;
}
.movie-anchor {
  cursor: pointer;
}
</style>