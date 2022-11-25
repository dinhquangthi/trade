<script src="./index.js"></script>

<template>
  <div>
    <TimeLine />
    <v-overlay :z-index="zIndex" :value="overlay">
      <v-progress-circular
        :size="70"
        :width="7"
        color="amber"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="date_start"
      class="elevation-1"
    >
      <template #item.position="{ item }">
        <v-chip
          label
          text-color="white"
          :color="item.position === 'LONG' ? 'green' : 'red'"
        >
          {{ item.position }}
        </v-chip>
      </template>
      <template #item.status="{ item }">
        <v-chip
          text-color="white"
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
          {{ item.lose }}
        </div>
      </template>
      <template #top>
        <v-toolbar flat>
          <v-dialog v-model="dialog" max-width="800px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

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
                        <v-text-field
                          v-model="defaultItem.volume"
                          label="Volume"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                        <v-text-field
                          v-model="defaultItem.entry"
                          label="Entry"
                        />
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
                        <v-text-field
                          v-model="defaultItem.market"
                          label="Market"
                        />
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
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
        </v-toolbar>
      </template>
      <template #item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <!-- <template #no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<style lang="scss" scoped src="./index.scss">
