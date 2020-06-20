// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import layer from 'vue-layer'
import axios from 'axios'
import store from '@/vuex/store.js'
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(echarts)
Vue.prototype.$echarts=echarts
Vue.prototype.axios=axios
Vue.prototype.$layer = layer(Vue)
axios.defaults.baseURL="http://127.0.0.1/"
axios.defaults.headers['token']=store.getters.gettoken
Vue.prototype.get=function(url,callback,params={}){
  const loading =this.$loading({
    lock:true,
    text:'loading',
    spinner:'el-icon-loading',
    background:'rgba(0,0,0,0.7)'
  });
  axios.get(url,{params:params})
  .then((response)=>{
    //console.log(response);
    callback(response.data)})
  .catch((exception)=>{
    this.$message({
      message:exception,
      type:'error',
      duration:1000
    })
  })
  .finally(()=>{
      loading.close();
  })
}
Vue.prototype.post=function(url,callback,params,formName){
  this.$refs[formName].validate((valid)=>{
    if(valid){
      const loading =this.$loading({
        lock:true,
        text:'submitting',
        spinner:'el-icon-loading',
        background:'rgba(0,0,0,0.7)'
      });
      let formData=new FormData();
      for(let key in params){
        formData.append(key,params[key]);
      }
      axios.post(url,formData).then((response)=>{
        //console.log(response);
        callback(response.data);
      })
      .catch((error)=>{
        console.log(error);
        alert(error);
      })
      .finally(()=>{
        loading.close();
      })
    }else{
      return false
    }
  });
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
