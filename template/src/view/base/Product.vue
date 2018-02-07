<template>
    <div class="product">
      product
    </div>
</template>

<script type="text/babel">
  export default {
    name: 'product',
    activated () {
      this.$store.commit('updateLoadingStatus', false)
    }
  }
</script>

<style type="text/css" lang="scss">
  .product {
    background-color: #123456;
  }
</style>