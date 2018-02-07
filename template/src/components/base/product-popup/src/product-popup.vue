<template>
  <div class="product-popup">
    <yd-popup ref="popup" v-model="isShow" position="bottom" height="88%">
      <yd-icon
        class="btn-close"
        name="error-outline"
        size=".4rem"
        @click.native="close"
      ></yd-icon>
      <div class="product-info">
        <div class="info-img">
          <img src="//i8.mifile.cn/a1/pms_1505099100.23362193!560x560.jpg">
        </div>
        <div class="info-content">
          <p class="info-price">￥<i>4399</i></p>
          <p class="info-name">小米MIX2 全陶瓷尊享版8GB+128GB 黑色</p>
          <p class="info-stock">库存：2777</p>
        </div>
      </div>
      <scroll
      class="scroll"
      ref="popupScroll">
        <skulist :listData="skuList" :defaultSku="defaultSku"></skulist>
        <div class="product-num">
          <div class="num-title">
            <span>购买数量</span>
          </div>
          <yd-spinner
            class="num-spinner"
            v-model="spinner"
            width="3rem"
            height="0.8rem">
          </yd-spinner>
        </div>
      </scroll>
      <yd-button class="btn-submit" type="warning" @click.native="close">{{btnText}}</yd-button>
    </yd-popup>
  </div>
</template>
<script type="text/babel">
  import {Button} from 'vue-ydui/dist/lib.rem/button'
  import {Popup} from 'vue-ydui/dist/lib.rem/popup'
  import {Icons} from 'vue-ydui/dist/lib.rem/icons'
  import Scroll from '@/base/scroll'
  import Spinner from '@/base/spinner'
  import api from '@/api/home'
  // import { Popup } from 'mint-ui'
  import storeProductPopup from './store'
  import Skulist from './skulist'

  export default {
    name: 'product-popup',
    data () {
      return {
        isShow: false,
        skuList: {},
        defaultSku: {},
        spinner: 0,
        stock: 0
      }
    },
    computed: {
      showTag: { // 此处加入一个showtag中间量以实现弹窗出现前加载数据
        set (value) {
          this.$store.commit('productPopup/toggleShow', value)
        },
        get () {
          if (!this.$store.state.productPopup) {
            return false
          }
          return this.$store.state.productPopup.isShow
        }
      },
      btnText () {
        let btnText = ''
        let type = 'cart'
        if (this.$store.state.productPopup) {
          type = this.$store.state.productPopup.type
        }
        switch (type) {
          case 'cart':
            btnText = '加入购物车'
            break
          case 'buy':
            btnText = '立即购买'
            break
          default:
        }
        return btnText
      },
      pntId () {
        if (!this.$store.state.productPopup) {
          return null
        }
        return this.$store.state.productPopup.pntId
      },
      productInfo () {
        if (!this.$store.state.productPopup) {
          return null
        }
        return this.$store.state.productPopup.productInfo
      }
    },
    watch: {
      isShow (newValue) {
        this.showTag = newValue
      },
      showTag (newValue) {
        if (newValue) {
          this.getInfo(this.pntId)
        }
      },
      productInfo () {
        // 动态设置滚动区高度
        const contentHeight = document.querySelector('.yd-popup').offsetHeight
        const infoHeight = document.querySelector('.product-info').offsetHeight
        const scrollHeight = contentHeight - infoHeight
        document.querySelector('.yd-popup .scroll').style.height = `${scrollHeight}px`
      }
    },
    methods: {
      getInfo (pntId) {
        api.getSkuView({
          params: {
            pntId: pntId,
            sysAccount: this.$store.state.sysAccount
          },
          success: (res) => {
            console.log(res)
            this.isShow = true

            // TODO 动态替换弹窗数据
            this.skuList = {
              '颜色': ['陶瓷黑色', '陶瓷白色'],
              '型号': ['普通版', '斯塔克全陶瓷版'],
              '存储容量': ['64GB', '128GB']
            }
            this.defaultSku = {
              '颜色': '陶瓷黑色',
              '型号': '斯塔克全陶瓷版',
              '存储容量': '64GB'
            }
          }
        })
      },
      close () {
        const list = this.$store.state.cartlist.list
        list.push({
          'SKUNUM': 3,
          'skus': [{
            'ITEMDESC': '5KG',
            'ITEMVALUE': '5KG',
            'ID': '5996692A32800A86E05308011A0AAD23',
            'WEIGHT': 5,
            'IMAGEURL': '//i8.mifile.cn/a1/pms_1505099100.23362193!560x560.jpg',
            'ITEMNAME': '重量'
          }],
          'CARTID': Math.floor(Math.random() * 1000000000),
          'PRICE': 128,
          'SKUSUM': 268.8,
          'CONID': 'C9F22B6F5388414DBDAE9E131CC187CE',
          'VERSION': 1,
          'SYSACCOUNT': 'XNLP',
          'SKUNAME': '先农五常稻花香',
          'SKUID': '123',
          'PNTID': '123',
          'IMAGEURL': '//i8.mifile.cn/a1/pms_1505099100.23362193!560x560.jpg'
        })
        console.log(list)
        this.$store.commit('cartlist/updateList', list)
        this.isShow = false
      }
    },
    components: {
      [Popup.name]: Popup,
      [Button.name]: Button,
      Skulist,
      Scroll,
      [Spinner.name]: Spinner,
      [Icons.name]: Icons
    },
    mounted () {
      if (!this.$store.state.productPopup) {
        this.$store.registerModule('productPopup', storeProductPopup)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  .product-popup {
    .yd-popup-content {
      padding: 0 0.3rem;
      overflow: visible;
    }
  }
</style>

<style lang="scss" scoped>
  @import '../../../assets/scss/variables.scss';
  @import '../../../assets/scss/mixins.scss';

  .product-popup {
    .btn-close {
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
      color: $--line-color;
      z-index: 2;
    }
    .product-info {
      width: 100%;
      padding: 0.3rem 0;
      position: relative;
      display: flex;
      :after {
        @include bottom-line($--line-color-light);
      }
      .info-img {
        // border: 1px solid $--line-color;
        // margin-top: -0.35rem;
        align-items: center;
        display: flex;
        background-color: #FFF;
        img {
          width: $--product-img-size-sm;
          vertical-align: middle;
        }
      }
      .info-content {
        display: block;
        padding-top: 0.2rem;
        padding-left: 0.3rem;
        .info-price {
          color: $--assistant-color;
          i {
            font-size: 24px;
          }
        }
        .info-name {
          font-size: 14px;
        }
        .info-stock {
          margin-top: 0.1rem;
          color: $--tip-color;
        }
      }
    }
    .btn-submit {
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 0!important;
      border-radius: 0;
      width: 100%;
      height: $--btn-bottom-height;
      font-size: $--btn-bottom-font-size;
      text-align: center;
    }
    .scroll {
      background-color: #FFF;
      padding-bottom: $--btn-bottom-height;
      .product-num {
        margin-top: 0.3rem;
        padding-bottom: 0.5rem;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        .num-title {
          display: inline-block;
          line-height: 0.8rem;
        }
      }
    }
  }
</style>