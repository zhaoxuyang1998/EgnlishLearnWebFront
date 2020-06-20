<template>
  <div style="padding: 3px;">
    <el-table
     :data="options.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
     highlight-current-row
     stripe
     style="width: 100%">

     <el-table-column
       prop="username"
       label="用户名">
     </el-table-column>


     <el-table-column
       label="操作"
       align="right">
        <template slot="header" slot-scope="scope">
         <el-input
           v-model="search"
           size="mini"
           placeholder="输入关键字搜索"/>
        </template>
       <template slot-scope="scope">
        <el-button type="success" plain @click="verifyAdmin(scope.row.id,1)">通过<i class="el-icon-check"></i></el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="danger" plain @click="verifyAdmin(scope.row.id,0)">驳回<i class="el-icon-close"></i></el-button>
       </template>
     </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name:'AdminRegManage',
    methods:{
      verifyAdmin(id,res){
        this.get("user/verifyAdmin",(result)=>{
           console.log(result);
           this.get("user/allAdminRegReq",(result)=>{
             console.log(result.obj);
             this.options=result.obj
           }),
           this.$notify({
             title: '提示',
             message: '操作成功'
           });
        },{id:id,res:res})
      }
    },
    data(){
      return {
        options: [],
        search: ''
      }
    },
    components:{

    },
    created:function(){
      this.get("user/allAdminRegReq",(result)=>{
        console.log(result.obj);
        this.options=result.obj
      })
    }
  }
</script>

<style scoped>
</style>
