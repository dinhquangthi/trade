<script src="./index.js"></script>

<template>
  <v-card>
    <div>
       <v-btn color="primary" @click="refreshData()" dark >
        True
        </v-btn>
      <div
        class="d-flex justify-space-between"
      >
        <div>
          <AddItem />
        </div>
        <div>
          <v-chip
            class="ma-2"
            label
            color="green"
            text-color="white"
            large
          >
            PNL:&nbsp;&nbsp;<span class="font-weight-bold">{{ pnl.toFixed(3) }} $</span>
          </v-chip>
        </div>
      </div>
      <v-divider />

      <v-data-table
        :headers="headers"
        :items="desserts"
        :sort-by="['status']"
        :sort-desc="true"
        :item-class="itemRowBackground"
        :itemsPerPage = 10
      >
        <template #item.position="{ item }">
          <v-chip
            label
            text-color="white"
            :color="item.position === true ? 'green' : 'red'"
          >
            {{ item.position === true ? 'LONG' : 'SHORT' }}
          </v-chip>
        </template>
        <template #item.status="{ item }">
          <v-chip
            :text-color="item.status === true ? 'white' : ''"
            :color="item.status === true ? 'primary' : ''"
          >
            {{ item.status === true ? "Open" : "Close" }}
          </v-chip>
        </template>
        <template #item.win="{ item }">
          <div class="font-weight-bold green--text">
            {{ item.win }}
          </div>
        </template>
        <template #item.lose="{ item }">
          <div class="font-weight-bold red--text">
            {{ (item.lose) }}
          </div>
        </template>
        <template #item.roe="{ item }">
          <div :class=" (item.roe < 0) ? 'font-weight-bold red--text' : 'font-weight-bold red--text green--text' ">
            {{ item.roe }}
          </div>
        </template>
        <template #top>
          <v-dialog v-model="dialog" max-width="800px">
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
                          {{ caculated.lose }}
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
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="closeDelete">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()">
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template #item.actions="{ item }">
          <v-icon v-if="item.status" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon v-if="item.status" @click="closeOrder(item.id)">
            mdi-close-octagon
          </v-icon>
          <v-icon class="mx-2" @click="deleteItem(item.id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<style lang="scss" src="./index.scss">
