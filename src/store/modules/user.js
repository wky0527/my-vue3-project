import {setAccessToken,removeAccessToken} from "../../utils/auth.js";
import * as userRequest from '@/api/user';
const userInfo =  {
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
			const {data:data} = await userRequest.login(params)
			commit('setAccessToken',data[0].access_token)
			setAccessToken(data[0].access_token)
			return data[0]
		},
		//登出
		async logout({commit}) {
			await userRequest.logout()
			commit('setUserinfo',null)
			commit('setAccessToken','')
			removeAccessToken();
		},
		//获取用户信息
		async userInfo({commit,dispatch}) {
			const data = await userRequest.userInfo();
			//设置用户信息
			commit('setUserInfo',data)
			return data
		}
    }
}
export default userInfo;
