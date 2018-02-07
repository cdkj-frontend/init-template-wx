<template>
  <div class="cart">
      <cart-list></cart-list>
      <cart-list></cart-list>
      <cart-list></cart-list>
      <cart-list></cart-list>
      <cart-total></cart-total>
  </div>
</template>

<script type="text/babel">
  import { CartList, CartTotal } from '@/components/base/cart'

  export default {
    name: 'cart',
    components: {
      CartList,
      CartTotal
    },
    mounted () {
      if (!this.$store.state.cart) {
        this.$store.registerModule('cart', storeCart)
      }
    }
    activated () {
      this.$store.commit('updateLoadingStatus', false)
    },
  }
</script>

<style type="text/css" lang="scss">
  @import '../assets/scss/variables.scss';

  .cart {
    
  }
</style>