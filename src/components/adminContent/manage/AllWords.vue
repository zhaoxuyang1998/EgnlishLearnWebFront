<template>
  <div style="padding: 2px;">
    <el-table
      :data="words"
      style="width: 100%"
      :show-header=false>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-divider content-position="left">释义</el-divider>
          <span>{{ props.row.paraphrase}}</span>
          <el-divider content-position="left">句子</el-divider>
          <span>{{ props.row.sentence}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="spell">
      </el-table-column>
      <el-table-column
        prop="phonetic">
        <template slot-scope="scope">
           <span style="font-style: oblique;">{{scope.row.phonetic}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="id">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-input v-model="ruleForm.id" placeholder="请输入内容"></el-input>
            <el-input v-model="ruleForm.phonetic" placeholder="请输入内容"></el-input>
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="ruleForm.paraphrase">
            </el-input>
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="ruleForm.sentence">
            </el-input>
            <el-button type="primary" @click="updateWord()" plain size="mini">提交</el-button>
            <el-button slot="reference" type="primary" icon="el-icon-edit" @click="reviseWord(scope.row,scope.$index)" plain size="mini">编辑</el-button>
          </el-popover>

        </template>
      </el-table-column>
    </el-table>
    <div style="padding-top: 1vw;">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="this.pageCount"
        :current-page="this.wordsPageNum"
        @current-change="changeWordsPageNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    methods:{
      changeWordsPageNum(i){
        this.wordsPageNum=i;
      },
      reviseWord(val,index){
        this.ruleForm.id=val.id;
        this.ruleForm.spell=val.spell;
        this.ruleForm.phonetic=val.phonetic;
        this.ruleForm.paraphrase=val.paraphrase;
        this.ruleForm.sentence=val.sentence;
        this.indexNow=index;
      },
      updateWord(){
        this.get("word/reviseWordById",(result)=>{
          console.log(result);
          this.words[this.indexNow].spell=this.ruleForm.spell;
          this.words[this.indexNow].phonetic=this.ruleForm.phonetic;
          this.words[this.indexNow].paraphrase=this.ruleForm.paraphrase;
          this.words[this.indexNow].sentence=this.ruleForm.sentence;
          this.$notify({
            title: '提示',
            message: '词条已修改',
            type:'success'
          });
        },this.ruleForm)
      }
    },
    data(){
      return {
        vocabId:999,
        vocabName:'',
        words:[],
        wordsTotal:0,
        wordsPageNum:1,
        pageCount:0,
        indexNow:999,
        ruleForm: {
          id:'',
          spell: '',
          phonetic: '',
          paraphrase: '',
          sentence:''
        }
      }
    },
    watch:{
      wordsPageNum:{
        handler(newvalue,oldvalue){
          this.get("word/wordsByVocabId",(result)=>{
            console.log(result);
            this.words=result.obj.records;
            this.wordsTotal=result.obj.total;
            this.wordsPageNum=result.obj.current;
            this.pageCount=result.obj.pages;
          },{vocabId:this.vocabId,pageNum:newvalue,pageSize:20});
        }
      }
    },
    components:{

    },
    created:function(){
      this.vocabId=this.$route.query.vocabId;
      this.vocabName=this.$route.query.vocabName;
      this.get("word/wordsByVocabId",(result)=>{
        console.log(result)
        this.words=result.obj.records;
        this.wordsTotal=result.obj.total;
        this.wordsPageNum=result.obj.current;
        this.pageCount=result.obj.pages;
      },{vocabId:this.$route.query.vocabId,pageNum:1,pageSize:20})
    }
  }
</script>

<style scoped>
</style>
