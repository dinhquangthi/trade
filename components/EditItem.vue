<template>
  <div>
    <v-card>
      <v-form>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.coin" label="Coin" />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="editedItem.position"
                  :items="items"
                  label="Position"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="2">
                <v-text-field v-model="editedItem.volume" label="Volume" />
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field v-model="editedItem.entry" label="Entry" />
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  v-model="editedItem.take_profit"
                  label="Take Profit"
                />
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  v-model="editedItem.stop_loss"
                  label="Stop Loss"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.market" label="Market" />
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
          <v-btn color="blue darken-1" text @click="saveItem">
            Add
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */

import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../plugins/firebase";

export default {
  props: ['data'],
  data: () => ({
    dialog: false,
    items: ["LONG", "SHORT"],
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
  methods: {
    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
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

  },
};
</script>
<style lang=""></style>
