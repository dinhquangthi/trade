/* eslint-disable */
import {
  caculateMarket,
  caculateRate,
  caculateWin,
  caculateLose,
  convertTimestap,
  generateData,
} from "@/plugins/caculate";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Timestamp } from "@firebase/firestore";
import db from "../plugins/firebase";

import TimeLine from "@/components/TimeLine.vue";
import AddItem from "@/components/AddItem.vue";

export default {
  components: {
    TimeLine,
    AddItem,
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    idDelete: null,
    headers: [
      {
        align: "center",
        value: "coin",
        sortable: false,
      },
      { text: "L/S", value: "position", sortable: false },
      { text: "Volume", value: "volume", sortable: false },
      { text: "Entry", value: "entry", sortable: false },
      { text: "TP", value: "take_profit", sortable: false },
      { text: "SL", value: "stop_loss", sortable: false },
      { text: "Market", value: "market", sortable: false },
      { text: "R/R", value: "rate", sortable: false },
      { text: "WIN", value: "win", sortable: false },
      { text: "LOSE", value: "lose", sortable: false },
      { text: "Status", value: "status", sortable: false },
      { text: "Day Start", value: "date_start" },
      { text: "Total", value: "total", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedItem: {
      coin: null,
      volume: null,
      entry: null,
      take_profit: null,
      stop_loss: null,
      market: null,
      lose: null,
      position: null,
      status: "",
    },
    desserts: [],
    items: ["LONG", "SHORT"],
    menu: false,
  }),

  computed: {
    calcWin() {
      let win = 0;
      win = Math.abs(
        ((this.editedItem.entry - this.editedItem.take_profit) /
          this.editedItem.entry) *
          this.editedItem.volume
      );
      return Math.floor(win);
    },
    calcLose() {
      let lose = 0;
      lose = -Math.abs(
        ((this.editedItem.entry - this.editedItem.stop_loss) /
          this.editedItem.entry) *
          this.editedItem.volume
      );
      return Math.floor(lose);
    },
    calcRate() {
      let rate = 0;
      rate = Math.abs(this.calcWin / this.calcLose);
      return rate.toFixed(2);
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
    this.initData();
  },
 
  methods: {
    async initData() {
      try {
        const querySnapshot = await getDocs(collection(db, "transaction"));
        querySnapshot.forEach((doc) => {
          const item = doc.data()
          this.desserts.push(generateData(doc.id,item))
        })
      } catch (error) {
        console.log(error);
      }
    },

    editItem(item) {
      console.log(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    itemRowBackground(item) {
      return item.status === false ? "bg-disable" : "";
    },
    async saveItem() {
      const objectNew = {
        coin: this.editedItem.coin,
        status: true,
        date_start: this.editedItem.date_start,
        entry: this.editedItem.entry,
        take_profit: this.editedItem.take_profit,
        stop_loss: this.editedItem.stop_loss,
        market: this.editedItem.market ? this.editedItem.market : 0,
        volume: this.editedItem.volume,
        position: this.editedItem.position,
      };
      try {
        this.enableLoading();
        await addDoc(collection(db, "transaction"), objectNew);
        this.close();
        this.disableLoading();
      } catch (error) {
        console.log(error);
      }
    },
    deleteItem(item) {
      this.idDelete = item;
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      const key = this.idDelete;
      try {
        const dbRef = doc(db, "transaction", key);
        await this.$store.dispatch("enableLoading");
        await deleteDoc(dbRef);
        await this.$store.dispatch("disableLoading");
        await this.closeDelete();
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    closeOrder(key, obj) {
      obj = { status: false };
      this.updateData(key, obj);
    },

    async updateData(key, obj) {
      try {
        this.enableLoading();
        const dbRef = doc(db, "transaction", key);
        await updateDoc(dbRef, obj);
        this.disableLoading();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
