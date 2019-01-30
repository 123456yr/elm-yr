<template>
   <div class="login-container">
      <head-top headBack="true" headTitle="我的地址"></head-top>
      <div class="login-content pt">
         <form>
            <div class="login_input">
               <input type="text" placeholder="账号" v-model.lazy="userName">
            </div>
            <div class="login_input">
               <input v-if="!showPwd" type="password" placeholder="密码" v-model.lazy="passWord">
               <input type="text" v-else placeholder="密码" v-model.lazy="passWord">
               <div class="button_switch" @click="showPwd= !showPwd" :class="{circle_active: showPwd}">
                  <div class="circle_switch" ></div>
                  <span>abc</span>
                  <span class="point">...</span>
               </div>
            </div>
            <div class="login_tips">
               <p>温馨提示： 未注册过得账号，登录时将自动注册</p>
               <p>注册过的用户可凭账号密码登录</p>
            </div>
            <el-button :plain="true" class="login_btn" @click="login">
               登录
            </el-button>
         </form>
      </div>
   </div>
</template>

<script>
import HeadTop from '../../common/head/head'
import md5 from 'md5-node';
import {mapMutations } from 'vuex';
import { getStore } from '../../../modules/mUtil.js'
export default {
   name: 'Login',
   data() {
       return {
          userName: '',
          passWord: '',
          captchaCode: '',
          showPwd: false
       }
   },
   mounted(){
      console.log(this)
   },
   methods: {
      ...mapMutations({
         setuserInfo: 'user/SETUSERINFO',
         setLogin: 'user/SETLOGIN'
      }),
      login(){
         var userInfo= getStore("userInfo");
         if(!this.userName){
             this.$message({
               message: '用户名不能为空!',
               type: 'warning'
            });
         }else if(!this.passWord){
            this.$message({
               message: '密码不能为空！',
               type: 'warning'
            })
         }else if(userInfo){
            //不是第一次登录，判断用户民密码是否正确
            if(userInfo.uname!= this.userName){
                this.$message({
                  message: '用户名不正确！',
                  type: 'warning'
               })
            }else if(userInfo.pwd != md5(this.passWord)){
                this.$message({
                  message: '密码不正确！',
                  type: 'warning'
               })
            }else{
               this.setLogin(true);
               this.$router.back(-1);
            }
         }else{
            //如果用户第一次登录直接注册成功
            this.setuserInfo({uname: this.userName, pwd: md5(this.passWord)});
            this.$router.back(-1);
         }
      }
   },
  components: {HeadTop}
}
</script>

<style scoped lang="scss">
@import '../../../stylesheets/particles/mixin.scss';

 

.login-container{
   header{
      @include wh(100%, 0.5rem);
      background: $blue;
      color: #fff;
      font-size: 0.19rem;
      font-weight: 700;
      position: relative;
      .title{
         @include wh(100%, 100%);
         text-align: center;
         line-height: 0.5rem;
      }
      .fa{
         position: absolute;
         left: 0.15rem;
         top: 0.05rem;
      }
   }
   .login-content{
      margin-top: 0.15rem;

   }
   .login_input{
      @include wh(100%, 0.5rem);
      background: #fff;
      @include fja();
      padding: 0 0.1rem;
      input{
         @include wh(70%, 100%);
         font-size: 0.15rem;
      }
   }
   .login_input:not(:last-child){
      border-bottom: 1px solid #ddd;
   }
   .button_switch{
      position: relative;
      @include wh(0.48rem, 0.16rem);
      background: #cfcfcf;
      color: #fff;
      border-radius: 0.08rem;
      @include fja();
      font-weight: 100;
      font-size: 0.12rem;
      padding: 0 0.06rem 0 0.02rem;
   }
   .point{
      display: inline-block;
      margin-top: -0.08rem;
      font-weight: 700;
   }
   .circle_switch{
      @include wh(0.28rem, 0.28rem);
      border-radius: 50%;
      background: #f2f2f2;
      position: absolute;
      top: -36%;
      left:0;
      transition: all 0.2s ease-in-out;
   }
   .circle_active{
      background: #4cd964;
      .circle_switch{
         transform: translateX(0.2rem);
      }
   }
   .login_tips{
      color: red;
      line-height: 0.3rem;
      padding: 0 0.1rem;
   }
   
   
}
// .login-container /deep/.el-message{
//       top: 0.9rem;
//       background: #fff!important;
// }

</style>
// 全局样式
<style>
/* element-ui 中的提示信息message的样式 */
.el-message {
  top: 50%;
  /* transform: translateY(-50%); */
  background: #000000;
  min-width: 0;
  color: #fff;
  line-height: 1.2;
  padding: 0.08rem 0.1rem;
}
/* element-ui中按钮样式 */
.login_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96%;
  height: 0.4rem;
  font-size: 0.16rem;
  color: #fff;
  background: #4cd964;
  text-align: center;
  border-radius: 0.02rem;
  margin: 0 2%;
}
</style>


