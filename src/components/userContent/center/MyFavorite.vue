<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div style="padding: 10px;">
          <el-card class="box-card">
            <div slot="header" >
              <span style="font-weight: bold;">单词收藏</span>
              <span style="float: right; padding: 3px 0;font-weight: bold;font-style: oblique;" >Word</span>
            </div>
            <div>
              <div>
                <el-collapse accordion>
                  <el-collapse-item v-for="item in this.words" :key="item.id" :title="item.spell" style="font-weight: bold;">
                    <el-divider content-position="left"><span style="color: #409EFF;">音标</span></el-divider>
                    <div style="font-style: oblique;">
                    {{item.phonetic}}
                    </div>
                    <el-divider content-position="left"><span style="color: #409EFF;">释义</span></el-divider>
                    <div>
                    {{item.paraphrase}}
                    </div>
                    <el-divider content-position="left"><span style="color: #409EFF;">造句</span></el-divider>
                    <div>
                    {{item.sentence}}
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <div style="padding-top: 1vw;">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-count="this.wordPageCount"
                  :current-page="this.wordsPageNum"
                  @current-change="changeWordsPageNum">
                </el-pagination>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 10px;">
          <el-card class="box-card">
            <div slot="header" >
              <span style="font-weight: bold;">文章收藏</span>
              <span style="float: right; padding: 3px 0;font-weight: bold;font-style: oblique;" >Article</span>
            </div>
            <div>
              <el-collapse accordion>
                <el-collapse-item v-for="item in this.articles" :key="item.id" :title="item.title" >
                  <div>
                    <el-tag close-transition>{{item.tags}}</el-tag>
                  </div>
                  <div>
                    <el-button type="text" @click="handleCurrentChange(item)">阅读<i class="el-icon-zoom-in el-icon--right"></i></el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="downloadpdf(item.pdfFileLocation,item.title)">下载<i class="el-icon-download el-icon--right"></i></el-button>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div style="padding-top: 1vw;">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-count="this.articlePageCount"
                :current-page="this.articlesPageNum"
                @current-change="changeArticlesPageNum">
              </el-pagination>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name:'MyFavorite',
    methods:{
      changeWordsPageNum(i){
        this.wordsPageNum=i;
      },
      changeArticlesPageNum(i){
        this.articlesPageNum=i;
      },
      handleCurrentChange(val){
        console.log(val);
        this.$router.push({path:'/showarticle',query:{
          title:val.title,
          coverFileLocation:val.coverFileLocation,
          wrodFileLocation:val.wrodFileLocation,
          pdfFileLocation:val.pdfFileLocation,
          tags:val.tags,
          id:val.id
        }})
      },
      downloadpdf(val,title){
      this.axios({
        method:'get',
        url:"article/downloadArticle",
        responseType:'blob',
        params:{filePath:val}
       }).then((result)=>{
         console.log(result)
         let url = window.URL.createObjectURL(result.data)
         let link = document.createElement('a')
         link.style.display = 'none'
         link.href = url
         link.setAttribute('download', title+'.pdf')
         document.body.appendChild(link)
         link.click()
         document.body.removeChild(link)
         // 释放blob URL地址
         window.URL.revokeObjectURL(url)

       })
      }
    },
    data(){
      return {
        words:[],
        wordsTotal:0,
        wordsPageNum:1,
        wordPageCount:0,
        articles:[],
        articlesTotal:0,
        articlesPageNum:1,
        articlePageCount:0,
      }
    },
    watch:{
      wordsPageNum:{
        handler(newvalue,oldvalue){
          this.get("favorite/myAllFavorite",(result)=>{
            console.log(result);
            this.words=result.obj.data;
            this.wordsTotal=result.obj.mapIPage.total;
            this.wordsPageNum=result.obj.mapIPage.current;
            this.wordPageCount=result.obj.mapIPage.pages;
          },{typeNum:1,pageNum:newvalue,pageSize:10});
        }
      },
      articlesPageNum:{
        handler(newvalue,oldvalue){
          this.articlesPageNum=newvalue;
          this.get("favorite/myAllFavorite",(result)=>{
            console.log(result);
            this.articles=result.obj.data;
            this.articlesTotal=result.obj.mapIPage.total;
            this.articlesPageNum=result.obj.mapIPage.current;
            this.articlePageCount=result.obj.mapIPage.pages;
          },{typeNum:2,pageNum:newvalue,pageSize:10});
        }
      }
    },
    components:{

    },
    created:function(){
      this.get("favorite/myAllFavorite",(result)=>{
        console.log(result);
        this.words=result.obj.data;
        this.wordsTotal=result.obj.mapIPage.total;
        this.wordsPageNum=result.obj.mapIPage.current;
        this.wordPageCount=result.obj.mapIPage.pages;
      },{typeNum:1,pageNum:1,pageSize:10});
      this.get("favorite/myAllFavorite",(result)=>{
        console.log(result);
        this.articles=result.obj.data;
        this.articlesTotal=result.obj.mapIPage.total;
        this.articlesPageNum=result.obj.mapIPage.current;
        this.articlePageCount=result.obj.mapIPage.pages;
      },{typeNum:2,pageNum:1,pageSize:10});
    }
  }
</script>

<style scoped>
</style>
