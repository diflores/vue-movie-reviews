<template>
  <div id="app">
    <v-app-bar
      id="app-bar"
      color="#9c6cd3"
    >
      <v-btn icon @click="redirect_home">
        <v-icon>mdi-movie-open</v-icon>
      </v-btn>
      <v-toolbar-title id="app-title">Movie Reviews</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="isLoggedIn">
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </span>
    </v-app-bar>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    redirect_home: function () {
      this.$router.push("/home");
    },
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  }
};
</script>
<style>
#app {
  height: 100%;
  width: 100%;
  font-family: 'Roboto';
  font-weight: 300;
}
#app-bar {
  box-shadow: 0 2px 4px 0 #e5e5e5;
}
#app-title {
  color: white;
  font-weight: 400;
}
</style>