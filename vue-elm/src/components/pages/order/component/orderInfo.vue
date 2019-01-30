<template>
   <div class="orderInfo-container">
       <div class="orderInfo">
           <div class="item">
               <div class="shopName">
                   <span class="name ellipsis">{{order.shopName}}</span>
                   <span class="fa fa-angle-right"></span>
               </div>
               <div class="status">{{order.status}}</div>
           </div>
           <router-link :to="{name: 'OrderDetail', query: {id: order.id}}" class="item">
               <div class="food ellipsis">{{allfood}}</div>
               <div class="money">￥{{allPrice}}</div>
           </router-link>
           <div class="item">
               <router-link tag="div" :to="{name: 'Pay', query: {id: order.id}}" v-if="time" class="time"> 去支付   {{countDown}}</router-link>
               <div v-if="!time" class="btn">再来一单</div>
           </div>
       </div>
   </div>
</template>

<script>
import {mapActions } from 'vuex';
import { countDown } from '../../../../modules/mixin.js';
export default {
   name: 'OrderInfo',
   data() {
       return {
           time: 0,
           showTime: false,
           timer: ''
       }
   },
   props: ['order'],
   mixins: [countDown],
   created(){
       if(this.order.status=== '等待支付'){
           if(this.time< 900000){
               this.time= 900000-(Date.now()-this.order.time);
               this.showTime= true;
                this.setTime()
        }
       } 
   },
   watch: {
       time: {
           handler: function(newValue, oldValue){
               if(newValue<=0){
                   this.setOrderStatus({orderId: this.order.id, status: '订单已取消'})
               }
           }
       }
   },
   methods: {
       ...mapActions({
           setOrderStatus: 'cart/setOrderStatus'
       })
   },
   computed: {
       allfood(){
           let allfood= ''
           this.order.goodInfo.forEach(item=>{
               allfood += item.name + "+";
           })
           allfood= allfood.substring(allfood.length-1, 1);
           return allfood;
       },
       allPrice(){
           let money= 0;
           this.order.goodInfo.forEach(item=>{
               money += item.num * item.price;
           })
           return money;
       }

   },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../../../stylesheets/particles/mixin.scss';
.orderInfo{
    background: #fff;
    margin-bottom: 0.12rem;
    padding: 0 0.12rem;
    .item:not(:last-child){
        border-bottom: 1px dotted #eee;
        
    }
    .item{
        padding: 0.1rem 0;
        @include fja();
    }
    .shopName{
        font-size: 0.17rem;
        .name{
            max-width: 1.6rem;
        }
    }
    .food{
        color: #666;
        width: 1.8rem;
    }
    .money{
        color: #000;
        font-size: 0.16rem;
        font-weight: 700;
    }
    .item:last-child{
        @include fja(flex-end,center);
    }
    .btn{
        padding: 0.05rem 0.1rem;
        border-radius: 0.03rem;
        border: 1px solid $lightblue;
        color: $lightblue;
        
    }
    .time{
       padding: 0.05rem 0.1rem;
        border-radius: 0.03rem;
        border: 1px solid red;
        color: red; 
    }
}
</style>
