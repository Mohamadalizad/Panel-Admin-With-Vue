<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" v-for="(item) in posts" :key="item.postId">
        <post-card :post="item"></post-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { GetPopularPosts } from "../Services/PostService";
import { ref, onMounted} from "vue";

import PostCard from "@/components/PostCard.vue";

const posts = ref([]);

  GetPopularPosts().then(res => {
    if (res.status === 200) {
      posts.value = res.data
    }
  })
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>