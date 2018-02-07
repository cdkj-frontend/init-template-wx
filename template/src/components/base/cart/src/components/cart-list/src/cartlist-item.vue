<template>
    <div class="yd-checklist-item cartlist-item">
        <mt-cell-swipe
            :right="[
              {
                content: '删除',
                style: { background: 'red', color: '#fff', padding: '0 0.5rem'},
                handler
              }
            ]">
          <checkbox class="checkbox" v-model="isCheck"></checkbox>
          <div class="cartlist-content">
            <slot></slot>
          </div>
        </mt-cell-swipe>
    </div>
</template>

<script type="text/babel">
  import Checkbox from '@/base/checkbox'
  import { CellSwipe } from 'mint-ui'
  import { assistantColor } from '@/config'
  import { mapActions } from 'vuex'

  export default {
    name: 'cartlist-item', // 若使用yd-ui的原组件则此名字不能更改，否则导致无法正确获取已选项
    data () {
      return {
        isCheck: false,
        assistantColor
      }
    },
    methods: {
      ...mapActions({
        checkItem: 'cartlist/checkItem',
        unCheckItem: 'cartlist/unCheckItem'
      }),
      toggleCheck () {
      },
      handler () {
        this.$emit('handleDelete', this.index)
      },
      handleCheck (value) {
        this.isCheck = value
      }
    },
    props: {
      val: {
        type: [Boolean, String, Number, Object],
        required: true
      },
      index: {
        type: Number
      }
    },
    components: {
      [CellSwipe.name]: CellSwipe,
      Checkbox
    },
    watch: {
      // 监听选中状态，变更store中的勾选列表状态
      isCheck (value) {
        if (value) {
          this.checkItem(this.val)
        } else {
          this.unCheckItem(this.val)
        }
      }
    },
    mounted () {
      this.$on('cartlist.checkall', isCheckAll => {
        this.isCheck = isCheckAll
      })
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/scss/variables.scss';
  @import '../../../../assets/scss/mixins.scss';

  .cartlist-item {
    margin-left: 0;
    position: relative;
    &:after {
      @include bottom-line($--line-color-light);
    }
    .mint-cell.mint-cell-swipe {
      width: 100%;
      overflow: hidden;
    }
    .mint-cell-value {
      width: 100%;
    }
    .checkbox {
      width: 15%;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: -0.6rem;
        bottom: -0.6rem;
        left: -0.2rem;
        right: -0.2rem;
      }
    }
    .cartlist-content {
      width: 80%;
    }
  }
</style>
<style type="text/css">
  .mint-cell-swipe-button {
    display: flex;
    align-items: center;
  }
  .cartlist-item .mint-cell-wrapper {
    background-image: none;
    background-color: #FFF;
    padding-right: 0;
  } 
</style>
