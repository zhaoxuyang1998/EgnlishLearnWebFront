<template>
  <div>
    <el-row>
      <el-col :span="24"><UserMenu></UserMenu></el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="background-color: #42B983;height: 52.5vw;"><router-view/></el-col>
    </el-row>

  </div>
</template>

<script>
  import UserMenu from '@/components/userContent/UserMenu'
  export default {
    name:'UserMain',
    mounted(){
    },
    methods:{

    },
    data(){
      return {

      }
    },
    components:{
      UserMenu:UserMenu
    }
  }
</script>

<style scoped>

</style>
