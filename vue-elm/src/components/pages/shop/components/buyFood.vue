<template>
   <div class="buyfood-container">
      <div class="recommend-box">
         <div class="recommend-title">{{recommend?recommend.name: ''}}</div>
         <div class="food-box">
            <ul>
               <li v-for="item in recommend.items" :key="item.item_id">
                  <img :src="getImgURL(item.image_path)" alt="">
                  <div class="desc">
                     <p class="title ellipsis">{{item?item.name: ''}}</p>
                     <p class="rating">
                        月售{{item.month_sales}}
                        好评率{{item.rating}}
                     </p>
                     <buy-btn :info="{id: item.item_id, name: item.name, imagePath: item.image_path, price: item.specfoods[0].price}"></buy-btn>
                  </div>
               </li>
            </ul>
         </div>
      </div>
      <div>
      <div class="menuview-box" >
        <div class="menuview-left-box"  v-fixed="{isfixed, distance: 0.4}">
         <aside class="menuview-left">
            <ul>
               <li  @click="posFood(index)" v-for="(item, index) in menu" :key="index" :class="{activeLi: activeId === index}">{{item.name}}</li>
            </ul>
         </aside>
        </div>
        <div>
         <section class="menuview-right">
            <div class="menuview-item" v-for="(itemmenu, index) in menu" :key="index">
               <dl>
                  <dt>{{itemmenu.name}}
                     <span class="desc" v-if="itemmenu.description">{{itemmenu.description}}</span>
                  </dt>
                  <dd>
                     <ul>
                        <li v-for="(food, indexid) in itemmenu.foods" :key="indexid">
                           <div class="img-box">
                              <img :src="getImgURL(food.image_path)" alt="">
                           </div>
                           <div class="foodDetil">
                              <span class="title">{{food.name}}</span>
                              <p class="ellipsis">{{food.description}}</p>
                              <buy-btn :info="{id: food.item_id, name: food.name, imagePath: food.image_path, price: food.specfoods[0].price}"></buy-btn>
                           </div>
                        </li>
                     </ul>
                  </dd>
               </dl>
            </div>
         </section>
        </div>
      </div>
      </div>
      <transition name="mask">
         <div class="mask" @click="showCart" v-show="isShowCart"></div>
      </transition>
      <footer>
         <div class="cart-box">
            <transition name="cartbox">
               <section class="cartInfo-box" v-show="isShowCart">
                  <div class="title">
                     <span>已选商品</span>
                     <span @click="clear">清空</span>
                     </div>
                  <div class="cartInfo-content">
                     <ul>
                        <li v-for="item in cart" :key="item.id">
                           <span class="name ellipsis">{{item.name}}</span>
                           <buy-btn :info="item"></buy-btn>
                        </li>
                     </ul>
                  </div>
               </section>
            </transition>
            <section class="cart-content" >
               <div class="left" @click="showCart">
                  <!-- <transition name="carticon"> -->
                     <span v-show="totalInfo.price" class="cart-icon" :class="{cartAnimate: cartAnimate}">
                        <i>{{totalInfo.num}}</i>
                     </span>
                  <!-- </transition> -->
                  <span v-show="!totalInfo.price" class="cart-icon cart-gray"></span>
                  <div class="money">
                    <strong v-if="totalInfo.price">￥{{totalInfo.price}}</strong>
                    <strong v-else class="notbuy">未选购商品</strong>
                    <p>另收配送费9元</p>
                  </div>
               </div>
               <div class="right">
                  <router-link class="btn" to="checkout" v-if="totalInfo.price">
                  去结算
                  </router-link>
                  <div v-else class="btn notbuy">
                     ￥0元起送
                  </div>
               </div>
            </section>
           
         </div>
      </footer>
   </div>
</template>


<script>
import { getImgURL } from '../../../../modules/mixin.js';
import Vue from 'vue';
import BuyBtn from './buyBtn.vue'
import { mapActions , mapGetters, mapState} from 'vuex'

