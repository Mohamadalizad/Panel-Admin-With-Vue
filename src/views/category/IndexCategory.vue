<template>
<div>
  <h1>دسته بندی ها</h1>
  <hr>
  <v-btn color="success" @click="$router.push({name : 'addCategory'})">
    <v-icon>
      mdi-plus
    </v-icon>
    افزودن دسته بندی</v-btn>
  <v-table class="mt-7 elevation-4"  style="height:500px;">
    <thead>
      <tr>
        <th>#</th>
        <th>عنوان</th>
        <th>slug</th>
        <th>عملیات</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in categories" :key="item.id">
        <th v-text="item.id"></th>
        <th>
          <span v-if="item.parentId != 0">{{ item.parentId }} - </span>
          <span>{{ item.title }}</span>
        </th>
        <th v-text="item.slug"></th>
        <td>
          <v-btn color="error" @click="deleteCategory(item.id)">حذف</v-btn>
          <v-btn color="info" class="mx-2" @click="$router.push({name:'editCategory', params:{id: item.id}})">ویرایش</v-btn>
          <v-btn color="primary" v-if="item.parentId===0" @click="$router.push({name:'addCategory', query:{parentId: item.id}})">افزوئن زیر دسته بندی</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Swal from 'sweetalert2'
import {useToast} from "vue-toastification";

const toast = useToast();
const store = useStore();
const categories = computed(()=>store.state.categoryModule.categories)

// delete category with swal alert
function deleteCategory(id){
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
    store.dispatch("deleteCategories" , id).then(res => {
      if(res.status === 200){
        toast.error("حذف شد")
        store.dispatch("getCategories")
      }
    }).catch(err => {
      if(err.response.data){
        toast.error(err.response.data)
      }
      else{
      toast.error("خطا دسته بندی");
      }
    })
  }
});
}

onMounted(()=>{
  store.dispatch("getCategories");
})
</script>

<style>

</style>