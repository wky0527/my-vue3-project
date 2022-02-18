/**
 * 获取access_token
 * @returns {*}
 */
const getAccessToken = () => {
    return uni.getStorageSync('access_token');
};

/**
 * 设置 access_token
 * @param token
 * @returns {*}
 */
const setAccessToken = (token) => {
    return uni.setStorageSync('access_token', token);
};

/**
 * 删除accessToken
 */
const removeAccessToken = () => {
    return uni.removeStorageSync('access_token');
};

export {
    getAccessToken,
    setAccessToken,
    removeAccessToken
}
