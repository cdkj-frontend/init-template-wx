<template>
  <div class="index" @touchmove.prevent>
    <transition :name="transitionName">
      <keep-alive :exclude="['cart']">
        <router-view class="router router-index"/>
      </keep-alive>
    </transition>
    <yd-tabbar class="footbar" :activeColor="activeColor" active-class="active">
      <yd-tabbar-item 
        v-for="item,key in barList"
        :key="key"
        :title="item.title"
        :link="item.link"
        type="link"
        :active="activeIndex === item.index">
        <yd-icon :name="item.iconName" slot="icon" size="0.54rem"></yd-icon>
        <yd-badge slot="badge" type="danger" v-if="item.iconName==='shopcart' && cartNum !== 0">{{cartNum}}</yd-badge>
      </yd-tabbar-item>
    </yd-tabbar>
    <product-popup></product-popup>
  </div>
</template>

<script type="text/babel">
  import { TabBar, TabBarItem } from 'vue-ydui/dist/lib.rem/tabbar'
  import { Icons } from 'vue-ydui/dist/lib.rem/icons'
  import { mainColor } from '@/config'
  import { storeCartList } from '@/components/base/cart'
  import ProductPopup from '@/components/base/product-popup'
  import {Badge} from 'vue-ydui/dist/lib.rem/badge'
  import cartApi from '@/api/cart'
  let cart = null
  try {
    cart = require('@/api/cart')
  } catch (err) {
    console.log(err)
  }

  export default {
    name: 'index',
    components: {
      [TabBar.name]: TabBar,
      [TabBarItem.name]: TabBarItem,
      [Icons.name]: Icons,
      [Badge.name]: Badge,
      ProductPopup
    },
    data () {
      return {
        activeIndex: 1,
        barList: {
          home: {
            index: 1,
            title: '首页',
            link: '/home',
            iconName: 'home'
          },
          cart: {
            index: 2,
            title: '购物车',
            link: '/cart',
            iconName: 'shopcart'
          },
          center: {
            index: 3,
            title: '个人中心',
            link: '/center',
            iconName: 'ucenter-outline'
          }
        }
      }
    },
    computed: {
      transitionName () {
        return this.$store.state.direction
      },
      activeColor () {
        return mainColor
      },
      cartNum () {
        if (!this.$store.state.cartlist) {
          return 0
        }
        return this.$store.state.cartlist.list.length
      }
    },
    watch: {
      // eslint-disable-next-line
      '$route'(to, from) {
        if (!this.barList[to.name] || !this.barList[from.name]) {
          return false
        }
        const next = this.barList[to.name].index
        const cur = this.barList[from.name].index
        if (next > cur) {
          this.$store.commit('updateDirection', 'forward')
        } else {
          this.$store.commit('updateDirection', 'back')
        }
        this.activeIndex = next
      }
    },
    created () {
      // 页面刚进入时初始化底栏导航高亮图标
      const cur = this.$route.name
      if (this.barList[cur]) {
        this.activeIndex = this.barList[cur].index
      }
    },
    mounted () {
      if (!this.$store.state.cartlist) {
        this.$store.registerModule('cartlist', storeCartList)
        cartApi.getCart({
          params: {
            conId: this.$store.state.conId
          },
          success: (res) => {
            this.$store.commit('cartlist/updateList', res.result)
          }
        })
      }
      this.$store.commit('updateLoadingStatus', false)
      console.log(cart)
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../assets/scss/variables.scss';

  .index {
    .footbar {
      height: $--footbar-height;
      z-index: 0;
      position: absolute;
      bottom: 0;
      .yd-tabbar-txt {
        font-size: 12px;
        margin-top: -3px;
      }
      .yd-tabbar-icon {
        transition: all 0.35s;
        margin-top: 5px;
        i {
          font-size: 20px!important;
        }
      }
      .active .yd-tabbar-icon {
        transform: scale(1.25);
        // animation: myScale 0.5s;
        // @keyframes myScale {
        //   0% {
        //     transform: scale(1);
        //   }
        //   35% {
        //     transform: scale(1.25);
        //   }
        //   60% {
        //     transform: scale(1.45);
        //   }
        //   100% {
        //     transform: scale(1.25);
        //   }
        // }
      }
      .yd-tabbar-badge {
        top: -.07rem;
      }
      .yd-badge {
        font-size: 8px;
        padding: 2.5px 4.8px;
      }
    }
    .router-index {
      background-color: $--bg-color;
      z-index: 1;
      width: 100%;
      height: auto !important;
      bottom:$--footbar-height !important;
    }
  }
</style>