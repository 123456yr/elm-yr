<template>
   <div class="evaluate-container">
      <div class="rating-box">
         <span class="rating">4.9</span>
         <p class="rating-shop">
            <span>商家评分</span>
            <rating-star :rating="4.5"></rating-star>
         </p>
         <div class="rating-type">
            <p>味道</p>
            <span>8.9</span>
         </div>
         <div class="rating-type">
            <p>包装</p>
            <span>8.9</span>
         </div>
         <div class="rating-type">
            <p>配送</p>
            <span>8.9</span>
         </div>
      </div>
      <section class="tags-box">
         <ul>
            <li v-for="(tag, index) in tags" :key="index" :class="{gray: tag.unsatisfied}">
               {{tag.name}}  {{tag.count=== -1? '': tag.count}}
            </li>
         </ul>
      </section>
      <div class="comment-content">
         <section class="comment-item" v-for="(comment, index) in comments" :key="index">
            <div class="elm_bg"></div>
            <div class="content">
               <p class="comment-user">
                  <span class="name">{{comment.username}}</span>
                  <span class="time">{{comment.rated_at}}</span>
               </p>
              <rating-star :rating="3.4"></rating-star>
              <p class="desc">{{comment.rating_text}}</p>
              <!-- <img :src="getImgURL(comment.order_images[0].image_hash)" alt=""> -->
            </div>
         </section>
         <toast 
            :has_next="has_next" 
            toast_icon="fa-spinner fa-pulse" 
            :toast_text="toast_text" 
            :isLoadMore="isLoadMore">
         </toast>
      </div>
   </div>
</template>

<script>
import Toast from '../../../common/other/toast.vue';
import { getImgURL , loadMore} from '../../../../modules/mixin.js'
import RatingStar from '../../../common/other/ratingStar.vue'
import { getEvaluate, getComments} from '../../../../service/getData.js'
export default {
   name: 'Evaluate',
   data() {
       return {
          tags: [],
          rating: {},
          comments: [],
          has_next: true,
          toast_text: '正在加载...',
          isLoadMore: true,
          offset: 0,
          num: 20
       }
   },
   mixins: [getImgURL, loadMore],
   props: ['recommend'],
   created(){
      this.getAll()
   },
   methods: {
      async getAll(){
         let result=await getEvaluate();
         this.tags= result.data.tags;
         this.rating= result.data.rating;
         this.comments= result.data.comments;
      },
      async getLists(){
         //如果没有更多了就不再去请求
         this.isLoadMore= false;
         if(!this.has_next)return;
         let result=[];
         try{
            result=await getComments(this.offset);
         }catch(err){
            console.log(err)
         }
         
         if(result.length===0){
            this.has_next= false;
            this.toast_text= '没有更多了';
            return;
         }
         this.hasNext(result)
         this.comments= this.comments.concat(result.data) ;

         this.isLoadMore= true;
         
      },
      hasNext(result){
         if(result.data.length< 20){
            this.has_next= false;
            this.toast_text= '没有更多了';
         }
      }
   },
  components: {RatingStar, Toast}
}
</script>

<style scoped lang="scss">
@import '../../../../stylesheets/particles/mixin.scss';
.rating-box{
   padding: 0.15rem 0.2rem 0.2rem;
   border-bottom: 8px solid #f2f2f2;
   @include fja();
   .rating{
      @include sc(0.36rem, #ff6000);
   }
   
   .rating-type{
      padding-left: 0.1rem;
      color: #999;
      span{
         font-size: 0.2rem;
      }
   }
}
.tags-box{
   padding: 0.18rem 0.18rem 0.08rem;
   
   ul{
      margin-right: -0.1rem;
   }
   li{
      display: inline-block;
      padding: 0.06rem;
      color: #6d7885;
      font-size: 0.12rem;
      margin-right: 0.1rem;
      background: #ebf5ff;
      border-radius: 0.02rem;
      margin-bottom: 0.1rem;
   }
   .gray{
      background: #f2f2f2;
   }
   .active{
      background: $lightblue;
      color: #fff;
   }
}
.comment-content{
   padding: 0 0.15rem 0.1rem;
   .comment-item{
      @include fj();
      padding:0.1rem 0;
      .elm_bg{
         @include wh(0.3rem, 0.3rem);
         background-size: 0.3rem;
      }
      .content{
         flex: 1;
         padding-left: 0.15rem;
      }
   }
   .comment-user{
      @include fj();
      margin-bottom: 0.1rem;
   }
   .desc{
      margin-top: 0.1rem;
   }
}
</style>
