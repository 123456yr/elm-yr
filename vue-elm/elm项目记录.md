#### 地图定位
高德地图浏览器精准定位，第一次登录，定位成功就将地址存放在cookie中，如果不成功应该在几秒后跳转到“选择收货地址页面”（没有做这个功能），手动点击跳转到“收货地址页面”，如果直接输入地址就通过keyword搜索地址，如果点击选择城市就跳转到“选择城市页面”。点击城市跳转回来，将城市通过动态路由传递参数，地理编码城市--经纬度，得到经纬度作为请求数据的参数，最后点击收货地址后将城市地址和经纬度存储到cookie中，后面再回到首页。判断cookie中是否有值，有就不再获取
存放到cookie中的原因是： 刷新浏览器时，会将所有的数据清除，又要重新定位，存放在cookie中，除非关闭网页，cookie清除，刷新浏览器信息还在
store中的state设置为存储在cookie中的值,设置mutations方法修改state中的address，并将修改后的值setCookie，因为修改后读取state中的值仍然是之前的值，不会重新再cookie中读取，只有浏览器刷新后才会在读取

请求回的result值，如果要用splice(起始位置, length)截取，或pop push shift UNshift 会修改数组的值得方法，要备份， let res= [...result];

###对象赋值
data中定义的数组、对象，不可以直接arr[i]=99; obj[name]='oo' 去赋值，这样不是响应式的，不会使页面重新渲染，定义一个对象去赋值，将这个对象再附给data中的对象,也可以使用$set

###async
用async定义函数表示函数中有异步操作， await 后面跟一个promise对象，并将异步请求的结果返回到变量中，结果返回后才向下执行，如果不是promise对象 相当于同步操作

###v-if与v-show
v-if 条件块内的事件监听和子组件适当的被销毁和重建
在初始条件为假时， 什么都不做，事件内如果有事件监听，不会处理，知道第一次条件为真才开始渲染条件块
v-show： 不管初始条件是什么，元素总是被渲染，并且只是简单的基于css进行切换
v-if有更高的切换开销，v-show有更高的初始渲染开销。如果频繁操作切换，使用v-show比较好，如果在运行时条件很少改变，则v-if较好

s获取文档高度
网页可见区域宽： document.documentElement.clientWidth
网页可见区域高： document.documentElement.clientHeight

网页可见区域宽： document.documentElement.offsetWidth (包括边线的宽)移动端为视口高度
网页可见区域高： document.documentElement.offsetHeight (包括边线的高)pc端为文档高度

网页正文全文宽： document.documentElement.scrollWidth移动端为文档高度
网页正文全文高： document.documentElement.scrollHeight

网页被卷去的高： document.documentElement.scrollTop
网页被卷去的左： document.documentElement.scrollLeft

###动画效果
动态添加删除class  open,实现动画效果transition: height 0.3s ease-in-out;
.sort1, .sort2{
      opacity: 0;
      visibility: hidden;
      position: absolute;
      top: 0.4rem;
      left: 0;
      right: 0;
      background: #fff;
      max-height: 0;
      transition: max-height 0.3s ease-in-out;
      overflow: hidden;
      z-index: 4;
    }
    .open{
        visibility: visible;
        opacity: 1;
        max-height: 1500%;
      }
不能用display：block控制显隐，会先执行高度变化后后执行display，就没有动画效果了
vue可以使用transition<transition name="dd">
.dd-enter-acitve,
.dd-leave-active{
  transition: all 0.3s;
  transform: translateY(0);
}
.dd-enter, .dd-leave-active{
  transition: all 0.3s;
  transform: translateY(-100%);
}

###页面出现浮层时禁止页面滚动（移动端滑动）

1. pc端实现

$('body').css('overflow','hidden');//浮层出现时窗口不能滚动设置
$('body').css('overflow','auto');// 浮层关闭时滚动设置
2.移动端实现
document.body.style.overflow='hidden';

var preHandler=function(e){e.preventDefault();},// 注意此处代码片段必须这样提出来已保证传入下边两个事件的处理程序一样才生效，分别写到事件处理程序中不生效。
document.addEventListener('touchmove', me.preHandler,false);//阻止默认滑动事件
document.removeEventListener('touchmove', me.preHandler, false);//浮层关闭时解除事件处理程序


### loadmore加载更多的实现思路

获取视口高度：document.documentElement.clientWidth   
文档高度：offsetWidth（pc端）、scrollWidth（移动端）  
网页被卷入的高度：scrollTop

mounted:监听滚动window.addEventListener('scroll', this.handlerScroll);

handlerScroll: 监听滚动，当滚动到视口可视区底端距离文档底端距离小于distance（提供的高度）时，请求加载数据，文档高度- （视口高度+ 网页滚走的距离）< distance时加载数据 执行loadmore

loadmore： 如果正在请求参数不能重复执行这一步，设置开关变量isLoadMore为false时，不能请求，为true可以请求，当加载数据时，将isLoadMore设置为false， 加载结束后设置为true，请求数据的起始参数offset+8； 

回到上一页：
$router.back(-1)

background-size当图片是一个精灵图时，一整列相同大小的图片，图片大小大于span的大小，为了使背景合适，设置background-size: span的大小，而不是100%，100%是将整个图缩小到span的大小


###获得本地文件的真实URL（可用URL）base64格式
 <input type="file" name="postimg" multiple="multiple" class="file_img" />
let file=event.target.files[0];

    if(window.FileReader) {  
          var fr = new FileReader();  
          fr.onloadend = function(e) {  
              let userImg= document.querySelector('.user_img');
              userImg.src=e.target.result;
          };  
          fr.readAsDataURL(file);  //也是利用将图片作为url读出
      }  
      
