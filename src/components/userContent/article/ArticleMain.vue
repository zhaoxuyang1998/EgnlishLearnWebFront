<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-carousel :interval="3000" arrow="always" autoplay >
          <el-carousel-item v-for="item in recommend" :key="item.id" >
            <el-card style="width: 100%;height: 100%;">
              <div style="padding: 14px;">
                <span>{{item.title}}</span>
                <el-divider direction="vertical"></el-divider>
                <span><el-tag>{{item.tags}}</el-tag></span>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="handleCurrentChange(item)">阅读<i class="el-icon-zoom-in el-icon--right"></i></el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="downloadpdf(item.pdfFileLocation,item.title)">下载<i class="el-icon-download el-icon--right"></i></el-button>
              </div>
            </el-card>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row>

    </el-row>
    <el-row>
      <el-col :span="24">
       <el-tabs type="border-card" v-model="activeTag">
         <el-tab-pane
         v-for="item in options"
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
               width="400">
              <template slot-scope="scope">
                <el-tag
                  close-transition>{{scope.row.tags}}</el-tag>
              </template>
             </el-table-column>

             <el-table-column
               prop="pdfFileLocation">
               <template slot-scope="scope">
                <el-button type="text" @click="handleCurrentChange(scope.row)">阅读<i class="el-icon-zoom-in el-icon--right"></i></el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="downloadpdf(scope.row.pdfFileLocation,scope.row.title)">下载<i class="el-icon-download el-icon--right"></i></el-button>
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
    name:'ArticleMain',
    methods:{
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
      readArticle(){
        alert();
      },
      tags(tagsString){
        var res=tagsString.split(",");
        return res;
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
      return{
        options: [],
        recommend:[],
        activeTag:'',
      };
    },
    components:{

    },
    created:function(){
      this.get("article/articlesByAllTagsWithPage",(result)=>{
        //this.options=result;
        console.log(result.obj);
        this.options=result.obj
      }),
      this.get("article/articlesByRecommend",(result)=>{
        console.log(result);
        this.recommend=result.obj;
      })
    }
  }
</script>

<style scoped>

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
