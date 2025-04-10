<template>
  <h1>مدیریت پست ها</h1>
  <hr />
  <v-btn @click="$router.push({ name: 'addPost' })" color="success"
    >افزودن پست</v-btn
  >
  <br />

  <hr />
  <v-form @submit.prevent="filterPosts" class="elevation-7 py-4 px-4 my-4">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field required v-model="filter.title" label="عنوان">
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="number"
          required
          v-model="filter.take"
          label="تعداد  نمایش در صفحه"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn type="button" color="info">فیلتر</v-btn>
      </v-col>
    </v-row>
  </v-form>

  <div>
    <v-table class="elevation-2 mt-4" style="height: 400px; overflow: scroll">
      <thead>
        <tr>
          <th>عکس</th>
          <th>عنوان</th>
          <th>slug</th>
          <th>نویسنده</th>
          <th>عملیات</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in postsFilter.posts" :key="index">
          <td>
            <img
              :src="`${PostImageUrl}${item.imageName}`"
              style="max-width: 200px"
            />
          </td>
          <td v-text="item.title"></td>
          <td v-text="item.slug"></td>
          <td v-text="item.userFullName"></td>
          <td>
            <v-btn
              @click="router.push(`posts/edit/${item.postId}`)"
              color="info"
              >ویرایش</v-btn
            >
            <v-btn @click="deletePost(item.postId)" class="mr-1" color="error"
              >حذف</v-btn
            >
          </td>
        </tr>
        <tr>
          <td colspan="4" v-if="postsFilter.entityCount === 0">
            هیچ کاربری وجود ندارد!
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-if="postsFilter && postsFilter?.pageCount > 1"
      v-model="filter.pageId"
      :total-visible="7"
      :length="postsFilter.pageCount"
      next-icon="mdi-chevron-left"
      prev-icon="mdi-chevron-right"
      class="my-4"
    ></v-pagination>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { useStore } from "vuex";
import { computed, onMounted, reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import { PostImageUrl } from "@/utilities/imagUrls";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const store = useStore();
const filter = reactive({ pageId: 1, take: 1, title: "" })

watch (() => filter.pageId ,
() => { store.dispatch("getPostByFilter", filter) } 
)

const postsFilter = computed(() => store.state.postModule.postsFilter);

const deletePost = (postId) => {
  Swal.fire({
    title: "آیا از حذف خود اطمینان دارید",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله , حذفش کن",
    cancelButtonText: "نه , بیخیال",
  }).then((result) => {
    if (result.isConfirmed) {
      store
        .dispatch("deletePost", postId)
        .then((res) => {
          if (res.status === 200) {
            toast.error("حذف شد");
            store.dispatch("getPostByFilter", filter);
          }
        })
        .catch((err) => {
          if (err.response.data) {
            toast.error(err.response.data);
          } else {
            toast.error("خطا دسته بندی");
          }
        });
    }
  });
};
function filterPosts(){
  filter.pageId=1;
  store.dispatch("getPostByFilter", filter);
}
onMounted(() => {
  store.dispatch("getPostByFilter", filter);
});
</script>

<style>
</style>