import axios from 'axios'
import store from '../store'

//获取所有的城市  返回promise对象
export const allCities = ()=> axios('/static/json/allCity.json');

//搜索当前城市具体地址
export const getAddress = (keyword, lnglat) => axios('/elm/restapi/bgs/poi/search_poi_nearby_alipay',{
    params: {
        keyword: keyword || null,
        offset: 0,
        limit: 20,
        latitude: lnglat? lnglat.lat : store.state.user.lnglat.lat,
        longitude: lnglat? lnglat.lng : store.state.user.lnglat.lng,
    }
})

//第一次登录时没有成功定位
export const getAddressFirst = (keyword) => axios('/elm/restapi/bgs/poi/search_poi_nearby_alipay', {
  params: {
    keyword: keyword,
    offset: 0,
    limit: 20
  }
})

//获取首页分类列表
export const getEntries = () => axios('/elm/restapi/shopping/v2/entries?templates[]=main_template&templates[]=favourable_template&templates[]=svip_template&terminal=h5', {
  params :{
    latitude: store.state.user.lnglat.lat,
    longitude: store.state.user.lnglat.lng
  }
})


//获取店铺列表shoplist
export const getShopList = (offset) => axios('/elm/restapi/shopping/v3/restaurants?extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5',{
  params: {
    latitude: store.state.user.lnglat.lat,
    longitude: store.state.user.lnglat.lng,
    offset: offset || 0,
    limit: 8
  }
})

//orderby获取店铺列表
export const getShopListOrderBy = (offset, order_by) => axios('/elm/restapi/shopping/v3/restaurants?extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5', {
  params: {
    latitude: store.state.user.lnglat.lat,
    longitude: store.state.user.lnglat.lng,
    offset: offset || 0,
    limit: 8,
    order_by: order_by
  }
})

//获取首页类表分类 排序
export const sortFilter = () => axios('/elm/pizza/shopping/restaurants/batch_filter?terminal=h5', {
  params: {
    latitude: store.state.user.lnglat.lat,
    longitude: store.state.user.lnglat.lng
  }
})
//选择筛选
export const confirmFilter = (offset, str) => axios('/elm/restapi/shopping/v3/restaurants?limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=242cf81226024879b12f1fa6c90fa038&terminal=h5'+ str,{
  params: {
    latitude: store.state.user.lnglat.lat,
    longitude: store.state.user.lnglat.lng,
    offset: offset || 0
  }
})
// https: //h5.ele.me/pizza/shopping/restaurants/E7344966392726012905/batch_shop
export const getShopDetail = () => axios('/static/json/shopDetail.json')

// export const getEvaluate = (offset) => axios('/elm/pizza/ugc/restaurants/E5585617528783392987/batch_comments?has_content=true', { params: {
//   offset: offset || 0,
//   limit: 20
// }
// })

export const getEvaluate= ()=> axios('/static/json/evaluate.json')

export const getComments = (offset) => axios('/elm/restapi/ugc/v3/restaurants/E4956603669926452321/ratings?has_content=true', {
    params: {
      tag_name: '全部',
      offset: offset || 0,
      limit: 20
}
})

export const getBusiness= ()=> axios('/static/json/business.json')

//获取搜索的热门词
export const getHotSearchWord = () => axios('/elm/restapi/shopping/v3/hot_search_words', {
  params: {
    latitude: store.state.user.lnglat.lat,
    longitude: store.state.user.lnglat.lng
  }
})


// 根据关键字搜索
export const search = (keyword, source, type) => axios('/elm/restapi/shopping/v2/restaurants/search', {
  params: {
    offset: 0,
    limit: 15,
    keyword: keyword,
    latitude: store.state.user.lnglat.lat,
    longitude: store.state.user.lnglat.lng,
    search_item_type: source || 3,
    is_rewrite: type || 1,
    'extras[]': 'activities',
    'extras[]': 'coupon',
    terminal: 'h5'
  }
})

// https: //h5.ele.me/restapi/shopping/v1/typeahead?kw=%E9%A6%99%E8%95%89&latitude=31.405284&longitude=120.971111&city_id=8
export const getKeyWords = (kw) => axios('/elm/restapi/shopping/v1/typeahead', {
  params: {
    kw: kw,
    latitude: store.state.user.lnglat.lat,
    longitude: store.state.user.lnglat.lng,
    city_id: store.state.user.cityId
  }
})

export const getPartForm = () => axios('/elm/restapi/member/v1/discover?platform=1&block_index=0')

export const getMarker = () => axios('/elm/restapi/member/gifts/suggest')