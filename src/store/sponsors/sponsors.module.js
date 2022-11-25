import sponsorsService from "@/api/sponsors.service";
import { 
  // Actions
  FETCH_SPONSORS,
  ADD_SPONSORS,
  EDIT_SPONSORS,
  REMOVE_SPONSORS,
  // Mutations 
  SET_SPONSORS,
  SET_MESSAGE 
} from "./sponsors.constants";

const state = {
  sponsors: [],
  message: ""
};

const getters = {
  getSponsors: state => state.sponsors,
  getSponsorsById: state => id => {
    return state.sponsors.find(sponsor => sponsor._id === id)
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_SPONSORS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      sponsorsService.getSponsors(rootState.auth.token)
        .then(
          res => {
            commit(SET_SPONSORS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [ADD_SPONSORS]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorsService.addSponsors(rootState.auth.token, payload)
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
  [EDIT_SPONSORS]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorsService.editSponsors(rootState.auth.token, payload)
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
  [REMOVE_SPONSORS]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      sponsorsService.removeSponsors(rootState.auth.token, id)
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
  [SET_SPONSORS]: (state, sponsors) => {
    state.sponsors = sponsors;
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