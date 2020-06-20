<template>
  <div style="margin-left: 130px;margin-top: 80px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-steps :active="step">
          <el-step title="文章信息" icon="el-icon-edit"></el-step>
          <el-step title="文章文件" icon="el-icon-upload"></el-step>
          <el-step title="文章封面" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>
      <div v-if="step==1">
       <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
          <el-form-item label="文章名称">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章标签">
            <el-checkbox-group v-model="ruleForm.tags" >
              <el-checkbox
                v-for="item in options"
                :label="item.num"
                :key="item.name"
                border
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitContent('ruleForm')">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="step==2">
         <el-upload
            ref="filePDFupload"
            class="upload-demo"
            drag
            :action="uploadPDFurl"
            name="pdffile"
            :data="articleId"
            :auto-upload="false"
            :multiple="false"
            :on-success="upPDFsuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将PDF文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-button type="primary" @click="onSubmitPDF">上传</el-button>
      </div>
      <div v-if="step==3">
          <el-upload
            ref="fileCoverupload"
            class="upload-demo"
            drag
            :action="uploadCoverurl"
            name="cover"
            :data="articleId"
            :auto-upload="false"
            :multiple="false"
            :on-success="upCoversuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将封面文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-button type="primary" @click="onSubmitCover">上传</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name:'ArticleUpload',
    methods:{
      onSubmitContent() {
        this.post('article/newArticleContent',(result)=>{
          console.log(result);
          if(result.code==1){
            this.step=2;
            this.articleId.id=result.obj;
          }
        },this.ruleForm,'ruleForm')
        //this.$refs.fileupload.submit();
        console.log('submit!');
      },
      onSubmitPDF(){
        this.$refs.filePDFupload.submit();
      },
      onSubmitCover(){
        this.$refs.fileCoverupload.submit();
      },
      upPDFsuccess(response, file, fileList){
        console.log(response);
        this.step=3;
        this.$message.success({message:response.obj,duration:800});
      },
      upCoversuccess(response, file, fileList){
        console.log(response);
        this.$message.success({message:response.obj,duration:800});
        location.reload();
      }
    },
    data(){
      return {
        ruleForm: {
          title: '',
          tags: []
        },
        step:1,
        options:[],
        articleId:{
          id:''
        }
      }
    },
    components:{

    },
    created:function(){
      this.get("dict/allByKeyword",(result)=>{
        this.options=result;
        console.log(result);
      },{keyword:'学习方向'})
    },
    computed:{
      uploadPDFurl(){
        return this.axios.defaults.baseURL+"article/newArticlePDF"
      },
      uploadCoverurl(){
        return this.axios.defaults.baseURL+"article/newArticleCover"
      }
    }
  }
</script>

<style scoped>

 .text {
      font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 80vw;
  }

</style>
