<template>
  <div class="skulist">
    <div class="sku-row" v-for="sku, name in listData">
      <p class="sku-name">{{name}}</p>
      <p class="item-wrapper">
        <span
          v-for="item in sku"
          class="sku-item"
          :class="isActive(name, item)"
          @click="changeActive(name, item)"
        >
          {{item}}
        </span>
      </p>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'skulist',
    data () {
      return {
        activeSku: {}
      }
    },
    props: {
      listData: {
        type: Object,
        default: {}
      },
      defaultSku: {
        type: Object,
        default: {}
      }
    },
    computed: {
    },
    watch: {
      defaultSku (newValue) {
        this.activeSku = newValue
      }
    },
    methods: {
      isActive (name, skuName) {
        // console.log(this.activeSku)
        return this.activeSku[name] === skuName ? 'active' : ''
      },
      changeActive (name, skuName) {
        this.activeSku[name] = skuName
      }
    },
    components: {
    },
    mounted () {
      console.log(this.listData)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/mixins.scss';
  @import '../../../assets/scss/variables.scss';

  .sku-row {
    width: 100%;
    position: relative;
    padding: 0.3rem 0;
    color: $--text-color;
    &:after {
      @include bottom-line($--line-color);
    }
    .sku-name {
      font-size: 14px;
    }
    .item-wrapper {
      margin-bottom: 0.3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .sku-item {
        display: flex;
        justify-content: space-between;
        padding: 0.18rem 0.15rem;
        margin-right: 0.2rem;
        margin-top: 0.25rem;
        border-radius: 2px;
        border: 1px solid $--line-color;
        font-size: 12px;
        transition: all 0.3s;
        &.active {
          border-color: $--assistant-color;
        }
        &.disable {
          border-style: dashed;
          color: $--disable-color;
        }
      }
    }
  }
</style>