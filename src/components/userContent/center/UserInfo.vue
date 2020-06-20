<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="padding: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <div>
            <span>用户名：</span><span style="color: #409EFF; font-weight: bold;">{{getuser.username}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>角色：</span><span style="color: #409EFF; font-weight: bold;">{{getuser.rolename}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>学习方向：</span><span style="color: #409EFF; font-weight: bold;">{{getuser.tag}}</span>
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div style="padding: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>学习方向修改</span>
          </div>
          <div>
            <el-select v-model="tagNum" placeholder="请选择学习方向" style="width: 20vw;">
              <el-option
                v-for="item in options"
                :key="item.num"
                :label="item.name"
                :value="item.num">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button type="primary" style="margin-top: 1vw;" plain @click="changeTag()">提交</el-button>
          </div>
        </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>密码修改</span>
          </div>
          <div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
              <el-form-item label="原密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="现密码" prop="changedPass">
                <el-input type="password" v-model="ruleForm.changedPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" plain>提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name:'UserInfo',
    computed:{
      ...mapGetters(['getuser'])
    },
    methods:{
     ...mapMutations(['setuser','settoken']),
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.post("user/changePassword",(result)=>{
              console.log(result);
              if(result.code==1){
                this.$notify({
                  title: '提示',
                  message: '密码已修改,重新登陆',
                  position: 'top-left',
                  type: 'success',
                  duration: 2000
                });
                this.$router.push("/");
              }else{
                this.$notify({
                  title: '提示',
                  message: '密码错误',
                  position: 'top-left',
                  type: 'error',
                  duration: 2000
                });
                this.ruleForm.pass='';
              }
            },this.ruleForm,"ruleForm")
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changeTag(){
        if(this.tagNum==''){
          return;
        }
        this.get("user/changeTag",(result)=>{
          this.setuser(result.obj);
          this.$notify({
            title: '提示',
            message: '学习方向修改为'+result.obj.tag,
            position: 'top-left',
            type: 'success',
            duration: 1500
          });
        },{tagNum:this.tagNum})
      }
    },
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          if (this.ruleForm.changedPass !== '') {
            this.$refs.ruleForm.validateField('changedPass');
          }
          callback();
        }
      };
      var validateChangedPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入修改后密码'));
        } else {
          callback();
        }
      };
      return {
        tagNum:'',
        options:[],
        ruleForm: {
          pass: '',
          changedPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          changedPass: [
            { validator: validateChangedPass, trigger: 'blur' }
          ]
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
    store:store
  }
</script>

<style scoped>
</style>
