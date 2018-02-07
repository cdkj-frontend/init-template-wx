<template>
  <div class="homelist">
    <scroll
      ref="scroll"
      class="scroll"
      :data="list"
      :options="options"
      @pulling-down="onPullingDown">
      <div v-for="item, index in list" :key="index">
        <!-- 此处使用mint-ui的轮播组件而非yd-ui以避免懒加载的使用问题 -->
        <mt-swipe :auto="4000" v-if="item.partType === 0" class="swipe">
          <mt-swipe-item v-for="detail, key in item.detailList" :key="key">
            <a :href="detail.hrefUrl || 'javascript:void(0)'">
              <img v-lazy="detail.resourceUrl">
            </a>
          </mt-swipe-item>
        </mt-swipe>
        <div v-if="item.partType !== 0" v-for="detail, key in item.detailList" :class="getClass(item.partType, detail.needButton)">
          <div class="item-img">
            <img v-lazy="detail.resourceUrl" @click="toUrl(detail)">
            <!-- <img src="../../../assets/image/loading.svg" @click="toUrl(detail)"> -->
          </div>
          <div class="item-mes">
            <div class="item-info">
              <p class="item-title">商品名称</p>
              <p><span class="price">￥99.99</span><span class="del-price">￥199.99</span></p>
              <p class="item-content">这是一段超出长度的描述文本这是一段超出长度的描述文本这是一段超出长度的描述文本这是一段超出长度的描述文本这是一段超出长度的描述文本这是一段超出长度的描述文本这是一段超出长度的描述文本这是一段超出长度的描述文本</p>
            </div>
            <div class="item-button" v-if="detail.needButton === 1">
              <span class="btn" @click="popup('cart', detail.productInfo)">加入购物车</span>
              <span class="btn" @click="popup('buy', detail.productInfo)">立即购买</span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/babel">
  import Scroll from '@/base/scroll'
  import api from '@/api/home'
  import { ListTheme, ListItem, ListOther } from 'vue-ydui/dist/lib.rem/list'
  import { Button, ButtonGroup } from 'vue-ydui/dist/lib.rem/button'
  import { Slider, SliderItem } from 'vue-ydui/dist/lib.rem/slider'
  import { Swipe, SwipeItem } from 'mint-ui'
  import storeHomelist from './store'

  export default {
    name: 'homelist',
    data () {
      return {
        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: '刷新成功'
          }
        }
      }
    },
    computed: {
      list: {
        set (value) {
          this.$store.commit('homelist/updateList', value)
        },
        get () {
          if (!this.$store.state.homelist) {
            return []
          }
          return this.$store.state.homelist.list
        }
      },
      categoryId () {
        if (!this.$store.state.homelist) {
          return ''
        }
        return this.$store.state.homelist.categoryId
      }
    },
    watch: {
      // 监控分类ID发生变化，即变换了菜单时重新获取页面数据
      categoryId () {
        this.getList()
        setTimeout(() => {
          this.$refs.scroll.scrollTo(0, 0)
        }, 300)
      }
    },
    methods: {
      addToCart () {
        this.$router.push({ name: 'cart' })
      },
      toDetail () {
        this.$router.push({ name: 'product' })
      },
      getClass (partType, needButton) {
        let className = ''
        switch (partType) {
          case 1:
            // 宫格
            className += 'theme2'
            break
          case 2:
            // 直排
            className += 'theme1'
            break
          default:
            break
        }
        if (!needButton) {
          className += ' nopadding'
        }
        return className
      },
      toUrl (info) {
        this.$router.push({ name: 'product', query: { id: info.id } })
      },
      // 获取当页页面数据
      getList (cb) {
        const params = {
          sysAccount: this.$store.state.sysAccount,
          clientType: 1,
          pageType: 0
        }
        if (this.categoryId !== '') {
          params.pageType = 1
          params.categoryId = this.categoryId
        }
        api.getPage({
          params,
          preventLoading: true,
          success: (res) => {
            this.list = res.result
            if (cb) {
              cb()
            }
          }
        })
      },
      onPullingDown () {
        setTimeout(() => {
          this.getList()
        }, 300)
      },
      // 触发商品弹窗方法
      popup (type, productInfo) {
        if (!this.$store.state.productPopup) {
          console.warn('商品信息弹窗组件加载异常--"product-popup"')
          return
        }
        this.$store.commit('productPopup/updateType', type)
        this.$store.commit('productPopup/toggleShow', true)
        this.$store.commit('productPopup/updateId', productInfo.id)
      }
    },
    mounted () {
      if (!this.$store.state.homelist) { // 判断vuex中没有homelist的状态模块时注册模块
        this.$store.registerModule('homelist', storeHomelist)
      }
      this.getList()
    },
    components: {
      Scroll,
      [Slider.name]: Slider,
      [SliderItem.name]: SliderItem,
      [Button.name]: Button,
      [ButtonGroup.name]: ButtonGroup,
      [ListTheme.name]: ListTheme,
      [ListItem.name]: ListItem,
      [ListOther.name]: ListOther,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../assets/scss/variables.scss';

  .homelist {
    width: 100%;
    position: absolute;
    top: $--home-nav-height;
    bottom: 0;
  }
  .slider {
    width: 100%;
  }
  @mixin theme {
    width: 100%;
    overflow: hidden;
    padding: .2rem .2rem 0;
    background-color: #FFF;
    text-align: left;
    &:not(:first-child) {
      border-top: 1px solid #ECECEC;
    }
    .item-img {
      width: 100%;
      border: 1px solid #ECECEC;
      overflow: hidden;
      background-color: $--color-lazyload;
      img {
        width: 100%;
      }
    }
    .item-info {
      margin: .2rem 0 ;
      .item-title {
        word-wrap: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: justify;
        color: #323232;
        margin: .1rem 0;
        font-size: 14px;
      }
      .item-content {
        color: #999999;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .item-button {
      float: right;
      width: 100%;
      margin: .1rem 0 .2rem;
      .btn {
        width: 45%;
        margin: 0 2%;
        height: 0.65rem;
        line-height: 0.65rem;
        display: inline-block;
        padding: 0 .2rem;
        // border: 1px solid #b5b5b5;
        border-radius: .08rem;
        background-color: $--main-color;
        text-align: center;
        color: #fff;
        &:active {
          background-color: $--active-main-color!important;
        }
      }
    }
  }
  /* 大图直排类型 */
  .theme1 {
    @include theme;
    padding: 0;
    .item-info {
      display: none;
    }
    .item-button {
      width: 60%;
      margin: .3rem 0;
    }
  }
  /* 宫格类型 */
  .theme2 {
    @include theme;
    width: 50%;
    float: left;
    border-right: 1px solid #ECECEC;
    .item-img {
      $imgHeight: 3.5rem;
      border: none;
      height: $imgHeight;
      margin-bottom: .2rem;
      img {
        // height: 100%;
        margin-top: $imgHeight/2;
        transform: translateY(-50%);
      }
    }
    .item-mes {
      margin-top: .2rem;
      .item-button {
        float: left;
        .btn {
          width: 48%;
          margin: 0;
          padding: 0 .08rem;
          &:first-child {
            margin-right: 1.5%;
          }
        }
      }
    }
  }
  /* 列表类型 */
  .theme3 {
    @include theme;
    $imgHeight: 3.2rem;
    padding-top: 0;
    height: $imgHeight;
    .item-img {
      width: 32%;
      height: 100%;
      float: left;
      border: none;
      img {
        margin-top: $imgHeight/2;
        transform: translateY(-50%);
      }
    }
    .item-mes {
      padding-top: .4rem;
      width: 65%;
      height: 100%;
      float: left;
      margin-left: 3%;
      .item-info {
        margin-top: 0;
        margin-bottom: .15rem;
        .item-title {
          margin: 0;
        }
      }
      .item-button {
        float: left;
        .btn {
          height: 0.55rem;
          line-height: 0.55rem;
          width: 46%;
          margin: 0;
          &:first-child {
            margin-right: 4%;
          }
        }
      }
    }
  }
  .theme11 {
    @include theme;
  }
  .price {
    font-size: .3rem;
    color: #eb5211;
  }
  .del-price {
    padding-left: .06rem;
    font-size: .2rem;
    margin-left: .02rem;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      z-index: 1;
      left: 0;
      width: 100%;
      border-top: 1px solid #8c8c8c;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      top: auto;
      bottom: 50%;
    }
  }
  .nopadding {
    padding: 0;
  }

  .swipe {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      animation: none;
    }
  }
</style>