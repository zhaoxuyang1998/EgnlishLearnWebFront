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
          <el-form-item lable="用户类型" prop="roleNum">
            <el-radio v-model="ruleForm.roleNum" label="1" border>普通用户</el-radio>
            <el-radio v-model="ruleForm.roleNum" label="2" border>内容管理员</el-radio>
          </el-form-item>
          <el-form-item v-if="this.ruleForm.roleNum==1" lable="学习方向" prop="tagNum">
            <el-select v-model="ruleForm.tagNum" placeholder="请选择学习方向">
              <el-option
                v-for="item in options"
                :key="item.num"
                :label="item.name"
                :value="item.num">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>

  export default {
    name:'Register',
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.post("user/register",(result)=>{
              console.log(result);
              this.$message({
                message: '注册成功，跳转登录',
                type: 'success'
              });
              this.$router.push("/");
            },this.ruleForm,"ruleForm")
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    data(){
      var checkUsername = (rule, value, callback) => {
        if (value==='') {
          return callback(new Error('用户名不能为空'));
        }
        this.get("user/checkExist",(result)=>{
          console.log(result);
          if(result.obj=='no'){
            return callback(new Error('sadasdasd'));
          }else if(result.obj=='yes'){
            return callback(new Error('11111111'));
          }
        },{username:this.ruleForm.username})
        callback();
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        callback();
      };
      return {
        message:'注册页',
        ruleForm: {
          username: '',
          password: '',
          roleNum:'',
          tagNum:''
        },
        options: [],
        rules: {
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          username: [
            { validator: checkUsername, trigger: 'blur' }
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
    }
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
