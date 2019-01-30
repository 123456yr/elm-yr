
import {
  getCookie,
  setCookie,
  removeCookie,
  setStore,
  getStore,
  removeStore
} from '../../modules/mUtil'

const UPDATECART = 'UPDATECART';
const UPDATEORDER = 'UPDATEORDER';
const SETSTATUS = 'SETSTATUS'

const state={
    cart: getCookie('goodInfo') ? getCookie('goodInfo') : [],
    orders: getStore('orders') ? getStore('orders') : [],
    orderId: getStore('orderId')? getStore('orderId'): 0
}

const getters={
    totalInfo(state){
        let total={ num: 0, price: 0};
        // if(state.cart.length<=0) return;
        state.cart.forEach(item=>{
            total.num += item.num;
            total.price += item.num* item.price;
        })
        return total;
    }
}
// 第一参数是store对象包括store的变量state , commit .dispatch , getter等
// 第二个参数是是个参数数组，或对象，只能有两个参数
const actions={
    initCart({commit}){
        //vuex中的东西刷新就没有了，要从本地存储重新获取
        let infos=getCookie('goodInfo')?getCookie('goodInfo'): [];
        commit(UPDATECART, infos);
    },
    addFoodInCart({commit}, goodinfo){
        let infos = getCookie('goodInfo') || [];
        let hasInfo= infos.some((item )=>{
            if(item.id === goodinfo.id){
                item.num++;
                return true;
            }
            return false;
        })
        if( !hasInfo ){
            goodinfo.num=1;
            infos.push(goodinfo);
        }
        setCookie('goodInfo', infos);
        commit(UPDATECART, infos)
    },
    reduceFoodInCart({commit}, id){
        let infos= getCookie('goodInfo') || [];
        infos= infos.filter(item=>{
            if(item.id=== id){
                item.num--;
                if(item.num<=0){
                    return false;
                }
                return true;
            }
            return true;
        })
        setCookie('goodInfo', infos);
        commit(UPDATECART, infos);
    },
    clearCart({commit}){
        removeCookie('goodInfo');
        commit(UPDATECART, []);
    },
    setOrder({commit, state}, name){
        let cart= state.cart;
        let orders= getStore('orders') || [];
        let orderInfo=  {};
        orderInfo.id= state.orderId + 1;
        orderInfo.status = '等待支付';
        orderInfo.shopName= name;
        orderInfo.time= Date.now();
        orderInfo.goodInfo= cart;
        orders.unshift(orderInfo);
        setStore('orderId', state.orderId + 1);
        setStore('orders', orders);
        commit(UPDATEORDER, orders);
    },
    setOrderStatus({commit}, {orderId, status}){
        let orders= getStore('orders') || [];
        orders.forEach(item=>{
            if(item.id=== orderId){
                if(status){
                    item.status = status;
                }
                
            }
        })
        
        commit(SETSTATUS, orders);
        setStore('orders', orders);
    }
}



const mutations={
    [UPDATECART](state, newcart){
        state.cart= newcart;
    },
    [UPDATEORDER](state, neworder){
        state.orders= neworder;
        state.orderId++;
    },
    [SETSTATUS](state, neworder){
        state.orders= neworder;
    }
}







export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}