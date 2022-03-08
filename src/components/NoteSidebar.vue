<template>
  <div class="note-sidebar">
    <span v-if="curBook.id" @click="noAddNote" class="btn add-note">添加笔记</span>
    <span v-if="!curBook.id" class="notebook-title">无笔记本</span>
    <el-dropdown v-if="curBook.id" class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">{{ curBook.title }} <i class="iconfont icon-down"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">{{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  created () {
    console.log('step 2 : NoteSidebar is created')
    this.getNotebooks().then(() => {
      console.log('step 4: getNotebooks success')
      if (this.$route.query.notebookId) {
        this.setCurBook({curBookId: this.$route.query.notebookId})
        debugger
      } else {
        this.setCurBook({curBookId: this.notebooks[0].id})
        debugger
      }
      if (this.curBook.id) return this.getNotes({notebookId: this.curBook.id})
    }).then(() => {
      this.setCurNote({curNoteId: this.$route.query.noteId})
      this.$router.replace({
        path: '/note',
        query: {
          noteId: this.curNote.id,
          notebookId: this.curBook.id
        }
      })
    })
  },
  computed: {
    ...mapGetters([
      'notebooks',
      'notes',
      'curBook',
      'curNote'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurBook',
      'setCurNote'
    ]),
    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote'
    ]),
    handleCommand (notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'})
      }
      this.$store.commit('setCurBook', {curBookId: notebookId})
      this.getNotes({ notebookId }).then(() => {
        this.setCurNote()
        this.$router.replace({
          path: '/note',
          query: {
            noteId: this.curNote.id,
            notebookId: this.curBook.id
          }
        })
      })
    },
    noAddNote () {
      this.addNote({notebookId: this.curBook.id})
    }
  }
}
</script>

<style lang="less">
@import url(../assets/css/note-sidebar.less);
</style>
