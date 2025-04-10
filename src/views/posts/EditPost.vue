<template>
<div>
    <h1> ادیت پست </h1>
  <hr />
  <v-form @submit.prevent="editPost" ref="form">
    <v-row>
      <v-col cols="12" md="6" class="pb-0">
        <v-text-field
          :rules="titleRule"
          required
          v-model="postData.title"
          label="title"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :rules="slugRule"
          required
          v-model="postData.slug"
          label="slug"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-textarea
          solo
          :rules="descriptionRule"
          required
          v-model="postData.description"
          label="description"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <label>دسته بندی</label>
        <select v-model="postData.categoryId" class="custom-select">
          <option
            :key="item.id"
            :value="item.id"
            v-for="item in categories.filter((f) => f.parentId == 0)"
          >
            {{ item.title }}
          </option>
        </select>
      </v-col>
      <v-col cols="12" md="6">
        <label>زیر دسته بندی</label>
        <select v-model="postData.subCategoryId" class="custom-select">
          <option v-for="item in subCategories" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input
          v-model="files"
          accept="image/png, image/jpeg, image/bmp"
          show-size
          lable="picture post"
        ></v-file-input>
      </v-col>
      <v-col cols="12" md="6">
        <v-switch label="Switch" v-model="postData.isSpecial"></v-switch>
      </v-col>
      <v-col cols="12" md="6">
        <img  :src="`${PostImageUrl}${imageName}`" style="width:100%; height: 400px;" alt="img">
      </v-col>
      <v-col>
        <c-submit></c-submit>
      </v-col>
    </v-row>
  </v-form>
</div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { PostImageUrl } from "@/utilities/imagUrls"
import CSubmit from "@/components/CSubmit.vue";
import { computed, onMounted, reactive, watch, ref } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const postData = reactive({
  categoryId: 0,
  subCategoryId: 0,
  title: "",
  slug: "",
  description: "",
  isSpecial: false,
});
const titleRule = [(v) => !!v || "عنوان را وارد کنید"];
const slugRule = [(v) => !!v || "slug را وارد کنید"];
const descriptionRule = [(v) => !!v || "توضیحات را وارد کنید"];

const imageName = ref("");
const store = useStore();
const form = ref(null);
const usersFilter = computed(() => store.state.userModules.usersFilter);
const categories = computed(() => store.state.categoryModule.categories);
const subCategories = ref([]);
const files = ref([]);
watch(
  () => postData.categoryId,
  () => {
    subCategories.value = categories.value.filter(
      (f) => f.parentId == postData.categoryId
    );
  }
);
async function editPost() {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("خطایی رخ داده");
    return;
  }

  if (
    postData.categoryId <= 0 ||
    postData.subCategoryId <= 0
  ) {
    toast.error("خطایی رخ داده");
    return;
  }

  const formData = new FormData();
  formData.append("CategoryId", postData.categoryId.toString());
  formData.append("PostId", router.currentRoute.value.params.id);
  formData.append("SubCategoryId", postData.subCategoryId.toString());
  formData.append("Slug", postData.slug);
  formData.append("Title", postData.title);
  if(files.value.length > 0){
  formData.append("ImagFile", files.value[0]);
  }
  formData.append("Description", postData.description);
  formData.append("IsSpecial", postData.isSpecial.toString());

  store.dispatch("editPost" , formData).then(res => {
    if(res.status === 200){
      router.push("/admin/posts/")
      toast.success("عملیات با موفقیت انجام شد")
    }
  })
}

onMounted(() => {
  const postId = router.currentRoute.value.params.id;
  if(postId){
  store.dispatch("getPostById" , postId).then(res => {
    if(res.status == 200){
      postData.title = res.data.title
      postData.title = res.data.title
      postData.slug = res.data.slug
      postData.description = res.data.description
      postData.categoryId = res.data.categoryId
      postData.subCategoryId = res.data.subCategoryId
      postData.isSpecial = res.data.isSpecial
      postData.imageName = res.data.imageName
    }
  })
  store.dispatch("getCategories");
  }
else{
  router.push("/admin/posts")
}
});
</script>
<style scoped>
.custom-select {
  width: 100%;
  height: 50px;
  border-bottom: solid #808080a3 2px;
  background: #80808024;
  border-radius: 5px;
}
</style>