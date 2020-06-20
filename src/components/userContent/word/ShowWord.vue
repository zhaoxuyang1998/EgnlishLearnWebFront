<template>
  <div style="background-color: #42B983;">
    <el-row>
      <el-col :span="5">
        <div style="padding: 4px;">
          <el-card class="box-card">
            <div>
              <span>{{vocabName}}</span>
              <el-divider direction="vertical"></el-divider>
              <el-tag>{{vocabTag}}</el-tag>
            </div>
            <el-divider content-position="left">学习进度</el-divider>
            <div>
              <el-progress type="circle" :percentage="this.percent"></el-progress>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="14">
        <div style="padding: 4px;">
          <transition-group name="el-zoom-in-top">
          <el-card class="box-card" v-for="(item,index) in options" :key="item.id">
            <span>{{item.spell}}</span>
            <el-divider direction="vertical"></el-divider>
            <span style="font-style: oblique;">{{item.phonetic}}</span>
            <div style="float: right; padding-right: 5px">
              <el-button type="text" @click="rate('5.0',item.id,index)">不认识</el-button>
              <el-button type="text" @click="rate('4.0',item.id,index)">陌生</el-button>
              <el-button type="text" @click="rate('1.0',item.id,index)">认识</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button  type="text" :icon="fav(item.status)" :round=true @click="favorite(item.id,item.status,index)"></el-button>
            </div>
            <div v-show="item.withPage">
              <el-divider content-position="left">释义</el-divider>
              <div>
               {{item.paraphrase}}
              </div>
              <el-divider content-position="left">造句</el-divider>
              <div>
               {{item.sentence}}
              </div>
            </div>
          </el-card>
          </transition-group>
        </div>
      </el-col>
      <el-col :span="5">
        <div style="padding: 4px;">
          <transition name="el-fade-in-linear">
            <el-button v-if="this.wordCount==0" @click="nextGroup()" type="primary">下一组<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name:'ShowWord',
    methods:{
      fav(tag){
        if(tag==1){
          return 'el-icon-star-on'
        }else if(tag==0){
          return 'el-icon-star-off'
        }
      },
      favorite(id,status,index){
        if(status==0){
          this.get("word/favWord",(result)=>{
              console.log(result);
              this.options[index].status=1;
          },{wordId:id})
        }else if(status==1){
          this.get("word/deFavWord",(result)=>{
              console.log(result);
              this.options[index].status=0;
          },{wordId:id})
        }
      },
      rate(score,id,index){
        this.get("wordrating/rate",(result)=>{
          console.log(result);
          this.options[index].withPage=0;
          if(this.wordCount>0){
           this.wordCount--;
          }
          if(this.wordCount==0){
            for(var i=0;i<this.options.length;i++){
              this.options[i].withPage=1;
            }
            this.$notify({
              title: '完成',
              message: '当前完成'+this.options.length+'个单词',
              type: 'success',
              position: 'top-left',
              duration: '3000'
            });
          }
        },{wordId:id,score:score})
      },
      nextGroup(){
        alert("下一组");
        this.get("word/nextGroup",(result)=>{
          console.log(result);
        },{})
      }
    },
    data(){
      return {
        options:[],
        wordCount:999,
        vocabName:'',
        vocabTag:'',
        percent:100
      }
    },
    components:{

    },
    created:function(){
      this.get("word/showWord",(result)=>{
        console.log(result);
        this.options=result.obj.data;
        this.wordCount=result.obj.data.length;
        this.vocabName=result.obj.vocabName;
        this.vocabTag=result.obj.vocabTag;
        this.percent=result.obj.percent;
      })
    }
  }
</script>

<style scoped>
   .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
    }
    .box-card {
      width: 100%;
    }
</style>
