<template>
   <div class="mine-container">
      <header>
         <router-link :to="{name: login? 'Info': 'Login'}" class="mine-box">
            <img :src="userInfo.portrait" alt="" v-if="login && userInfo.portrait" class="user_img">
            <span class="elm_bg" v-else></span>
            <div class="mine-info">
               <div class="not_login" v-if="!login">
                  <h3>登录|注册</h3>
                  <p>登陆后享受更多特权</p>
               </div>
            <div class="login" v-else>
               <h3>{{userInfo.uname}}</h3>
               <p>暂无绑定手机号</p>
            </div>
           </div>
         <span class="fa fa-angle-right fa-lg"></span>
         </router-link>
      </header>
      <section class="mine_money">
         <dl v-for="item in money" :key="item.id">
            <dt><img :src="item.src" alt=""> </dt>
            <dd>{{item.name}}</dd>
         </dl>
      </section>
      <div class="mine_content">
         <div class="mine_item" v-for="item in items" :key="item.id">
            <el-button :plain="true" @click="redirectTo(item.route)"></el-button>
            <span>{{item.name}}</span>
            <span class="fa fa-angle-right fa-lg"></span>
         </div>
      </div>
      <foot-nav></foot-nav>
      <transition 
         name="router_slide"
         mode="out-in"
      >
         <router-view></router-view>
      </transition>
   </div>
</template>

<script>
import FootNav from '../../common/foot/foot';
import { mapState } from 'vuex';
import { getStore } from '../../../modules/mUtil'
export default {
   name: 'Mine',
   data() {
       return {
          money: [
             { id: 0, name: '钱包',src: '/static/images/icons/money1.png'},
             { id: 1, name: '红包',src: '/static/images/icons/money2.png'},
             { id: 2, name: '金币',src: '/static/images/icons/money3.png'}
          ],
          items: [
             { id: 0, name: '我的地址', route: 'mineAddress'},
             { id: 1, name: '金币商城', route: ''},
             { id: 2, name: '分享拿10元现金', route: ''},
             { id: 3, name: '我的客服', route: ''},
             { id: 4, name: '下载饿了么APP', route: ''},
             { id: 5, name: '规则中心', route: ''}
          ]
       }
   },
   created(){
   },
   methods: {
      redirectTo(route){
         if(!this.login){
            this.$message({
            message: '请先登录',
            type: 'waring'
            })
            return;
         }
         this.$router.push({name: 'MineAddress'});
      }
   },
   computed: {
      ...mapState({
         userInfo: state=> state.user.userInfo,
         login: state => state.user.login
      })
   },
  components: {FootNav}
}
</script>

<style scoped lang="scss">
@import '../../../stylesheets/particles/mixin.scss';
.router_slide-enter, .router_slide-leave-active{
   opacity: 0;
   transform: translate3d(2rem, 0, 0);
}
.router_slide-enter-active, .router_slide-leave-active{
   transition: all 0.3s;
}
.user_img{
      @include wh(0.6rem, 0.6rem);
   }
.mine-container{
   .mine-box{
      @include fja();
      padding: 0.25rem 0.15rem;
      background: $blue;
      color: #fff;
      
      .mine-info{
         font-family: Helvetica Neue,Tahoma,Arial;
         margin-left: 0.15rem;
         flex: 1;
         color: #fff;
         h3{
            font-size: 0.2rem;
            font-weight: 700;
         }
      }
      
   }
   .mine_money{
      background: #fff;
      @include fj();
      @include wh(100%, 0.835rem);
      border-bottom: 1px solid #ddd;
      dl{
         padding: 0.16rem 0;
         flex-direction: column;
         @include fja();
         width: 33.33%;
      }
      dl:not(:last-child){
         border-right: 1px solid #ddd;
      }
      dt{
         @include fj(center);
         img{
            border-radius: 50%;
            @include wh(0.256rem, 0.256rem);
         }
      }
   }
   .mine_content{
      .mine_item{
         position: relative;
         background: #fff;
         @include fja();
         padding: 0 0.15rem;
         @include wh(100%, 0.445rem);
         @include sc(0.16rem, #666);
      }
      
   }
   .mine_item:nth-child(1),.mine_item:nth-child(2),.mine_item:nth-child(4){
         margin-top: 0.18rem;
      }
      .el-button{
         @include allcover();
         border: none;
         @include wh(100%, 100%);
         opacity: 0;
      }
}
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
