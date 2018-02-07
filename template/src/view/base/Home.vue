<template>
    <div class="home">
      <home-menu></home-menu>
      <home-list></home-list>
    </div>
</template>

<script type="text/babel">
  import { HomeList, HomeMenu } from '@/components/base/home'

  export default {
    name: 'home',
    components: {
      HomeList,
      HomeMenu
    }
    // activated () {
    //   this.$store.commit('updateLoadingStatus', false)
    // }
  }
</script>

<style type="text/css" lang="scss">

</style>