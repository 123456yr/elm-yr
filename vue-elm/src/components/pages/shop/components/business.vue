<template>
   <div class="business-container">
      <section>
         <div class="header-image">
            <img :src="getImgURL(res.header_image)" alt="">
            <div class="title">{{res.title}}</div>
            <p class="desc">{{brief}}</p>
         </div>
         <div class="btn">查看品牌故事</div>
      </section>
   </div>
</template>

<script>
import { getImgURL } from '../../../../modules/mixin.js'
import { getBusiness } from '../../../../service/getData.js'
export default {
   name: 'Business',
   data() {
       return {
          res: {},
          brief: ''
       }
   },
   mixins: [getImgURL],
   created(){
      getBusiness().then(result=>{
         this.res= result.data;
         let brief=result.data.brand_intros[0].brief;
         this.brief= brief.substr(0, 45)+'...';
      })
   },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../../../stylesheets/particles/mixin.scss';
.business-container{
   .header-image{
      padding: 0.15rem;
      img{
         @include wh(100%, 1.95rem);
         margin-bottom: 0.1rem;
      }
      .title{
         @include sc(0.15rem, #000);
         font-weight: 700;
      }
      .desc{
         color: #666;
         padding-top: 0.1rem;
         line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
         margin-bottom: 0.2rem;
      }
   }
   .btn{
      @include wh(100%, 0.4rem);
      text-align: center;
   }
}
</style>
