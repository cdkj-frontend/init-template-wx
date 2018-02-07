<template>
  <div class="pay-bill">
    <mt-cell title="商品金额">￥<span class="price">4399.00</span></mt-cell>
    <mt-cell title="会员折扣">-￥<span class="price">4300.00</span></mt-cell>
    <mt-cell title="优惠金额">-￥<span class="price">0.00</span></mt-cell>
    <mt-cell title="折扣金额">-￥<span class="price">0.00</span></mt-cell>
    <mt-cell title="运费">+￥<span class="price">0.00</span></mt-cell>
    <mt-cell title="应付总额" class="total">￥<span class="price">99.00</span></mt-cell>
  </div>
</template>

<script type="text/babel">
  import { Cell } from 'mint-ui'

  export default {
    name: 'pay-bill',
    components: {
      [Cell.name]: Cell
    }
  }
</script>

<style lang="scss">
  @import '../../../../assets/scss/variables.scss';

  .pay-bill {
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    .mint-cell-text {
      font-size: 12px;
    }
    .mint-cell-value {
      font-size: 12px;
      color: $--assistant-color;
    }
    .total .mint-cell-text {
      font-size: 14px;
    }
  }
</style>