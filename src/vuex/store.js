import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex);
export default new Vuex.Store({
  plugins:[
    persistedState({ storage: window.sessionStorage })
  ],
  state:{
    user:{},
    token:''
  },
  getters:{
    getuser(state){
      return state.user
    },
    gettoken(state){
      return state.token
    }
  },
  mutations:{
    setuser(state,user){
      state.user=user;
    },
    settoken(state,token){
      state.token=token
    }
  }
})
