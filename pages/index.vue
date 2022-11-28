<script src="./index.js"></script>

<template>
  <div>
    <TimeLine />
    <AddItem />
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="date_start"
      :item-class="itemRowBackground"
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
          {{ item.lose }}
        </div>
      </template>
      <template #top>
        <v-dialog v-model="dialog" max-width="800px">
          <EditItem />
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
        <v-icon class="mx-2" @click="deleteItem(item.id)">
          mdi-delete
        </v-icon>
        <v-icon v-if="item.status" @click="closeOrder(item.id)">
          mdi-close-octagon
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<style lang="scss" src="./index.scss">
