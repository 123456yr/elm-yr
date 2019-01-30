<template>
   <div class="address-container">
      <head-top headBack="true" headTitle="选择收货地址">
         <div class="search-box" slot="search">
            <router-link :to="{name: 'City'}" class="select">
               <span class="ellipsis">{{changeCity? changeCity : '选择...'}}</span>
               <span class="triangle"></span>
            </router-link>
            <div class="input-box">
               <span class="search-icon"></span>
               <input type="text" v-model="address" placeholder="请输入地址">
            </div>
         </div>
      </head-top>
      <div class="address-content">
         <section class="now-address">

         </section>
         <section class="mine-address" v-show="isSearch" v-if="addressInfo.length">
            <div class="title">收货地址</div>
            <ul>
               <li @click="reAddress(item)" v-for="(item, index) in addressInfo" :key="index">
                  <p class="top">
                     <span class="name">{{item.userName}}</span>
                     <i v-if="item.sex">{{item.sex}}</i>
                     <i>{{item.phone}}</i>
                  </p>
                  <p class="bottom">
                     {{item.address.name}}
                  </p>
               </li>
            </ul>
         </section>
         <div class="search-content" v-show="!isSearch"  v-if="searchAddress.length !== 0">
            <ul>
               <li @click="toHome(index)" v-for="(item, index) in searchAddress" :key="item.id" class="search-item">
                  <div class="address">
                     <h2>{{item.name}}</h2>
                     <p>{{item.address}}</p>
                  </div>
                  <div class="distance">{{item.distance}}</div>
               </li>
            </ul>
            <div class="not_search">
               <p>找不到地址?</p>
               <p>请尝试只输入小区、写字楼或学校名</p>
               <p>详细地址（如门牌号）可稍后输入</p>
            </div>  
         </div>
      </div>
   </div>
</template>

<script>
import HeadTop from "../../common/head/head.vue";
import { getLngLat, setCookie } from '../../../modules/mUtil.js'
import { getAddress , getAddressFirst} from '../../../service/getData.js'
import { mapState, mapMutations } from 'vuex';

export default {
   name: 'Address',
   data() {
       return {
          changeCity: '',
          address: '',
          lnglat: {},
          searchAddress: [],
          isSearch: true //有收货地址无搜索内容框
       }
   },
   created(){
      this.getCity();
   },
   methods: {
      ...mapMutations({
         'setAddress': 'user/SETADDRESS'
      }),
      getCity(){
         if(this.$route.params.city != '0'){
            this.changeCity= this.$route.params.city;
            //经纬度
            getLngLat(this.$route.params.city,(lnglat)=>{
               this.lnglat=lnglat;
            });
         }else{
            this.changeCity= this.currentCity;
            this.lnglat = this.lnglatStore;
         }
      },
      toHome(index){
         let obj= this.searchAddress[index];
         this.setAddress({cityId: obj.city_id, currentCity: obj.city, lnglat: {lng: obj.longitude, lat: obj.latitude}, addressName: obj.name});
         this.$router.replace('/home');
      },
      reAddress(item){
         //重新设置地址
         let {address} =item;
         this.setAddress({cityId: address.cityId ,addressName: address.name, currentCity: address.city,lnglat: { lat: address.lat, lng: address.lng}, currId: item.id})
         this.$router.replace('/home');
      }
   },
   watch: {
      address: {
         handler: function(){
            if(!this.address) this.isSearch= true;
            if(this.address){
               this.isSearch= false;
               if(!this.changeCity){
                  getAddressFirst( this.address).then((result)=>{
                     this.searchAddress= result.data;
                  })
               }else{
                  getAddress( this.address, this.lnglat).then((result)=>{
                     this.searchAddress= result.data;
                  })
               }
            }
            
         }
      }
   },
   computed: {
      ...mapState({ //如果模块化的store，state一定要写成这种形式，直接写成数组是undefind,其他的actions和getters没有关系
         currentCity: state=> state.user.currentCity,
         lnglatStore: state=> state.user.lnglat,
         addressInfo: state=> state.user.addressInfo
      })  
   },
  components: {HeadTop}
}
</script>

<style scoped lang="scss">

@import '../../../stylesheets/particles/mixin.scss';
.address-container{
   background: #fff;
   .search-box{
      @include wh(100%, 0.56rem);
      background: #fff;
      @include fja(space-between, center);
      padding: 0 0.1rem;
   }
   .select{
      display: inline-block;
      @include wh(0.66rem, 100%);
      @include fja(space-around);
   }
   .triangle{
      margin-top: 0.06rem;
      border-top: 4px solid #000;
   }
   .input-box{
      position: relative;
      @include wh(2.79rem, 0.36rem);
      input{
         @include wh(100%, 100%);
         background: $f4;
         text-align: left;
         padding: 0 0.18rem 0 0.25rem;
      }
      .search-icon{
         @include ct();
         margin-left: 0.08rem;
      }
   }
}
.address-content{
   padding: 1rem 0 0 0;

   .mine-address{
      
      .title{
         line-height: 1.5;
         padding: 0.1rem;
         background: #f5f5f5;
      }
      li{
         background: #fff;
         padding: 0.1rem;
         border-bottom: 1px solid #ddd;
         span{
            font-size: 0.16rem;
            color: #000;
            font-weight: 700;
         }
      }
   }

   .search-content{
      padding-bottom: 0.5rem;
   }
   .search-item{
      padding: 0.11rem 0.15rem;
      @include fj();
      .address{
         width: 2.45rem;
         flex-grow: 0;
         flex-shrink: 0;
         h2{
            font-size: 0.16rem;
            font-weight: 700;
         }
         p{
            line-height: 0.17rem;
            font-size: 0.12rem;
         }
      }
      .distance{
         width: 0.5rem;
         flex-grow: 0;
         flex-shrink: 0;
         text-align: center;
      }
   }
   .search-item+.search-item{
      border-top: 1px solid #eee;
   }
   .not_search{
      margin-top: 0.1rem;
     p{
        @include sc(0.15rem, #999);
        line-height: 0.25rem;
        text-align: center;
     } 
   }
}
</style>
