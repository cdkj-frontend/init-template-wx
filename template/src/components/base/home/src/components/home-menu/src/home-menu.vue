<template>
  <div class="home-menu" v-if="navList.length !== 0">
    <navigator
      class="navigator"
      :navList="navList"
      @change="change"
      :currentTabIndex="currentTabIndex">
      <span
        slot="item"
        slot-scope="props"
        class="tab-name"
        :class="{'link-active':isCurrent(props.index)}">
        {{props.text}}
      </span>
    </navigator>
  </div>
</template>

<script type="text/babel">
  import Navigator from '@/base/navigator'
  import api from '@/api/home'

  export default {
    name: 'home-menu',
    data () {
      return {
        currentTabIndex: 0, // 当前默认tab
        navList: []
      }
    },
    methods: {
      isCurrent (index) {
        return index === this.currentTabIndex
      },
      change (item) {
        if (item !== undefined) {
          this.currentTabIndex = item.id
          this.$store.commit('homelist/updateCategoryId', item.categoryId)
        }
      },
      setNavigator (menuList) {
        if (menuList.length === 0) {
          this.navList = []
          return
        }
        const navList = []
        navList.push({
          id: 0,
          name: '首页',
          categoryId: ''
        })
        menuList.forEach((item, index) => {
          navList.push({
            id: index + 1,
            name: item.categoryName,
            categoryId: item.id
          })
        })
        this.navList = navList
      }
    },
    components: {
      Navigator
    },
    mounted () {
      api.getPntCategories({
        params: {
          sysAccount: this.$store.state.sysAccount
        },
        success: (res) => {
          this.setNavigator(res.result)
        }
      })
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/scss/variables.scss';
  @import '../../../../assets/scss/mixins.scss';

  .home-menu {
    height: $--home-nav-height;
    background: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .12);
    overflow: hidden;
    .navigator {
      position: relative;
      height: $--home-nav-height;
      &:after {
        @include bottom-line($--line-color);
      }
    }
  }
</style>