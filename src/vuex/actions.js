//test
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}
export const updateName = function({ commit, state }, name) {
  const payload = {name}
  commit('UPDATE_PAGE', payload)
}
export const SetRecommenderCode = function({commit}, val) {
  commit('SET_RECOMMENDER_CODE', val)
}
export const setIdentutyFlag = function({commit}, flag) {
  commit('setIdentutyFlag', flag)
}
export const setBankInfoFlag = function({commit}, flag) {
  commit('setBankInfoFlag', flag)
}