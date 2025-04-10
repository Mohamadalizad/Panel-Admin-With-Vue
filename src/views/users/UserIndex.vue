<template>
  <h1>لیست کاربران</h1>
  <hr>
  <v-btn @click="router.push({name:'addUser'})" color="success">افزودن کاربر</v-btn>
  <br>

<div style="overflow:scroll; height:500px;">
   <v-table class="elevation-2 mt-4">
    <thead>
      <tr>
        <th>نام کاربری</th>
        <th>نام و نام خانوادگی</th>
        <th>نقش</th>
        <th>عملیات</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in userFilter.users" :key="index">
        <td v-text="item.userName"></td>
        <td v-text="item.fullName"></td>
        <td>
          <span v-if="item.role===1">ادمین</span>
          <span v-if="item.role===0">کاربر</span>
        </td>
        <td>
          <v-btn @click="router.push(`users/edit/${item.userId}`)" color="info">ویرایش</v-btn>
        </td>
      </tr>
      <tr v-if="userFilter.entityCount===0">
        <td colspan="4" >هیچ کاربری وجود ندارد!</td>
      </tr>
    </tbody>
  </v-table>
      <v-pagination
      v-if="userFilter && userFilter?.pageCount > 1"
      v-model="pageId"
      :total-visible="7"
      :length="userFilter.pageCount"
      next-icon="mdi-chevron-left"
      prev-icon="mdi-chevron-right"
      class="my-4"
    ></v-pagination>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router"
import {useStore} from "vuex";
import {computed, onMounted , ref , watch} from 'vue';

const router = useRouter()
const store = useStore()

const userFilter = computed(() => store.state.userModules.usersFilter)
const pageId = ref(1);

watch (pageId, () => { store.dispatch("getUsers" , {take: 10, pageId: pageId.value}) })

onMounted(() => {
  store.dispatch("getUsers" , {take: 10, pageId: pageId.value})
})

</script>

<style>
hr {
  margin: 10px 0;
  border-color: #3c404024;
}
table td{
  text-align: center;
}
table th{
  text-align: center !important;
}
</style>