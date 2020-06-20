<template>
  <div>
    <el-row>
      <el-col :span="24"><SysMenu></SysMenu></el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="background-color: #42B983;height: 52.5vw;"><router-view/></el-col>
    </el-row>
  </div>
</template>

<script>
  import SysMenu from '@/components/sysContent/SysMenu'
  export default {
    name:'SysMain',
    methods:{

    },
    data(){
      return {

      }
    },
    components:{
      SysMenu:SysMenu
    }
  }
</script>

<style scoped>

</style>
