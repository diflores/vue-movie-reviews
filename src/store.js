import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    userId: localStorage.getItem("userId") || ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, [token, userId]) {
      state.status = "success";
      state.token = token;
      state.userId = userId;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.userId = "";
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
            "content-type": "application/x-www-form-urlencoded;charset=utf-8"
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
            })
              .then(response => {
                const userId = response.data.id;
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                console.log(userId);
                commit("auth_success", [token, userId]);
                resolve(resp);
              })
              .catch(error => {
                commit("auth_error");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                reject(error);
              });
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
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
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    loggedUserId: state => state.userId
  }
});
