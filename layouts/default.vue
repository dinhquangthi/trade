<template>
  <v-app>
    <v-overlay :z-index="zIndex" :value="$store.state.overlay">
      <v-progress-circular :size="70" :width="7" color="amber" indeterminate />
    </v-overlay>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    zIndex: 999
  })
}
</script>
