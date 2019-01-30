<template>
  <div class="shoplist-container" >
    <header ref="listhead" v-fixed="{isfixed, distance}" >
    <div class="sort-container">
      <ul class="navs">
        <li
          @click="getShopListOrderBy('a')" 
          class="sort_one"
          :class="{active: activeId === 'a'? true: false}"
        >
          {{sort1}}
          <span class="triangle"></span>
        </li>
        <li
          @click="getShopListOrderBy('b', filters.outside_sort_filter[0])"
          :class="{active: activeId === 'b'? true: false}"
        >
        {{filters.outside_sort_filter? filters.outside_sort_filter[0].name: ''}}
        </li>
        <li
          @click="getShopListOrderBy('c', filters.outside_sort_filter[1])"
          :class="{active: activeId === 'c'? true: false}"
        >
        {{filters.outside_sort_filter? filters.outside_sort_filter[1].name: ''}}
        </li>  
        <li
          @click="getShopListOrderBy('d')"
          :class="{active: activeId === 'd'? true: false}"
          >
          筛选
          <span class="fa fa-filter"></span>
        </li>
      </ul>
    
      <section class="sort1" ref="sort1">
        <ul>
          <li @click="getShopListOrderBy(item.value, item)" :class="{sort_active: sortId=== item.value}" class="sort1-item" v-for="item in filters.inside_sort_filter" :key="item.value">
            <span>{{item.name}}</span>
            <img v-show="sortId === item.value? true: false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAkFJREFUSA3tlbtrVFEQxr/JusEkdqYR0mU3EGyECCKCIEIghIgSfBSCCkbwWqTQykoQ41+QbHaRRC0MSDCgjeADO0ERQRBB10YsU/gC89jd8ZuNez17H7gmN2BxT7Fnzpw587vzzbl3gXSkCqQKJKSAJJQnlKb3huawjDkCZj94KIiIukGbAs5P636t4h5J2w1GyHz5ghx1wW3uIgm7b0pPaQ2PHOg3tGEimDsxsKpKbkonqoqbqmivgwRLksFI+by8DoITkXqgqJ1fq7hN4GgDwMQVajxa9uR+w+fOW9zFeuz+ou74UoEl3+2fFyilPPs+BmpxkVLnpnVvflLHTT4/WYSRL+mu1QpecOsPlAseukTorYgjviuU2F4DWcFzytbNqCfSjtPlMfnsn/htsJ+HoLjDS9Tl7ongOuW97Pqi7FDFslzvlUFtHNRVvOkr6Im15dpvb0Ev8sEWglCWWmoFallCFeeLuqdWxVNW0+nCaM9JB8bxE9cIHAvsWaL5kx6OXxGpBfei1iGwBeUmdYTdXSA84x6ijCv+q9K0gcdbuzH89hib1OIISW3n+JV5wMkL5oiBviT0yL9ALW8k2DY+elLidNXsuEEF3mW7METoj7iYOH+k1G4wb+8MKz3j+uq24JNksS/qxodiIxyxFTdie/pxjk/3sLG2mZUu8sszuF5oPYebMM7eeVe3LS3iGS/bAKHfeasPsBWv4uJb8f+1YktiPezIYth6mhEc3ii0lQdriuGfQbbJkS5SBf5HBX4Bvl6o9YDxgOsAAAAASUVORK5CYII="/>
          </li>
        </ul>
      </section>
      <section class="sort2" ref="sort2">
        <div class="sort2_filters_box">
          <div class="sort2_filters" v-for="screen in screens" :key="screen.id">
            <h4>{{screen.title}}</h4>
            <ul>
              <li @click="getFilterValue(filter, screen, $event)" :class="{activeFilter:  (screen.id==='1'?(filter1_id=== filter.id? true: false):(screen.id==='2'?(filter2_id=== filter.id ? true: false): ''))}" v-for="filter in screen.filters" :key="filter.id">
                {{ filter.name}}
              </li>
            </ul>
          </div>
        </div>
        <div class="btn">
          <span :class="{clear: clearStatus===0? false: true}" role="button" @click="clearFilters">清空</span>
          <span class="sure" role="button" @click="confirmFilter">确定</span>
        </div>
      </section>
    </div>
    </header>
    
    <transition
      enter-active-class="fadein"
      leave-active-class="fadeout">
        <div class="mask" v-show="showMask" @click="hideLists"></div>
    </transition>
    <div class="shoplist-content">
      <ul>
        <li @click="toShop" class="shopitem" v-for="(res, index) in restaurants" :key="index">
          <div class="shopitem-top">
            <div class="top_left">
              <img
                :src="getImgURL(res.restaurant.image_path)"
                alt
              >
            </div>
            <div class="top_right">
              <section class="title">
                <h2>
                  <i content="品牌" class="brand" v-if="res.restaurant.is_premium">品牌</i>
                  <span class="ellipsis">{{res.restaurant.name}}</span>
                </h2>
                <span class="more">□...</span>
              </section>
              <section class="rating_box">
                <div class="left">
                  <rating-star :rating="res.restaurant.rating"></rating-star>
                  <span class="rating_count">{{res.restaurant.rating}}</span>
                  <span>月售{{res.restaurant.recent_order_num}}单</span>
                </div>
                <div class="delivery_mode_text" 
                v-if="res.restaurant.delivery_mode"  :content="res.restaurant.delivery_mode.text">{{res.restaurant.delivery_mode.text}}</div>
              </section>
              <section>
                <div class="left">
                  <span class="index_next">￥20起送</span>
                  <span>配送费￥2.5</span>
                </div>
                <div class="right">
                    <span class="index_next">3km</span>
                    <span>34分钟</span>
                </div>
              </section>
            </div>
          </div>
          <div class="shopitem-bottom">
            <section class="new_user">
                <div>
                    <span class="first">首</span>
                    <span class="text">新用户下单立减15元</span>
                </div>
                <span class="right">23个活动</span>
            </section>
            <section>
                 <div>
                    <span class="jian">减</span>
                    <span>满20减5</span>
                </div>
            </section>
          </div>
        </li>
      </ul>
    </div>
   <toast 
      :has_next="has_next" 
      toast_icon="fa-spinner fa-pulse" 
      :toast_text="toast_text" 
      :isLoadMore="isLoadMore">
  </toast>
    <transition
      leave-active-class="animated fadeOut"
      enter-active-class="animated fadeIn">
      <div v-backtop v-scroll-show:500="showBacktop" v-show="showBacktop" class="backtop">
        <span class="fa fa-arrow-up fa-lg"></span>
      </div>
    </transition>
  </div>
