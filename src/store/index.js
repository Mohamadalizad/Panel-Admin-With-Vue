import { createStore } from 'vuex'
import userModules from './Modules/userModules';
import categoryModule from './Modules/categoryModule';
import postModule from './Modules/postModule';

export default createStore({
  state: {
    isLoading:false,
  },
  getters: {
  },
  mutations: {
    setLoading(state, loading){
      state.isLoading = loading;
    }
  },
  actions: {
  },
  modules: {
    userModules,
    categoryModule,
    postModule,
  }
})
