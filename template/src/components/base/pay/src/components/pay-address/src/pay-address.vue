<template>
  <div class="pay-address">
    <!-- <div class="address-empty">
      没有地址，点击此处添加
    </div>
    <div class="address-info">
      <p class="recipient">
        <span class="recipient-name">TJ雨林</span>
        <span class="recipient-tel">13311202787</span>
      </p>
      <p class="detail">
        湖南省长沙市岳麓区长沙芯城科技园1栋1701
      </p>
    </div> -->
    <mt-cell is-link>
      <!-- <span slot="title">没有地址，点击此处添加</span> -->
      <div slot="title">
        <div class="recipient">
          <span>TJ雨林</span>
          <span>13311202787</span>
        </div>
        <div class="detail">湖南省长沙市岳麓区芯城科技园1栋1701</div>
      </div>
    </mt-cell>
  </div>
</template>

<script type="text/babel">
  import { Cell } from 'mint-ui'

  export default {
    name: 'pay-address',
    components: {
      [Cell.name]: Cell
    }
  }
</script>

<style lang="scss">
  @import '../../../../assets/scss/variables.scss';
  @import '../../../../assets/scss/mixins.scss';

  .pay-address {
    width: 100%;
    position: relative;
    &:active {
      background-color: $--line-color;
    }
    // .address-wrapper {
    //   padding: 0.3rem;
    // }
    .mint-cell-value.is-link {
      display: inline-block;
      color: $--text-color;
    }
    .mint-cell-allow-right:after {
      width: 8px;
      height: 8px;
    }
    .mint-cell-wrapper {
      padding: 0.45rem 10px;
    }
    .recipient {
      // display: inline-block;
      margin-bottom: 0.2rem;
      font-size: 14px;
    }
    .detail {
      // display: inline-block;
      font-size: 12px;
    }
  }
</style>