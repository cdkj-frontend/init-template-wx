<template>
  <div class="pay-total">
    <span class="total-price">合计:<i>￥6000</i></span>
    <span class="total-num">共2件</span>
    <span class="btn-submit">支付</span>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'pay-total'
  }
</script>

<style lang="scss">
  @import '../../../../assets/scss/variables.scss';
  @import '../../../../assets/scss/mixins.scss';

  .pay-total {
    width: 100%;
    height: $--pay-total-height;
    line-height: $--pay-total-height;
    background-color: #FFF;
    position: absolute;
    bottom: 0;
    &:before {
      @include top-line($--line-color);
    }
    .total-price {
      font-size: 14px;
      margin: 0 0.2rem;
      i {
        color: $--assistant-color;
      }
    }
    .total-num {

    }
    .btn-submit {
      display: inline-block;
      float: right;
      width: 2.5rem;
      height: $--pay-total-height;
      line-height: $--pay-total-height;
      text-align: center;
      color: #FFF;
      font-size: 14px;
      background-color: $--assistant-color;
    }
  }
</style>