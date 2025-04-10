<template>
  <div>
    <div>
      <v-form @submit="sendComment" ref="form">
        <v-textarea
          v-model="commentText"
          solo
          required
          :rules="commentRule"
          label="نظر خود را وارد کنید"
        ></v-textarea>
        <c-submit>ثبت نظر</c-submit>
        <br />
        <br />
      </v-form>
    </div>
    <div v-if="comments.length >= 1">
      <div class="pa-2 elevation-2" v-for="item in comments" :key="item.postId">
        <h4>
          {{ item.userFullName }}
          <small>{{ new Date(item.creationDate).toLocaleDateString('fa-IR') }}</small>
        </h4>
        <p class="pr-4 text-pre-wrap">{{ item.text }}</p>
      </div>
    </div>
    <v-alert border v-else> برای این مقاله نظری ثبت نشده است </v-alert>
  </div>
</template>

<script setup>
import CSubmit from "@/components/CSubmit.vue";
import {
  getComments,
  addComments,
  deleteComments,
} from "@/Services/CommentService";
import { onMounted, toRef, ref } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

const store = useStore()
const toast = useToast()

const form = ref(null)
// Use prop
const props = defineProps(["postId"]);
const postId = toRef(props, "postId");
const comments = ref([]);
// Rule Validate
const commentRule = [(v) => !!v || "متن نظر خود را وارد کنید"];
const commentText = ref("")

const sendComment = async () => {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("خطایی رخ داده");
    return;
  }}

  store.commit("setLoading", true);

  // add comment and get in touch with server(api)
  addComments({text:commentText.value , postId:postId.value , userId: 1}).then(res => {
    if(res.status === 200){
        toast.success("عملیات با موفقیت انجام شد")
        getPostComment();
    }else{
        toast.error("عملیات نا موفق")
    }
  }).finally(f => {
      store.commit("setLoading", false);
  })
// get post comment function
const getPostComment = () => {
    getComments(postId.value).then((res) => {
    if (res.status === 200) {
      comments.value = res.data;
    }
  });
}

onMounted(() => {
getPostComment();
});
</script>