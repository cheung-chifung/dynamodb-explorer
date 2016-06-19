import {
    ADD_CONNECTION,
    REMOVE_CONNECTION,
    SET_CURRENT_CONNECTION,

    UPDATE_TABLE_LIST,

    UPDATE_QUERY,
    UPDATE_QUERY_ITEMS
} from './mutation-types'

export const addConnection = makeSimpleAction(ADD_CONNECTION)
export const removeConnection = makeSimpleAction(REMOVE_CONNECTION)
export const setCurrentConnection = makeSimpleAction(SET_CURRENT_CONNECTION)

export const updateTableList = makeSimpleAction(UPDATE_TABLE_LIST)

export const updateQuery = makeSimpleAction(UPDATE_QUERY)
export const updateQueryItems = makeSimpleAction(UPDATE_QUERY_ITEMS)

function makeSimpleAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
