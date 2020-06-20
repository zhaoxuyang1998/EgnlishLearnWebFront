<template>
  <div>
   <el-row>
      <el-col :span="12">
        <div style="padding: 10px;">
          <el-card class="box-card">
            <div slot="header" >
              <span style="font-weight: bold;">普通用户</span>
              <span style="float: right; padding: 3px 0;font-weight: bold;font-style: oblique;" ></span>
            </div>
            <div>
              <el-table
               :data="users.filter(data => !searchuser || data.username.toLowerCase().includes(searchuser.toLowerCase()))"
               highlight-current-row
               stripe
               style="width: 100%">
                 <el-table-column
                   prop="username"
                   label="用户名">
                 </el-table-column>
                 <el-table-column
                   prop="status"
                   label="状态">
                   <template slot-scope="scope">
                     <el-tag v-if="scope.row.status==1">正常</el-tag>
                     <el-tag v-if="scope.row.status==0" type="warning">禁用</el-tag>
                   </template>
                 </el-table-column>

                 <el-table-column
                   label="操作"
                   align="right">
                    <template slot="header" slot-scope="scope">
                     <el-input
                       v-model="searchuser"
                       size="mini"
                       placeholder="输入关键字搜索"/>
                    </template>
                   <template slot-scope="scope">
                    <el-button v-if="scope.row.status==1" type="danger" plain @click="changeStatus(1,scope.row.id,0,scope.$index)">禁用</el-button>

                    <el-button v-if="scope.row.status==0" type="success" plain @click="changeStatus(1,scope.row.id,1,scope.$index)">启用</el-button>
                   </template>
                 </el-table-column>
              </el-table>

            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 10px;">
          <el-card class="box-card">
            <div slot="header" >
              <span style="font-weight: bold;">内容管理员</span>
              <span style="float: right; padding: 3px 0;font-weight: bold;font-style: oblique;" ></span>
            </div>
            <div>
              <el-table
               :data="admins.filter(data => !searchadmin || data.username.toLowerCase().includes(searchadmin.toLowerCase()))"
               highlight-current-row
               stripe
               style="width: 100%">
                 <el-table-column
                   prop="username"
                   label="用户名">
                 </el-table-column>
                 <el-table-column
                   prop="status"
                   label="状态">
                   <template slot-scope="scope">
                     <el-tag v-if="scope.row.status==1">正常</el-tag>
                     <el-tag v-if="scope.row.status==0" type="warning">禁用</el-tag>
                   </template>
                 </el-table-column>

                 <el-table-column
                   label="操作"
                   align="right">
                    <template slot="header" slot-scope="scope">
                     <el-input
                       v-model="searchadmin"
                       size="mini"
                       placeholder="输入关键字搜索"/>
                    </template>
                   <template slot-scope="scope">
                    <el-button v-if="scope.row.status==1" type="danger" plain @click="changeStatus(2,scope.row.id,0,scope.$index)">禁用</el-button>

                    <el-button v-if="scope.row.status==0" type="success" plain @click="changeStatus(2,scope.row.id,1,scope.$index)">启用</el-button>
                   </template>
                 </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name:'AllUserManage',
    methods:{
         changeStatus(type,id,status,row){
            this.get("/user/changeStatus",(result)=>{
              if(type==1){
                if(status==0){
                  this.users[row].status=0;
                }else{
                  this.users[row].status=1;
                }
              }else{
                if(status==0){
                  this.admins[row].status=0;
                }else{
                  this.admins[row].status=1;
                }
              }
         },{id:id,status:status})
      }
    },
    data(){
      return {
        users:[],
        admins:[],
        searchuser:'',
        searchadmin:''
      }
    },
    components:{

    },
    created:function(){
      this.get("user/list",(result)=>{
        console.log(result);
        this.users=result
      },{roleNum:1}),
      this.get("user/list",(result)=>{
        console.log(result);
        this.admins=result
      },{roleNum:2})
    }
  }
</script>

<style scoped>
</style>
