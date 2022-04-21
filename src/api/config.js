import $http from '@/utils/http.js';
export const config = (data)=> {
    return $http({
        url: 'config',
        data
    })
}
