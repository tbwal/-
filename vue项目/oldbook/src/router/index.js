import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home.vue'
// import Login from '../views/login.vue'

const Login = () =>
    import ('../views/login.vue')
const Home = () =>
    import ('../views/home.vue') //路由懒加载
const Recommend = () =>
    import ('../views/recommend.vue')
const Manage = () =>
    import ('../views/manage.vue')
const Person = () =>
    import ('../views/person.vue')
const Cart = () =>
    import ('../views/cart.vue')
const Order = () =>
    import ('../views/order.vue')
const Message = () =>
    import ('../views/message.vue')
const Salerorder = () =>
    import ('../views/salerorder.vue')
const Findsaler = () =>
    import ('../views/findsaler.vue')
const Buyermessage = () =>
    import ('../views/buyermessage.vue')
Vue.use(VueRouter)



const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        // path: '/home/:id',
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Home,
        meta: {
            title: '首页'
        },
        children: [
            { path: 'recommend', component: Recommend, meta: { title: '商品推荐' } },
            { path: 'manage', component: Manage, meta: { title: '商品管理' } },
            { path: 'person', component: Person, meta: { title: '个人中心' } },
            { path: 'cart', component: Cart, meta: { title: '购物车' } },
            { path: 'order', component: Order, meta: { title: '我的订单' } },
            { path: 'message', component: Message, meta: { title: '消息' } },
            { path: 'salerorder', component: Salerorder, meta: { title: '订单进程' } },
            { path: 'findsaler', component: Findsaler, meta: { title: '寻找卖家' } },
            { path: 'buyermessage', component: Buyermessage, meta: { title: '消息' } },
        ]

    }
]

const router = new VueRouter({
    routes,
    // mode: 'history'
})

router.beforeEach(function(to, from, next) {
    document.title = to.meta.title;
    next()
})
export default router