<template>
  <div style="background-color: #42B983;">

    <el-row>
      <el-col :span="15">
        <div style="padding: 4px;"><pdf :src="fileURL(this.pdffile)"></pdf></div>
      </el-col>
      <el-col :span="9" >
        <div style="padding: 4px;">
        <el-card class="box-card">
          <span>{{title}}</span>
          <el-button style="float: right; padding: 3px " :icon="favIcon(this.fav)" type="text" @click="favorite()"></el-button>
          <el-divider content-position="left">平均难度</el-divider>
          <el-rate
            v-model="rate"
            show-score
            text-color="#ff9900"
            score-template="{value}"
            disabled>
          </el-rate>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>笔记</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addComment()">添加</el-button>
          </div>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="comment">
          </el-input>
          <el-table
            :data="meComment"
            stripe
            style="width: 100%"
            :show-header=false
            max-height="480">
            <el-table-column
              prop="comment"
              label="我的"
              width="460">
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我的难度评价</span>
          </div>
          <div style="display: inline-flex;">
            <el-rate
              v-model="value"
              show-text
              :texts="this.texts">
            </el-rate>
            <el-button style="float: right;margin-left: 13vw;" type="success" icon="el-icon-check" size="mini" @click="rateArticle()"></el-button>
          </div>
        </el-card>


        <div class="fixedBox"><el-button type="primary" @click="drawer = true" icon="el-icon-search" circle></el-button></div>
       </div>
      </el-col>
    </el-row>
    <el-drawer
      title="查词"
      :visible.sync="drawer"
      :direction="direction">
      <div style="padding: 1vw;">
          <el-input placeholder="请输入内容" v-model="keyword">
            <el-button slot="append"  @click="searchWord()" icon="el-icon-search"></el-button>
          </el-input>
          <el-table
            :data="searchResult"
            style="width: 100%"
            :show-header=false
            max-height=660>
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
          </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  export default {
    name:'ShowArticle',
    methods:{
      searchWord(){
        this.get("word/searchWord",(result)=>{
          console.log(result);
          this.searchResult=result.obj;
        },{keyword:this.keyword})
      },
      fileURL(location){
        return "/api/"+location;
      },
      favIcon(tag){
        if(tag==1){
          return 'el-icon-star-on'
        }else if(tag==0){
          return 'el-icon-star-off'
        }
      },
      favorite(){
        if(this.fav==0){
          this.get("article/favArticle",(result)=>{
              console.log(result);
              this.fav=1;
          },{articleId:this.id})
        }else if(this.fav==1){
          this.get("article/deFavArticle",(result)=>{
              console.log(result);
              this.fav=0;
          },{articleId:this.id})
        }
      },
      addComment(){
        if(this.comment==''){
          this.$notify({
            title: '提示',
            message: '笔记不能为空',
            type: 'warning',
            duration:1100
          });
          return;
        }
        this.get("usercomment/addComment",(result)=>{
          this.$notify({
            title: '提示',
            message: '成功添加一条评论',
            type: 'success',
            duration:1100
          });
          this.comment='';
        },{comment:this.comment,contentId:this.id,typeNum:2})
      },
      rateArticle(){
        if(this.value==0){
          this.$notify({
            title: '提示',
            message: '评分不能为零',
            type: 'warning',
            duration:1100
          });
          return;
        }
        this.get("articlerating/rateArticle",(result)=>{
          console.log(result);
          this.$notify({
            title: '提示',
            message: '已评价',
            type: 'success',
            duration:1100
          });
        },{articleId:this.id,socre:this.value})
      }
    },
    data(){
      return {
        title:'',
        tags:'',
        pdffile:'',
        coverfile:'',
        comment:'',
        rate:5.0,
        meComment:[],
        fav:0,
        id:0,
        value:0.0,
        texts:['简单', '一般', '适中', '困难', '极难'],
        drawer: false,
        direction: 'rtl',
        keyword:'',
        searchResult:[]
      }
    },
    computed:{

    },
    components:{
      pdf:pdf
    },
    created:function(){
      this.title=this.$route.query.title;
      this.tags=this.$route.query.tags;
      this.pdffile=this.$route.query.pdfFileLocation;
      this.coverfile=this.$route.query.coverFileLocation;
      this.id=this.$route.query.id;
      this.get("article/articleInfoByUser",(result)=>{
        console.log(result);
        this.rate=result.obj.score;
        this.meComment=result.obj.meContent;
        this.fav=result.obj.favorite;
        this.value=result.obj.myScore;
      },{articleId:this.$route.query.id});
    }
  }
</script>

<style scoped>


			.fixedBox{

				width:5vw;
				height:5vw;
				position:fixed;
				left:90vw;
				top:50vw;
}

</style>
