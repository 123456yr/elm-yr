//判断是否为对象形式的字符串，可以被JSON.parse转换的就换，不可以的返回这个字符串
export const isObj= (str)=>{
  if(!str) return;
  try{
    //'false' 也能被转换
    var obj = JSON.parse(str);
    return obj;
  } catch( e ){
    return str;
  }
}

// 存储localStorage
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

// 获取localStorage
export const getStore = name => {
  if (!name) return;
  var str= window.localStorage.getItem(name);
  return isObj(str)
}

//删除localStorage
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

//设置cookie
export const setCookie = (name, value, day) => {
  if (!name) return;
  if(typeof value !== 'string') value= JSON.stringify(value)
  if (day) {
    var expires = day * 24 * 60 * 60 * 1000;
    var date = new Date();
    date.setTime(Date.getTime + expires); //设置过期时间
    //escape cookie中不能有空格 ， encodeURI将空格等字符转义后存储
    document.cookie = name + '=' + encodeURI(value) + '; expires=' + date.toUTCString();
  } else {
    document.cookie = name + '=' + encodeURI(value);
  }
}

//获取cookie
export const getCookie = name => {
  if (!name) return;
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    //将encode编码的字符解码,数组中的第3个是value值
    return isObj(decodeURI(arr[2]))
  } else {
    return false;
  }
}

//删除cookie
export const removeCookie = name => {
  setCookie(name, '', -1);
}

// 获取样式
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  //scrollTop 的获取的方式不同，他不属于style，document.documentElement/body.scrollTop
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (window.getComputedStyle) {
    //获取到string类型的样式, 在这里只获取数值样式
    target = window.getComputedStyle(element, null)[attr];
  } else {
    //兼容ie
    target = element.currentStyle[attr];
  }
  //opacity要返回小数 其他值返回整数 使用,如果设置时设置的rem单位，获取到的也是已转化的px单位值
  return NumberMode === 'float' ? parseFloat(target) : parseInt(target);
}

//高德地图定位
export const getMapPosDetail = (success, error) => {
  let map = new AMap.Map('map');
  map.plugin('AMap.Geolocation', () => {
    var geolocation = new AMap.Geolocation({
      // 是否使用高精度定位，默认：true
      enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout: 10000,
      // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
      buttonOffset: new AMap.Pixel(10, 20),
      //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      zoomToAccuracy: true,
      //  定位按钮的排放位置,  RB表示右下
      buttonPosition: 'RB'
    })

    geolocation.getCurrentPosition()
    AMap.event.addListener(geolocation, 'complete', success);
    AMap.event.addListener(geolocation, 'error', error);
  })
}

//逆向地理编码  经纬度---地址
export const getAddress = (latitude, longitude, callback) => {
  var lnglat = [longitude,latitude];
  AMap.plugin('AMap.Geocoder', function () {
    var geocoder = new AMap.Geocoder({
      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
      city: '全国'
    })

    geocoder.getAddress(lnglat, function (status, result) {
      console.log(result)
      if (status === 'complete' && result.info === 'OK') {
        console.log(result)
        callback(result)
      }
    })
  })
}
//地址---经纬度
export const getLngLat = (address, callback) => {

  AMap.plugin('AMap.Geocoder', function () {
    var geocoder = new AMap.Geocoder({
      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
      city: '全国'
    })

    geocoder.getLocation(address, function (status, result) {
      var lnglat = {};
      if (status === 'complete' && result.info === 'OK') {
        lnglat.lng = result.geocodes[0].location.lng;
        lnglat.lat = result.geocodes[0].location.lat;
        callback(lnglat)
      }
    })
  })
}

//定位到城市
export const getCityByID = (callback) => {

  let city = AMap.plugin('AMap.CitySearch', function () {
    var citySearch = new AMap.CitySearch()
    citySearch.getLocalCity(function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        let city = result.city;
        getLngLat(city, (lnglat) => {
          callback({
            city,
            lnglat
          });
        })

      }
    });
  })
}

//将rem转为px
export const remToPX= (rem)=>{
  return parseInt(document.documentElement.style.fontSize) * rem + 'px';
}

//运动函数  
export const sport = (element, target, duration= 400, mode='linear', callback)=>{
//传入的opacity需要乘100
  if( duration instanceof Function){
    callback= duration;
    duration= 400;
  }
  if( mode instanceof Function){
    callback= mode;
    mode= 'ease-out'
  }
  const targetState={};
  //如果传入为rem的转为px
  Object.keys(target).forEach( attr=>{
    if( typeof target[attr] === 'string'){
      targetState[attr]= parseInt(remToPX(parseFloat(target[attr])));
    }else{
      targetState[attr]= parseInt(target[attr]);
    }
  })
//不用自己设置时间间隔，使用系统间隔时间，系统重绘一次，调用一次该函数
  element.timer= window.requestAnimationFrame(animate)

  function animate(){
    window.cancelAnimationFrame(element.timer);

    let speed=0;
    let flag= true;
    let current;
    let distance;
    for( let attr in target ){
      if( attr === 'opacity'){
        current= getStyle( element, attr)*100; 
      }else{
        current = getStyle(element, attr);
      }
      switch( mode ){
        case 'linear': 
          distance= targetState[attr] - current;
          speed= distance >0 ? duration/8 : -(duration/8);
          if(Math.abs(distance) < Math.abs(speed)){
            speed= distance;
          }
          break;
        case 'ease-out': 
          let num= duration/50;
          distance= targetState[attr]- current;
          speed= distance / num;
          speed= speed > 0 ? Math.ceil(speed): Math.floor(speed);
          break;
      }
      if( attr=== 'opacity'){
        element.style[attr] = (current + speed) / 100;
      }else if(attr === 'scrollTop'){
        document.documentElement.scrollTop= current +speed ; //不用px
      }else{
        element.style[attr] = current + speed +'px';
      }
      if( current!= targetState[attr]){
        flag= false;
      }
      if(flag){
        //如果所有的运动都达到目标值，停止循环动画
        window.cancelAnimationFrame(element.timer);
      }else{
        element.timer= window.requestAnimationFrame(animate);
        
      }
    }
  }

}
