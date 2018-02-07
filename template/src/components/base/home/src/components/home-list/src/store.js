const state = {
  categoryId: '',
  list: []
}

const mutations = {
  updateList (state, list) {
    state.list = list
  },
  updateCategoryId (state, categoryId) {
    state.categoryId = categoryId
  }
}

export default {
  state,
  mutations,
  namespaced: true
}
