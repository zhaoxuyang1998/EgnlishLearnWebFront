<template>
  <div style="padding: 2px;">
    <el-tabs type="border-card">
       <el-tab-pane
       v-for="item in options"
       :key="item.num"
       :label="item.name">
       <el-table
         :data="item.data"
         highlight-current-row
         stripe
         style="width: 100%"
         :show-header=false>
         <el-table-column
           prop="vocabName"
           width="500">
         </el-table-column>
         <el-table-column
           prop="tags"
           width="600">
          <template slot-scope="scope">
            <el-tag type="success"
              close-transition>{{scope.row.tag}}</el-tag>
          </template>
         </el-table-column>



         <el-table-column
           prop="id">
            <template slot-scope="scope">
              <el-link type="primary" @click="allWords(scope.row.id,scope.row.vocabName)">全部词条</el-link>
            </template>
         </el-table-column>
       </el-table>

       </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name:'VocabManage',
    methods:{
      allWords(vocabId,vocabName){
        this.$router.push({path:'/allwords',query:{
          vocabId:vocabId,
          vocabName:vocabName,
        }})
      }
    },
    data(){
      return {
        options: []
      }
    },
    components:{

    },
    created:function(){
      this.get("vocab/vocabsByAllTags",(result)=>{
        //this.options=result;
        console.log(result.obj);
        this.options=result.obj
      },{keyword:'学习方向'})
    }
  }
</script>

<style scoped>
</style>
