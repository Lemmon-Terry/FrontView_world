<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  methods: function () {
    console.log('APP被挂载完毕')
  }
}
</script>

<style>
#app {
}
</style>
