<script setup lang="ts">
const store = useAuthStore();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[100vh] w-full">
    <div class="card p-6 bg-gray-100 w-96 shadow-md rounded-xl">
      <div class="card-body">
        <h2 class="card-title text-3xl justify-center">Login</h2>
        <input v-model="store.username" type="text" placeholder="Username" class="border-1 m-2 border-solid" />
        <input v-model="store.password" type="password" placeholder="Password" class="border-1 m-2 border-solid" />
        <div class="card-actions justify-end">
          <button v-if="!store.authenticating" @click="store.authenticate" class="p-2 bg-gray-500 rounded-2xl text-white">Login</button>
          <span v-if="store.authenticating">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>