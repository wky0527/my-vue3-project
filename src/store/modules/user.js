import {setAccessToken,removeAccessToken} from "../../utils/auth.js";
import * as user from '@/api/user';
export default {
	namespaced: true,
    state: {
		accessToken: '',
		userInfo: {}
    },
    mutations: {
		setAccessToken: (state, accessToken) => {
			state.accessToken = accessToken;
		},
		setUserInfo: (state, info) => {
			state.userInfo = info
		}
    },
    actions: {
		//登录
		async login({commit}, params) {
			const {data:data} = await user.login(params)
			commit('setAccessToken',data[0].access_token)
			setAccessToken(data[0].access_token)
			return data[0]
		},
		//登出
		async logout({commit}) {
			commit('setUserinfo',null)
			commit('setAccessToken','')
			removeAccessToken();
		},
		//获取用户信息
		async userInfo({commit}) {
			const {data:data} = await user.userInfo;
			commit('setUserInfo',data)
			return data
		}
    }
}
