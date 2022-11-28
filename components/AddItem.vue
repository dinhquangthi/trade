<template>
  <v-row class="my-4">
    <v-dialog v-model="dialog" max-width="800px">
      <template #activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          New Item
        </v-btn>
      </template>
      <v-card>
        <v-form>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="defaultItem.coin" label="Coin" />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    v-model="defaultItem.position"
                    :items="items"
                    label="Position"
                  />
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
                    {{ calcRate }}
                  </p>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  WIN
                  <p class="font-weight-bold green--text">
                    {{ calcWin }}
                  </p>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  LOSE
                  <p class="font-weight-bold red--text">
                    {{ calcLose }}
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="addNewItem">
              Add
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
/* eslint-disable */
import {
  collection,
  addDoc,
} from "firebase/firestore";
import db from "../plugins/firebase";
export default {
  data: () => ({
    dialog: false,
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
    items: ["LONG", "SHORT"],
  }),
  computed: {
    calcWin() {
      let win = 0;
      win = Math.abs(
        ((this.defaultItem.entry - this.defaultItem.take_profit) /
          this.defaultItem.entry) *
          this.defaultItem.volume
      );
      return Math.floor(win);
    },
    calcLose() {
      let lose = 0;
      lose = -Math.abs(
        ((this.defaultItem.entry - this.defaultItem.stop_loss) /
          this.defaultItem.entry) *
          this.defaultItem.volume
      );
      return Math.floor(lose);
    },
    calcRate() {
      let rate = 0;
      rate = Math.abs(this.calcWin / this.calcLose);
      return rate.toFixed(2);
    },
  },
  methods: {
    close() {
      this.dialog = false;
    },
    async addNewItem() {
      const objectNew = {
        coin: this.defaultItem.coin,
        status: true,
        date_start: this.defaultItem.date_start,
        entry: this.defaultItem.entry,
        take_profit: this.defaultItem.take_profit,
        stop_loss: this.defaultItem.stop_loss,
        market: this.defaultItem.market ? this.defaultItem.market : 0,
        volume: this.defaultItem.volume,
        position: this.defaultItem.position,
      };
      try {
        await this.$store.dispatch("enableLoading");
        await addDoc(collection(db, "transaction"), objectNew);
        await this.close();
        await this.$store.dispatch("disableLoading");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang=""></style>
