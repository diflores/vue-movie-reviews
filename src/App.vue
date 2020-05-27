<template>
  <div id="app" data-app>
    <v-app-bar
      id="app-bar"
      color="#9c6cd3"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="redirect_home">
            <v-icon>mdi-movie-open</v-icon>
          </v-btn>
        </template>
        <span>Home</span>
      </v-tooltip>
      <v-toolbar-title id="app-title">Movie Reviews</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="redirect_profile">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <span>Profile</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="logout">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip>
      </div>
      <div v-if="!isLoggedIn">
        <v-btn id="app-bar-button" elevation="0" @click="redirect_register">Register</v-btn>
        <v-btn id="app-bar-button" elevation="0" @click="redirect_login">Login</v-btn>
      </div>
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
    redirect_profile: function () {
      // this.$router.push("/profile");
      console.log('al perfil');
    },
    redirect_register: function () {
      this.$router.push("/register");
    },
    redirect_login: function () {
      this.$router.push("/login");
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
  padding-left: 1em;
}
#app-bar-button {
  background-color: transparent;
  color: white;
}
</style>