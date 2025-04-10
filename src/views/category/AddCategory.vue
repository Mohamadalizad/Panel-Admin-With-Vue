<template>
  <div>
    <h1>افزودن کاربر جدید</h1>
  <hr />
  <v-form @submit.prevent="addCategories" ref="form" v-model="isValid">
    <v-row>
      <v-col cols="12" md="6" class="pb-0">
        <v-text-field
          :rules="titleRule"
          required
          v-model="title"
          label="title"
        >
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
import { computed, ref } from "vue";
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

// Rule validate
const titleRule = [(v) => !!v || "عنوان را وارد کنید"]
const slugRule = [(v) => !!v || "slug را وارد کنید"]
const metaTagRule = [(v) => !!v || "metaTag را وارد کنید"]
const metaDescriptionRule = [(v) => !!v || "metaDescription را وارد کنید"]

// creat category function
async function addCategories() {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("in valid");
    return;
  }
  let parentId = router.currentRoute.value.query.parentId;
  if (parentId === undefined || !parentId) {
    parentId = 0;
  }
  store
    .dispatch("addCategories", {
      title: title.value,
      slug: slug.value,
      metaTag: metaTag.value,
      metaDescription: metaDescription.value,
      parentId
    })
    .then((res) => {
      if (res.status === 200) {
        toast.success("عملیات با موفقیت انجام شد")
        router.push("/admin/categories");
      }
    })
    .catch((err) => {
      toast.error("مشکلی رخ داده")
    });
}
</script>

<style>
</style>