<script src="./index.js"></script>

<template>
  <div>
    <div class="head px-2 d-flex">
      <v-btn class="mb-2 ml-auto" color="warning" dark @click="initData()">
        Update Data
      </v-btn>
    </div>
    <v-container fluid>
      <v-card>
        <v-simple-table>
          <template #default>
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
                <td class="font-weight-bold">
                  {{ item.numWin }}/{{ item.numLose }}
                  <span class="mx-2 caption font-weight-bold">
                    (
                    {{
                      Number(
                        ((item.numWin - item.numLose) /
                          (item.numWin + item.numLose)) *
                          100
                      ).toFixed(2)
                    }}
                    )
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
  </div>
</template>
