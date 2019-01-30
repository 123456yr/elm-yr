<template>
   <div class="pay-container">
       <head-top headBack="true" headTitle="在线支付"></head-top>
       <div class="pay-content pt">
           <div class="pay-time">
               <div>支付剩余时间</div>
                <div v-show="time" class="time">{{countDown}}</div>
                <div v-show="!time" class="time">订单已超时</div>
           </div>
           <div class="other-pay">
               <div class="title">其他支付</div>
               <div class="pay-item" @click="activeId=item.id" v-for="item in payTypes" :key="item.id">
                   <div class="type">
                       <img :src="item.img" alt="">
                       <span>{{item.name}}</span>
                   </div>
                   <div class="select">
                       <img src="/static/images/icons/select.png" v-show="activeId=== item.id" alt="">
                       <img src="/static/images/icons/select (1).png" v-show="activeId!== item.id" alt="">
                   </div>
               </div>
           </div>
           <div :plain="true" class="btn" @click="surePay">确认支付￥{{money? money: totalInfo.price}}</div>
       </div>
   </div>
</template>

<script>
import { countDown } from '../../../modules/mixin.js';
import { mapGetters, mapMutations, mapActions , mapState} from 'vuex';
import HeadTop from '../../common/head/head.vue';
export default {
   name: 'Pay',
   data() {
       return {
           payTypes: [
               { id: 0, name: '支付宝', img: '/static/images/icons/pay-zhi.png'},
               { id: 1, name: '微信', img: '/static/images/icons/pay-wei.png'}
           ],
           activeId: 0,
           time: 900000,
           money: 0,
           timer: ''
       }
   },
   mixins: [countDown],
   created(){
       let orderId= this.$route.query.id;
       if(orderId){
           let orderInfo= this.orders.find(({id})=> id=== orderId);
           this.time= 900000-(Date.now()-orderInfo.time);
           let money=0;
           orderInfo.goodInfo.forEach(item=>{
               money+= item.num* item.price;
           })
           this.money= money;
       }else{
           this.setOrder('肯德基宅急送');
       }
       
   },
   methods: {
       ...mapActions({
           clearCart: 'cart/clearCart',
           setOrder: 'cart/setOrder',
           setOrderStatus: 'cart/setOrderStatus'
       }),
    surePay(){
        if(this.minute== -1){
            this.$message({
                message: '订单已取消，请重新点单',
                duraction: 2000
            })
            return ;
        }
        let status= '正在路上';
        this.setOrderStatus({orderId: this.orderId, status});
        this.$router.replace({name: 'Order'});
    }
   },
   mounted(){
      console.log(this.time)
       this.setTime()
   },
   computed: {
       ...mapGetters({
           totalInfo: 'cart/totalInfo'
       }),
        ...mapState({
           orderId : state=> state.cart.orderId,
           orders: state=> state.cart.orders
        })
   },
   beforeDestroy(){
       this.clearCart();
       clearInterval(this.$options.timer);
   },
  components: {HeadTop}
}
</script>

<style scoped lang="scss">
@import '../../../stylesheets/particles/mixin.scss';
.pay-time{
    @include wh(100%, 1.4rem);
    background: #fff;
    flex-direction: column;
    @include fja(center, center);
    font-size: 0.16rem;
    .time{
        font-size: 0.3rem;
        margin-top: 0.1rem;
    }
}
.other-pay{
    .title{
        background: #f2f2f2;
        padding: 0.1rem 0.1rem;
    }
    .pay-item{
        background: #fff;
        @include fja();
        padding: 0.1rem;
        .type{
            @include fja();
            img{
                @include wh(0.36rem, 0.36rem);
                margin-right: 0.1rem;
            }
        }
    }
    .select{
        img{
            @include wh(0.26rem, 0.26rem);
        }
    }
}
.pay-content{
    .btn{
        margin: 0.15rem;
        background: #4cd964;
        color: #fff;
        height: 0.4rem;
        text-align: center;
        line-height: 0.4rem;
        border-radius: 0.02rem;
        font-size: 0.16rem;
    }
}
</style>

