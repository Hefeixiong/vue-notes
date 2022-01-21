<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记</a>
    </header>
    <main>
      <div class="layout">
        <router-link v-for="notebook in notebooks" :key="notebook.index" to="note/1" class="notebook">
          <div>
            <span class="iconfont icon-notebook"></span>{{notebook.title}}
            <span>{{notebook.noteCounts}}</span>
            <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
            <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
            <span class="data">{{notebook.friendlyCreatedAt}}</span>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from '@/helpers/bus'
import Notebooks from '@/apis/notebooks'
import {friendlyDate} from '@/helpers/util'

export default {
  name: 'Login',
  data () {
    return {
      notebooks: []
    }
  },
  created () {
    Bus.$on('userInfo', user => {
      console.log(user.username)
      Auth.getInfo().then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
      Notebooks.getAll().then(res => {
        this.notebooks = res.data()
      })
    })
  },
  methods: {
    onCreate () {
      let title = window.prompt('创建笔记')
      if (title.trim() === '') {
        alert('笔记本名不能为空')
        return
      }
      Notebooks.addNotebook({title}).then(res => {
        console.log(res)
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        alert(res.msg)
      })
    },
    onEdit (notebook) {
      console.log('edit...', notebook)
    },
    onDelete (notebook) {
      console.log('edit...', notebook)
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
