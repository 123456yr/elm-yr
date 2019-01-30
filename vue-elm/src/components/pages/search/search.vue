<template>
   <div class="search-container">
      <header>
         <router-link to="home" class="fa fa-angle-left fa-2x"></router-link>
         <div class="input">
            <span class="search-icon"></span>
            <input v-model="kw" type="text" placeholder="输入商家、商品名称">
            <span v-show="kw" @click="kw=''" class="fa fa-times"></span>
         </div>
         <span class="search-btn">搜索</span>
      </header>
     <div class="search-content pt">
      <section v-show="!kw" v-if="searchHistory.length" class="search_box history-search">
         <div class="title">历史搜索</div>
         <ul>
            <li @click="search(word)" v-for="(word,index) in searchHistory" :key="index">{{word}}</li>
         </ul>
      </section>
      <section v-show="!kw && words.length" class="search_box hot-search">
         <div class="title">热门搜索</div>
         <ul>
            <li @click="search(word.word)" v-for="(word,index) in words" :key="index">{{word.word}}</li>
         </ul>
      </section>
      <section v-show="showSearch && kw" class="search_lists">
         <ul>
            <li @click="search(item)" v-for="(item, index) in searchLists" :key="index">
               <span class="fa fa-search"></span>
               <p v-html="item"></p>
            </li>
         </ul>
      </section>
     </div>
      <shop-list v-if="!showSearch"></shop-list>
   </div>
</template>

<script>
import ShopList from '../../common/other/ShopList.vue'
import { mapState , mapActions} from 'vuex';
import { getHotSearchWord, search, getKeyWords } from '../../../service/getData.js'
export default {
   name: 'Search',
   data() {
       return {
          words: [],
          kw: '',
          showSearch: true,
          searchLists: []
       }
   },
   computed:{
      ...mapState({
         searchHistory: state=> state.user.search_history
      })
   },
   created(){
      this.getHotSearchWord()
   },
   methods: {
      ...mapActions({
         setSearchHistory: 'user/setSearchHistory'
      }),
      async getHotSearchWord(){
         let words= await getHotSearchWord();
         this.words= words.data;
      },
      async search(kw){
         // let reg=/<[^>]+>/g;
         let reg=/<\/?.+?>/g;
         kw= kw.replace(reg, '');
         this.kw= kw;
         this.setSearchHistory(kw);
         try{
            let res= await search(kw);
         }catch(err){
         }
         if(this.showSearch){
            this.showSearch= false;
         }
      }
   },
   watch: {
      kw: {
         handler: function(newVal, oldVal){
            if(!this.showSearch){
               this.showSearch= true;
            }
            if(!newVal){
               this.searchLists=[]
               return;
            }
            getKeyWords(this.kw).then(res=>{
             let words= res.data.words;
             words= words.map(item=>{
                return item.replace(this.kw, "<span class='keyword' style='color: #999'>"+ this.kw +"</span>");
             })
             this.searchLists= words;
         })
         
         }
      }
   },
  components: {ShopList}
}
</script>

<style scoped lang="scss">

@import '../../../stylesheets/particles/mixin.scss';

.search-container /deep/ .shoplist-container{
  header{
    position: fixed;
    top: 0.53rem;

  }
  .shoplist-content{
     padding-top: 0.4rem;
  }
}

.search-container{
   background: #fff;
   height: 100%;
   
   header{
      padding: 0.12rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: #fff;
      @include fja();
      .input{
         position: relative;

         .search-icon{
            position: absolute;
            top: 0.08rem;
            left: 0.1rem;
         }
         input{
            padding: 0.08rem 0.62rem 0.06rem 0.36rem;
            background: #f8f8f8;
            color: #666;
         }
         input::-webkit-input-placeholder{
            color: #666;
            font-size: 0.14rem;
         }
      }
      .search-btn{
         @include sc(0.16rem, #000);
         font-weight: 700;
      }
      
      .fa-times{
         position: absolute;
         top: 0.08rem;
         right: 0.12rem;
      }
   }
}
.search-content{
   padding: 0.44rem 0.12rem 0.12rem;
}
.search_box {
   
   .title{
      @include sc(0.16rem, #666);
      padding: 0.25rem 0 0;
   }
   ul{
      //相当于将margin-right扩大了0.12rem , 对外面包裹的边框没有影响
      margin-right: -0.12rem;
   }
   li{
      display: inline-block;
      padding: 0.08rem;
      background: #f8f8f8;
      margin-right: 0.14rem;
      margin-top: 0.15rem;
   }
}
.search_lists{
   color: #999;
   li{
      @include fja();
   }
   .fa{
      margin-right: 0.1rem;
   }
   p{
      position: relative;
      color: #333;
      flex: 1;
      padding: 0.12rem 0;
      // border-bottom: 1px solid #ddd;
      
   }
   p:before{
         content: '';
         position: absolute;
         bottom: 0;
         left: 0;
         right: 0;
         height: 1px;
         transform: scaleY(0.5);
         background: #ddd;
      }
   
}
</style>

