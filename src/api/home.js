import $http from '@/utils/http.js';
export const introduceTeacher = (data)=> {
    return $http({
        url: 'home-teacher',
        data
    })
}
