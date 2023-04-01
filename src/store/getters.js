export default {
  token: state => state.user.token,
  position: state => {
    return [state.map.longitude, state.map.latitude]
  }
}