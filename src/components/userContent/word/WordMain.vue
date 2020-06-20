<template>
  <div>
  <el-carousel :interval="3000" arrow="always" autoplay>
    <el-carousel-item v-for="item in recommend" :key="item.id">
      <el-card style="width: 100%;height: 100%;">
        <div style="padding: 14px;">
          <span>{{item.vocabName}}</span>
          <el-divider direction="vertical"></el-divider>
          <span><el-tag>{{item.tag}}</el-tag></span>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="addOrChangeVocab(item.id)">切换此词表</el-button>
        </div>
      </el-card>
    </el-carousel-item>
  </el-carousel>

  <el-tabs type="border-card">
     <el-tab-pane
     v-for="item in options"
     :key="item.num"
     :label="item.name">
       <el-card class="box-card" v-for="vocab in item.data" :key="vocab.vocabName">
         <div slot="header" class="clearfix">
           <span>{{vocab.vocabName}}</span>
           <el-button style="float: right; padding: 3px 0" @click="addOrChangeVocab(vocab.id)" type="text">切换此词表</el-button>
         </div>
         <!-- <div>
           <el-image
                 style="width: 100px; height: 100px"
                 :src="fileURL(vocab.coverFileLocation)"
           fit="contain"></el-image>
         </div> -->
       </el-card>
     </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
  export default {
    name:'WordMain',
    methods:{
      fileURL(location){
        return "/api/"+location;
      },
      addOrChangeVocab(vocabId){
        this.get("uservocablog/addOrChangeVocab",(result)=>{
          console.log(result)
          this.$confirm('立即学习?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.$router.push("/showword")
          }).catch(() => {

          });
        },{vocabId:vocabId})
      }
    },
    data(){
      return {
        options: [],
        recommend:[]
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
      this.get("vocab/vocabsRecommend",(result)=>{
        console.log(result);
        this.recommend=result.obj.records;
      },{size:3})
    },
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
