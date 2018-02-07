<template>
  <div class="pay-list">
    <div class="list-item">
      <div class="item-img">
        <img v-lazy="'//i8.mifile.cn/a1/pms_1505099100.23362193!560x560.jpg'">
      </div>
      <div class="item-info">
        <p class="info-name">小米MIX2</p>
        <p class="info-sku">全陶瓷尊享版8GB+128GB 黑色</p>
        <p class="info-price">
          <span>￥<i>4399</i></span>
          <yd-spinner
            class="info-num"
            max="75"
            width="2rem"
            height="0.7rem"
            v-model="num">
          </yd-spinner>
        </p>
      </div>
    </div>
    <div class="list-item">
      <div class="item-img">
        <img v-lazy="'//i8.mifile.cn/a1/pms_1505099100.23362193!560x560.jpg'">
      </div>
      <div class="item-info">
        <p class="info-name">小米MIX2</p>
        <p class="info-sku">全陶瓷尊享版8GB+128GB 黑色</p>
        <p class="info-price">
          <span>￥<i>4399</i></span>
          <yd-spinner
            class="info-num"
            max="75"
            width="2rem"
            height="0.7rem"
            v-model="num">
          </yd-spinner>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import Spinner from '@/base/spinner'

  export default {
    name: 'pay-list',
    data () {
      return {
        num: 0
      }
    },
    components: {
      [Spinner.name]: Spinner
    }
  }
</script>

<style lang="scss">
  @import '../../../../assets/scss/variables.scss';
  @import '../../../../assets/scss/mixins.scss';

  .pay-list {
    background-color: #FFF;
    margin-top: 0.2rem;
    // border-top: 1px solid $--line-color;
    // border-bottom: 1px solid $--line-color;
    .list-item {
      display: flex;
      flex-wrap: wrap;
      padding: 0.2rem 0.2rem;
      position: relative;
      &:not(:last-child):after {
        @include bottom-line($--line-color);
      }
      .item-img {
        width: 70px;
        margin-right: 15px;
        // flex-grow: 1;
        img {
          width: 100%;
          height: 70px;
        }
      }
      .item-info {
        flex-grow: 1;
        .info-name {
          font-size: 14px;
        }
        .info-sku {
          color: $--tip-color;
        }
        .info-price {
          margin-top: 0.1rem;
          height: 0.7rem;
          line-height: 0.7rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          color: $--assistant-color;
        }
      }
    }
  }
</style>