<template>
  <div class="page-container">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "./styles/base.scss";

.page-container {
  text-align: center;
}
</style>
