/* eslint-disable */

import db from "../plugins/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Timestamp } from "@firebase/firestore";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        align: "start",
        sortable: false,
        value: "coin",
      },
      { text: "Vo", value: "volume" },
      { text: "Ent", value: "entry" },
      { text: "TP", value: "take_profit" },
      { text: "SL", value: "stop_loss" },
      { text: "Market", value: "market" },
      { text: "R/R", value: "rate" },
      { text: "W", value: "win" },
      { text: "L", value: "lose" },
      { text: "L/S", value: "position" },
      { text: "Status", value: "status" },
      { text: "Day Start", value: "date_start" },
      { text: "Day End", value: "date_end" },
      { text: "Total", value: "total" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      volume: 0,
      entry: 0,
      take_profit: 0,
      stop_loss: 0,
      market: 0,
    },
    defaultItem: {
      volume: 0,
      entry: 0,
      take_profit: 2,
      stop_loss: 1,
      market: 1,
      rate: 2,
      win: 3,
      lose: -2,
      position: "lo",
      status: "open",
      date_start: " 22/11/2022",
      date_end: " 22/11/2022",
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
          console.log(doc.data());
          const dateStart =  this.convertTimestap( doc.data().date_start.seconds,doc.data().date_start.nanoseconds)
            this.desserts = [
              {
                coin:  doc.data().coin,
                volume: doc.data().volume,
                entry: doc.data().entry,
                take_profit: doc.data().take_profit,
                stop_loss: doc.data().stop_loss,
                market: doc.data().market,
                rate: 2,
                win: 3,
                lose: -2,
                position: doc.data().position,
                status: "open",
                date_start: dateStart,
                date_end: " 22/11/2022",
                total: doc.data().total,
              },
            ];
        });
      } catch (error) {
        console.log(error);
      }
    },

    convertTimestap(sec,nano)  {
      const datetime = new Timestamp(sec,nano).toDate
      return datetime
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
