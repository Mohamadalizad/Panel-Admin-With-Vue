<template>
  <div class="loading" v-if="isLoading">
    <v-progress-linear
      color="red-accent-2"
      height="6"
      indeterminate
      rounded
    ></v-progress-linear>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore()

const isLoading = computed(()=> store.state.isLoading)
</script>

<style>
.loading{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10000;
    background: #00000060;
}
</style>