###事件总线
第一种
创建一个js文件event-bus.js
import Vue from 'vue;
export const eventBus= new Vue();
发布事件的组件（通知）
import { eventBus } from 'event-bus.js';
方法中：
eventBus.$emit('setAddress',参数)
订阅事件的组件（监听事件做出改变）
import { eventBus } from 'event-bus.js';
钩子函数中created、mounted
eventBus.$on('setAddres', ()=>{})

第二种：
全局事件总线
main.js 文件中
var EventBus = new Vue();
Vue.prototype.$bus= EventBus; 或者：
// Object.defineProperties(Vue.prototype, {
//   $bus: {
//     get: function () {
//       return EventBus
//     }
//   }
// })
组件中使用
this.$bus.$emit()
this.$bus.$on()

最重要的一点： 事件在created钩子中订阅后，触发事件，由于是在其他组件中触发的事件，在切换回这个组件，会重新渲染，虽然事件可以触发，但先执行的订阅事件后执行的created函数，此时状态可以访问但是不能设置，所以要保证订阅事件的组件切换时不能重新渲染组件，这时才能改变状态，可以使用keep-alive缓存组件
必须是已缓存的组件才能使用事件总线
<keep-alive include="组件名"></keep-alive>

####keep-alive总结
在嵌套路由中使用keep-alive缓存组件，a（父路由）->b（子路由）->c（子路由）
实现从a->b刷新,b刷新，从c->b b不刷新，也就是 前进刷新，后退不刷新

使用了keep-alive缓存的组件生命周期为
第一次会初始化：
beforeCreated-》 created-》 beforeMount-》mounted-》activated-> deactivatedbeforeUpdate-》updated
以后：
activated-> deactivated-》beforeUpdate-》updated
不会触发destroyed钩子函数，不会被销毁

所以使用了keep-alive的组件一些方法要写在activated中更合适，比如每次都要在组件中使用的方法（事件总线），不能写在created或mounted中，只有只想第一次执行后缓存不在执行的方法写在初始化阶段


在嵌套路由中父路由只有在进入和退出此路由才会触发beforeRouteLeave和beforeRouteEnter这两个钩子函数，子路由到父路由和子路由的跳转只会触发beforeRouteUpdate，并且只要在此父路由的跳转都会触发，只有在嵌套路由中触发，/foo/:id

第一种方法：
<keep-alive :include="cachePages">
  <route-view></route-view>
</keep-alive>
store中state  cachePages=[]
在进入要缓存的组件b之前将组件名称（在组件中的name属性值）设置到CachePages中，就会缓存该组件，在退出组件（b->a)之前将组件名称在CachePages删除，不缓存该组件，在嵌套路由中使用beforeRouteUpdate即可
在非嵌套路由中使用beforeRouteLeave

第二种方法：
动态设置路由元信息meta
 <transition name="router_silder" mode="out-in">
         <keep-alive>
            <router-view  v-if="$route.meta.keepAlive"></router-view>
         </keep-alive>
      </transition>
      <transition name="router_silder" mode="out-in">
            <router-view  v-if="!$route.meta.keepAlive"></router-view>
</transition>
在进入之前设置keepalive为true，退出时（b->a）在b组件中beforeRouteLeave将b组件暴力销毁，只用用this.$destroy在退出b组件， 再次从b组件到c组件时，缓存就会失效（虽然每次都会缓存，但是每次又会创建一个新的b组件实例，因此缓存不生效），使用下面的方法手动删除缓存
beforeRouteLeave(to, from, next){
  //   if(to.name=== 'mineAddress'){
  //     console.log(this.$vnode);
  //     var key = this.$vnode.key == null
  //                                   ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
  //                                   : this.$vnode.key;
  //     delete this.$vnode.parent.componentInstance.cache[key];
  //     this.$destroy()
  //   }
  //   next()
  // }
  this.$vnode.parent.componentInstance.cache这里面是所有的父路由的缓存组件，根据key值删除当前组件的缓存
  咱在销毁组件之前，寻找路由组件所在父级的 keep-alive 组件，操控其中的 cache 列表，强行删除其中的缓存

  ###nextTick
this.nextTick(callback)，当数据发生变化，更新后执行回调。
this.$nextTick(callback)，当dom发生变化，更新后执行的回调。同全局的Vue.nextTick()一样，只不过它是挂载在当前实例上
  
  ###刷新页面（未使用keep-alive缓存的页面）
  1.this.$router.go(0)
  2.window.location.reload()
  3.先跳转到一个空白页面在跳转到组件
  4.使用v-if  将组件销毁或重建
      this.isShow= false;
      this.$nextTick(()=>{
        this.isShow= true;
      })
  5.使用vue提供的provide / inject 组合
  6.使用开关变量，watch监听开关变量（或者在beforeRouteEnter中判断），在满足条件的情况下重新获取数据

  ###区域滚动
  .box{
    height: 200px;
    overflow: auto;
  }
  当box中的内容高于height的高度时，会出现滚动条

  ###全局指令
  vue.direction('指令名', function(el, binding, vnode){
    el: 是当前使用指令的元素
    binding: 是关于指令的东西包括(name, expression, value, arg, modifiers)
    vnode: 包含属性context 是当前组件对象可以使用组件中的data，比如如果expression指令表达式是组件中data中的变量可以 context[binding,expression]使用data中的值，并可以修改，而使用binding.value可以获取值，但不可以上设置值
  })




