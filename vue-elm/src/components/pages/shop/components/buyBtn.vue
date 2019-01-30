<template>
   <div class="buybtn-container">
       <span class="price">￥{{info.price}}</span>
       <p>
           <!-- <span class="nothas">已售完</span> -->
           <a href="javascript:;" @click="minus(info.id)" v-show="flag" class="fa fa-minus-circle fa-lg"></a>
           <span class="count" v-show="flag">{{setNum(info.id)}}</span>
           <a href="javascript:;" @click="plus(info)" class="fa fa-plus-circle fa-lg"></a>
       </p>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
   name: 'BuyBtn',
   data() {
       return {
           flag: false,
           count: 0
       }
   },
   props: ['info'],
   methods: {
       ...mapActions({
         plus: 'cart/addFoodInCart',
         minus: 'cart/reduceFoodInCart'
      }),
      setNum(infoId){
          
           let info= this.cart.find(({id})=> id===infoId);
           if(info){
               this.flag= true;
               return info.num;
           }else{
               this.flag= false;
           }
       }
   },
   computed:{
       ...mapState({
           cart: state=> state.cart.cart
       })
       
   },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../../../stylesheets/particles/mixin.scss';
.buybtn-container{
      @include fja();
      .price{
         color: #ff5339;
         font-size: 0.18rem;
      }
      .count{
       margin: 0 0.06rem;
       font-size: 0.15rem;
        }
        .nothas{
            color: #999;
            font-size: 0.15rem;
        }
        
   }
   
</style>
