<template>
   <v-card>
            <v-img
              :src="`${PostImageUrl}${props.post.imageName}`"
              style="width:100%;"              
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
            </v-img>

            <v-card-actions style="display:block; padding:1.5rem; 0">
              <v-spacer></v-spacer>

              <v-card-title> 
                <h3>{{ props.post.title }}</h3> <small>{{ props.post.category.title }}</small>
                <v-btn class="btn-show-more" variant="outlined" @click="$router.push(`/post/${props.post.slug}`)">ادامه مطلب</v-btn>
              </v-card-title>

            </v-card-actions>
          </v-card>
</template>

<script setup>
import { PostImageUrl } from '../utilities/imagUrls';
import { defineProps } from 'vue';
 
const props = defineProps({
    post:{
        type:Object,
    }
})


console.log(props);

</script>
<style scoped>
.btn-show-more{
  float: left;
}
</style>