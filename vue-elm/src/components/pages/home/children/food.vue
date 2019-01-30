<template>
   <div class="food-container">
      <header>
         <nav>
            <ul class="scroll_head">
               <li>全部</li>
               <li>全部</li>
               <li>全部hahaah</li>
               <li>全部hahaah</li>
               <li>全部hahaah</li>
               <li>全部hahaah</li>
            </ul>
            <div class="icon-box"></div>
         </nav>
         <section></section>
      </header>
      
   </div>
</template>

<script>
export default {
   name: 'Food',
   data() {
       return {}
   },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../../../stylesheets/particles/mixin.scss';
.food-container{
   nav{
      @include wh(100%, 0.4rem);
      @include fj();
      background-image: -webkit-gradient(linear, left top, right top, from (#0af), to(#0085ff));
      background-image: -webkit-linear-gradient( left, #0af, #0085ff);
      background-image: linear-gradient(90deg, #0af, #0085ff);
      color: #fff;
   }
   .icon-box{
      @include wh(0.45rem, 100%);
   }
   .scroll_head{
      height: 100%;
      padding-left: 0.1rem;
      flex: 1;
      overflow-x: scroll;
      white-space: nowrap;
      li{
         display: inline-block;
         height: 100%;
         line-height: 0.4rem;
         margin-right: 0.28rem;
         white-space: nowrap;
      }
   }
}

</style>
