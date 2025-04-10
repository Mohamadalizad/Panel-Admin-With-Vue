<template>
  <h1>
    جست جو:
    <small v-if="filter.title">{{ filter.title }}</small>
  </h1>
  <div>
    <div v-if="loading===false">
    <v-row  v-if="postFilterData.entityCount>0">
      <v-col
        cols="12"
        md="4"
        v-for="item in postFilterData.posts"
        :key="item.postId"
      >
        <post-card :post="item"></post-card>
      </v-col>
    </v-row>
      <v-alert v-else color="error" class="text-center text-white">جستجو مورد نظر یافت نشد</v-alert>
        <v-pagination
      v-if="postFilterData.pageCount>1"
      v-model="filter.pageId"
      :total-visible="7"
      :length="postFilterData.pageCount"
      next-icon="mdi-chevron-left"
      prev-icon="mdi-chevron-right"
      class="my-4"
    ></v-pagination>
    </div>
    <div v-else class="text-center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { getPostByFilter } from "@/Services/PostService";
import postCard from "@/components/PostCard.vue";
import { useRouter } from "vue-router";

const loading = ref(true)
const router = useRouter();

// get field from api information
const filter = reactive({ pageId: 1, take: 10, title: "" });
const postFilterData = ref({});

// first watch mounted search with query
watchEffect(() => {
  filter.title = router.currentRoute.value.query.q;
  filter.categorySlug = router.currentRoute.value.query.categorySlug;
  filterPost()
});

onMounted(() => {
  filterPost()
});

// loading in filterPost function
function filterPost(){
    loading.value = true
    getPostByFilter(filter).then((res) => {
    if (res.status == 200) {
      postFilterData.value = res.data;
    }
  }).finally(() => {
    loading.value = false
  })
}
</script>

<style>
</style>