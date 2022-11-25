import expertsService from "@/api/experts.service";
import { 
  // Actions
  FETCH_EXPERTS,
  ADD_EXPERTS,
  EDIT_EXPERTS,
  REMOVE_EXPERTS,
  // Mutations 
  SET_EXPERTS,
  SET_MESSAGE 
} from "./experts.constants";

const state = {
  experts: [],
  message: ""
};

const getters = {
  getExperts: state => state.experts,
  getExpertsById: state => id => {
    return state.experts.find(expert => expert._id === id)
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_EXPERTS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      expertsService.getExperts(rootState.auth.token)
        .then(
          res => {
            commit(SET_EXPERTS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [ADD_EXPERTS]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      expertsService.addExperts(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, "sucesso!");
            resolve(res.body) 
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [EDIT_EXPERTS]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      expertsService.editExperts(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, "sucesso!");
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [REMOVE_EXPERTS]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      expertsService.removeExperts(rootState.auth.token, id)
        .then(
          res => {
            commit(SET_MESSAGE, "sucesso!");
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
      });
    }
  };

export const mutations = {
  [SET_EXPERTS]: (state, experts) => {
    state.experts = experts;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}