import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import notebook from './modules/notebook'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    notebook
  }
})
