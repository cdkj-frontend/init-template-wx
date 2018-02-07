<template>
  <!-- <div id="app" @touchmove.prevent> -->
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="router"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { showPageLoading, pageLoadingTime, pageLoadingDelay } from '@/config'
import checkAuth from '@/assets/js/checkAuth'

export default {
  name: 'app',
  data () {
    return {
      loadingBegin: null, // 记录加载开始时间
      timer: null
    }
  },
  computed: {
    transitionName () {
      return this.$store.state.direction
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  watch: {
    isLoading (newValue) {
      if (!showPageLoading) { // 如果设置为不显示页面loading时则直接退出
        return
      }
      if (newValue) { // 页面状态更新为加载中时
        this.loadingBegin = new Date() // 用于计算loading显示间隔和显示时长
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.$dialog.loading.open('加载中...')
        }, pageLoadingDelay)
      } else if (this.loadingBegin) { // 页面状态更新为加载完成且存在loading图标，则清除loading
        this.closeLoading()
      } else { // 未知情况
        console.warn('loading异常关闭')
        this.$dialog.loading.close()
      }
    }
  },
  methods: {
    /*
     * 1.当在loading显示间隔时间前更新到完成状态时则清空定时器直接退出，反之则关闭页面loading效果
     * 2.显示loading的情况下，判断loading持续时间是否达到配置最小时间，若达到则关闭，反之持续到最小时间再行关闭
     */
    closeLoading () {
      const now = new Date()
      const during = now.getTime() - this.loadingBegin.getTime()
      if (during < pageLoadingDelay && this.timer) { // 在loading显示前加载完成时，则取消加载图标
        clearTimeout(this.timer)
        this.timer = null
      } else { // 已显示加载图标情况下，控制达到最小显示时长再关闭
        if (during > pageLoadingTime) {
          this.$dialog.loading.close()
        } else {
          const delay = pageLoadingTime - during
          setTimeout(() => {
            this.$dialog.loading.close()
          }, delay)
        }
      }
    }
  },
  created () {
    checkAuth(this)
    if (this.isLoading && showPageLoading) {
      this.$dialog.loading.open('加载中...')
      this.loadingBegin = new Date()
    }
  }
}
</script>

<style lang="scss">
  @import './assets/scss/public.scss';
  @import './assets/scss/variables.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .router {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    background-color: $--bg-color;
    transform: translateZ(0); // 开启硬件加速
  }
  .scroll {
    background-color: $--bg-color;
  }
</style>
