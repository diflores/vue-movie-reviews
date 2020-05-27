<template>
  <div id="login-container">
    <section id="login-section">
      <h1 id="login-title">Welcome back!</h1>
      <p id="login-description">We missed your reviews</p>
      <form id="login-form" @submit.prevent="login">
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
        <v-btn elevation="0" id="login-button" native-type="submit">Login</v-btn>
      </form>
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
    };
  },
  methods: {
    login: function() {
      let username = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>
<style>
#login-container {
  padding-top: 10em;
  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;
  width: 100vw;
  color: var(--grey);
}
#login-section {
  width: 25em;
}
#login-title {
  text-align: center;
  font-size: 2em;
  padding-top: 1em;
}
#login-description {
  text-align: center;
  font-size: 1em;
  padding: 1em;
  font-weight: 300;
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