export default {
   name: 'BuyFood',
   data() {
       return {
          activeId: 0,
          isShowCart: false,
          cartAnimate: false,
          isfixed: false
       }
   },
   cliHeight: document.documentElement.clientHeight,
   props: ['menu', 'recommend'],
   mixins: [getImgURL],
   methods: {
      ...mapActions({
         initCart: 'cart/initCart',
         clearCart: 'cart/clearCart'
      }),
      posFood(index){
         this.activeId= index;
         let top= this.$el.querySelectorAll('.menuview-item')[index].offsetTop;
         document.documentElement.scrollTop= top- 40;
      },
      posType(){
         let lists= document.querySelectorAll('.menuview-item');
         let scrTop= document.documentElement.scrollTop;
         lists.forEach((item, index)=>{
            if(scrTop+ this.$options.cliHeight- item.offsetTop> this.$options.cliHeight / 2){
               this.activeId= index;
            }
         })
      },
      showCart(){
         if(this.isShowCart){
            this.isShowCart= false;
         }else if(this.cart.length<=0){
            return;
         }else{
            this.isShowCart= true;
         }
      },
      clear(){
         this.clearCart();
         this.isShowCart= false;
      }
   },
   watch: {
      totalInfo: {
         handler:function(newValue, oldValue){
            if(newValue.num > oldValue.num){
               //当总数在变大时，通过添加后删除类的方法实现动画
               this.cartAnimate= true;
               this.$nextTick(()=>{
                  setTimeout(()=>{
                      this.cartAnimate= false;
                  }, 300)
               })
            }
         }
      }
   },
   computed: {
      ...mapState({
         cart: state=> state.cart.cart
      }),
      ...mapGetters({
         totalInfo: 'cart/totalInfo'
      })
   },
   created(){
      this.initCart()
   },
   mounted(){
      window.addEventListener('scroll', this.posType);
   },
   beforeDestroy(){
      window.removeEventListener('scroll', this.posType);
   },
  components: {BuyBtn}
}
</script>

<style scoped lang="scss">
@import '../../../../stylesheets/particles/mixin.scss';

.mask-enter, .mask-leave-to{
   opacity: 0;
}
.mask-enter-active,.mask-leave-active{
   transition: opacity 0.2s;
}

.cartbox-enter, .cartbox-leave-to{
   // 出去的时候正常出，进入的时候从出入的地方进去
   transform: translateY(100%);
}

.cartbox-enter-active, .cartbox-leave-active{
   transition: all 0.5s ease-out;
}

