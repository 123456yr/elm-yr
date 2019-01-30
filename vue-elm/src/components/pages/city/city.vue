<template>
   <div class="city-container">
       <head-top headBack="true" headTitle="选择城市">
            <div class="search-box" slot="search">
                <span class="search-icon"></span>
                <input v-model="keyword" type="text" placeholder="请输入城市或拼音">  
         </div>
       </head-top>
       <div class="city-wrapper">
           <div class="pos-now" v-if="currentCity">
               <div class="title">当前定位城市</div>
               <div class="cityname">{{currentCity}}</div>
           </div>
           <div class="group_city_container">
               <ul v-if="keyword" class="cityname_container" >
                    <router-link tag="li" class="cityname" v-for="(item, index) in getKeyWord" :to="{ name: 'Address', params: {city: item}}" :key="index">{{item}} </router-link>
                </ul>
               <ul v-if="!keyword" class="letter_classify">
                   <li :class="{ activeLetter : activeId === index ? true: false }" v-for="(item, index) in allCities" :key="index">
                       <h4 class="title">{{item.title}}</h4>
                       <ul class="cityname_container" >
                           <router-link tag="li" class="cityname" :to="{ name: 'Address', params: {city: item}}" v-for="(item, index) in item.lists" :key="index">{{item}}</router-link>
                       </ul>
                   </li>
               </ul>
           </div>
        </div>
        <nav v-if="!keyword">
            <ul class="letters" >
                <li @click="posLetter(index)" class="letter" v-for="(item , index) in allCities" :key="index">{{item.title}}</li>
            </ul>
        </nav>
   </div>
</template>

<script>
import { mapState} from 'vuex';
import { PinYin } from '../../../modules/pingyin.js';
import HeadTop from "../../common/head/head.vue";
import { allCities } from '../../../service/getData.js';
export default {
   name: 'City',
   data() {
       return {
           allCities: [],
           activeId: 0,
           keyword: ''
       }
   },
   created(){
      this.getCities()
   },
   methods: {
       posLetter(index){
           this.activeId= index;
           //data数据变化慢，class中的值还没有变化过来，下面的语句就找class，找不到，所以要点两次
    //document是整个文档包括HTML在内的， this.$el 是这个vue页面中的节点包括template在内的所有节点
            setTimeout(()=>{
                 document.documentElement.scrollTop= this.$el.querySelector('.activeLetter').offsetTop - document.getElementById('head-top').offsetHeight;
            }, 0 )
       },
       getCities(){
           allCities().then(res=>{
             this.allCities= res.data.city;
        })
       }
   },
   computed: {
       ...mapState({ //如果模块化的store，state一定要写成这种形式，直接写成数组是undefind,其他的actions和getters没有关系
         currentCity: state=> state.user.currentCity
      }),
       getKeyWord(){
         
           var citynames= [];
           let { allCities, keyword}= this;
           for(var i=0; i<allCities.length; i++){
               citynames= citynames.concat(allCities[i].lists);
           }
            citynames= citynames.filter(item =>{
                if(item.indexOf(keyword) !== -1){
                    return true;
                }
                return false;
            })
            return citynames;
       }
   },
  components: {HeadTop}
}
</script>

<style scoped lang="scss">
@import '../../../stylesheets/particles/mixin.scss';

.city-container{
    .search-box{
        @include wh(100%, 0.44rem);
        border-top: 2px solid #fff;
        @include fja(center,center);
        text-align: center;
        line-height: 0.44rem;
        input{
            @include wh(3.25rem, 0.3rem);
            border-radius: 0.15rem;
            padding-left: 0.3rem;
        }
        .search-icon{
            position: absolute;
            left: 0.35rem;
        }
    }
    
    nav{
        position: fixed;
        top: 50%;
        right: 0.3rem;
        transform: translateY(-50%);
        z-index: 10;
    }
}
.city-wrapper{
    padding-top: 0.88rem;
    background: #fff;
    .title{
        padding: 0.14rem 0 0.07rem 0.15rem;
        background: $f4;
        border-bottom: 1px solid #ddd;
    }
    .cityname{
        @include wh(auto, 0.5rem);
        background: #fff;
        margin-left: 0.15rem;
        line-height: 0.5rem;
        border-bottom: 1px solid #ddd;
    }
    .cityname:last-child{
        border-bottom: none;
    }
}

</style>
