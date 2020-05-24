<template>
  <div class="container">
    <section>
      <h1 class="login-title">Login</h1>
      <form @submit.prevent="login">
        <b-field label="Email">
          <b-input class="login-input" type="email" v-model="email"></b-input>
        </b-field>
        <b-field label="Password">
          <b-input class="login-input" value="123" v-model="password" type="password"></b-input>
        </b-field>
        <b-button class="button is-primary" native-type="submit">Login</b-button>
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
body {
  background-color: #714dd2;
  height: 100%;
}
.container {
  padding-top: 10em;
  display: flex;
  justify-content: center;
  position: relative;
}
section {
  width: 35em;
  background-color: #ffffff;
  height: 25em;
}
.login-title {
  text-align: center;
  font-size: 2em;
  padding-top: 1em;
}
form {
  margin: 0 auto;
  width: 65%;
  padding-top: 2em;
}
.input {
  background-color: #e5e8ed !important;
}
</style>