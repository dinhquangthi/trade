/* eslint-disable */
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { Timestamp } from '@firebase/firestore'
import db from '../plugins/firebase'

import TimeLine from '@/components/TimeLine.vue'

export default {
  components: {
    TimeLine
  },
  data: () => ({
    overlay: false,
    zIndex: 1,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        align: 'center',
        value: 'coin',
        sortable: false
      },
      { text: 'L/S', value: 'position', sortable: false },
      { text: 'Volume', value: 'volume', sortable: false },
      { text: 'Entry', value: 'entry', sortable: false },
      { text: 'TP', value: 'take_profit', sortable: false },
      { text: 'SL', value: 'stop_loss', sortable: false },
      { text: 'Market', value: 'market', sortable: false },
      { text: 'R/R', value: 'rate', sortable: false },
      { text: 'WIN', value: 'win', sortable: false },
      { text: 'LOSE', value: 'lose', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Day Start', value: 'date_start' },
      { text: 'Total', value: 'total', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    defaultItem: {
      id: null,
      volume: null,
      entry: null,
      take_profit: null,
      stop_loss: null,
      market: null,
      rate: null,
      win: null,
      lose: null,
      position: null,
      status: '',
      date_start: new Date(),
      total: null
    },
    items: [
      'LONG',
      'SHORT'
    ],
    menu: false
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    calcWin () {
      let win = 0
      win = Math.abs(((this.defaultItem.entry - this.defaultItem.take_profit) / this.defaultItem.entry) * this.defaultItem.volume)
      return Math.floor(win)
    },
    calcLose () {
      let lose = 0
      lose = -Math.abs(((this.defaultItem.entry - this.defaultItem.stop_loss) / this.defaultItem.entry) * this.defaultItem.volume)
      return Math.floor(lose)
    },
    calcRate () {
      let rate = 0
      rate = Math.abs(this.calcWin / this.calcLose)
      return rate.toFixed(2)
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.handle()
  },

  methods: {
    async handle () {
      try {
        const querySnapshot = await getDocs(collection(db, 'transaction'))
        querySnapshot.forEach((doc) => {
          const item = doc.data()
          this.desserts.push(this.generateData(doc.id, item))
        })
      } catch (error) {
        console.log(error)
      }
    },

    generateData (ids, item) {
      const dateStart = this.convertTimestap(
        item.date_start.seconds,
        item.date_start.nanoseconds
      )
      const data = {
        id: ids,
        coin: item.coin,
        volume: item.volume,
        entry: item.entry,
        take_profit: item.take_profit,
        stop_loss: item.stop_loss,
        market: item.market,
        rate: this.caculateRate(
          this.caculateWin(
            item.position,
            item.volume,
            item.entry,
            item.take_profit
          ),
          this.caculateLose(
            item.position,
            item.volume,
            item.entry,
            item.stop_loss
          )
        ),
        win: this.caculateWin(
          item.position,
          item.volume,
          item.entry,
          item.take_profit
        ),
        lose: this.caculateLose(
          item.position,
          item.volume,
          item.entry,
          item.stop_loss
        ),
        position: item.position,
        status: item.status,
        date_start: new Date(dateStart).toLocaleString(),
        total: this.caculateMarket(item.volume, item.entry, item.market)
      }
      return data
    },

    caculateMarket (vol, entry, market) {
      let total = 0
      if (market !== 0) {
        total = Math.abs(((entry - market) / entry) * vol)
      } else {
        total = 0
      }

      return Math.floor(total)
    },

    caculateRate (win, lose) {
      return Math.abs(win / lose).toFixed(2)
    },

    caculateWin (vol, entry, tp) {
      const win = Math.abs(((entry - tp) / entry) * vol)

      return Math.floor(win)
    },
    caculateLose (vol, entry, sl) {
      const lose = -Math.abs(((entry - sl) / entry) * vol)

      return Math.floor(lose)
    },

    convertTimestap (sec, nano) {
      const datetime = new Timestamp(sec, nano).toDate()
      return datetime
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm (eleId) {
      console.log(eleId)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      const objectNew = {
        coin: this.defaultItem.coin,
        stauts: true,
        date_start: this.defaultItem.date_start,
        entry: this.defaultItem.entry,
        take_profit: this.defaultItem.take_profit,
        stop_loss: this.defaultItem.stop_loss,
        market: this.defaultItem.market ? this.defaultItem.market : 0,
        volume: this.defaultItem.volume,
        position: this.defaultItem.position
      }
      try {
        this.overlay = !this.overlay
        await addDoc(collection(db, 'transaction'), objectNew)
        this.close()
        this.overlay = !this.overlay
      } catch (error) {
        console.log(error)
      }
    }
  }
}
