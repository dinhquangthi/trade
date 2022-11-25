<script src="./index.js"></script>

<template>
  <div>
    <TimeLine />
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template #item.position="{ item }">
        <v-chip label text-color="white" :color="(item.status === true) ? 'green' : 'red'">
          {{ (item.position === true) ? "LONG" : "SHORT" }}
        </v-chip>
      </template>
      <template #item.status="{ item }">
        <v-chip text-color="white" :color="(item.status === true) ? 'primary' : ''">
          {{ (item.status === true) ? "Open" : "Close" }}
        </v-chip>
      </template>
      <template #item.win="{ item }">
        <body-1 class="font-weight-bold green--text ">
          {{ item.win }}
        </body-1>
      </template>
      <template #item.lose="{ item }">
        <body-1 class="font-weight-bold red--text ">
          {{ item.lose }}
        </body-1>
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

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="defaultItem.coin" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="defaultItem.position" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="defaultItem.entry" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="defaultItem.take_profit" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="defaultItem.stop_loss" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="defaultItem.market" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="defaultItem.rate" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
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
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
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
