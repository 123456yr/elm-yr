<template>
   <div class="foot-container">
       <nav>
          <router-link v-for="nav in navs" :to="nav.url" :key="nav.id" class="nav" >
             <span class="fa fa-2x" :class="nav.icon"></span>
             <span>{{nav.name}}</span>
          </router-link>
       </nav>
   </div>
</template>

<script>
export default {
   name: 'FootNav',
   data() {
       return {
          navs: [
             { id: 0, name: '首页', icon: 'fa-home',  url: 'home'},
             { id: 1, name: '发现',icon: 'fa-eye',  url: 'find'},
             { id: 2, name: '订单', icon: 'fa-credit-card', url: 'order'},
             { id: 3, name: '我的',icon: 'fa-user-circle', url: 'mine'}
          ],
          activeId: 0
       }
   },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../../stylesheets/particles/mixin.scss';

.foot-container{
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   z-index: 98;
   @include wh(100%, 0.5rem);
   background: #fff;
   nav{
      @include wh(100%, 100%);
      @include fja();
      padding: 0.05rem 0;
   }
   .nav{
      @include wh(25%, 100%);
      flex-direction: column;
      @include fja();
      span{
         color: #999;
      }
      
   }
   .fa-2x{
      font-size: 0.182rem;
   }
   .router-link-active{
      span{
         color: $blue;
      }
   }
}

</style>
