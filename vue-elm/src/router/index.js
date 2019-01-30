import Vue from 'vue'
import Router from 'vue-router'
//webpack 提供的按需加载方法
const Home = r => require.ensure([], () => r(require('../components/pages/home/home')), 'home');
const Search = r => require.ensure([], () => r(require('../components/pages/search/search')), 'search');
const Mine = r => require.ensure([], () => r(require('../components/pages/mine/mine')), 'mine')
;
const Order = r => require.ensure([], () => r(require('../components/pages/order/order')), 'order');

const Address = r => require.ensure([], () => r(require('../components/pages/address/address')), 'address');
const City = r => require.ensure([], () => r(require('../components/pages/city/city')), 'city');
const Find=r => require.ensure([], () => r(require('../components/pages/find/find')), 'find');
const Food = r => require.ensure([], () => r(require('../components/pages/home/children/food')), 'food');
const Info = r => require.ensure([], () => r(require('../components/pages/mine/children/info')), 'info');
const Login= r => require.ensure([], ()=> r(require('../components/pages/login/login')), 'login');
const MineAddress = r => require.ensure([], () => r(require('../components/pages/mine/children/MineAddress.vue')), 'mineAddress');
const AddAddress = r => require.ensure([], () => r(require('../components/pages/mine/children/children/addAddress.vue')), 'addAddress');
const SearchAddress = r => require.ensure([], () => r(require('../components/pages/mine/children/children/searchAddress.vue')), 'searchAddress');
const EditAddress = r => require.ensure([], () => r(require('../components/pages/mine/children/children/editAddress.vue')), 'editAddress');
const Shop= r => require.ensure([], () => r(require('../components/pages/shop/shop.vue')), 'shop');
const CheckOut = r => require.ensure([], () => r(require('../components/pages/checkout/checkout.vue')), 'checkout');
const Pay = r => require.ensure([], () => r(require('../components/pages/pay/pay.vue')), 'pay');
const OrderDetail = r => require.ensure([], () => r(require('../components/pages/order/children/orderDetail.vue')), 'orderDetail');

Vue.use(Router)


const router=new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
    	path: '/home',
    	name: 'Home',
      component: Home
    },
    {
      path: '/home/food',
      name: 'Food',
      component: Food
    },
    {
      path: 'login',
      name: 'Login',
      component: Login
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/checkout',
      name: 'CheckOut',
      component: CheckOut
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
    	path: '/mine',
    	name: 'Mine',
      component: Mine,
      children: [
        {
          path: 'info',
          name: 'Info',
          component: Info
        },
        {
          path: 'mineAddress',
          name: 'MineAddress',
          component: MineAddress,
          children: [
            {
              path: 'add',
              name: 'AddAddress',
              component: AddAddress,
              meta: { keepAlive: true}
            },
            {
              path: 'search',
              name: 'SearchAddress',
              component: SearchAddress
            },
            {
              path: 'edit/:index',
              name: 'EditAddress',
              component: EditAddress
            }
          ]
        }
      ]
    },
    {
    	path: '/search',
    	name: 'Search',
    	component: Search
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      children: [
        {
          path: 'orderDetail',
          name: 'OrderDetail',
          component: OrderDetail
        }
      ]
    }, 
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/address/:city',
      name: 'Address',
      component: Address
    }
  ]
})

export default router
