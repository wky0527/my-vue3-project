const getters = {
  getAccessToken: state => state.user.accessToken,
  user: state => state.user.userInfo,
  config: state => state.config
}
export default getters;
