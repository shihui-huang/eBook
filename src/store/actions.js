const actions = {
  setFileName: ({ commit }, fileName) => {
    return commit('SET_FILENAME', fileName)
  },
  setMenuVisible: ({ commit }, menu) => {
    return commit('SET_MENUVISIBLE', menu)
  }
}
export default actions
