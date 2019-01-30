<template>
   <div class="add">
     <head-top headBack="MineAddress" headTitle="添加地址"></head-top>
     <update-addr handle="add"></update-addr>
   </div>
</template>

<script>
import UpdateAddr from '../../../../common/other/updateAddr.vue';
import HeadTop from "../../../../common/head/head.vue";
export default {
   name: 'AddAddress',
   data() {
       return {
       }
   },
  // beforeRouteLeave(to, from, next){
  //   if(to.name=== 'mineAddress'){
  //     console.log(this.$vnode);
  //     var key = this.$vnode.key == null
  //                                   ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
  //                                   : this.$vnode.key;
  //     delete this.$vnode.parent.componentInstance.cache[key];
  //     this.$destroy()
  //   }
  //   next()
  // },
  components: {UpdateAddr, HeadTop}
}
</script>

<style scoped lang="scss">
</style>
