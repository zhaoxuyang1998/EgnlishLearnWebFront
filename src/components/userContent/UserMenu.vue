<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" :router=true>
      <el-menu-item index="/userstatistic">学习数据</el-menu-item>
      <el-submenu index="2">
        <template slot="title">个人中心</template>
        <el-menu-item index="/userinfo">资料修改</el-menu-item>
        <el-menu-item index="/myfavorite">我的收藏</el-menu-item>
        <el-menu-item @click="download()">我的错题本</el-menu-item>
      </el-submenu>
      <el-menu-item index="/articlemain">文章</el-menu-item>
      <el-menu-item index="/wordmain">词表</el-menu-item>
      <el-menu-item index="/showword" >单词学习</el-menu-item>
      <el-menu-item style="float: right;">当前登录：{{getuser.rolename}}{{getuser.username}}</el-menu-item>

    </el-menu>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name:'UserMenu',
    computed:{
      ...mapGetters(['getuser'])
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getRole(){
        this.get("role/list",(data)=>{
          console.log(data);
        },{i:'2'});
      },
      download(){
        this.axios({
                method:'get',
                url:"wordrating/wrongWords",
                responseType:'blob',
         }).then((result)=>{
           console.log(result)
           let url = window.URL.createObjectURL(result.data)
           let link = document.createElement('a')
           link.style.display = 'none'
           link.href = url
           link.setAttribute('download', 'myNotebook.pdf')
           document.body.appendChild(link)
           link.click()
           document.body.removeChild(link)
           // 释放blob URL地址
           window.URL.revokeObjectURL(url)

         })
      }
    },
    data(){
      return {
        user:null
      }
    },
    components:{

    },
    store:store
  }
</script>

<style scoped>
</style>