</template>

<script>
import Toast from './toast.vue';
import RatingStar from "./ratingStar.vue";
import { getImgURL, loadMore } from '../../../modules/mixin.js'
import { getShopList, sortFilter, getShopListOrderBy, confirmFilter } from '../../../service/getData.js'
import { mapState } from 'vuex';
import { sport } from '../../../modules/mUtil.js'
export default {
  name: "ShopList",
  data() {
    return {
      activeId: -1,
      sortId: -1,//综合排序隐藏列表控制点击的class
      filter1_id: -1,//单选
      filter2_id: -1,//单选
      arrid: [],//记录多选
      argFilter: '',
      clearStatus: 0,//清除按钮的状态
      restaurants: [],
      isfixed: false,
      showBacktop: false,
      offset: 0,//请求数据的起始位置
      num: 8,
      toast_text: '正在加载...',
      has_next: true,//是否还有更多可以加载
      filters: {},//排序的
      isShowSort1: false,//显示列表
      isShowSort2: false, //显示筛选
      showMask: false, //显示遮罩
      hide: '',
      isLoadMore: true,
      default: 'home',
      sort1: '', //改变综合排序位置处的值
      sort: '',//点击的filters的orderby的value值，为了使loadmore可以得到
      screens: [  //筛选
        { id: '0', title: '商家服务（可多选）', filters: []},
        { id: '1', title: '优惠活动（单选）', filters: []},
        { id : '2', title: '人均消费', filters: [
          { id: '0', name: '￥20以下', cost_to: 20}, 
          { id: '1', name: '￥20-￥40', cost_from: 20, cost_to: 40}, 
          { id: '2', name: '￥40-￥60', cost_from: 40,cost_to: 60}, 
          { id: '3', name: '￥60-￥80', cost_from: 60,cost_to: 80}, 
          { id: '4', name: '￥80-￥100', cost_from: 80,cost_to: 100}, 
          { id: '5', name: '￥100以上', cost_from: 100}
          ]
        }
      ]
    };
  },
  props: ['isRemove', 'distance'],
  created() {
    if(!this.addressName) return;
    this.getLists();
    this.getSortFilter();
  },
  mixins: [getImgURL, loadMore],
  methods: {
    async getLists(){
      //async定义的函数表示。函数内有异步操作，await 后面是promise对象，并将异步请求的结果返回到变量中，请求结束后才会向下执行
      
      this.isLoadMore = false;
      let result;
      //默认请求
      if(this.default=== 'home'){
        result=await getShopList(this.offset);
      }else if(this.default=== 'sort'){
        //点击filters请求
        result= await getShopListOrderBy(this.offset, this.sort.value);
      }else{
        result= await confirmFilter(this.offset, this.argFilter);
      }
      this.restaurants= this.restaurants.concat(result.data.items);
      this.has_next= result.data.has_next;
      if(!this.has_next) this.toast_text= '没有更多了'
      this.isLoadMore= true;
    },
    getShopListOrderBy(id, sort){
      //点击filters
      //如果是在首页则点击固定到顶部
      // if( this.$route.name=== 'home'){
        let distance= this.$refs.listhead.offsetTop- 95;
        document.documentElement.scrollTop= distance;
        // this.$refs.listhead.style.position= 'fixed';
        // this.$refs.listhead.style.top= '95px';
      // }
      if(typeof id === 'number'){
        this.sortId= id;
        this.sort1= sort.name;
      }else{
        this.activeId= id;
      }
      this.sort= sort;
      switch(id){
        case 'a': 
          this.showLists('isShowSort1');
          this.hide= 'isShowSort1';
          break;
        case 'd': 
          this.showLists('isShowSort2');
          this.hide= 'isShowSort2';
          break;
        default: 
          this.fromFilterGetLists();
          break;
      }
      
    },
    async getSortFilter(){
      //获取filters和screens列表
      var result= await sortFilter();
      this.filters= result.data.outside;
      this.sort1= result.data.outside.inside_sort_filter[0].name;
      let screens= result.data.bar;
      this.screens[0].filters= screens.supports;
      this.screens[1].filters= screens.activity_types;
    },
    fromFilterGetLists(){
      //点击filters获取lists
      if(this.hide){
        this.hideLists();
      }
      this.default= 'sort';
      this.clearLists()
    },
    clearLists(){
      this.toast_text='正在加载...';
      this.restaurants=[];
      this.offset=0;
      this.getLists();
    },
    showLists(isShow){
      //防止两个隐藏都出现
      if(this.hide && this.hide !== isShow ){
        this.hideLists()
      }
      switch(isShow){
        case 'isShowSort1':
          switch(this.isShowSort1){
            case false:
              this.isShowSort1= true;
              this.showMask= true;
              this.$refs.sort1.classList.add('open');
              //禁止滚动
              document.documentElement.style.overflow= 'hidden';
              document.addEventListener('touchmove', this.preventDefault, false);
              break;
            case true: 
              this.hideLists();
          }
          break;
        case 'isShowSort2':
          if( !this.isShowSort2){
            this.isShowSort2= true;
            this.showMask= true;
            this.$refs.sort2.classList.add('open');
            document.documentElement.style.overflow= 'hidden';
            document.addEventListener('touchmove', this.preventDefault, false);
          }else{
            this.hideLists();
          }
      }
    },
    hideLists(){
      //默认点击事件自带一个参数$event
      var isShow= this.hide;
      switch(isShow){
        case 'isShowSort1':
          switch(this.isShowSort1){
            case true:
              this.isShowSort1= false;
              this.showMask= false;
              this.hide='';
              this.$refs.sort1.classList.remove('open');
              break;
          }
          break;
        case 'isShowSort2':
          if( this.isShowSort2){
            this.isShowSort2= false;
            this.showMask= false;
            this.$refs.sort2.classList.remove('open');
            this.hide='';
          }
      }
      //可以滑动了
      document.documentElement.style.overflow= 'auto';
      document.removeEventListener('touchmove', this.preventDefault, false)

    },
    preventDefault(e){
      e.preventDefault();
    },
    getFilterValue(filter, screen, event){
      //为筛选中的列表添加类名,再点击取消类名
      if(screen.id === '0'){
        var index= this.arrid.indexOf(filter.id);
        if(index === -1){
          this.arrid.push(filter.id);
          event.target.classList.add('activeFilter');
          this.clearStatus++;
        }else{
          this.arrid.splice(index, 1);
          event.target.classList.remove('activeFilter');
          this.clearStatus--;
        }
        return;
      }

      if(screen.id=== '1'){
        if(this.filter1_id !== filter.id){
          this.filter1_id= filter.id;
          this.clearStatus++;
        }else{
          this.filter1_id= -1;
          this.clearStatus--;
        }
      }else{
        if(this.filter2_id !== filter.id){
          this.filter2_id= filter.id;
          this.clearStatus++;
        }else{
          this.filter2_id= -1;
          this.clearStatus--;
        }
        
      }  
    },
    confirmFilter(){
      //点击确认 设置参数 发送请求
      let { arrid , filter1_id, filter2_id, screens}= this;
      let str='', obj={};
      arrid.forEach(item=>{
        str=str+'&'+  'support_ids[]='+item;
      })
      filter1_id !== -1? str= str+'&'+'activity_types[]='+filter1_id: '';
      if( filter2_id !==-1){
        if(screens[2].filters[filter2_id].cost_to){
          str= str+'&'+'cost_to='+screens[2].filters[filter2_id].cost_to;
          }
        if(screens[2].filters[filter2_id].cost_from){
          str= str+'&'+ 'cost_from='+screens[2].filters[filter2_id].cost_from;
        }
      }
      this.default= 'filter';
      this.argFilter= str;
      this.hideLists();
      this.clearLists();
      
    },
    clearFilters(){
      //清空filters
      this.arrid=[];
      this.filter1_id= -1;
      this.filter2_id= -1;
      this.clearStatus= 0;
      var filters= document.querySelectorAll('.activeFilter');
      filters.forEach(item=>{
        item.classList.remove('activeFilter');
      })
    },
    toShop(){
      if(this.login){
        this.$router.push({name: 'Shop'});
      }else{
        this.$message({
          message: '请先登录',
          duration: 1600
        })
      }
    }

  },
  watch: {
    addressName: {
      handler: function(){
        this.restaurants=[];
        this.getLists();
        this.getSortFilter()
      }
    },
    isRemove: {
      handler: function(){
        if(this.isRemove){
          window.removeEventListener('scroll', this.handlerScroll);
        }else{
          window.addEventListener('scroll', this.handlerScroll);
        }
      }
    }
  },
  computed: {
    ...mapState({
      login: state=> state.user.login,
      addressName: state=> state.user.addressName
    })
  },
  components: { RatingStar, Toast }
};
</script>

