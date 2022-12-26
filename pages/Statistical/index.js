/* eslint-disable */
import { generateData, convertMonth } from "@/plugins/caculate";
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
  layout: "default",
  components: {},

  data: () => ({
    table: [],
    obj: {
      id: null,
      month: null,
      roe: 0,
      percentage: 0,
    },
  }),

  computed: {},

  async created() {
    await this.$store.dispatch("fetchData");
    await this.createData();
  },
  fetch() {
    this.fetchData();
  },

  methods: {
    createData() {
      let total_roe = 0;
      let num_win = 0;
      let num_lose = 0;
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
      this.obj.id = `${yearCurrent}_${monthCurrent}`;
      this.obj.month = `${yearCurrent}-${monthCurrent}`;
      this.obj.roe = Number(total_roe).toFixed(2);
      this.obj.percentage = `${num_win}/${num_lose}`;
    },

    async fetchData() {
      try {
        let array = [];
        const querySnapshot = await getDocs(collection(db, "statistical"));
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          array.push(item);
        });
        this.table = array.map((item) => {
          return {
            ...item,
            id: convertMonth(item.id),
            month: convertMonth(item.month),
          };
        });
      } catch (error) {
        console.log(error);
      }
    },

    initData() {
      this.handle();
    },

    async handle() {
      try {
        await this.$store.dispatch("enableLoading");
        await setDoc(doc(db, "statistical", this.obj.id), this.obj);
        await this.fetchData();
        await this.$store.dispatch("disableLoading");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
