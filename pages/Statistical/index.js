/* eslint-disable */
import { generateData } from "@/plugins/caculate";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Timestamp } from "@firebase/firestore";
import db from "../../plugins/firebase";

export default {
  components: {},

  data: () => ({
    // list: [
    //   {
    //     position: false,
    //     coin: "SUSHI",
    //     stop_loss: 1.031,
    //     volume: "700",
    //     date_start: {
    //       seconds: 1671287453,
    //       nanoseconds: 813000000,
    //     },
    //     status: false,
    //     market: "1.013",
    //     entry: 1.014,
    //     take_profit: "0.963",
    //   },
    //   {
    //     date_start: {
    //       seconds: 1671494849,
    //       nanoseconds: 670000000,
    //     },
    //     coin: "LINK",
    //     market: "5.959",
    //     status: false,
    //     position: false,
    //     take_profit: 5.959,
    //     entry: 6.078,
    //     stop_loss: 6.14,
    //     volume: 1000,
    //   },
    //   {
    //     position: true,
    //     volume: 1100,
    //     status: false,
    //     coin: "ATA",
    //     market: "0.1171",
    //     date_start: {
    //       seconds: 1671063028,
    //       nanoseconds: 102000000,
    //     },
    //     entry: 0.1148,
    //     take_profit: 0.1171,
    //     stop_loss: 0.1137,
    //   },
    //   {
    //     status: false,
    //     coin: "ATOM",
    //     date_start: {
    //       seconds: 1671239706,
    //       nanoseconds: 260000000,
    //     },
    //     market: "8.503",
    //     take_profit: 8.503,
    //     volume: 1100,
    //     position: false,
    //     stop_loss: 8.754,
    //     entry: 8.671,
    //   },
    //   {
    //     market: "0.15815",
    //     position: true,
    //     stop_loss: 0.14242,
    //     coin: "OCEAN",
    //     volume: 350,
    //     status: false,
    //     take_profit: 0.15815,
    //     date_start: {
    //       seconds: 1671367397,
    //       nanoseconds: 488000000,
    //     },
    //     entry: 0.14702,
    //   },
    //   {
    //     coin: "ATA",
    //     volume: 1700,
    //     entry: 0.1125,
    //     stop_loss: 0.1132,
    //     position: "SHORT",
    //     take_profit: 0.1105,
    //     status: false,
    //     date_start: {
    //       seconds: 1671148808,
    //       nanoseconds: 954000000,
    //     },
    //     market: "00.1132",
    //   },
    //   {
    //     stop_loss: 1.101,
    //     status: false,
    //     take_profit: 1.021,
    //     position: false,
    //     market: "1.021",
    //     date_start: {
    //       seconds: 1671205468,
    //       nanoseconds: 252000000,
    //     },
    //     coin: "SUSHI",
    //     entry: 1.084,
    //     volume: 700,
    //   },
    //   {
    //     entry: 0.9717,
    //     status: true,
    //     market: null,
    //     take_profit: 0.931,
    //     date_start: {
    //       seconds: 1671581095,
    //       nanoseconds: 583000000,
    //     },
    //     position: false,
    //     coin: "OP",
    //     stop_loss: 0.9918,
    //     volume: 500,
    //   },
    //   {
    //     entry: 0.12235,
    //     position: true,
    //     market: "0.12131",
    //     volume: 1200,
    //     stop_loss: 0.12131,
    //     status: false,
    //     coin: "WOO",
    //     date_start: {
    //       seconds: 1671367397,
    //       nanoseconds: 488000000,
    //     },
    //     take_profit: 0.125,
    //   },
    //   {
    //     stop_loss: 1.0402,
    //     coin: "OP",
    //     market: 1.0402,
    //     entry: 1.0226,
    //     volume: 600,
    //     status: false,
    //     position: false,
    //     take_profit: 0.9903,
    //     date_start: {
    //       seconds: 1670896032,
    //       nanoseconds: 192000000,
    //     },
    //   },
    //   {
    //     volume: 800,
    //     market: "0.8183",
    //     stop_loss: 0.8183,
    //     date_start: {
    //       seconds: 1671282629,
    //       nanoseconds: 938000000,
    //     },
    //     status: false,
    //     take_profit: 0.785,
    //     coin: "MATIC",
    //     position: false,
    //     entry: "0.8075",
    //   },
    //   {
    //     market: "0.02313",
    //     position: false,
    //     take_profit: 0.02313,
    //     date_start: {
    //       seconds: 1670894548,
    //       nanoseconds: 622000000,
    //     },
    //     volume: 1800,
    //     entry: 0.02341,
    //     coin: "PEOPLE",
    //     stop_loss: 0.02355,
    //     status: false,
    //   },
    //   {
    //     coin: "LIT",
    //     stop_loss: 0.688,
    //     status: false,
    //     entry: "0.698",
    //     date_start: {
    //       seconds: 1671367397,
    //       nanoseconds: 488000000,
    //     },
    //     take_profit: 0.718,
    //     market: "0.718",
    //     volume: 1000,
    //     position: true,
    //   },
    //   {
    //     position: false,
    //     status: false,
    //     stop_loss: 1189.25,
    //     coin: "ETH",
    //     volume: 2500,
    //     date_start: {
    //       seconds: 1671408130,
    //       nanoseconds: 364000000,
    //     },
    //     take_profit: 1173.94,
    //     entry: 1184.2,
    //     market: "1189.25",
    //   },
    //   {
    //     date_start: {
    //       seconds: 1671276259,
    //       nanoseconds: 121000000,
    //     },
    //     take_profit: 3.304,
    //     entry: 3.456,
    //     volume: 550,
    //     market: "3.521",
    //     status: false,
    //     position: false,
    //     coin: "APE",
    //     stop_loss: 3.521,
    //   },
    //   {
    //     entry: 76.43,
    //     date_start: {
    //       seconds: 1670896032,
    //       nanoseconds: 192000000,
    //     },
    //     position: false,
    //     volume: 1500,
    //     take_profit: 75.25,
    //     stop_loss: 76.98,
    //     market: "76.98",
    //     coin: "LTC",
    //     status: false,
    //   },
    //   {
    //     entry: 6.873,
    //     coin: "LINK",
    //     market: "6.763",
    //     stop_loss: 6.923,
    //     take_profit: 6.763,
    //     status: false,
    //     volume: 1400,
    //     date_start: {
    //       seconds: 1670894918,
    //       nanoseconds: 825000000,
    //     },
    //     position: false,
    //   },
    //   {
    //     volume: 600,
    //     coin: "WOO",
    //     stop_loss: 0.12897,
    //     take_profit: 0.1219,
    //     market: "0.1219",
    //     status: false,
    //     date_start: {
    //       seconds: 1671272060,
    //       nanoseconds: 132000000,
    //     },
    //     entry: 0.12648,
    //     position: false,
    //   },
    //   {
    //     stop_loss: 12.108,
    //     market: "11.64",
    //     date_start: {
    //       seconds: 1671494849,
    //       nanoseconds: 670000000,
    //     },
    //     take_profit: 11.64,
    //     entry: 11.954,
    //     status: false,
    //     position: false,
    //     volume: 800,
    //     coin: "AVAX",
    //   },
    //   {
    //     stop_loss: 1.119,
    //     market: "1.119",
    //     entry: 1.133,
    //     take_profit: 1.173,
    //     status: false,
    //     date_start: {
    //       seconds: 1670896032,
    //       nanoseconds: 192000000,
    //     },
    //     position: true,
    //     volume: 850,
    //     coin: "SUSHI",
    //   },
    //   {
    //     entry: 0.77,
    //     position: true,
    //     volume: 800,
    //     coin: "LIT",
    //     stop_loss: 0.76,
    //     market: "0.76",
    //     take_profit: 0.79,
    //     status: false,
    //     date_start: {
    //       seconds: 1670896032,
    //       nanoseconds: 192000000,
    //     },
    //   },
    //   {
    //     volume: 3000,
    //     date_start: {
    //       seconds: 1670896032,
    //       nanoseconds: 192000000,
    //     },
    //     position: false,
    //     coin: "XRP",
    //     market: 0.376,
    //     stop_loss: 0.376,
    //     entry: 0.3745,
    //     status: false,
    //     take_profit: 0.37,
    //   },
    //   {
    //     position: false,
    //     market: 6.703,
    //     entry: 6.938,
    //     date_start: {
    //       seconds: 1671062966,
    //       nanoseconds: 687000000,
    //     },
    //     status: false,
    //     stop_loss: 7.055,
    //     take_profit: 6.703,
    //     coin: "LINK",
    //     volume: 600,
    //   },
    //   {
    //     coin: "PEOPLE",
    //     volume: 700,
    //     market: "0.0208",
    //     position: false,
    //     stop_loss: 0.0208,
    //     status: false,
    //     entry: 0.0205,
    //     date_start: {
    //       seconds: 1671271505,
    //       nanoseconds: 857000000,
    //     },
    //     take_profit: 0.01982,
    //   },
    //   {
    //     stop_loss: 0.0997,
    //     position: false,
    //     volume: 500,
    //     date_start: {
    //       seconds: 1671494849,
    //       nanoseconds: 670000000,
    //     },
    //     status: false,
    //     coin: "ATA",
    //     entry: 0.0976,
    //     take_profit: 0.0935,
    //     market: "0.0935",
    //   },
    //   {
    //     position: false,
    //     entry: 1.0907,
    //     stop_loss: 1.1111,
    //     date_start: {
    //       seconds: 1671187837,
    //       nanoseconds: 207000000,
    //     },
    //     volume: 600,
    //     market: "1.0379",
    //     status: false,
    //     take_profit: 1.0379,
    //     coin: "LDO",
    //   },
    //   {
    //     volume: 700,
    //     take_profit: 0.8854,
    //     entry: 0.9172,
    //     position: false,
    //     date_start: {
    //       seconds: 1671282658,
    //       nanoseconds: 963000000,
    //     },
    //     stop_loss: 0.9314,
    //     market: "0.9314",
    //     status: false,
    //     coin: "OP",
    //   },
    //   {
    //     market: "0.3439",
    //     coin: "XRP",
    //     status: false,
    //     take_profit: 0.3258,
    //     entry: 0.3383,
    //     stop_loss: 0.3439,
    //     volume: 650,
    //     position: false,
    //     date_start: {
    //       seconds: 1671494849,
    //       nanoseconds: 670000000,
    //     },
    //   },
    //   {
    //     entry: 1.609,
    //     position: true,
    //     market: "1.596\t",
    //     stop_loss: 1.596,
    //     status: false,
    //     volume: 1300,
    //     date_start: {
    //       seconds: 1671116711,
    //       nanoseconds: 198000000,
    //     },
    //     coin: "INJ",
    //     take_profit: 1.636,
    //   },
    //   {
    //     position: true,
    //     volume: 500,
    //     status: false,
    //     date_start: {
    //       seconds: 1668649632,
    //       nanoseconds: 225000000,
    //     },
    //     stop_loss: 0.02126,
    //     entry: 0.02171,
    //     market: "0.02126",
    //     take_profit: 0.02296,
    //     coin: "PEOPLE",
    //   },
    //   {
    //     volume: 600,
    //     stop_loss: 9.105,
    //     coin: "ATOM",
    //     take_profit: "8.633",
    //     date_start: {
    //       seconds: 1666224449,
    //       nanoseconds: 761000000,
    //     },
    //     entry: 8.948,
    //     position: false,
    //     market: 0,
    //     status: true,
    //   },
    // ],

    table: [],
    obj: {
      id: null,
      month: null,
      roe: 0,
      percentage: 0,
    },
  }),

  computed: {},

  created() {
    this.fetchData();
  },

  methods: {
    initData() {
      let total_roe = 0;
      let num_win = 0;
      let num_lose = 0;
      this.$store.dispatch("fetchData");
      let listArray = this.$store.state.desserts;
      const monthCurrent = new Date().getUTCMonth();
      const yearCurrent = new Date().getUTCFullYear();
      listArray.forEach((element) => {
        let datetime = element.date_start;
        let monthNumber = new Date(datetime).getUTCMonth();
        if (monthNumber === monthCurrent) {
          total_roe += element.roe;
          if (element.roe > 0) {
            num_win += 1;
          } else {
            num_lose += 1;
          }
        }
      });

      this.obj.id = `${monthCurrent}_${yearCurrent}`;
      this.obj.month = `${monthCurrent}-${yearCurrent}`;
      this.obj.roe = Number(total_roe);
      this.obj.percentage = `${num_win}/${num_lose}`;

      this.handle();
    },

    async handle() {
      try {
        console.log(this.obj.jd);
        await this.$store.dispatch("enableLoading");
        await setDoc(doc(db, "statistical", this.obj.id), this.obj);
        await this.$store.dispatch("fetchData");
        await this.$store.dispatch("disableLoading");
      } catch (error) {
        console.log(error);
      }
    },

    async fetchData() {
      try {
        let arr = [];
        const querySnapshot = await getDocs(collection(db, "statistical"));
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          arr.push(item);
        });
        // let newArr = arr.map((item) => {
        //   return (item.id = item.id.split("_"));
        // });
        console.log(newArr);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
