import isEqual from 'lodash.isequal'
import spoof from '../../services/spoof'

const state = {
  all: [],
  selected: '',
  updating: []
}

const getters = {
  selected: state => state.all.find(i => i.device === state.selected) || {},
  isUpdating: state => device => state.updating.indexOf(device) >= 0
}

const mutations = {
  SET_INTERFACES (state, payload) {
    state.all = payload
  },
  SELECT_INTERFACE (state, payload) {
    state.selected = payload.device
  },
  UPDATE_INTERFACE (state, payload) {
    state.all = [...state.all.filter(i => i.device !== payload.device), payload]
  },
  ADD_UPDATING (state, payload) {
    state.updating.push(payload)
  },
  REMOVE_UPDATING (state, device) {
    const index = state.updating.indexOf(device)
    if (index >= 0) {
      state.updating.splice(index, 1)
    }
  }
}

const actions = {
  setInterfaces ({ state, commit }, payload) {
    if (!isEqual(payload, state.all)) {
      commit('SET_INTERFACES', payload)
    }
  },
  selectInterface ({ state, commit }, device) {
    const selected = state.all.find(i => i.device === device)
    if (selected) {
      commit('SELECT_INTERFACE', selected)
    }
  },

  randomize ({ commit }, device) {
    commit('ADD_UPDATING', device)
    return spoof.randomize(device)
      .then(() => {
        const update = spoof.findInterface(device)
        commit('UPDATE_INTERFACE', update)
        commit('REMOVE_UPDATING', device)
      })
      .catch(err => {
        console.error(err)
        commit('REMOVE_UPDATING', device)
      })
  },

  reset ({ commit }, device) {
    commit('ADD_UPDATING', device)
    return spoof.reset(device)
      .then(() => {
        const update = spoof.findInterface(device)
        commit('UPDATE_INTERFACE', update)
        commit('REMOVE_UPDATING', device)
      })
      .catch(err => {
        console.error(err)
        commit('REMOVE_UPDATING', device)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
