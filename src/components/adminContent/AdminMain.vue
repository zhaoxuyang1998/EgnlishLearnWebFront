<template>
  <div>
    <el-row>
      <el-col :span="24"><AdminMenu></AdminMenu></el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="background-color: #42B983;height: 52.5vw;"><router-view/></el-col>
    </el-row>
  </div>
</template>

<script>
  import AdminMenu from '@/components/adminContent/AdminMenu'
  export default {
    name:'',
    methods:{

    },
    data(){
      return {

      }
    },
    components:{
      AdminMenu:AdminMenu
    }
  }
</script>

<style scoped>

</style>
