import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const initialState = {
  data: [],
  loading: [],
};

function findIndex(array, name) {
  return array.findIndex(i => i.name === name.toUpperCase());
}

const actions = {
  init({ commit }) {
    axios.get('/api/v1/init').then((res) => {
      commit('init', res.data);
    }).catch(() => { });
  },
  addItem({ commit, state }, name) {
    const promiseIdx = findIndex(state.loading, name);
    if (promiseIdx !== -1) {
      return promiseIdx.promise;
    }
    /* eslint-disable */
    const promise = new Promise((resolve, reject) => {
      if (findIndex(state.data, name) !== -1) {
        resolve();
        return;
      }

      axios.get(`/api/v1/get/${name}`).then((res) => {
        commit('add', res.data);
        resolve();
      }).catch(() => { reject(); });
    });
    commit('loading', { name, promise });
    return promise;
  },
  removeItem({ commit }, name) {
    commit('remove', name);
  },
};

const mutations = {
  init(state, data) {
    state.data = data // eslint-disable-line
    state.data.sort((a, b) => a.symbol.localeCompare(b.symbol));
  },
  add(state, item) {
    if (findIndex(state.data, name) !== -1) return;
    state.data.push(item);
    state.data.sort((a, b) => a.name.localeCompare(b.name));
    state.loading.splice(findIndex(state.loading, name), 1);
  },
  remove(state, name) {
    const index = findIndex(state.data, name);
    if (index !== -1) {
      state.data.splice(index, 1);
    }
  },
  loading(state, data) {
    state.loading.push(data);
  },
};

export default new Vuex.Store({
  state: initialState,
  actions,
  mutations,
  strict: true,
});
