<template>
  <div class="cart-total">
    <checkbox class="checkbox" v-model="isCheckAll" @handleChange="handleChange"></checkbox>
    <span class="label-checkall">全选</span>
    <span class="total-amount">合计: ￥{{totalAmount}}</span>
    <span class="btn-pay" @click="submitCart">
      去结算<i class="count">({{totalNum}})</i>
    </span>
  </div>
</template>

<script type="text/babel">
  import Checkbox from '@/base/checkbox'
  import {assistantColor} from '@/config'

  export default {
    name: 'cart-total',
    data () {
      return {
        isCheckAll: false,
        assistantColor
      }
    },
    computed: {
      // 购物车列表
      cartlist () {
        if (!this.$store.state.cartlist) {
          return []
        }
        return this.$store.state.cartlist.list
      },
      // 已勾选列表
      checklist () {
        if (!this.$store.state.cartlist) {
          return []
        }
        return this.$store.state.cartlist.checkList
      },
      // 总金额
      totalAmount () {
        let totalAmount = 0
        this.checklist.forEach((item) => {
          totalAmount += Number(parseFloat(item.PRICE * item.SKUNUM).toFixed(2))
        })
        return totalAmount.toLocaleString()
      },
      // 总数量
      totalNum () {
        let totalNum = 0
        if (!this.$store.state.cartlist) {
          return 0
        }
        this.checklist.forEach((item) => {
          totalNum += item.SKUNUM
        })
        return totalNum
      }
    },
    watch: {
      checklist (value) {
        if (value.length === this.cartlist.length && value.length !== 0) { // 购物车列表中的所有项都被勾选
          this.isCheckAll = true
        } else {
          this.isCheckAll = false
        }
      }
    },
    methods: {
      handleChange () {
        this.$parent.$children[0].$refs.cartlistItem.forEach(item => {
          item.$emit('cartlist.checkall', !this.isCheckAll)
        })
      },
      submitCart () {
        this.$router.push({ name: 'pay' })
      }
    },
    components: {
      Checkbox
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/scss/variables.scss';
  @import '../../../../assets/scss/mixins.scss';

  .cart-total {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: $--cart-total-height;
    background-color: #FFF;
    &:before {
      @include top-line ($--line-color);
    }
    .checkbox {
      float: left;
      margin-top: ($--cart-total-height - $--checkbox-height) / 2;
      margin-left: 0.3rem;
      margin-right: 0.1rem;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: -0.3rem;
        bottom: -0.3rem;
        left: -0.3rem;
        right: -0.6rem;
      }
    }
    .label-checkall {
      color: $--tip-color;
    }
    .total-amount {
      line-height: $--cart-total-height;
      font-size: 14px;
      margin-left: 0.3rem;
    }
    .btn-pay {
      display: inline-block;
      float: right;
      width: 2.5rem;
      height: $--cart-total-height;
      line-height: $--cart-total-height;
      text-align: center;
      color: #FFF;
      font-size: 12px;
      background-color: $--assistant-color;
    }
  }
</style>
<style type="text/css" lang="scss">
  .cart-total {
    .yd-checkbox-text {
      font-size: 12px;
    }
  }
</style>