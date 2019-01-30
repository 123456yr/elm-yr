<template>
  <div class="add_address_container">
    <div class="add_address_content pt">
      <div class="formblock">
        <div class="formblock_name">联系人</div>
        <div class="formblock_box">
          <div class="formblock_input">
            <input type="text" v-model.lazy="userName" placeholder="姓名">
          </div>
          <div class="formblock_btn">
            <span type="primary" @click="sex=(sex==='男士'? '': '男士')" :class="{active: sex==='男士'}" plain>男士</span>
            <span type="primary" @click="sex=(sex==='女士'? '': '女士')" :class="{active: sex==='女士'}" plain>女士</span>
          </div>
        </div>
      </div>
      <div class="formblock">
        <div class="formblock_name" >电话</div>
        <div class="formblock_input">
          <input type="text" v-model.lazy="phone" placeholder="手机号码">
        </div>
      </div>
      <div class="formblock">
        <div class="formblock_name">地址</div>
        <div class="formblock_input">
          <router-link :to="{name: 'SearchAddress'}" class="formblock_address"></router-link>
          <input type="text" v-model="address.name" placeholder="小区/写字楼/学校等">
          <span class="fa fa-angle-right fa-lg"></span>
        </div>
      </div>
      <div class="formblock">
        <div class="formblock_name">门牌号</div>
        <div class="formblock_input">
          <input type="text" v-model.lazy="detailAddress" placeholder="10号楼5层501室222">
        </div>
      </div>
      <div class="formblock">
        <div class="formblock_name">标签</div>
        <div class="formblock_btn">
          <span type="primary" @click="tag=(tag==='家'? '': '家')" :class="{active: tag==='家'}" plain>家</span>
          <span type="primary" @click="tag=(tag==='学校'? '': '学校')" :class="{active: tag==='学校'}" plain>学校</span>
          <span type="primary" @click="tag=(tag==='公司'? '': '公司')" :class="{active: tag==='公司'}" plain>公司</span>
        </div>
      </div>
      <el-button :plain="true" @click="submitMsg" class="login_btn">确定</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex';

export default {
  name: "UpdateArr",
  data() {
    return {
        userName: '',
        phone: '',
        address: {},
        detailAddress: '',
        sex: '',
        tag: ''
    }
  },
  info: {},
  props: ['handle'],
  computed: {
    ...mapState({
      addressInfo: state=> state.user.addressInfo
    })
  },
  created(){
    if(this.handle=== 'edit'){
      let info= this.addressInfo[this.$route.params.index];
      this.userName= info.userName;
      this.phone= info.phone;
      this.address= info.address;
      this.detailAddress= info.detailAddress;
      this.sex= info.sex;
      this.tag= info.tag;

    }
    
  },
  methods: {
    ...mapMutations({
      add_addressInfo: 'user/ADD_ADDRESS_INFO',
      edit_addressInfo: 'user/EDIT_ADDRESS_INFO'
    }),
      submitMsg(){
        let reg= /^1[358][0-9]{9}$/;
          if(!this.userName){
              this.$message({
                  message: '姓名不能为空'
              })
          }else if(!this.phone || !reg.test(this.phone)){
              this.$message({
                  message: '请输入正确的手机号'
              })
          }else if(JSON.stringify(this.address) === '{}'){
              this.$message({
                  message: '请选择地址'
              })
          }else{
              this.updateAddr();
          }
      },
      updateAddr(){
        let addressInfo={};
        let { userName, phone, address, detailAddress, sex, tag}= this;
        addressInfo={ userName, phone, address, detailAddress, sex, tag};
        
        if(this.handle=== 'add'){
          this.add_addressInfo(addressInfo)
        }else{
          this.addressInfo[this.$route.params.index]= addressInfo;
          this.edit_addressInfo(this.addressInfo);
        }
        this.$router.replace({name: 'MineAddress'});
      }
  },
  activated(){
    //缓存组件第二次进入之后不再执行初始化阶段的钩子函数
    this.$bus.$on('setAddress', address=>{
      //经纬度和地址名称
      this.address= address;
    })
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "../../../stylesheets/particles/mixin.scss";
.add_address_container {
  @include allcover();
  background: #f5f5f5;
  z-index: 101;
}
.add_address_content {
  
  font-size: 0.15rem;
  .formblock {
    background: #fff;
    padding-left: 0.15rem;
    border-bottom: 1px solid #f5f5f5;
    @include fj();
  }
  .formblock_name {
    @include sc(0.15rem, #000);
    font-weight: 700;
    width: 16%;
    padding: 0.15rem 0;
  }
  .formblock_box, .formblock_btn{
      width: 84%;
  }
  .formblock_input{
    position: relative;
      width: 84%;
      padding: 0.15rem 0;
      border-bottom: 1px solid #f5f5f5;
      @include fja();
      padding-right: 0.1rem;
      input{
          font-size: 0.15rem;
          color: #333;
      }
  }
  .formblock_address{
    display: inline-block;
    @include allcover();
  }
  .formblock_btn{
      padding: 0.15rem 0;
      span{
        display: inline-block;
        padding: 0.03rem 0.1rem;
        background: #fff;
        border: 1px solid #b3d8ff;
        color: #409EFF;
        border-radius: 0.02rem;
        margin-right: 0.1rem;
      }
       .active{
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
      }
  }
  .login_btn{
      margin-top: 0.2rem;
  }
 
  
}
</style>
<style>
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
