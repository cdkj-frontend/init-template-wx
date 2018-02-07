const state = {
  list: [],
  checkList: []
}

const mutations = {
  updateList (state, list) {
    state.list = list
  },
  updateCheckList (state, checkList) {
    state.checkList = checkList
  }
}

const actions = {
  // 将选项加入勾选列表
  checkItem (context, val) {
    const checkList = context.state.checkList
    checkList.push(val)
    context.commit('updateCheckList', checkList)
    // if (checkList.length === context.state.list.length) {
    //   context.commit('updateCheckAll', true)
    // }
  },
  // 将选项从勾选列表中移除
  unCheckItem (context, val) {
    const uncheckId = val.id
    const checkList = context.state.checkList
    let uncheckIndex = null
    checkList.forEach((item, index) => {
      if (item.id === uncheckId) {
        uncheckIndex = index
      }
    })
    if (uncheckIndex === null) {
      console.warn('勾选列表中不存在该项')
      return
    }
    context.commit('updateCheckList', checkList.remove(uncheckIndex))
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
