import {
  UPDATE_QUERY,
  UPDATE_QUERY_ITEMS
} from '../mutation-types'

const state = {
  query: {},
  items: []
}

const mutations = {
  [UPDATE_QUERY] (state, newQuery) {
    state.query = newQuery
  },
  [UPDATE_QUERY_ITEMS] (state, newItems) {
    state.items = newItems
  }
}

export default {
  state,
  mutations
}
