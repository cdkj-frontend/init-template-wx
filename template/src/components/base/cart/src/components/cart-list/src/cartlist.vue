<template>
  <scroll 
    ref="scroll"
    class="scroll"
    :data="cartList"
    :options="options"
    @pulling-down="onPullingDown">
    <div class="cartlist">
      <transition-group name="fadeOut">
        <cartlist-item
          v-for="item, index in cartList"
          ref="cartlistItem"
          :key="item.CARTID"
          :val="item"
          :index="index"
          @handleDelete="handleDelete">
          <yd-flexbox class="item-info">
            <div class="item-img">
              <img v-lazy="item.IMAGEURL">
            </div>
            <yd-flexbox-item align="top">
              <p class="item-title">{{ item.SKUNAME }}</p>
              <p class="item-sku">{{ skuFormatter(item.skus) }}</p>
              <p class="item-price">￥{{ item.PRICE }}</p>
              <yd-spinner
                class="item-spinner"
                v-model="item.SKUNUM"
                @handleChange="handleNum(index)">
              </yd-spinner>
            </yd-flexbox-item>
          </yd-flexbox>
        </cartlist-item>
      </transition-group>
    </div>
  </scroll>
</template>

<script type="text/babel">
  import Scroll from '@/base/scroll'
  import {FlexBox, FlexBoxItem} from 'vue-ydui/dist/lib.rem/flexbox'
  // import {Spinner} from 'vue-ydui/dist/lib.rem/spinner'
  import Spinner from '@/base/spinner'
  import CartlistItem from './cartlist-item'
  import api from '@/api/cart'

  export default {
    data () {
      return {
        isRefresh: false,
        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: '刷新成功'
          }
        }
      }
    },
    methods: {
      // 拼凑sku详情
      skuFormatter (skus) {
        let content = ''
        skus.forEach((sku) => {
          content += `${sku.ITEMNAME}:${sku.ITEMVALUE}`
        })
        return content
      },
      // 侧滑删除事件
      handleDelete (index) {
        // 删除当前item项
        const removeId = this.cartList[index].CARTID
        this.cartList = this.cartList.remove(index)
        this.$store.dispatch('cartlist/unCheckItem', removeId)
        // TODO 删除数据库数据
      },
      // 获取列表数据
      getList () {
        api.getCart({
          preventLoading: this.isRefresh,
          params: {
            conId: this.$store.state.conId
          },
          success: (res) => {
            this.cartList = res.result
          }
        })
      },
      // 下拉刷新事件
      onPullingDown () {
        this.isRefresh = true
        setTimeout(() => {
          this.getList()
        }, 300)
      },
      handleNum (index) {
        const changeItem = this.cartList[index]
        console.log(changeItem)
      }
    },
    computed: {
      cartList: {
        set (value) {
          this.$store.commit('cartlist/updateList', value)
        },
        get () {
          if (!this.$store.state.cartlist) {
            return []
          }
          return this.$store.state.cartlist.list
        }
      },
      checkList: {
        set (value) {
          this.$store.commit('cartlist/updateCheckList', value)
        },
        get () {
          if (!this.$store.state.cartlist) {
            return []
          }
          return this.$store.state.cartlist.checkList
        }
      }
    },
    components: {
      Scroll,
      CartlistItem,
      [FlexBox.name]: FlexBox,
      [FlexBoxItem.name]: FlexBoxItem,
      [Spinner.name]: Spinner
    },
    mounted () {
      this.getList()
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/scss/variables.scss';

  .scroll {
    padding-bottom: $--cart-total-height;
  }
</style>

<style type="text/css" lang="scss">
  @import '../../../../assets/scss/variables.scss';

  .cartlist {
    .mint-cell-wrapper {
      padding-left: 0;
      .mint-cell-title {
        display: none;
      }
      .mint-cell-value {
        width: 100%;
      }
    }
    .item-info {
      padding: 8px 0;
      .item-img {
        width: 70px;
        margin-right: 15px;
        img {
          width: 100%;
          height: 70px;
        }
      }
      .item-title {
        color: #333;
        font-size: 14px;
      }
      .item-sku {
        color: $--tip-color;
        font-size: 12px;
        margin: 5px 0;
      }
      .item-price {
        float: left;
        color: $--assistant-color;
        line-height: 0.6rem;
      }
      .item-spinner {
        float: right;
      }
    }
    .fadeOut-leave-active {
      transition: all .5s;
      transition-property: transform opacity;
      z-index: -1;
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }
  }
</style>