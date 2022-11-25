/* eslint-disable */

import db from "../plugins/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Timestamp } from "@firebase/firestore";

import TimeLine from "@/components/TimeLine.vue";

export default {
  components: {
    TimeLine,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        align: "center",
        value: "coin",
      },
      { text: "L/S", value: "position", sortable: false },
      { text: "Volume", value: "volume" , sortable: false},
      { text: "Entry", value: "entry", sortable: false },
      { text: "TP", value: "take_profit", sortable: false },
      { text: "SL", value: "stop_loss", sortable: false },
      { text: "Market", value: "market", sortable: false },
      { text: "R/R", value: "rate" , sortable: false},
      { text: "WIN", value: "win" , sortable: false},
      { text: "LOSE", value: "lose", sortable: false },
      { text: "Status", value: "status", sortable: false },
      { text: "Day Start", value: "date_start", sortable: false },
      { text: "Day End", value: "date_end", sortable: false },
      { text: "Total", value: "total" , sortable: false},
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    defaultItem: {
      volume: 0,
      entry: 0,
      take_profit: 0,
      stop_loss: 0,
      market: 0,
      rate: 0,
      win: 0,
      lose: 0,
      position: "",
      status: "",
      date_start: "",
      date_end: "",
      total: 5,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.handle();
  },

  methods: {
    async handle() {
      try {
        const querySnapshot = await getDocs(collection(db, "transaction"));
        querySnapshot.forEach((doc) => {
          let item = doc.data();
          this.desserts.push(this.generateData(item));
        });
      } catch (error) {
        console.log(error);
      }
    },

    generateData(item) {
      const dateStart = this.convertTimestap(
        item.date_start.seconds,
        item.date_start.nanoseconds
      );
      const dateEnd = this.convertTimestap(
        item.date_start.seconds,
        item.date_start.nanoseconds
      );
      let data = {
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
        date_start: new Date(dateStart).toLocaleDateString(),
        date_end: new Date(dateEnd).toLocaleDateString(),
        total: this.caculateMarket(item.volume,
          item.entry,
          item.market),
      };
      return data;
    },

    caculateMarket(vol, entry, market) {
      let total = 0;
      if(market !== 0) {
        total = Math.abs(((entry - market) / entry) * vol)
      } else {
        total = 0
      }
     
      return Math.floor(total)
    },

    caculateRate(win, lose) {
      return Math.abs(win / lose).toFixed(2);
    },

    caculateWin(positions, vol, entry, tp) {
      let win = 0;
      if ((positions = false)) {
        win = Math.abs(((entry - tp) / entry) * vol);
      } else {
        win = Math.abs(((entry - tp) / entry) * vol);
      }
      return Math.floor(win);
    },
    caculateLose(positions, vol, entry, sl) {
      let lose = 0;
      if ((positions = false)) {
        lose = -Math.abs(((entry - sl) / entry) * vol);
      } else {
        lose = -Math.abs(((entry - sl) / entry) * vol);
      }
      return Math.floor(lose);
    },

    convertTimestap(sec, nano) {
      const datetime = new Timestamp(sec, nano).toDate();
      return datetime;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
