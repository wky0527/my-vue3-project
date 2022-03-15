import {createStore} from 'vuex';
import user from './modules/user.js';
import config from './modules/config.js';
import getters from './getters.js';
const store = createStore({
    modules: {
        user,
        config
    },
    getters
})
export default store;
