<script setup lang="ts">
const store = useAuthStore()
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <button @click="store.logout" class="p-2 bg-gray-500 rounded-2xl text-white">Logout</button>
  </div>
</template>

<style lang="css" scoped>

</style>