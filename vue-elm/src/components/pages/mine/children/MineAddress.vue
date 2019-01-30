<template>
   <div class="mine_address_container">
      <head-top headBack="true" headTitle="我的地址"></head-top>
      <div class="mine_address_content pt">
         <section class="address_item" v-for="(item, index) in addressInfo" :key="index">
            <div class="left" @click="reAddress(item)">
               <p class="top"><i class="name">{{item.userName}}</i><span v-if="item.sex">{{item.sex}}</span><span>{{item.phone}}</span></p>
               <p class='bottom'><span class="tag" :content="item.tag" v-if="item.tag">{{item.tag}}</span><span>{{item.address.name}}</span></p>
            </div>
            <div class="select" v-show="currId=== item.id">
               <img src="/static/images/icons/select.png" alt="">
            </div>
            <div class="right">
               <router-link class="write" :to="{name: 'EditAddress', params: {index: index}}"></router-link>
               <span class="false" >
                  <el-button type="text" @click="delAddress(index)"></el-button>
               </span>
            </div>
         </section>
      </div>
      
      <footer>
         <router-link :to="{name: 'AddAddress'}" class="footer-box">
            <span class="fa fa-plus-circle"></span>
            <span>新增收货地址</span>
         </router-link>
         
      </footer>
      <!-- <transition name="router_silder" mode="out-in">
         <keep-alive>
            <router-view  v-if="$route.meta.keepAlive"></router-view>
         </keep-alive>
      </transition>
      <transition name="router_silder" mode="out-in">
            <router-view  v-if="!$route.meta.keepAlive"></router-view>
      </transition> -->
      <transition name="router_silder" mode="out-in">
         <keep-alive :include="cachePages">
            <router-view></router-view>
         </keep-alive>
      </transition>
   </div>
</template>

<script>
import HeadTop from '../../../common/head/head.vue'
import { mapState, mapMutations} from 'vuex';
export default {
   name: 'MineAddress',
   data() {
       return {
          addressLists: []
       }
   },
   methods: {
      ...mapMutations({
         setCachePages: 'user/SET_CACHE',
         removeAddrInfo: 'user/REMOVE_ADDRESS_INFO',
         setAddress: 'user/SETADDRESS'
      }),
      delAddress(index){
        this.$confirm('确定删除该地址吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.removeAddrInfo(index);
        }).catch(() => {

        });
      
      },
      reAddress(item){
         this.setAddress({cityId: item.address.cityId,currentCity: item.address.city, addressName: item.address.name, lnglat: {lng: item.address.lng, lat: item.address.lat}, currId: item.id});
         this.$router.back(-1);
      }
   },
   computed:{
      ...mapState({
         addressInfo: state=> state.user.addressInfo,
         cachePages: state => state.user.cachePages,
         currId: state => state.user.currId
      })
   },
   beforeRouteUpdate(to, from, next){
      //只要是子路由的改变都会触发此钩子函数

      if(from.name=== "MineAddress"){
         this.setCachePages([to.name]);
         
      }else if(to.name==="MineAddress"){
         this.setCachePages([]);
      }
      next();
   },
  components: {HeadTop}
}
</script>

<style scoped lang="scss">
@import '../../../../stylesheets/particles/mixin.scss';
.el-button{
   position: absolute;
   top: 0;
   left:0;
   right: 0;
   bottom: 0;
}
.false{
   position: relative;
}
.el-message-box{
   width: 100%;
}

.select{
   @include wh(0.2rem, 0.2rem);
   margin-right: 0.18rem;
   img{
      @include wh(100%, 100%);
   }
}
.mine_address_container{
   @include allcover();
   background: #f5f5f5;
   z-index: 100;
   .footer-box{
      @include wh(100%, 0.5rem);
      background: #fff;
      z-index: 99;
      position: fixed;
      bottom: 0;
      left: 0;
      box-shadow: -1px 0 2px #ddd;
      @include fja(center, center);
      @include sc(0.16rem, $blue);
      .fa{
         margin-right: 0.08rem;
      }
   }
}
.address_item:not(:last-child):after{
   content: '';
   @include wh(100%, 1px);
   position: absolute;
   bottom: 0;
   left: 0;
   background: #ddd;
   transform: scaleY(0.5);
}
.address_item{
   position: relative;
   background: #fff;
   @include fja();
   padding: 0.15rem 0.15rem;
   .left{
      flex: 1;
      p{
         max-width: 2.85rem;
         overflow: hidden;
         white-space: nowrap;
      }
      span{
         margin-right: 0.08rem;
      }
   }
   .top{
      @include sc(0.16rem, #666);
      .name{
         color: #333;
         font-weight: 700;
      }
   }
   .bottom{
      color: #666;
      
      .tag{
         position: relative;
         color: rgba(0,0,0,0);
         font-size: 0.12rem;
         line-height: 1.3;
         
      }
      .tag:after{
         content: attr(content);
         position: absolute;
         top: 0;
         left: 0;
         font-size: 0.20rem;
         transform-origin: 0 0;
         transform: scale(0.5);
         color: #00d762;
         border: 1px solid #00d762;
         white-space: nowrap;
         line-height: 1.3;
         padding: 0.03rem;
      }
   }
   .right{
      @include fja();
      flex-basis: 0.45rem;
      span{
         margin-left: 0.08rem;
      }
   }
  
}
</style>
<style>

.el-message-box{
   width: 80%;
   background: #fff;

}
</style>

