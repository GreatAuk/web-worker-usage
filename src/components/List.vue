<script lang="ts" setup>
const list = Array(1000).fill(null);
</script>

<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{ index }}
    </li>
  </ul>
</template>
