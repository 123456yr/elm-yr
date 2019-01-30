<template>
    <div class="toast-box" v-show="!isLoadMore">
      <span v-if="has_next" class="fa" :class="toast_icon"></span>
      <span class="toast-text">{{toast_text}}</span>
    </div>
</template>

<script>
export default {
   name: 'Toast',
   props: ['isLoadMore', 'has_next', 'toast_icon', "toast_text"],
   data() {
       return {}
   },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../../stylesheets/particles/mixin.scss';
.toast-box{
  width: 100%;
  text-align: center;
  .fa{
    margin-right: 0.02rem;
    color: $blue;
  }
}
</style>
