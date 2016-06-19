import {
  UPDATE_TABLE_LIST
} from '../mutation-types'

const state = {
  list: [],
  table: null
}

const mutations = {
  [UPDATE_TABLE_LIST] (state, newTableList) {
    console.log(state.list)
    state.list.slice(0, state.list.length)
    console.log(state.list)
    newTableList.forEach(table => {
      state.list.push(table)
    })
  }
}

export default {
  state,
  mutations
}
