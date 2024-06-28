<template>
  <Header/>
  <Main/>
</template>

<script>

import Header from '@/views/cosIndex/Header.vue'
import Main from '@/views/cosIndex/Main.vue'

export default {
  name: "IndexView",
  components: { Main, Header }
}
</script>

<style scoped>

</style>