.cartAnimate{
   animation: scale 0.4s ease-in-out;
}
@keyframes scale{
   0% { transform: scale(0.6)}
   40% { transform: scale(1.2)}
   75% { transform: scale(0.8)}
   100% { transform: scale(1)}
}
.mask{
   z-index: 101;
}
.buyfood-container{
   footer{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      z-index: 109;
      
   }
   .cartInfo-box{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 107;
      padding-bottom: 0.48rem;
      .title{
         @include wh(100%, 0.36rem);
         background: #ddd;
         @include fja();
         padding: 0 0.12rem;
      }
      .cartInfo-content{
         max-height: 3rem;
         overflow: auto;
         padding: 0 0.12rem 0.05rem;
         background: #fff;
      }
      li{
         
         @include wh(100%, 0.4rem);
         @include fja();
         border-bottom: 1px solid #ddd;
         .name{
            width: 1.5rem;
         }
      }
      .buybtn-container{
         width: 1.2rem;
      }
   }
   
   .cart-content{
      position: relative;
      z-index: 108;
      background: rgba(61,61,63,.9);
      height: 0.48rem;
      color: #fff;
      display: flex;
   }
   .left{
      position: relative;
      flex: 1;
      padding-left: 1rem;
      padding-top: 0.05rem;
      .money{
         strong{
            font-size: 0.17rem;
         }
         p{
            font-size: 0.12rem;
            color: #999;
         }
         .notbuy{
            color: #999;
         }
      }
      i{
         position: absolute;
         right: 0;
         top: -0.08rem;
         display: inline-block;
         @include wh(0.17rem, 0.17rem);
         border-radius: 50%;
         background-image: linear-gradient(90deg, #ff7416,#ff3c15 95%);
         @include fja(center, center);
      }
      .cart-icon{
         position: absolute;
         top: -0.1rem;
         left: 0.2rem;
         @include wh(0.5rem, 0.5rem);
         border-radius: 50%;
         border: 0.05rem solid #444;
         background-color: #3190e8;
         &:before{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            @include wh(60%, 60%);
            content: '';
            background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTggNTgiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiMyMDczQzEiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4xIi8+PC9nPjxwYXRoIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjYiIGQ9Ik05LjM3NCAxOC43MjJTNy44NjggMTEuMjgzIDcuMzIzIDguNzFDNi43NzggNi4xMzYgNS44NiA1LjMzIDMuOTc4IDQuNTIgMi4wOTYgMy43MTMuMzY3IDIuMjg2LjM2NyAyLjI4NiIvPjxjaXJjbGUgY3g9IjQ2IiBjeT0iNTEiIHI9IjQiIGZpbGw9IiNGRkYiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjUxIiByPSI0IiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==');
         }
      }
      .cart-gray{
         background-color: rgba(61,61,63,.9);
      }
      .cart-gray:before{
         background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTggNTgiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjNUY1RjYzIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiNFQkVFRjMiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4wNSIvPjwvZz48cGF0aCBzdHJva2U9IiM1RjVGNjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI2IiBkPSJNOS4zNzQgMTguNzIyUzcuODY4IDExLjI4MyA3LjMyMyA4LjcxQzYuNzc4IDYuMTM2IDUuODYgNS4zMyAzLjk3OCA0LjUyIDIuMDk2IDMuNzEzLjM2NyAyLjI4Ni4zNjcgMi4yODYiLz48Y2lyY2xlIGN4PSI0NiIgY3k9IjUxIiByPSI0IiBmaWxsPSIjNUY1RjYzIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI1MSIgcj0iNCIgZmlsbD0iIzVGNUY2MyIvPjwvZz48L3N2Zz4=');
      }
   }

   .right{
      .btn{
         background: #38ca73;
         font-weight: 700;
         color: #fff;
         font-size: 0.16rem;
         @include wh(1rem , 100%);
         @include fja(center, center);

      }
      .notbuy{
         background:none;
      }
   }
}
.recommend-box{
   
   .recommend-title{
      padding: 0.16rem;
      font-weight: 700;
      @include sc(0.16rem, #000);
   }
   ul{
      display: flex;
      overflow-x: scroll;
   }
   li{
      margin-left: 0.1rem;
      width: 1.2rem;
      img{
         @include wh(1.2rem, 1.2rem);
      }

   }
   li:first-child{
      margin-right: 0.16rem;
   }
   
   .title{
      font-size: 0.15rem;
      margin-bottom: 0.04rem;
   }
   .rating{
      font-size: 8px;
      color: #999;
      margin-bottom: 0.08rem;
   }
   
}
.menuview-box{
   display: flex;
   margin-top: 0.1rem;
   padding-bottom: 0.48rem;
   
   .menuview-left-box{
      width: 0.77rem;
   }
   .menuview-left{
      width: 0.77rem;
      background: #f8f8f8;
      overflow-y: auto;
      height: 6rem;
      ul{
         padding-bottom: 0.88rem;
         
      }
      li{
         padding: 0.2rem 0.1rem;
         color: #666;
      }
      .activeLi{
         color: #333;
         background: #fff;
      }
   }
}
.menuview-right{
   // width: 2.98rem;
   flex: 1;
   dt{
      margin-left: 0.1rem;
      padding: 0.07rem 0;
      @include sc(0.14rem, #666);
      font-weight: 700;
      .desc{
         @include sc(0.12rem, #999);
      }
   }
   dd{
      margin-left: 0.1rem;
   }
   li{
      display: flex;
      padding: 0.1rem 0;
      .img-box{
         @include wh(0.95rem, 0.95rem);
         margin-right: 0.1rem;
         img{
            @include wh(100%, 100%);
         }
      }
   }
   .foodDetil{
      p{
         width: 1.6rem;
         @include sc(0.1rem, #999);
         white-space: nowrap;
         overflow: hidden;
         margin: 0.05rem 0 0.2rem 0;
      }
   }
}
</style>
