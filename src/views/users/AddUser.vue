<template>
  <h1>افزودن کاربر جدید</h1>
  <hr />
  <v-form @submit.prevent="addUser" ref="form" v-model="isValid">
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-text-field
          :rules="fullNameRules"
          required
          v-model="fullName"
          label="نام و نام خانوادگی"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" class="pt-0" md="6">
        <v-text-field
          :rules="userNameRules"
          required
          v-model="userName"
          label="نام کاربری"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="pt-0" md="6">
        <v-text-field
          :rules="PasswordRules"
          required
          v-model="password"
          label="پسوورد"
        ></v-text-field>
      </v-col>
      <v-col>
        <c-submit></c-submit>
      </v-col>
    </v-row>
    
  </v-form>
</template>

<script setup>
import CSubmit from "@/components/CSubmit.vue"
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {useToast} from "vue-toastification";

const toast = useToast();
const router = useRouter();
const store = useStore();
const isValid = ref(true);
const form = ref(null);
const fullName = ref("");
const userName = ref("");
const password = ref("");

// Rule Validate
const fullNameRules = [(v) => !!v || "نام و نام خانوادگی خود را وارد کنید"];
const userNameRules = [(v) => !!v || "نام کاربری خود را وارد کنید"];
const PasswordRules = [
  (v) => !!v || "پسوورد خود را وارد کنید",
  (v) => v.length > 7 || "پسوورد باید بیشتر از 7 کاراکتر باشد",
];

// add User function
function addUser() {
  form.value.validate().then((res) => {
    if (res.valid === true) {
      store.dispatch("addUser" , {
        fullName: fullName.value,
        userName: userName.value,
        password: password.value
      }).then(res=>{
        if(res.status === 200){
          toast.success("عملیات با موفقیت انجام شد")
          router.push("/admin/users")
        }
      }).catch(err=>{
        toast.error("مشکلی رخ داده")
      })
    }
  });
}

</script>

<style>
</style>