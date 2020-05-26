<template>
  <div id="login-container">
    <section id="login-section">
      <h1 id="login-title">Welcome back!</h1>
      <p id="login-description">We missed your reviews</p>
      <form id="login-form" @submit.prevent="login">
        <b-field label="Email">
          <b-input class="login-input" type="email" v-model="email" required></b-input>
        </b-field>
        <b-field label="Password">
          <b-input class="login-input" v-model="password" type="password" required></b-input>
        </b-field>
        <b-button id="login-button" class="button is-primary" native-type="submit">Login</b-button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
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
.login-input {
  background-color: #e5e8ed !important;
}
#login-button {
  margin-top: 1em;
  background-color: var(--primary-color) !important;
}
</style>