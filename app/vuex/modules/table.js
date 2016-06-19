import {
  UPDATE_TABLE_LIST
} from '../mutation-types'

const state = {
  list: [],
  table: null
}

const mutations = {
  [UPDATE_TABLE_LIST] (state, newTableList) {
    state.list = newTableList
  }
}

export default {
  state,
  mutations
}
