import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import notebook from './modules/notebook'
import note from './modules/note'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    notebook,
    note
  }
})
