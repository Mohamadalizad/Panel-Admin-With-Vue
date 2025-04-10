<template>
  <div class="elevation-8 px-0 pt-0 pb-5 v-container" v-if="post.postId">
    <v-img
      :src="`${PostImageUrl}${post.imageName}`"
      style="width: 100%; max-height:500px;"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      cover
    >
    </v-img>
    <div class="px-4">
    <h1>{{ post.title }}</h1>
    <p style="white-space:pre-wrap;">{{ post.description }}</p>

    <hr>

    <comment-post :post-id="post.postId"></comment-post>
    </div>
  </div>
</template>

<script setup>
import { getPostBySlug } from "@/Services/PostService";
import { PostImageUrl } from "@/utilities/imagUrls"
import CommentPost from "./CommentPost.vue"
// import {Post} from "../../DTOs/Post"

import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

// const mainPost = new Post("mamad")
// console.log(mainPost);

const post = ref({});
const router = useRouter();
const store = useStore();

// When page mounted and relationship with server(api)
onMounted(() => {
  store.commit("setLoading", true);
  const slug = router.currentRoute.value.params.slug;
  getPostBySlug(slug)
    .then((res) => {
      if (res.status === 200) {
        post.value = res.data;
      } else {
        router.back();
      }
    })
    .catch(() => {
      router.back();
    })
    .finally(() => {
      store.commit("setLoading", false);
    });
});
</script>

<style scoped>
    .v-container{
        width: 60%;
    }
</style>
