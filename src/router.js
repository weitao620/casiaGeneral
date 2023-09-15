import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)
export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/screen',
      name: 'screen',
      redirect: '/screen/index',
      component: () => import('./views/Screen.vue'),
      children: [
        // 主页--主页
        {
          path: '/screen/index',
          name: 'screenindex',
          component: () => import('./views/Screen/Index.vue')
        }
      ]
    },
    {
      path: '/details',
      name: 'details',
      redirect: '/details/report',
      component: () => import('./views/Details.vue'),
      children: [
        // 报告
        {
          path: '/details/report/:userID',
          name: 'detailsreport',
          component: () => import('./views/Details/Report.vue')
        }
      ]
    },
    // 导出word
    {
      path: '/library/expword/:userID',
      name: 'expword',
      component: () => import('./views/Library/ExpWord.vue')
    },
    {
      path: '/library',
      name: 'library',
      redirect: '/library/index',
      component: () => import('./views/Library.vue'),
      children: [
        // 主页--主页
        {
          path: '/library/index',
          name: 'index',
          component: () => import('./views/Library/Index.vue')
        },
        // 主页--个人中心
        {
          path: '/library/person',
          name: 'person',
          component: () => import('./views/Library/Person.vue')
        },
        // 评估报告
        {
          path: '/library/report',
          name: 'report',
          component: () => import('./views/Library/Report.vue')
        },
        // 心理档案
        {
          path: '/library/heart',
          name: 'heart',
          component: () => import('./views/Library/Heart.vue')
        },
        // 查看 心理档案
        {
          path: '/library/review/:userID',
          name: 'review',
          component: () => import('./views/Library/Review.vue')
        },
        // 基础设置
        {
          path: '/library/basic',
          name: 'basic',
          component: () => import('./views/Library/Basic.vue')
        },
        // 系统设置--组织架构
        {
          path: '/library/framework',
          name: 'framework',
          component: () => import('./views/Library/Framework.vue')
        },
        // 基础设置--用户管理
        {
          path: '/library/user',
          name: 'user',
          component: () => import('./views/Library/User.vue')
        },
        // 基础设置--管理员管理
        {
          path: '/library/admin',
          name: 'admin',
          component: () => import('./views/Library/Admin.vue')
        },
        // 基础设置--教师管理--新增教师
        {
          path: '/library/adduser',
          name: 'adduser',
          component: () => import('./views/Library/AddUser.vue')
        },
        // 基础设置--管理员管理--管理员信息详情
        {
          path: '/library/detailuser/:userID',
          name: 'detailuser',
          component: () => import('./views/Library/DetailUser.vue')
        },
        // 基础设置--用户管理--批量新增用户
        {
          path: '/library/batchuser',
          name: 'batchuser',
          component: () => import('./views/Library/BatchUser.vue')
        },
        // 基础设置--管理员管理--新增管理员
        {
          path: '/library/addadmin',
          name: 'addadmin',
          component: () => import('./views/Library/AddAdmin.vue')
        },
        // 基础设置--管理员管理--学生信息详情
        {
          path: '/library/detailadmin/:userID',
          name: 'detailadmin',
          component: () => import('./views/Library/DetailAdmin.vue')
        },
        // 基础设置--管理员管理--批量新增学生
        {
          path: '/library/batchadmin',
          name: 'batchadmin',
          component: () => import('./views/Library/BatchAdmin.vue')
        },
        // 基础设置--角色管理
        {
          path: '/library/role',
          name: 'role',
          component: () => import('./views/Library/Role.vue')
        },
        // 基础设置--角色管理--权限设置
        {
          path: '/library/power',
          name: 'power',
          component: () => import('./views/Library/Power.vue')
        },
        // 系统设置--字段管理
        {
          path: '/library/field',
          name: 'field',
          component: () => import('./views/Library/Field.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'login',
      component: Login
    }
  ]
})
