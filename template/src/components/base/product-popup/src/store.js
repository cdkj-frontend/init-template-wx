const state = {
  isShow: false,
  productInfo: {},
  pntId: null,
  type: 'buy' // 当前弹窗的类型，buy-立即购买，cart-加入购物车
}

const mutations = {
  toggleShow (state, isShow) {
    state.isShow = isShow
  },
  updateType (state, type) {
    state.type = type
  },
  updateId (state, pntId) {
    state.pntId = pntId
  }
}

const actions = {
  toggle (context) {
    context.commit('toggleShow', !context.state.isShow)
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
