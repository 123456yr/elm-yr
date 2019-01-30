<template>
  <div class="home-container" v-if="isReload">
    <head-top>
      <router-link :to="{name: 'Address' ,params: { city: 0}}" class="city-box" slot="city">
        <span class="city-position-icon"></span>
        <span class="city ellipsis">{{address}}</span>
        <span class="triangle"></span>
      </router-link>
      <div class="search-wrapper" slot="search">
        <router-link to="search" class="search-box">
          <span class="search-icon"></span>
          搜索饿了么商家、商品名称
        </router-link>
      </div>
    </head-top>
    <div class="map"></div>
    <div class="home-content">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(list, index) in lists" :key="index">
            <router-link tag="dl" :to="{name: 'Food', query: {entry_id: item.id}}" v-for="item in list" :key="item.id">
              <dt>
                <img width="100%" :src="getImgURL(item.image_hash)">
              </dt>
              <dd>{{item.name}}</dd>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="favourable-container" v-if="favourable.length">
        <div class="fav_box" v-for="item in favourable" :key="item.id">
          <h3>{{item.name}}</h3>
          <p class="desc">{{item.description}}</p>
          <div class="more">
            <div class="population" v-if="JSON.parse(item.more).population">
              <span>{{JSON.parse(item.more).population}}</span>正在抢>
            </div>
            <div class="third_title" v-if="JSON.parse(item.more).third_title">{{JSON.parse(item.more).third_title}}></div>
          </div>
          <img :src="getImgURL(item.image_hash)" />
        </div>
      </div>
      <div class="shoplist">
        <div class="title-top">推荐商家</div>
        <shop-list :isRemove="isRemove" distance=0.95></shop-list>
      </div>
    </div>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import ShopList from '../../common/other/ShopList';
import Swiper from "../../../../node_modules/swiper/dist/js/swiper.min.js";
import "../../../../node_modules/swiper/dist/css/swiper.min.css";
import { mapState, mapMutations } from "vuex";
import Vue from "vue";
import HeadTop from "../../common/head/head";
import FootNav from "../../common/foot/foot";
import { getEntries } from "../../../service/getData.js";
import { getImgURL } from "../../../modules/mixin.js";
import {
  getMapPosDetail,
  getAddress,
  getCityByID,
  getLngLat,
  setCookie,
  getCookie
} from "../../../modules/mUtil.js";

export default {
  name: "Home",
  mixins: [getImgURL],
  data() {
    return {
      address: "正在定位...",
      lists: [],
      favourable: [],
      isReload: true,
      isRemove: false,
      loading: true
    }
  },
  created() {
    this.isPosition();
    this.getEntries();
  },
  methods: {
    ...mapMutations({
      setAddress: "user/SETADDRESS"
    }),
    getEntries() {
      //如果定位不成功，不如获取列表
      if (!this.addressName) return;
      getEntries().then(result => {
        let entries = result.data[0].entries;
        if(result.data[1]){
          let favourable =result[1].entries;
          this.favourable= favourable.slice(0, 2);
        }
        
        let arr = [];
        for (let i = 0, j = 0; i < entries.length; i += 10, j++) {
          arr[j] = entries.slice(i, i + 10);
        }
        this.lists = arr;
       
        Vue.nextTick(() => {
          var swiper = new Swiper(".swiper-container", {
            pagination: {
              el: ".swiper-pagination"
            },
            loop: true
          });
        });
      });
    },
    isPosition() {
      if (this.addressName) {
        this.address = this.addressName;
        return;
      }
      this.loading = true;
      getMapPosDetail(this.onComplete, this.onError);
    },
    onComplete(data) {
      //定位成功返回的经度
      var lat = data.position.getLat();
      var lng = data.position.getLng();
      this.address= data.formattedAddress;
      let addressName=  data.formattedAddress;
      let currentCity= data.addressComponent.city;
      this.setAddress({ addressName, currentCity, lnglat: { lat, lng } });
      this.isPosSuccess= true;
      this.loading= false;
    },
    onError(data) {
      this.address = "未能识别详细地址";
      this.isPosSuccess= false;
      this.loading = false;
    }
  },
  beforeRouteLeave(to, from, next){
    this.isRemove= true;
    next()
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.isRemove= false;
    })
  },
  watch: {
    addressName:{
      handler: function(){
        this.address= this.addressName;
        this.getEntries();
      }
    }
  },
  computed: {
    ...mapState({
      addressName: state => state.user.addressName
    })
  },
  components: { HeadTop, FootNav, ShopList }
};
</script>

<style scoped lang="scss">
@import "../../../stylesheets/particles/mixin.scss";
.home-container /deep/ .shoplist-container{
  header{
    position: sticky;
    top: 0.95rem;
  }
}

.home-container {
  background: #fff;
  .search-wrapper {
    @include wh(100%, 0.51rem);
    background: $blue;
    @include fja(center, center);
  }
  .search-box {
    @include wh(3.47rem, 0.36rem);
    text-align: center;
    @include sc(0.14rem, $f9);
    background: #fff;
    line-height: 0.36rem;
  }
  .city-position-icon {
    display: inline-block;
    @include wh(0.15rem, 0.15rem);
    @include irs("/static/images/icons/position.png");
  }
  .city-box {
    @include wh(60%, 100%);
    font-weight: bold;
    @include fja(flex-start, center);
    padding-left: 0.1rem;
    .city {
      @include sc(0.16rem, #fff);
      margin: 0 0.1rem;
    }
  }
}
.home-content {
  margin-top: 0.95rem;
  background: #fff;
  .swiper-slide {
    @include fj(flex-start);
    flex-wrap: wrap;
  }
  dl {
    margin-top: 0.11rem;
    flex-direction: column;
    @include wh(20%, 0.64rem);
    @include fja();
  }
  dt {
    @include wh(0.45rem, 0.45rem);
  }
}
.map {
  width: 0;
  height: 0;
  visibility: hidden;
}
.swiper-container {
  padding-bottom: 0.25rem;
  .swiper-pagination-bullets {
    bottom: 5px;
    // .swiper-pagination-bullet{
    //   width: 10px;
    //   height: 4px;
    //   background: #eee;
    // }
  }
}
.favourable-container {
  padding: 0 0.1rem;
  @include fj();
  .fav_box {
    position: relative;
    @include wh(1.76rem, 1.4rem);
    padding: 0.1rem 0 0 0.1rem;
    @include lg(#f4f4f4, 5%, #fafafa, 95%);
  }
  h3 {
    font-size: 0.16rem;
    font-weight: 700;
  }
  .desc {
    color: #999;
    font-size: 0.14rem;
    line-height: 0.26rem;
  }
  .more {
    @include sc(0.14rem, #333);
    font-weight: 700;
    .population {
      span {
        color: red;
      }
    }
    .third_title {
      color: #af8260;
    }
  }
  img {
    @include wh(1.2rem, 0.8rem);
    position: absolute;
    bottom: -0.08rem;
    right: 0;
  }
}
.shoplist{
  padding-top: 0.1rem;
  padding-bottom: 0.5rem;
  .title-top{
    @include wh(100%, 0.36rem);
    line-height: 0.18rem;
    font-size: 0.16rem;
    @include fja(center, center);

    &:before, &:after{
      content: '';
      @include wh(0.2rem, 0.02rem);
      background: #999;
      display: block;
      margin: 0 0.1rem;
    }
  }
}
</style>
