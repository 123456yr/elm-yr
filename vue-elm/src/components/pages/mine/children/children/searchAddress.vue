<template>
   <div class="search_address_container">
       <head-top headBack="true" headTitle="搜索地址"></head-top>
       <div class="search-address pt">
           <div class="search-box">
               <input v-model="keyword" class="search-icon" type="text" placeholder="请输入小区/写字楼/学校等">
               <div class="btn" @click="search">
                    搜索
               </div>
           </div>
           <section class="search-content">
               <dl v-for="item in lists" :key="item.id" @click="setAddress(item.city_id,item.name,item.city, item.latitude, item.longitude)">
                   <dt>{{item.name}}</dt>
                   <dd>{{item.address}}</dd>
               </dl>
           </section>
       </div>
   </div>
</template>

<script>
import { getAddress } from '../../../../../service/getData.js';
import HeadTop from '../../../../common/head/head';
import {eventBus} from '../../../../../modules/event-bus.js';
export default {
   name: 'SearchAddress',
   data() {
       return {
           lists: [],
           keyword: ''
       }
   },
   created(){
       this.getAddress()
       
   },
   methods: {
       search(){
           if(this.keyword){
               this.getAddress(this.keyword);
           }
       },
       getAddress(keyword){
           keyword= keyword || null;
           getAddress(keyword).then(result=>{
              this.lists= result.data;
            })
       },
       setAddress(cityId, name,city, lat, lng){
           //每次执行发布都会创建一个新的方法，所以要清除方法
        //    Vue.set(that.addParams,that.editIndex,data)
           this.$bus.$emit('setAddress', {cityId ,name, city, lat, lng});
            this.$router.back(-1);
       }
   },
  beforeDestroy(){
      //清除所有的方法
    this.$bus.$off();
  },
  components: {HeadTop}
}
</script>

<style scoped lang="scss">
@import '../../../../../stylesheets/particles/mixin.scss';
.search_address_container{
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    min-height: 100%;
}
.search-address{
   padding-left: 0.15rem;
   padding-right: 0.15rem;
    .search-box{
        margin: 0.1rem 0;
         @include fja();
         input{
             height: 0.22rem;
             flex: 1;
             margin-right: 0.1rem;
             padding: 0.15rem 0.3rem;
             background-color: #fafafa;
             border-radius: 0.02rem;
         }
         input::-webkit-input-placeholder{
             color: #666;
             font-size: 0.12rem;
         }
         .search-icon{
             background-size: 0.2rem 0.2rem;
             background-position: 0.1rem 0.07rem;
         }
    }
    .btn{
        background: $blue;
        @include whr(0.55rem, 0.3rem, 0.02rem);
        color: #fff;
        line-height: 0.3rem;
        text-align: center;
    }
    dl{
        position: relative;
        // border-bottom: 1px solid #ddd;
        padding: 0.1rem 0;
    }
    dl:not(:last-child):after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: inline-block;
        height: 1px;
        transform: scaleY(0.5); 
        background: #eee;
    }
    dt{
        font-size: 0.15rem;
    }
    dd{
        @include sc(0.12rem, #999);
        line-height: 1.2;
    }
}

</style>
