import {
  collection,
  getDocs
} from 'firebase/firestore'
import db from '../plugins/firebase'
import { generateData } from '@/plugins/caculate'

export const state = () => ({
  overlay: false,
  desserts: [],
  pnl: 0
})
export const mutations = {
  ENABLE_LOADING (state) {
    state.overlay = true
  },
  DISABLE_LOADING (state) {
    state.overlay = false
  },

  INIT_DATA (state, data) {
    state.desserts = data.arr
    state.pnl = data.pnl
  }
}
export const actions = {
  enableLoading (context) {
    context.commit('ENABLE_LOADING')
  },
  disableLoading (context) {
    context.commit('DISABLE_LOADING')
  },

  async fetchData (context) {
    try {
      const data = {
        arr: [],
        pnl: 0
      }
      const querySnapshot = await getDocs(collection(db, 'transaction'))
      querySnapshot.forEach((doc) => {
        const item = doc.data()
        data.arr.push(generateData(doc.id, item))
      })
      data.arr.forEach((item) => {
        data.pnl += item.roe
      })
      context.commit('INIT_DATA', data)
    } catch (error) {
      console.log(error)
    }
  }
}
