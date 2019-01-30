<template>
   <div class="info-container">
      <head-top headBack="true" headTitle="个人信息"></head-top>
      <div class="pt">
         <div class="info-item">
            <input type="file" name="postimg" multiple="multiple" class="file_img" @change="changeImg">
            <span>头像</span>
            <div class="user_img_box">
               <img :src="userInfo.portrait" v-if="userInfo.portrait" alt="" class="user_img">
               <span class="elm_bg" v-else></span>
               <span class="fa fa-angle-right fa-lg head"></span>
            </div>
         </div>
         <div class="info-item">
            <span>用户名</span>
            <div>
               <span>{{userInfo.uname}}</span>
               <span class="fa fa-angle-right fa-lg"></span>
            </div>
         </div>
         <div class="exit-btn" @click="exit">退出登录</div>
      </div>
   </div>
</template>

<script>
import HeadTop from '../../../common/head/head.vue'
import { mapState , mapMutations} from 'vuex'
export default {
   name: 'Info',
   data() {
       return {

       }
   },
   methods: {
      ...mapMutations({
         updateUser: 'user/UPDATEUSER',
         exitStore: 'user/EXIT'
      }),
      changeImg(event){
         let file=event.target.files[0];
         if(window.FileReader) {  
                var fr = new FileReader();  
                fr.onloadend = (e)=> {  
                   this.updateUser({portrait: e.target.result})
                   let userImg= document.querySelector('.user_img');
                     userImg.src=e.target.result;
                     
                };  
                fr.readAsDataURL(file);  //也是利用将图片作为url读出
            }  
      },
      exit(){
         this.exitStore();
         this.$router.back(-1);
      }
   },
   computed: {
      ...mapState({
         userInfo: state=> state.user.userInfo
      })
   },
  components: {HeadTop}
}
</script>

<style scoped lang="scss">
@import '../../../../stylesheets/particles/mixin.scss';
.info-container{
   @include allcover();
   background: #f2f2f2;
   z-index: 100;
   font-size: 0.16rem;
   
   .info-item{
      position: relative;
      @include fja();
      background: #fff;
      padding: 0.15rem 0.1rem;
       border-bottom: 1px solid #ddd;
   }
   .head{
      vertical-align: 130%;
   }
   .fa{
      margin-left: 0.1rem;
   }
   .exit-btn{
      height: 0.4rem;
      background: #d8584a;
      color: #fff;
      border-radius: 0.02rem;
      box-shadow: 0 0 2px #d8584a;
      text-align: center;
      line-height: 0.4rem;
      margin: 0.4rem 0.1rem;
   }
   .user_img_box{
      @include fja();
   }
   .file_img{
      @include allcover();
      @include wh(100%, 100%);
      opacity: 0;
   }
   .user_img{
      @include wh(0.6rem, 0.6rem);
   }
}
</style>
