<template>
  <div class="shop-container">
    <header>
      <div class="image-box">
        <div
          class="img-box"
          v-bind:style="{ backgroundImage: 'url('+getImgURL(rst.image_path)+')'}"
        ></div>
      </div>
      <span class="head-back" @click="$router.back(-1)"></span>
    </header>
    <section class="shop-content">
      <img class="shop_img" :src="getImgURL(rst.image_path)">
      <div class="shop_name">
        <span class="name ellipsis">{{rst.description}}</span>
        <span class="triangle-right"></span>
      </div>
      <div class="rating_box">
        <span>评价 {{rst.rating}}</span>
        <span>月售 {{rst.recent_order_num}}</span>
        <span>蜂鸟专送约 {{rst.order_lead_time}}分钟</span>
      </div>
      <div class="favourable_box">
        <p class="left">
          <span class="mj">满减</span>
          <span>满20件15，满35减25</span>
        </p>
        <p class="right">
          <span>2个优惠</span>
          <span class="triangle"></span>
        </p>
      </div>
      <div class="notice ellipsis">公告：{{rst.promotion_info}}</div>
    </section>
    <div class="shop-tab-btn" v-fixed="{isfixed, distance}">
      <div class="container">
        <p @click="changeTab(item)" v-for="item in navs" :key="item.id">
          <span :class="{activeP: activeId=== item.id}">{{item.name}}</span>
        </p>
      </div>
    </div>
    <keep-alive>
      <component v-bind:is="changeCom" :menu="menu" :recommend="recommend"></component>
    </keep-alive>
  </div>
</template>

<script>
import { remToPX } from '../../../modules/mUtil.js'
import BuyFood from "./components/buyFood.vue";
import Evaluate from "./components/evaluate.vue";
import Business from "./components/business.vue";
import { getShopDetail } from "../../../service/getData.js";
import { getImgURL } from "../../../modules/mixin.js";
export default {
  name: "Shop",
  data() {
    return {
      navs: [
        { id: 0, name: "点餐", component: "BuyFood" },
        { id: 1, name: "评价", component: "Evaluate" },
        { id: 2, name: "商家", component: "Business" }
      ],
      activeId: 0,
      changeCom: BuyFood,
      menu: [],
      rst: {},
      imgpath: "",
      recommend: [],
      isfixed: false,
      distance: 0
    };
  },
  mixins: [getImgURL],
  created() {
    this.getShopDetail();
  },
  methods: {
    changeTab(item) {
      this.activeId = item.id;
      this.changeCom = item.component;
    },
    async getShopDetail() {
      let result = await getShopDetail();
      this.rst = result.data.rst;
      this.$set(this.$data, "recommend", result.data.recommend);
      if (this.activeId === 0) {
        this.recommend = result.data.recommend[0];
        this.menu = result.data.menu;
      }
    }
  },
  watch: {
      activeId:{
         handler: function(newValue, oldValue){
            if(newValue === 0){
              let distance=  remToPX(4.85).replace('px', '');
               document.documentElement.scrollTop=distance;
            }else{
              document.documentElement.scrollTop= 0;
            }
         }
      }
  },
  components: { Business, Evaluate, BuyFood }
};
</script>

<style scoped lang="scss">
@import "../../../stylesheets/particles/mixin.scss";
.shop-container {
  // height: 1000%;
  background: #fff;
  .image-box {
    @include wh(100%, 1rem);
    overflow: hidden;
  }
  .img-box {
    @include wh(100%, 1rem);
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    filter: blur(7.2px);
    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(
        0deg,
        hsla(0, 0%, 100%, 0),
        rgba(0, 0, 0, 0.5)
      );
    }
  }
}
.shop-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.3rem;
  .shop_img {
    @include wh(0.75rem, 0.75rem);
    overflow: hidden;
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
  }
  .shop_name {
    @include sc(0.2rem, #000);
    font-weight: 700;
    width: 2.4rem;
    @include fja(space-around, center);
    .name {
      width: 2.2rem;
    }
  }
  .rating_box {
    @include fj(space-around);
    font-size: 0.12rem;
  }
  .favourable_box {
    @include fj();
  }
  .notice {
    text-align: left;
    color: #999;
  }
  div {
    padding: 0.02rem 0;
    width: 3rem;
    font-size: 0.12rem;
  }
  .triangle {
    border-top-color: #000;
  }
}
.shop-tab-btn {
  margin-top: 0.1rem;
  height: 0.4rem;
  .container {
    display: flex;
    font-size: 0.15rem;
    background: #fff;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 100;
    border-bottom: 1px solid #ddd;
  }
  p {
    flex: 1;
    text-align: center;
    padding: 0.1rem 0;
    font-weight: 700;
    color: #999;
  }
  .activeP {
    border-bottom: 2px solid $lightblue;
    color: #333;
  }
  span {
    padding: 0.1rem 0;
  }
}
</style>
