<script setup>
import Header from '@/views/cosIndex/Header.vue'
import UserHead from '@/views/cosIndex/UserHead.vue'
import BookBody from '@/views/Books/BookBody.vue'

</script>

<template>
  <UserHead v-if="$route.params.username != null"/>
  <Header v-else-if="$route.params.username == null"/>
  <BookBody/>
</template>

<style scoped>

</style>
