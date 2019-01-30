import user from './modules/user'
import cart from './modules/cart'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
    modules: {
        user,
        cart
    },
    strict: debug
})


export default store