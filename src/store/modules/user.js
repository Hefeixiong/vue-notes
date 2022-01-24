import Auth from '@/apis/auth'
import router from '@/router'

const state = {
  user: null
}

const getters = {
  username: state => state.user === null ? '未登录' : state.user.username,
  slug: state => state.user === null ? '未' : state.user.username.charAt(0)
}

const mutations = {
  setUser (state, payload) {
    state.user = payload.user
  }
}

const actions = {
  login ({commit}, {username, password}) {
    return Auth.login({username, password})
      .then(res => {
        console.log(res)
        commit('setUser', {user: res.data})
      })
  },
  register ({commit}, {username, password}) {
    return Auth.register({username, password})
      .then(res => commit('setUser', {user: res.data}))
  },
  logout ({commit}, payload = {path: '/login'}) {
    console.log(payload)
    router.push(payload)
    return Auth.logout().then(res => commit('setUser', {user: null}))
  },
  checkLogin ({commit, state}, payload = {path: '/'}) {
    console.log('checkLogin', state.user)
    if (state.user !== null) {
      return Promise.resolve()
    } else {
      return Auth.getInfo().then(res => {
        console.log(res)
        if (!res.isLogin) {
          console.log('jump...')
          router.push(payload)
        } else {
          console.log('isLogin = false')
          commit('setUser', {user: res.data})
        }
        console.log('user.checkLogin', res)
      })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
