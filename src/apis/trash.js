import request from '@/helpers/request'
import { friendlyDate } from '@/helpers/util'

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  getAll () {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data = res.data.sort((note1, note2) => note1.createdAt < note2.createdAt)
        res.data.forEach(note => {
          note.createAtFriendly = friendlyDate(note.createdAt)
          note.updateAtFriendlu = friendlyDate(note.updatedAt)
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  },
  deleteNote ({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },
  reverNote ({noteId}) {
    return request(URL.REVERT.replace((':noteId'), noteId), 'PATCH')
  }
}
