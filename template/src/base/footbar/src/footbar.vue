<template>
  <yd-tabbar class="footbar" :fixed="true" :activeColor="activeColor">
    <yd-tabbar-item 
      v-for="item,key in barList"
      :key="key"
      :title="item.title"
      :link="item.link"
      type="link"
      :active="activeIndex === item.index">
      <yd-icon :name="item.iconName" slot="icon" size="0.54rem">
      </yd-icon>
      <!-- <yd-badge slot="badge" type="danger" v-if="item.iconName==='shopcart' && cartNum !== 0">{{cartNum}}</yd-badge> -->
      <yd-badge slot="badge" type="danger">22</yd-badge>
    </yd-tabbar-item>
  </yd-tabbar>
</template>

<script type="text/babel">
  import {TabBar, TabBarItem} from 'vue-ydui/dist/lib.rem/tabbar'
  import {Icons} from 'vue-ydui/dist/lib.rem/icons'
  import { storeCartlist } from '@/components/cartlist/'
  import {Badge} from 'vue-ydui/dist/lib.rem/badge'

  export default {
    name: 'footbar',
    components: {
      [TabBar.name]: TabBar,
      [TabBarItem.name]: TabBarItem,
      [Icons.name]: Icons,
      [Badge.name]: Badge
    },
    data () {
      return {
        activeIndex: 1,
        cartNum: 2
      }
    },
    props: [ 'barList', 'activeColor'],
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
    mounted () {
      console.log(NODE_ENV)
      // 页面刚进入时初始化底栏导航高亮图标
      const cur = this.$route.name
      if (this.barList[cur]) {
        this.activeIndex = this.barList[cur].index
      }
      if (!this.$store.state.cartlist) {
        this.$store.registerModule('cartlist', storeCartlist)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  .footbar {
    height: 1.1rem;
  }
</style>