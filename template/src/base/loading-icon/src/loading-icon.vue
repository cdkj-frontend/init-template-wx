<template>
  <div class="loading">
    <span class="loading-spinners" :style="style">
      <i class="loading-spinner" v-for="item in balde"></i>
    </span>
  </div>
</template>
<script type="text/babel">
  const COMPONENT_NAME = 'loading'
  export default {
    name: COMPONENT_NAME,
    data () {
      return {
        balde: 12
      }
    },
    props: {
      size: {
        type: Number
      }
    },
    computed: {
      style () {
        if (!this.size) {
          return
        }
        const value = `${this.size}px`
        return {
          width: value,
          height: value
        }
      }
    }
  }
</script>
<style lang="scss">
  .loading {
  }
  .loading-spinners {
    position: relative;
    display: block;
    width: 0.5rem;
    height: 0.5rem;
  }
  .loading-spinner {
    position: absolute;
    left: 44.5%;
    top: 37%;
    width: 2PX; // for rem
    height: 25%;
    border-radius: 50%/20%;
    opacity: .25;
    animation: spinner-fade 1s linear infinite;
    background-color: currentColor;
    @for $num from 1 through 12 {
      &:nth-child(#{$num}) {
        animation-delay: #{(($num - 1) / 12)}s;
        transform: rotate(30deg * ($num - 6)) translateY(-150%);
      }
    }
    @keyframes spinner-fade {
      0% {
        opacity: .85;
      }
      50% {
        opacity: .25;
      }
      100% {
        opacity: .25;
      }
    }
  }
</style>