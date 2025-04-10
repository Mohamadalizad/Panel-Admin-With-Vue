<template>
  <h1>Admin</h1>
</template>

<script setup>
import axios from 'axios';

axios.get("https://codeyad.com/course/learn-nuxtjs-vuejs#comments").then(res =>{
  if(res.status===200){
    console.log(res.headers);
    console.log(res.data);
  }
}).catch(err => {
  console.log(err);
  console.log(err.res);
})
</script>

<style>

</style>