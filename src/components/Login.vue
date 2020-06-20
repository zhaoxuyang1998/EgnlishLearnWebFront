<template>
  <div>
    <el-container>
      <el-header>{{message}}</el-header>
      <el-main>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="text" @click="toRegister()">立即注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name:'Login',
    computed:{
      ...mapGetters(['getuser','gettoken'])
    },
    methods:{
      ...mapMutations(['setuser','settoken']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          //if (valid) {
            this.post("user/login",(result)=>{
              console.log(result);
              this.axios.defaults.headers['token']=result.obj.token;
              //console.log(this.axios.defaults.headers['token']);
              this.settoken(result.obj.token);
              this.setuser(result.obj.user);
              if(result.obj.user.roleNum==3){
                this.$router.push("/sysmain");
              }else if(result.obj.user.roleNum==2){
                this.$router.push("/adminmain");
              }else if(result.obj.user.roleNum==1){
                this.$router.push("/usermain");
              }else{
                this.$message.error({message:result.obj,duration:800});
                this.resetForm('ruleForm');
              }

            },this.ruleForm,"ruleForm");
          //} else {
          //  console.log('error submit!!');
          //  return false;
          //}
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toRegister(){
        this.$router.push("/register");
      }
    },
    data(){
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        callback();
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        message:'登录页',
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          pass: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          age: [
            { validator: checkUsername, trigger: 'blur' }
          ]
        }
      }
    },
    components:{

    },
    store:store
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
      height: 92vh;
    }
    body > .el-container {
    }


</style>
