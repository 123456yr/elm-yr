<template>
   <div class="edit">
       <head-top headBack="MineAddress" headTitle="编辑地址">
           <span class="delete" slot="delete" @click="remove">删除</span>
       </head-top>
       <update-addr handle="edit"></update-addr>
   </div>
</template>

<script>
import { mapMutations } from 'vuex';
import HeadTop from "../../../../common/head/head.vue";
import UpdateAddr from '../../../../common/other/updateAddr.vue';
export default {
   name: 'EditAddress',
   data() {
       return {}
   },
   methods: {
       ...mapMutations({
           removeAddress: 'user/REMOVE_ADDRESS_INFO'
       }),
       remove(){
           this.removeAddress(this.$route.params.index);
           this.$router.back(-1);
       }
   },
  components: {UpdateAddr, HeadTop}
}
</script>

<style scoped lang="scss">
@import '../../../../../stylesheets/particles/mixin.scss';
.delete{
    position:absolute;
    top: 0.12rem;
    right: 0.15rem;
    color: #fff;
    font-size: 0.15rem;
}
</style>
