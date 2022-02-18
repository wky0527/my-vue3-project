import $http from '@/utils/http.js';
export const login = (data)=> {
    return $http({
        url: 'login',
        data
    })
}
export const logout = () => {
    return $http({
        url: 'logout'
    })
}
export const userInfo = () => {
    return $http({
        url: 'user-info',
        method: 'GET'
    })
}
