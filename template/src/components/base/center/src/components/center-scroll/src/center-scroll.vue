<template>
  <div class="center-scroll">
    <scroll 
      ref="scroll"
      class="scroll"
      :options="options"
      @pulling-down="onPullingDown">
    </scroll>
  </div>
</template>

<script type="text/babel">
  import Scroll from '@/base/scroll'

  export default {
    name: 'center-scroll',
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
    components: {
      Scroll
    },
    methods: {
      // 下拉刷新事件
      onPullingDown () {
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 300)
      }
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  .center-scroll {
    width: 100%;
    height: 100%;
  }
</style>
