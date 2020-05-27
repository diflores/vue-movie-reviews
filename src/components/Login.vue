<template>
  <div id="login-container">
    <section id="login-section">
      <h1 id="login-title">Welcome back!</h1>
      <p id="login-description">We missed your reviews</p>
      <v-form id="login-form">
        <v-text-field
          single-line
          outlined
          color="#b08adc"
          label="Email"
          type="email"
          v-model="email"
        ></v-text-field>
        <v-text-field
          single-line
          outlined
          color="#b08adc"
          label="Password"
          v-model="password"
          @click:append="show_password = !show_password"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show_password ? 'text' : 'password'"
        ></v-text-field>
        <v-btn elevation="0" id="login-button" @click="login" :loading="is_loading">Login</v-btn>
      </v-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      show_password: false,
      is_loading: false,
    };
  },
  methods: {
    login: function() {
      let username = this.email;
      let password = this.password;
      this.is_loading = true;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err))
        .finally(() => { this.is_loading = false; });
    }
  }
};
</script>
<style>
#login-container {
  padding-top: 5em;
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
  color: var(--grey);
}
#login-section {
  width: 25em;
}
#login-title {
  text-align: center;
  font-size: 2em;
  padding-top: 1em;
  font-weight: 300;
}
#login-description {
  text-align: center;
  font-size: 1em;
  padding: 1em;
}
#login-form {
  margin: 0 auto;
  padding: 2em;
}
#login-button {
  margin-top: 1em;
  background-color: var(--primary-color);
  color: white;
}
</style>