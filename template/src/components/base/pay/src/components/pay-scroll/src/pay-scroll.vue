<template>
  <div class="pay-scroll">
    <scroll class="scroll">
      <pay-address/>
      <pay-list/>
      <pay-bill/>
    </scroll>
    <pay-total/>
  </div>
</template>

<script type="text/babel">
  import Scroll from '@/base/scroll'
  import PayAddress from '@/components/base/pay/pay-address'
  import PayList from '@/components/base/pay/pay-list'
  import PayBill from '@/components/base/pay/pay-bill'
  import PayTotal from '@/components/base/pay/pay-total'

  export default {
    name: 'pay-scroll',
    components: {
      Scroll,
      PayAddress,
      PayList,
      PayBill,
      PayTotal
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  @import '../../../../assets/scss/variables.scss';

  .pay-scroll {
    .scroll {
      padding-bottom: $--pay-total-height;
    }
  }
</style>