<style scoped lang="scss">
@import "../../../stylesheets/particles/mixin.scss";
.sort_active{
  color: $blue;
}
.fadein{
  animation: enterOpacity 0.2s ease-in-out;
}
.fadeout{
  animation: leaveOpacity 0.3s ease-in-out;
}
@keyframes enterOpacity{
  0%{ opacity: 0}
  100% { opacity: 1}
}
@keyframes leaveOpacity{
  0% { opacity: 1}
  100% { opacity: 0}
}
.sort-container{
  @include wh(100%, 0.4rem);
  position: relative;
  background: #fff;
  z-index: 100;
}
.shoplist-container {
  min-height: 5.22rem;
  background: #fff;
  header {
     //当滚动到元素将要超出视口时生效，固定元素到指定位置
    @include wh(100%, 0.4rem);
    // position: sticky;
    // top: 0.95rem;
    z-index: 100;
    background: #fff;
   .navs{
      z-index: 100;
      background: #fff;
      // @include fja();
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include wh(100%, 0.4rem);
      border-bottom: 1px solid #eee;
       li {
        position: relative;
        @include sc(0.14rem, #666);
        font-weight: 700;
        text-align: center;
        flex-grow: 1; //等同于flex-grow: 1; 可扩大，项目等分剩余空间
        flex-shrink: 1;
      }
      .active {
          color: #333;
          span {
            border-top-color: #333;
          }
        }
    }
    .sort1, .sort2{
      opacity: 0;
      visibility: hidden;
      position: absolute;
      top: 0.4rem;
      left: 0;
      right: 0;
      background: #fff;
      max-height: 0;
      transition: max-height 0.3s ease-in-out;
      overflow: hidden;
      z-index: 4;
    }
    .sort1{
      padding: 0.1rem 0.2rem 0.1rem 0.2rem;
      
      .sort1-item{
        @include wh(100% , 0.4rem);
        @include fja();
        img{
          @include wh(0.16rem, 0.16rem);
        }
      }
    }
    .sort2{
      .sort2_filters_box{
        padding: 0 0.1rem;
      }
      .sort2_filters{
        margin: 0.1rem 0;
      }
      h4{
        font-size: 0.12rem;
        margin: 0 0 0.1rem 1%;
      }
      ul{
        @include fj(flex-start);
        flex-wrap: wrap;
      }
      li{
        flex: 0 0 31.33%;
        height: 0.35rem;
        background: #fafafa;
        margin: 0.03rem 1%;
        @include fja(center, center);
      }
      .activeFilter{
        background: #edf5ff;
        color: $blue;
        font-weight: 700;
      }
      .btn{
        @include fj();
        box-shadow: 0 -1px 2px #ededed;
        span{
          @include wh(50%, 0.43rem);
          @include fja(center, center);
          font-size: 0.16rem;
          color: #ddd;
        }
        .sure{
          background: #00d762;
          color: #fff;
        }
        .clear{
          color: #333;
        }
      }
    }
    .open{
        visibility: visible;
        opacity: 1;
        max-height: 1500%;
      }
  }
  .triangle {
    position: absolute;
    top: 0.1rem;
    right: 0.08rem;
    border-top-color: #666;
  }
  .fa-filter {
    color: #666;
  }
  
}
.shoplist-content{
    @include sc(0.12rem, #666);
    .shopitem{
        padding: 0.15rem 0.1rem;
    }
    .shopitem-top{
        @include fj();
    }
    .top_left{
        flex: 0 0 auto;
        @include wh(0.65rem, 0.65rem);
        img{
            @include wh(100%, 100%);
        }
    }
    .top_right{
        flex: 0 0 auto;
        @include wh(2.8rem, 0.65rem);
        flex-direction: column;
        @include fj();
        
        }
        h2{
            @include sc(0.15rem, #000);
            font-weight: 700;
            .brand{
                @include sc(0.12rem, #000);
                background: -webkit-linear-gradient(0deg, #fff100, #ffe339);
                background: -webkit-gradient(linear, left bottom, left top, color-stop(#fff100), color-stop(#ffe339));
                background: linear-gradient(0deg, #fff100, #ffe339);
                padding: 0 0.03rem;
            }

        }
         section{
            @include fj();
            .left{
                @include fja(flex-start, center)
            }
            .rating_count{
                margin: 0 0.1rem;
            }
            .right{
                color: #999;
            }
            .index_next:after{
              content: '|';
              color: #ddd;
              margin: 0 0.05rem;
            }
            .delivery_mode_text{
              position: relative;
              color: transparent;
              white-space: nowrap;
              &:after{
                //获取父元素中content属性上的内容，可以是任意属性
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
                content: attr(content);
                display: inline-block;
                @include sc(0.22rem, #fff);
                background: $blue;
                border-radius: 0.02rem;
                padding: 0 0.04rem;
                white-space: nowrap;
                transform-origin:0 0;
                transform: scale(0.5);
                
              }
            }
        }
        .shopitem-bottom{
          padding: 0.1rem 0 0 0.75rem;
          line-height: 0.18rem;
          section{
            margin-top: 0.05rem;
          }
          .first, .jian{
            color: #fff;
            padding: 0 0.02rem;
            border-radius: 0.02rem;
            
          }
          .first{
            background-color: rgb(240, 115, 115);
          }
          .jian{
            background-color: rgb(112, 188, 70);
          }
        }
    }

  .backtop{
    @include prb(0.2rem, 0.8rem);
    z-index: 99;
    @include whr(0.36rem, 0.36rem, 50%);
    border: 2px solid #999;
    @include fja(center, center);
    background:#fff;
    will-change: transform;
    
    .fa{
      color: #999;
      vertical-align: middle;
    }
  } 

</style>
// 全局样式
<style>
/* element-ui 中的提示信息message的样式 */
.el-message {
  top: 50%;
  /* transform: translateY(-50%); */
  background: #000000;
  min-width: 0;
  color: #fff;
  line-height: 1.2;
  padding: 0.08rem 0.1rem;
}
/* element-ui中按钮样式 */
.login_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96%;
  height: 0.4rem;
  font-size: 0.16rem;
  color: #fff;
  background: #4cd964;
  text-align: center;
  border-radius: 0.02rem;
  margin: 0 2%;
}
</style>
