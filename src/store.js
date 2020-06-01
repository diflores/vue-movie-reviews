import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from 'qs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `${process.env.VUE_APP_API_BASE_URL}/users/login/jwt`,
          data: qs.stringify(user),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // get current user to save it in state
            axios({
              url: `${process.env.VUE_APP_API_BASE_URL}/users/me`,
              method: "GET"
            }).then((response) => {
              const loggedUser = response.data;
              localStorage.setItem("token", token);
              commit("auth_success", token, loggedUser);
              resolve(resp);
            }).catch((error) => {
              commit("auth_error");
              localStorage.removeItem("token");
              reject(error);
            });
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `${process.env.VUE_APP_API_BASE_URL}/users/register`,
          data: user,
          method: "POST"
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    create_review(_, review) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${process.env.VUE_APP_API_BASE_URL}/reviews`,
          data: review,
          method: "POST"
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    loggedUSer: state => state.user,
  }
});
