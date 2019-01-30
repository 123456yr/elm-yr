<template>
   <div class="checkout-container">
       <head-top headBack="true" headTitle="确认订单"></head-top>
       <div class="checkout-content" v-if="totalInfo.num">
           <div class="address-box">
               <p class="tag">订单配送至     <span v-if="addrItem.tag" :content="addrItem.tag"></span></p>
                <router-link tag="h3" :to="{name: 'MineAddress'}">{{addrItem.address.name}}
                    <span class="fa fa-angle-right fa-lg"></span>
                </router-link>
                <p class="user">
                    {{addrItem.userName}}{{addrItem.sex? addrItem.sex: ''}}
                    {{ addrItem.phone}}
                </p>
           </div>
           <div class="paytype-box">
               <div class="item">
                   <span class="left">送达时间</span>
                   <span class="right">尽快送达
                        <span class="fa fa-angle-right fa-lg"></span>
                   </span>
                  
               </div>
               <div class="item">
                   <span class="left">支付方式</span>
                   <span class="right">在线支付</span>
               </div>
           </div>
           <div class="cart-box">
               <div class="title">肯德基宅急送（吉美店）</div>
               <ul>
                   <li v-for="item in cart" :key="item.id" class="item">
                       <div class="left">
                        <div class="food">
                            <img :src="getImgURL(item.imagePath)" alt="">
                            <span class="name">{{item.name}} </span>
                         </div>
                         <span class="num">x{{item.num}}</span>
                        </div>
                        <div class="right">￥{{item.num*item.price}}</div>
                   </li>
                </ul>
                   <div class="item">
                       <div class="left">红包</div>
                       <span class="right">几个可用
                           <span class="fa fa-angle-right fa-lg"></span>
                       </span>
                   </div>
                   <div class="item">
                       <div class="left">优惠说明</div>
                       <div class="right">
                        小计￥
                         <span>{{totalInfo.price}}</span>
                       </div>
                   </div>
               
           </div>
           <div class="food-note cart-box">
               <div v-for="note in notes" :key="note.id" class="item">
                   <span class="left">{{note.title}}</span>
                   <span class="right">{{note.desc}}<span class="fa fa-angle-right fa-lg"></span></span>
               </div>
           </div>
       </div>
       <footer v-if="totalInfo.num">
           <div class="pay-box">
               <div class="money">
                   <span>￥{{totalInfo.price}}</span>
               </div>
               <router-link tag="div" to="pay" class="btn">去支付</router-link>
           </div>
       </footer>
       <section class="nullcart-box" v-if="!totalInfo.num">
           <img src="/static/images/address-bg.gif" alt=""/>
           <p>购物车是空的</p>
           <div class="btn" @click="$router.replace({name: 'Home'})">返回</div>
       </section>
   </div>
</template>

<script>
import { getImgURL} from '../../../modules/mixin.js'
import { mapState , mapActions, mapGetters} from 'vuex';
import HeadTop from '../../common/head/head.vue'
export default {
   name: 'CheckOut',
   data() {
       return {
           addrItem: {},
           notes: [
               { id: 0, title: '餐具份数', desc: '未选择', route: ''},
               { id: 1, title: '订单备注', desc: '口味、偏好', route: ''},
               { id: 2, title: '发票信息', desc: '不需要开发票', route: ''}
           ]
       }
   },
   mixins: [getImgURL],
   created(){
       this.initCart()
        this.addrItem= this.addressInfo.find(item=> item.id=== this.currId)
   },
   methods: {
       ...mapActions({
           initCart: 'cart/initCart'
       })
   },
   computed: {
       ...mapState({
           cart: state=> state.cart.cart,
           currId: state=> state.user.currId,
           addressInfo: state=> state.user.addressInfo
       }),
       ...mapGetters({
           totalInfo: 'cart/totalInfo'
       })
   },
  components: {HeadTop}
}
</script>

<style scoped lang="scss">
@import '../../../stylesheets/particles/mixin.scss';
.checkout-container{
    height: 100%;
    padding-top: 0.44rem;
}
.checkout-content{
    padding: 0 0.06rem;
    height: 100%;
    background-image: linear-gradient(0deg, #f5f5f5, #f5f5f5 65%, hsla(0%, 0%, 96%, 0.3) 75%, hsla(0, 0%, 96%, 0)),linear-gradient(270deg, #0085ff, #0af);
}
.address-box{
    padding: 0.2rem 0.1rem 0.1rem;
    color: #fff;
    
    .tag{
        font-size: 0.12rem;
        margin-bottom: 0.08rem;
        color: hsla(0,0%,100%,.8);
        
        line-height: 1.3;
        span{
            margin-left: 0.05rem;
            vertical-align: middle;
            position: relative;
            &:after{
                content: attr(content);
                position: absolute;
                top: 0;
                left: 0;
                white-space: nowrap;
                font-size: 0.2rem;
                border: 1px solid #fff;
                padding: 0 0.03rem;
                transform-origin: 0 0;
                transform: scale(0.5);
            }
        }
    }
    h3{
        font-weight: 700;
        font-size: 0.22rem;
        margin-bottom: 0.08rem;
    }
}
.paytype-box{
    margin-bottom: 0.08rem;
    background: #fff;
    padding: 0 0.15rem;
    .item{
        border-bottom: 1px solid #ddd;
        padding: 0.1rem 0;
        @include fja();
        font-size: 0.15rem;
        .right{
            color: $lightblue;
        }
        .fa{
            color: #999;
        }
    }
}
.cart-box{
    margin-bottom: 0.16rem;
    padding: 0 0.1rem;
    background: #fff;
    .title{
        font-size: 0.18rem;
        font-weight: 700;
        padding: 0.12rem 0;
    }
    .item{
        border-top: 1px dotted #eee;
        padding: 0.15rem 0;
        @include fja();
        .left{
            width: 2.2rem;
            @include fja();
            img{
                @include wh(0.36rem, 0.36rem);
            }
            .food{
                @include fja();
                span{
                    margin-left: 0.1rem;
                }
            }
        }
    }
}
.food-note{
    padding-bottom: 0.44rem;
    .right{
        color: #999;
        .fa{
            margin-left: 0.05rem;
        }
    }
}

.pay-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right:0;
    background: #3c3c3c;
    height: 0.44rem;
    @include fja();
    .btn {
         background: #38ca73;
         font-weight: 700;
         color: #fff;
         font-size: 0.16rem;
         @include wh(1rem , 100%);
         @include fja(center, center);
    }
    .money{
        padding-left: 0.15rem;
        color: #fff;
        span{
            font-size: 0.17rem;
            font-weight: 700;
        }
    }
}
.nullcart-box{
    height: 100%;
    flex-direction: column;
    @include fja(flex-start, center);
    // 越靠前的越重要，后面的将被前面的覆盖
    background-image: linear-gradient(to top,  #f5f5f5, #f5f5f5 65%, hsla(0%, 0%, 96%, 0.3) 75%, hsla(0, 0%, 96%, 0)),linear-gradient(to bottom, #0085ff, #0af);
    img{
        @include wh(2.6rem, 2.6rem);
    }
    p{
        font-size: 0.16rem;
        margin-top: 0.15rem;
    }
    .btn{
        @include wh(1.2rem, 0.4rem);
        background: #0085ff;
        border-radius: 0.03rem;
        @include sc(0.16rem, #fff);
        text-align: center;
        line-height: 0.4rem;
        margin-top: 0.1rem;
    }
}

</style>
