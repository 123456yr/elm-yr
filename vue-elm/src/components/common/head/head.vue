<template>
   <header id="head-top">
       <div class="head-back" v-if="headBack" @click="back"></div>
       <div class="head-title">
           <div class="title" v-if="headTitle">
               {{headTitle}}
           </div>
           <slot name="city"></slot>
       </div>
       <slot name="search"></slot>
       <slot name="delete"></slot>
   </header>
</template>

<script>

export default {
   name: 'HeadTop',
   data() {
       return {
       }
   },
    props: ['headBack', 'headTitle'],
    methods: {
        back(){
            if(this.headBack === 'true'){
                this.$router.go(-1);
            }else if(this.headBack){
                this.$router.replace({name: this.headBack})
            }
        }
    },
    created(){
    
   }
}
</script>

<style scoped lang="scss">
@import  "../../../stylesheets/particles/mixin.scss";
#head-top{
    width: 100%;
    background-image: -webkit-gradient(linear, left top, right top, #0af, #0085ff);
    background-image: -webkit-linear-gradient(left, #0af, #0085ff);
    background-image: linear-gradient(90deg, #0af, #0085ff);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}
.head-title{
    @include wh(100%, 0.44rem);
    padding-top: 0.1rem;
    .title{
        @include wh(100%, 100%);
        text-align: center;
        @include sc(0.18rem, #fff);
        font-weight: 700;

}
}

</style>
