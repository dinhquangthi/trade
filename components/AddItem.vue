<template>
  <div class="ma-2">
    <v-dialog v-model="dialog" max-width="800px">
      <template #activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> New Item </v-btn>
      </template>
      <v-card>
        <v-form>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :keydown="uppercase()"
                    v-model="defaultItem.coin"
                    label="Coin"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    v-model="defaultItem.position"
                    :items="items"
                    label="Position"
                  />
                  <v-alert v-show="checkRequire" dense outlined type="error">
                    Require
                  </v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="defaultItem.volume" label="Volume" />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="defaultItem.entry" label="Entry" />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field
                    v-model="defaultItem.take_profit"
                    label="Take Profit"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field
                    v-model="defaultItem.stop_loss"
                    label="Stop Loss"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="defaultItem.market" label="Market" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  R/R
                  <p class="font-weight-bold">
                    {{ caculated.rate }}
                  </p>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  WIN
                  <p class="font-weight-bold green--text">
                    {{ caculated.win }}
                  </p>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  LOSE
                  <p class="font-weight-bold red--text">
                    {{ -caculated.lose }}
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="addNewItem"> Add </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import { collection, addDoc } from "firebase/firestore";
import db from "../plugins/firebase";
export default {
  data: () => ({
    dialog: false,
    errorSelect: false,
    defaultItem: {
      coin: null,
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
      status: "",
      date_start: new Date(),
      total: null,
    },
    items: [
      {
        text: "LONG",
        value: true,
      },
      {
        text: "SHORT",
        value: false,
      },
    ],
  }),
  computed: {
    caculated() {
      // position = true => LONG
      // position = false => SHORT

      let win, lose, roe;
      let vol = this.defaultItem.volume;
      let entry = this.defaultItem.entry;
      let tp = this.defaultItem.take_profit;
      let sl = this.defaultItem.stop_loss;
      let market = this.defaultItem.market;
      let position;

      if (this.defaultItem.position === "LONG") {
        position = true;
      } else {
        position = false;
      }

      if (!market || market === 0) {
        win = Math.abs(((entry - tp) / entry) * vol);
        lose = Math.abs(((entry - sl) / entry) * vol);
        roe = 0;
      } else {
        if (position === true) {
          win = Math.abs(((entry - tp) / entry) * vol);
          lose = ((sl - entry) / entry) * vol;
          roe = ((market - entry) / entry) * vol;
        } else {
          win = Math.abs(((entry - tp) / entry) * vol);
          lose = ((entry - sl) / entry) * vol;
          roe = ((entry - market) / entry) * vol;
        }
      }

      return {
        win: Number(win.toFixed(2)),
        lose: Number(lose.toFixed(2)),
        roe: Number(roe.toFixed(2)),
        rate: Number(Math.abs(win / lose).toFixed(2)),
      };
    },
    checkRequire() {
      if (this.defaultItem.position === null) {
        return (this.errorSelect = true);
      } else {
        return (this.errorSelect = false);
      }
    },
  },
  methods: {
    uppercase() {
      if (this.defaultItem.coin) {
        this.defaultItem.coin = this.defaultItem.coin.toUpperCase();
        console.log(this.defaultItem.coin);
      }
    },
    close() {
      this.dialog = false;
    },
    async addNewItem() {
      const objectNew = {
        coin: this.defaultItem.coin,
        status: true,
        date_start: this.defaultItem.date_start,
        entry: Number(this.defaultItem.entry),
        take_profit: Number(this.defaultItem.take_profit),
        stop_loss: Number(this.defaultItem.stop_loss),
        market: this.defaultItem.market
          ? Number(this.defaultItem.market)
          : null,
        volume: Number(this.defaultItem.volume),
        position: this.defaultItem.position,
      };
      try {
        if (this.defaultItem.position === null) {
          this.errorSelect = true;
        } else {
          this.errorSelect = false;
          await this.$store.dispatch("enableLoading");
          await addDoc(collection(db, "transaction"), objectNew);
          await this.close();
          await this.$store.dispatch("fetchData");
          await this.$store.dispatch("disableLoading");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang=""></style>
