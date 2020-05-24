<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="first-name">First Name</label>
      <div>
        <input id="first-name" type="text" v-model="first_name" required autofocus />
      </div>
      <label for="last-name">First Name</label>
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
      </div>
    </form>
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