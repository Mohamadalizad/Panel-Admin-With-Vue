<template>
  <!-- <v-btn color="success" @click="$router.push({name : 'addCategory'})">    <v-icon>
      mdi-plus
    </v-icon>
    افزودن دسته بندی</v-btn> -->

  <v-btn type="submit" :disabled="isLoading" color="success" class="float-left">
    <slot>ثبت اطلاعات</slot>
  </v-btn>
</template> 
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isLoading = computed(() => store.state.isLoading);
</script>
