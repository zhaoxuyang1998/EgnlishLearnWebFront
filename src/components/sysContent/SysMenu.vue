<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router=true>
      <el-menu-item index="/adminregmanage">内容管理员注册审核</el-menu-item>
      <el-menu-item index="/allusermanage">用户状态管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name:'SysMenu',
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
