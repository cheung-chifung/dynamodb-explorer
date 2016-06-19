import Vue from 'vue'
import Vuex from 'vuex'

import connection from './modules/connection'
import table from './modules/table'
import query from './modules/query'

import createLogger from 'vuex/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    connection,
    table,
    query
  },
  moddlewares: debug ? [createLogger()] : []
})
