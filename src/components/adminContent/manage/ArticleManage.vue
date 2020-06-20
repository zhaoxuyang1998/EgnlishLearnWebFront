<template>
  <div style="padding: 2px;">
    <el-row>
      <el-col :span="24">
       <el-tabs type="border-card" v-model="activeTag">
         <el-tab-pane
         v-for="(item,index) in options"
         :key="item.num"
         :label="item.name">
           <el-table
             :data="item.data.records"
             highlight-current-row
             stripe
             style="width: 100%"
             :show-header=false>

             <el-table-column
               prop="title"
               width="800">
             </el-table-column>

             <el-table-column
               prop="tags"
               width="200">
              <template slot-scope="scope">
                <el-tag
                  close-transition>{{scope.row.tags}}</el-tag>
              </template>
             </el-table-column>

             <el-table-column
               prop="status"
               width="200">
              <template slot-scope="scope">
                <span style="font-weight: bold;">{{status(scope.row.status)}}</span>
              </template>
             </el-table-column>


             <el-table-column
               prop="pdfFileLocation">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status==1" type="danger" icon="el-icon-delete" plain @click="changeArticleStatus(scope.row.id,0,index,scope.$index)">删除</el-button>
                  <el-button v-if="scope.row.status==0" type="primary" icon="el-icon-success" plain @click="changeArticleStatus(scope.row.id,1,index,scope.$index)">恢复</el-button>
                </template>
             </el-table-column>

           </el-table>
         </el-tab-pane>
       </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name:'ArticleManage',
    methods:{
      status(val){
        if(val==1){
          return "有效"
        }else if(val==0){
          return "失效"
        }
      },
      changeArticleStatus(val,status,findex,index){
        this.get("article/changeArticleStatus",(result)=>{
          console.log(result);
          this.options[findex].data.records[index].status=status;
        },{articleId:val,status:status})
      },
    },
    data(){
      return {
        options: [],
        activeTag:''
      }
    },
    components:{

    },
    created:function(){
      this.get("article/articlesByAllTagsWithPage",(result)=>{
        //this.options=result;
        console.log(result.obj);
        this.options=result.obj
      })
    }
  }
</script>

<style scoped>
</style>
