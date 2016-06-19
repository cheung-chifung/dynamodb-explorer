import {
    ADD_CONNECTION,
    REMOVE_CONNECTION,
    SET_CURRENT_CONNECTION,
    UPDATE_TABLE_LIST
} from './mutation-types'

export const addConnection = makeSimpleAction(ADD_CONNECTION)
export const removeConnection = makeSimpleAction(REMOVE_CONNECTION)
export const setCurrentConnection = makeSimpleAction(SET_CURRENT_CONNECTION)
export const updateTableList = makeSimpleAction(UPDATE_TABLE_LIST)

function makeSimpleAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
