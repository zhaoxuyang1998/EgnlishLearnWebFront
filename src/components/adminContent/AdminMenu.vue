<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router=true>
      <el-submenu index="1">
        <template slot="title">内容管理</template>
        <el-menu-item index="/vocabmanage">词条管理</el-menu-item>
        <el-menu-item index="/articlemanage">文章管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">内容上传</template>
        <el-menu-item index="/csvupload">词表上传</el-menu-item>
        <el-menu-item index="/articleupload">文章上传</el-menu-item>
      </el-submenu>
      <el-menu-item index="">#</el-menu-item>
      <el-menu-item index="">#</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name:'AdminMenu',
    methods:{
      getRole(){
        this.get("role/list",(data)=>{
          console.log(data);
        },{i:'2'});
      }
    },
    data(){
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    components:{

    }
  }
</script>

<style scoped>
</style>
