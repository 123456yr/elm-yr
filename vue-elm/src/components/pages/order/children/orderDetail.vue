<template>
   <div class="orderDetail-container">
       <head-top headBack="true" headTitle="订单详情"></head-top>
       <div class="orderDetail-content pt">
           <div class="order-status">
               <div class="status">订单已取消</div>
               <p>系统取消了订单，理由是超过15分钟未支付</p>
               <div class="btn">再来一单</div>
           </div>
           <div class="order-content">
               <div class="title">{{orderInfo.shopName}}</div>
               <ul>
                   <li v-for="info in orderInfo.goodInfo" :key="info.id">
                       <span class="name">{{info.name}}</span>
                       <span>X{{info.num}}</span>
                       <span>￥{{info.price}}</span>
                   </li>
               </ul>
                <div class="money">
                    <span class="shop">联系商家</span>
                    <span class="totalPrice">实付{{money}}</span>
                </div>
           </div>
       </div>
   </div>
</template>

<script>
import HeadTop from '../../../common/head/head.vue'
import { mapState } from 'vuex';
export default {
   name: 'OrderDetail',
   data() {
       return {
           orderInfo: {},
           money: 0
       }
   },
   created(){
       let id= this.$route.query.id;
       this.orderInfo= this.orders.find((item)=> item.id=== id );
       let money=0;
       this.orderInfo.goodInfo.forEach(item=>{
           money+= item.num * item.price;
       })
       this.money= money;
   },
   computed: {
       ...mapState({
           orders: state=> state.cart.orders
       })
   },
  components: {HeadTop}
}
</script>

<style scoped lang="scss">
@import '../../../../stylesheets/particles/mixin.scss';
.orderDetail-container{
    position: fixed;
    top: 0;
    left:0;
    bottom: 0;
    right: 0;
    background: #f2f2f2;
    z-index: 9999;
}
.orderDetail-content{
    padding-right: 0.1rem;
    padding-left: 0.1rem;
    margin-top: 0.1rem;
}
.order-status{
    background: #fff;
    flex-direction: column;
    padding: 0.1rem 0;
    @include fja(center, center);
    .status{
        @include sc(0.18rem, #000);
        font-weight: 700;
    }
    div{
        margin: 0.08rem 0;
    }
    .btn{
        @include wh(1rem, 0.32rem);
        border-radius: 0.03rem;
        font-size: 0.15rem;
        border: 1px solid $lightblue;
        color: #fff;
        background: $lightblue;
        @include fja(center, center);
        margin-top: 0.14rem;
    }
}
.order-content{
    background: #fff;
    margin-top: 0.2rem;
    .title{
        font-size: 0.16rem;
        padding: 0.1rem;
        border-bottom: 1px solid #ddd;
    }
    li{
        padding: 0.1rem;
        @include fja();
        border-bottom: 1px solid #eee;
    }
    .money{
        padding: 0.1rem 0.1rem ;
        @include fja();
        .shop{
            color: $lightblue;

        }
        .totalPrice{
            font-size: 0.16rem;
        }
    }
}
</style>
