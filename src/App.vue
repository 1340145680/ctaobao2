<template>
  <router-view />
</template>
<script setup>
import main from "@pinia";
onMounted(() => {
  let url = localStorage.getItem("url");
  if (!url) {
    localStorage.setItem("url", "http://localhost:810");
  }
  main().io();
});
</script>
