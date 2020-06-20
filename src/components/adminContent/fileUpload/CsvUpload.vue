<template>
  <div style="margin-left: 130px;margin-top: 80px;">
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <el-steps :active="step">
          <el-step title="词表Excel文件" icon="el-icon-upload"></el-step>
          <el-step title="词表封面" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>
      <div v-if="step==1">
        <el-form  :model="formInline" class="demo-form-inline" >
          <el-form-item label="词表名称" >
            <el-input v-model="formInline.vocabName" placeholder="词表名称"></el-input>
          </el-form-item>
          <el-form-item label="词表标签">
            <el-select v-model="formInline.tagNum" placeholder="词表标签">
              <el-option
                v-for="item in options"
                :key="item.num"
                :label="item.name"
                :value="item.num">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-upload
              ref="excelfileupload"
              class="upload-demo"
              drag
              :action="uploadExcelurl"
              name="excelfile"
              :data="formInline"
              :auto-upload="false"
              :multiple="false"
              :on-success="upExcelsuccess">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将Excel格式文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitExcel">上传</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="step==2">
        <el-upload
          ref="coverfileupload"
          class="upload-demo"
          drag
          :action="uploadCoverurl"
          name="coverfile"
          :data="vocabId"
          :auto-upload="false"
          :multiple="false"
          :on-success="upCoversuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将词表{{formInline.vocabName}}封面文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <el-button type="primary" @click="onSubmitCover">上传</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name:'CsvUpload',
    computed:{
      uploadExcelurl(){
        return this.axios.defaults.baseURL+"vocab/newVocab"
      },
      uploadCoverurl(){
        return this.axios.defaults.baseURL+"vocab/vocabCover"
      },
    },
    methods:{
      onSubmitExcel() {
        this.$refs.excelfileupload.submit();
      },
      upExcelsuccess(response, file, fileList){
        console.log(response);
        this.$message.success({message:response.obj,duration:800});
        this.vocabId.id=response.obj
        this.step=2;
      },
      onSubmitCover(){
        this.$refs.coverfileupload.submit();
      },
      upCoversuccess(response, file, fileList){
        console.log(response);
        location.reload();
      }
    },
    data(){
      return {
        formInline: {
          vocabName: '',
          tagNum: ''
        },
        options:[],
        fileList: [],
        vocabId:{
          id:''
        },
        step:1
      }
    },
    components:{

    },
    created:function(){
      this.get("dict/allByKeyword",(result)=>{
        this.options=result;
        console.log(result);
      },{keyword:'学习方向'})
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
