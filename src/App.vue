<template>
  <v-app>
    <v-main>
      <c-loading></c-loading>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import CLoading from "./components/CLoading.vue"
</script>
<style scoped>
.v-toolbar__content {
  direction: rtl !important ;
}
.v-main {
  direction: rtl !important ;
}
v-main {
  direction: rtl !important ;
}
.v-application {
  direction: rtl !important;
}
</style>
