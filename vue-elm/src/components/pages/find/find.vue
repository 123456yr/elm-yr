<template>
   <div class="find-container">
       <div class="find-content">
           <section class="part">
               <a href="javascript:;" v-for="part in parts" :key="part.id">
                   <div class="text">
                       <div class="title" :style="{color: part.title_color}">{{part.title}}</div>
                       <p>{{part.subtitle}}</p>
                   </div>
                   <img :src="getImgURL(part.main_pic_hash)" alt="">
               </a>
           </section>
           <section class="marker">
               <div class="marker-title">
                   <span class="line left"></span>
                   限时好礼
                   <span class="line right"></span>
                </div>
                <div class="marker-content">
                    <dl v-for="(item, index) in markers" :key="index">
                        <dt>
                            <img :src="getImgURL(item.image_hash)" alt="">
                            <span>{{item.corner_marker}}</span>
                        </dt>
                        <dd>
                            <div class="title ellipsis">{{item.title}}</div>
                            <span class='money'>{{item.points_required}}金币</span>
                        </dd>
                    </dl>
                </div>
                <div class="btn">查看更多</div>
           </section>
       </div>
       <foot-nav></foot-nav>
   </div>
</template>

<script>
import { getImgURL } from '../../../modules/mixin.js';
import FootNav from '../../common/foot/foot'
import { getPartForm , getMarker} from '../../../service/getData.js'
export default {
   name: '',
   data() {
       return {
           parts: [],
           markers: []
       }
   },
   mixins: [getImgURL],
   created(){
       getPartForm().then(res=>{
           this.parts= res.data[1];
       })
       getMarker().then(res=>{
           this.markers= res.data.slice(0, 3);
       })
   },
  components: {FootNav}
}
</script>

<style scoped lang="scss">
@import '../../../stylesheets/particles/mixin.scss';
.part{
    background: #fff;
    a{
        padding: 0.15rem 0.12rem;
        img{
            @include wh(0.52rem, 0.52rem);
        }
    }
    .title{
        font-size: 0.16rem;
        margin-bottom: 0.08rem;
    }
    p{
        @include sc(0.12rem,  #666);
    }
    a:first-child{
        width: 50%;
        position: absolute;
        border-right: 1px solid #ededed;
        
        img{
            @include wh(0.7rem , 0.7rem);
            float: right;
            margin-top: 0.2rem;
        }
    }
    a:nth-child(n+2){
        // n从0开始，第一个子元素的下标为1
        margin-left: 50%;
        @include fj();
    }
    a:nth-child(2){
        border-bottom: 1px solid #ededed;
    }
}
.marker{
    background: #fff;
}
.marker-title{
    margin-top: 0.15rem;
    padding: 0.15rem 0;
    @include sc(0.16rem , #000);
    font-weight: 700;
    @include fja(center, center);
    
    .line{
        position: relative;
        @include wh(0.18rem, 0.01rem);
        background: #000;
        margin: 0 0.08rem;
        &:after{
            content: '';
            @include wh(0.05rem, 0.05rem);
            background: #000;
            border-radius: 50%;
            position: absolute;
            transform: translateY(-50%);
        }
    }
    .left:after{
        right: 0;
    }
    
}

.marker-content{
    padding: 0.1rem 0.14rem;
    @include fj();
    dl{
        position: relative;
        width: 33.33%;
        img{
            @include wh(1.11rem, 1.1rem);
            
        }
        dt{
            span{
            position: absolute;
            top: 0;
            left: 0;
            padding: 0.02rem 0.04rem;
            background: #000;
            color: #fff;
            font-size: 0.12rem;
        }
        }
        
    }
    .money{
        color: red;
        margin-top: 0.1rem;
    }
    
}
.btn{
    padding: 0.2rem 0;
    color: #999;
    text-align: center;
}
</style>
