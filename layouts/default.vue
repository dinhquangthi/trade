<template>
  <v-app>
    <v-overlay :z-index="zIndex" :value="$store.state.overlay">
      <v-progress-circular :size="70" :width="7" color="amber" indeterminate />
    </v-overlay>
    <v-main>
      <v-container fluid>
        <div class="d-flex mb-4">
          <NuxtLink to="/" class="mx-4">
            <v-btn>Home </v-btn>
          </NuxtLink>
          <NuxtLink to="/statistical" class="mx-4">
            <v-btn>Statistical </v-btn>
          </NuxtLink>
        </div>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: "DefaultLayout",
  data: () => ({
    zIndex: 999,
  }),
};
</script>
