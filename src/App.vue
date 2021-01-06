<template>
  <div id="app">
    <APIRequest/>
  </div>
</template>

<script>
import APIRequest from './components/APIRequest.vue'

export default {
  name: 'App',
  components: {
    APIRequest
  }
}
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
