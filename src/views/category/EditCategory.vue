<template>
  <div>
    <h1>ویرایش دسته بندی</h1>
  <hr />
  <v-form @submit.prevent="editCategories" ref="form" v-model="isValid">
    <v-row>
      <v-col cols="12" md="6" class="pb-0">
        <v-text-field :rules="titleRule" required v-model="title" label="title">
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :rules="metaTagRule"
          required
          v-model="metaTag"
          label="slug"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :rules="metaDescriptionRule"
          required
          v-model="metaDescription"
          label="metaTag"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :rules="slugRule"
          required
          v-model="slug"
          label="metaDescription"
        ></v-text-field>
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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {useToast} from "vue-toastification";

const toast = useToast();
const router = useRouter();
const store = useStore();

const form = ref(null);
const isValid = ref(true);

const title = ref("");
const slug = ref("");
const metaTag = ref("");
const metaDescription = ref("");

// Rule Validate
const titleRule = [(v) => !!v || "عنوان را وارد کنید"];
const slugRule = [(v) => !!v || "slug را وارد کنید"];
const metaTagRule = [(v) => !!v || "metaTag را وارد کنید"];
const metaDescriptionRule = [(v) => !!v || "metaDescription را وارد کنید"];

// update edit category
async function editCategories() {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("خطا");
    return;
  }
  let id = router.currentRoute.value.params.id;

  store
    .dispatch("editCategories", {
      title: title.value,
      slug: slug.value,
      metaTag: metaTag.value,
      metaDescription: metaDescription.value,
      id,
    })
    .then((res) => {
      if (res.status === 200) {
        toast.success("عملیات با موفقیت انجام شد")
        router.push("/admin/categories");
      }
    })
    .catch((err) => {
      if(err.response.data){
        toast.error(err)
      }
      else{
      toast.error("خطا دسته بندی");
      }
      toast.error("مشکلی رخ داده")
    });

  onMounted(() => {
    let id = router.currentRoute.value.params.id;

    store.dispatch("getCategoryById" , id).then(res => {
      if (res.status === 200) {
      title.value = res.data.title;
      slug.value = res.data.slug;
      metaTag.value = res.data.metaTag;
      metaDescription.value = res.data.metaDescription;
    } else {
      toast.error("خطا دسته بندی");
    }
    })
  })
}
</script>

<style>
</style>