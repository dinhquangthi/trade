/* eslint-disable */
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import db from "../../plugins/firebase";
import { convertMonth } from "@/plugins/caculate";

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
      numWin: null,
      numLose: null,
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
      let totalRoe = 0;
      const listArray = this.$store.state.desserts;
      const monthCurrent = new Date().getUTCMonth();
      const yearCurrent = new Date().getUTCFullYear();
      listArray.forEach((element) => {
        const datetime = element.date_start;
        const monthNumber = new Date(datetime).getMonth();
        if (monthNumber === monthCurrent) {
          totalRoe += element.roe;
          if (element.roe > 0) {
            this.obj.numWin += 1;
          } else {
            this.obj.numLose += 1;
          }
        }
      });
      this.obj.id = `${yearCurrent}_${monthCurrent}`;
      this.obj.month = `${yearCurrent}-${monthCurrent}`;
      this.obj.roe = Number(totalRoe).toFixed(2);
      this.obj.percentage = `${this.obj.numWin}/${this.obj.numLose}`;
      this.obj.numWin = this.obj.numWin;
      this.obj.numLose = this.obj.numLose;
    },

    async fetchData() {
      try {
        const array = [];
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
        console.log(this.obj);
        await setDoc(doc(db, "statistical", this.obj.id), this.obj);
        await this.fetchData();
        await this.$store.dispatch("disableLoading");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
