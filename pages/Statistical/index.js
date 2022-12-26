import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import db from '../../plugins/firebase'
import { convertMonth } from '@/plugins/caculate'

export default {
  layout: 'default',
  components: {},

  data: () => ({
    table: [],
    obj: {
      id: null,
      month: null,
      roe: 0,
      percentage: 0
    }
  }),

  computed: {},

  async created () {
    await this.$store.dispatch('fetchData')
    await this.createData()
  },
  fetch () {
    this.fetchData()
  },

  methods: {
    createData () {
      let totalRoe = 0
      let numWin = 0
      let numLose = 0
      const listArray = this.$store.state.desserts
      const monthCurrent = new Date().getUTCMonth()
      const yearCurrent = new Date().getUTCFullYear()
      listArray.forEach((element) => {
        const datetime = element.date_start
        const monthNumber = new Date(datetime).getUTCMonth()
        if (monthNumber === monthCurrent) {
          totalRoe += element.roe
          if (element.roe > 0) {
            numWin += 1
          } else {
            numLose += 1
          }
        }
      })
      this.obj.id = `${yearCurrent}_${monthCurrent}`
      this.obj.month = `${yearCurrent}-${monthCurrent}`
      this.obj.roe = Number(totalRoe).toFixed(2)
      this.obj.percentage = `${numWin}/${numLose}`
    },

    async fetchData () {
      try {
        const array = []
        const querySnapshot = await getDocs(collection(db, 'statistical'))
        querySnapshot.forEach((doc) => {
          const item = doc.data()
          array.push(item)
        })
        this.table = array.map((item) => {
          return {
            ...item,
            id: convertMonth(item.id),
            month: convertMonth(item.month)
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    initData () {
      this.handle()
    },

    async handle () {
      try {
        await this.$store.dispatch('enableLoading')
        await setDoc(doc(db, 'statistical', this.obj.id), this.obj)
        await this.fetchData()
        await this.$store.dispatch('disableLoading')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
