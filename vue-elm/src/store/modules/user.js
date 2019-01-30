
import {
  getCookie,
  setCookie,
  setStore,
  getStore, 
  removeStore
} from '../../modules/mUtil'

const SETADDRESS = 'SETADDRESS';
const SETUSERINFO = 'SETUSERINFO';
const EXIT= 'EXIT';
const SETLOGIN = 'SETLOGIN';
const UPDATEUSER = 'UPDATEUSER';
const ADD_ADDRESS_INFO ='ADD_ADDRESS_INFO';
const REMOVE_ADDRESS_INFO = 'REMOVE_ADDRESS_INFO';
const EDIT_ADDRESS_INFO = 'EDIT_ADDRESS_INFO';
const SET_CACHE = 'SET_CACHE';
const SET_SEARCH_HISTORY = 'SET_SEARCH_HISTORY'
//一般使用设置在state中的值，放在cookie中的数据只有在浏览器刷新的时候才会去获取
const state={
    lnglat: getCookie('lnglat')? getCookie('lnglat') : {},
    addressName: getCookie('address')? getCookie('address'): '',//地址
    currentCity: getCookie('city')? getCookie('city'): '',
    userInfo: getStore('userInfo') ? getStore('userInfo') : {},
    login: getStore('login') ? getStore('login') : false,
    addressInfo: getStore('addressInfo') ? getStore('addressInfo') : [],
    cachePages: [],
    addrId: getStore('addrId')? getStore('addrId'): 1,
    currId: getCookie('currId')? getCookie('currId'): 0,
    search_history: getStore('search_history') ? getStore('search_history'): []
}



const actions= {
  setSearchHistory({commit} ,kw){
    let sh= getStore('search_history') || [];
    if(sh.indexOf(kw) === -1){
      sh.unshift(kw);
    }
    commit(SET_SEARCH_HISTORY, sh);
    setStore('search_history', sh);
  },
  removeSearchHistory({commit}){
    commit(SET_SEARCH_HISTORY, []);
    removeStore('search_history');
  }
}


const mutations= {
    [SETADDRESS](state, {
      cityId,
      currentCity,
      addressName,
      lnglat,
      currId
    }){
      state.cityId= cityId;
      state.currentCity= currentCity;
      state.addressName= addressName;
      state.lnglat= lnglat;
      if(currId){
        state.currId= currId;
        setCookie('currId', currId);
      }
      setCookie('cityId', cityId);
      setCookie('address', addressName);
      setCookie('city', currentCity);
      setCookie('lnglat', lnglat);
    },
    [SETUSERINFO](state, info){
      //第一个参数是目标对象，后面的是源对象，将源对象中的值复制到目标对象，返回这个对象
      info= Object.assign({}, state.userInfo, info);
      state.userInfo= info;
      state.login= true;
      setStore('userInfo', info);
      setStore('login', true);
    },
    [UPDATEUSER](state, info){
      info= Object.assign({}, state.userInfo, info);
      state.userInfo= info;
      setStore('userInfo', info);
    },
    [SETLOGIN](state, login){
      state.login= login;
      setStore('login', login);
    },
    [EXIT](state){
      state.login= false;
      setStore('login', false);
    },
    [ADD_ADDRESS_INFO](state, addressInfo){
      //将添加进来的addressInfo添加到对象中，而不是给对象重新赋值
      addressInfo.id= state.addrId;
      state.addrId++;
      state.addressInfo.push(addressInfo);
      setStore('addrId', state.addrId);
      setStore('addressInfo', state.addressInfo);
    },
    [EDIT_ADDRESS_INFO](state,addressInfo){
      //编辑地址
      state.addressInfo= addressInfo;
      setStore('addressInfo', addressInfo);
    },
    [REMOVE_ADDRESS_INFO](state, addressIndex){
      //根据index删除地址
      state.addressInfo.splice(addressIndex, 1);
      setStore('addressInfo', state.addressInfo);
    },
    [SET_CACHE](state, arr) {
      //设置缓存的页面
      state.cachePages = arr;
    },
    [SET_SEARCH_HISTORY]( state, newsh){
      state.search_history= newsh;

    }
}




export default {
  namespaced: true,
  state,
  mutations,
  actions
}