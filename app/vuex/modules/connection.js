import {
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  SET_CURRENT_CONNECTION
} from '../mutation-types'

export const CONNECTION_LIST_STORAGE_KEY = 'DYNAMODB_CONNECTION_LIST'

const state = {
  list: JSON.parse(localStorage.getItem(CONNECTION_LIST_STORAGE_KEY) || '[]'),
  current: {}
}

const mutations = {
  [ADD_CONNECTION] (state, newConnection) {
    state.list.push(newConnection)
    localStorage.setItem(CONNECTION_LIST_STORAGE_KEY, JSON.stringify(state.list))
  },
  [REMOVE_CONNECTION] (state, oldConnection) {
    state.list.$remove(oldConnection)
    localStorage.setItem(CONNECTION_LIST_STORAGE_KEY, JSON.stringify(state.list))
  },
  [SET_CURRENT_CONNECTION] (state, newConnection) {
    state.current = newConnection
  }
}

export default {
  state,
  mutations
}
