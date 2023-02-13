<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <ul>
    <li>
      <RouterLink to="/excel">导出 Excel</RouterLink>
    </li>
    <li>
      <RouterLink to="/inline_worker"
        >Inline web worker, don't need a js file</RouterLink
      >
    </li>
  </ul>
</template>
