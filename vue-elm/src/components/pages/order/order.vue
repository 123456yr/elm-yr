<template>
   <div class="order-container">
      <head-top headTitle="订单"></head-top>
      <div class="order-content pt pb">
         <order-info :order= order v-for="order in orders" :key="order.id"></order-info>
      </div>
      <router-view></router-view>
      <foot-nav></foot-nav>
   </div>
</template>

<script>
import HeadTop from '../../common/head/head.vue';
import FootNav from '../../common/foot/foot';
import OrderInfo from './component/orderInfo.vue'
import { mapState, mapMutations, mapActions} from 'vuex';
export default {
   name: 'Order',
   data() {
       return {}
   },
   computed: {
      ...mapState({
         orders: state=> state.cart.orders
      })
   },
  components: {FootNav, HeadTop, OrderInfo}
}
</script>

<style scoped lang="scss">
@import "../../../stylesheets/particles/mixin.scss";
.order-container{

}
</style>
