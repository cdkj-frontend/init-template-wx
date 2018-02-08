export default {
  updateLoadingStatus (state, isLoading) {
    state.isLoading = isLoading
  },
  updateDirection (state, direction) {
    state.direction = direction
  },
  setConId (state, conId) {
    state.conId = conId
  },
  setOpenId (state, openId) {
    state.openId = openId
  }
}
