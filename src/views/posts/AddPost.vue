<template>
  <div>
    <h1>افزودن پست جدید</h1>
  <hr />
  <v-form @submit.prevent="addPost" ref="form" class="elevation-7 py-4 px-4 my-4">
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
        <label>نویسنده</label>
        <select v-model="postData.userId" class="custom-select">
          <option
            v-for="item in usersFilter?.users"
            :key="item.userId"
            :value="item.userId"
          >
            {{ item.fullName }}
          </option>
        </select>
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
          prepend-icon="mdi-camera"
        ></v-file-input>
      </v-col>
      <v-col cols="12" md="6">
        <v-switch label="آیا این پست ویژه است؟" color="primary" v-model="postData.isSpecial"></v-switch>
      </v-col>
      <v-col>
        <c-submit></c-submit>
      </v-col>
    </v-row>
  </v-form>
  </div>
</template>

<script setup>
import CSubmit from "@/components/CSubmit.vue";
import { computed, onMounted, reactive, watch, ref } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { useRouter } from "vue-router"
 
const toast = useToast();
const router = useRouter();

// add reactive object with many fields
const postData = reactive({
  userId: 0,
  categoryId: 0,
  subCategoryId: 0,
  title: "",
  slug: "",
  description: "",
  isSpecial: false,
});

// Rule Validate
const titleRule = [(v) => !!v || "عنوان را وارد کنید"];
const slugRule = [(v) => !!v || "slug را وارد کنید"];
const descriptionRule = [(v) => !!v || "توضیحات را وارد کنید"];

// connect to server(api)
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

// add post function
async function addPost() {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("خطایی رخ داده");
    return;
  }

  if (
    postData.userId <= 0 ||
    postData.categoryId <= 0 ||
    files.value.length === 0
  ) {
    toast.error("خطایی رخ داده");
    return;
  }
  
  // append field in server(api)
  const formData = new FormData();
  formData.append("UserId", postData.userId.toString());
  formData.append("CategoryId", postData.categoryId.toString());
  formData.append("SubCategoryId", postData.subCategoryId.toString());
  formData.append("Slug", postData.slug);
  formData.append("Title", postData.title);
  formData.append("Description", postData.description);
  formData.append("ImageFile", files.value[0]);
  formData.append("IsSpecial", postData.isSpecial.toString());

    await store.dispatch("addPost", formData)
        router.push("/admin/posts")
        toast.success("عمیات با موفقیت انجام شد")
    }
    //  store.dispatch("addPost", formData).then(res=>{
    //   if(res.status === 200){
    //     router.push("/admin/posts")
    //     toast.success("عمیات با موفقیت انجام شد")
    //     }
    //     })
    // }
onMounted(() => {
  store.dispatch("getUsers", { take: 100, pageId: 1 });
  store.dispatch("getCategories");
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