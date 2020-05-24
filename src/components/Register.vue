<template>
  <!-- <form @submit.prevent="register">
      <label for="first-name">First Name</label>
      <div>
        <input id="first-name" type="text" v-model="first_name" required autofocus />
      </div>
      <label for="last-name">Last Name</label>
      <div>
        <input id="last-name" type="text" v-model="last_name" required autofocus />
      </div>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>
      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required />
      </div>

      <div>
        <button type="submit">Register</button>
  </div>-->
  <!-- </form> -->
  <div id="register-container">
    <section id="register-section">
      <h1 id="register-title">Register</h1>
      <form id="register-form" @submit.prevent="register">
        <b-field label="First name">
          <b-input type="text" class="register-input" v-model="first_name" required></b-input>
        </b-field>
        <b-field label="Last name">
          <b-input type="text" class="register-input" v-model="last_name" required></b-input>
        </b-field>
        <b-field label="Email">
          <b-input type="email" class="register-input" v-model="email" required></b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" class="register-input" v-model="password" required></b-input>
        </b-field>
        <b-field label="Confirm password">
          <b-input type="password" class="register-input" v-model="password_confirmation" required></b-input>
        </b-field>
        <b-button class="button is-primary" native-type="submit">Register</b-button>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null
    };
  },
  methods: {
    register: function() {
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>
<style>
#register-container {
  background-color: #714dd2;
  padding-top: 5em;
  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;
  width: 100vw;
}
#register-section {
  width: 35em;
  background-color: #ffffff;
  height: 80vh;
}
#register-title {
  text-align: center;
  font-size: 2em;
  padding-top: 1em;
}
#register-form {
  margin: 0 auto;
  width: 65%;
  padding-top: 2em;
}
.register-input {
  background-color: #e5e8ed !important;
}
</style>