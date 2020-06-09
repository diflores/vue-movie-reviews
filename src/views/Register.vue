<template>
  <div id="register-container">
    <section id="register-section">
      <h1 id="register-title">Welcome to Movie Reviews!</h1>
      <p id="register-description">
        Check out the latest reviews from our community and don't waste your time with lame movies
      </p>
      <v-form id="register-form">
        <v-text-field
          single-line
          outlined
          color="#b08adc"
          label="First name"
          type="text"
          v-model="first_name"
        ></v-text-field>
        <v-text-field
          single-line
          outlined
          color="#b08adc"
          label="Last name"
          type="text"
          v-model="last_name"
        ></v-text-field>
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
        >
        </v-text-field>
        <v-text-field
          single-line
          outlined
          color="#b08adc"
          label="Confirm password"
          v-model="password_confirmation"
          @click:append="show_password_confirmation = !show_password_confirmation"
          :append-icon="show_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show_password_confirmation ? 'text' : 'password'"
        ></v-text-field>
        <v-btn elevation="0" id="register-button" @click="register" :loading="is_loading">Register</v-btn>
      </v-form>
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
      is_admin: null,
      show_password: false,
      show_password_confirmation: false,
      is_loading: false,
    };
  },
  methods: {
    register: function() {
      this.is_loading = true;
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err))
        .finally(() => { this.is_loading = false; });
    }
  }
};
</script>
<style>
:root {
  --primary-color: #9c6cd3;
  --secondary-color: #b08adc;
  --grey: #4a4a4a;
}
#register-container {
  padding-top: 2em;
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
  color: var(--grey);
}
#register-section {
  width: 25em;
}
#register-title {
  text-align: center;
  font-size: 2em;
  padding-top: 1em;
  font-weight: 300;
}
#register-description {
  text-align: center;
  font-size: 1em;
  padding: 1em;
}
#register-form {
  margin: 0 auto;
  padding: 2em 1em;
}
#register-button {
  margin-top: 1em;
  background-color: var(--primary-color);
  color: white;
}
</style>