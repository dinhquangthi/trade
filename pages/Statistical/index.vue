<script src="./index.js"></script>

<template>
  <div>
    <div class="head px-2 d-flex">
      <v-btn @click="initData()" class="mb-2 ml-auto" color="warning" dark>
        Update Data
      </v-btn>
    </div>
    <v-container fluid>
      <v-card>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Month</th>
                <th class="text-left">ROE</th>
                <th class="text-left">WIN/LOSE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in table" :key="item.name">
                <td>{{ item.month }}</td>
                <td class="green--text font-weight-bold">{{ item.roe }} $</td>
                <td class="font-weight-bold">{{ item.percentage }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
  </div>
</template>
