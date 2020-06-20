import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import AdminMain from '@/components/adminContent/AdminMain'
import UserMain from '@/components/userContent/UserMain'
import CsvUpload from '@/components/adminContent/fileUpload/CsvUpload'
import ArticleUpload from '@/components/adminContent/fileUpload/ArticleUpload'
import ArticleManage from '@/components/adminContent/manage/ArticleManage'
import VocabManage from '@/components/adminContent/manage/VocabManage'
import AllWords from '@/components/adminContent/manage/AllWords'
import ArticleMain from '@/components/userContent/article/ArticleMain'
import ShowArticle from '@/components/userContent/article/ShowArticle'
import WordMain from '@/components/userContent/word/WordMain'
import ShowWord from '@/components/userContent/word/ShowWord'
import UserStatistic from '@/components/userContent/info/UserStatistic'
import UserInfo from '@/components/userContent/center/UserInfo'
import MyFavorite from '@/components/userContent/center/MyFavorite'
import SysMain from '@/components/sysContent/SysMain'
import AdminRegManage from '@/components/sysContent/manage/AdminRegManage'
import AllUserManage from '@/components/sysContent/manage/AllUserManage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/adminmain',
      name: 'AdminMain',
      component: AdminMain,
      children:[
        {
          path: '/csvupload',
          name: 'CsvUpload',
          component: CsvUpload
        },
        {
          path: '/articleupload',
          name: 'ArticleUpload',
          component: ArticleUpload
        },
        {
          path: '/articlemanage',
          name: 'ArticleManage',
          component: ArticleManage
        },
        {
          path: '/vocabmanage',
          name: 'VocabManage',
          component: VocabManage
        },
        {
          path: '/allwords',
          name: 'AllWords',
          component: AllWords
        }
      ]
    },
    {
      path: '/usermain',
      name: 'UserMain',
      component: UserMain,
      children:[
        {
          path: '/articlemain',
          name: 'ArticleMain',
          component: ArticleMain,
        },
        {
          path: '/showarticle',
          name: 'ShowArticle',
          component: ShowArticle,
        },
        {
          path: '/wordmain',
          name: 'WordMain',
          component: WordMain,
        },
        {
          path: '/showword',
          name: 'ShowWord',
          component:ShowWord
        },
        {
          path: '/userstatistic',
          name: 'UserStatistic',
          component: UserStatistic
        },
        {
          path: '/userinfo',
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: '/myfavorite',
          name: 'MyFavorite',
          component: MyFavorite
        }
      ]
    },
    {
      path: '/sysmain',
      name: 'SysMain',
      component: SysMain,
      children:[
        {
          path: '/adminregmanage',
          name: 'AdminRegManage',
          component: AdminRegManage
        },
        {
          path: '/allusermanage',
          name: 'AllUserManage',
          component: AllUserManage
        }
      ]
    }

  ]
})
