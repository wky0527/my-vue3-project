import * as configRequest from '@/api/config';
const config = {
    namespaced: true,
    state: {
        home_banner: [],//首页banner图
    },
    mutations: {
        SET_CONFIGS(state,payload) {
            state.home_banner = payload.home_banner
            state.screen_type = payload.screen_type
            state.price_range = payload.price_range
        }
    },
    actions: {
        async setConfigs({commit}){
            const {data:data} = await configRequest.config()
            commit('SET_CONFIGS', data[0].configs)
        },
        inits({dispatch}) {
            dispatch('setConfigs');
        }
    }
}
export default config
