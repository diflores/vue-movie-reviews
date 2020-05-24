<template>
  <div class="container">
    <section>
      <form @submit.prevent="login">
        <h1>Login</h1>
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
  background-color: #6a62d2;
}
.container {
  align-items: center;
}
section {
  height: auto;
  margin: 0 auto;
  width: 30em;
  background-color: #ffffff;
}
form {
  width: 50%;
  margin: 0 auto;
}
.input {
  background-color: #e5e8ed !important;
}
</style>