<template>
  <h1>ویرایش کاربر</h1>
  <hr />
  <div>
    <v-form @submit.prevent="editUser" ref="form" v-model="isValid">
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
            :rules="fullNameRules"
            required
            v-model="fullName"
            label="نام و نام خانوادگی"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="1" class="pb-0">
          <v-switch
            v-model="role"
            color="primary"
            label="ادمین"
            :value="1"
            hide-details
          ></v-switch>
        </v-col>
        <v-col cols="12" md="7" class="pb-0">
          <v-switch
            v-model="role"
            color="primary"
            label="کاربر"
            :value="0"
            
            hide-details
          ></v-switch>
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
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const store = useStore();

const isValid = ref(true);
const form = ref(null);
const fullName = ref("");
const role = ref("");
const userId = ref(0);

const fullNameRules = [(v) => !!v || "نام و نام خانوادگی خود را وارد کنید"];

function editUser() {
  form.value.validate().then((res) => {
    if (res.valid === true) {
      console.log(fullName.value);
      console.log(role.value);
      store.dispatch("editUser", {
          fullName: fullName.value,
          role: role.value,
          userId: userId.value,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("عملیات با موفقیت انجام شد");
            router.push("/admin/users");
          }
        })
        .catch((err) => {
          toast.error("مشکلی رخ داده");
        });
    }
  });
}

// When mounted relationship
onMounted(async () => {
  const userIdParam = router.currentRoute.value.params.id;
  if (userIdParam) {
    await store.dispatch("getUsersById", userIdParam);
    const user = store.state.userModules.singleUser;
    userId.value = userIdParam
    if (user.userName === undefined) {
      router.push("/admin/users");
      toast.error("کاربر وجود نداشت")
    }

    fullName.value = user.fullName;
    role.value = user.role;
  }else{
    router.push("/admin/users")
  }
});
</script>