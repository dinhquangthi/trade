<script src="./index.js"></script>

<template>
  <div>
    <v-btn href="/" class="my-4" color="primary" dark> Home </v-btn>
    <v-btn @click="initData()" class="my-4" color="warning" dark>
      Update Data
    </v-btn>
    <v-container>
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
                <td>{{ item.roe }}</td>
                <td>{{ item.percentage }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
  </div>
</template>
