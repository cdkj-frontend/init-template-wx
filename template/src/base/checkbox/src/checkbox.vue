<template>
  <div class="checkbox" @click="handleCheck">
    <input class="check-box" v-model="isCheck" type="checkbox"/>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'checkbox',
    data () {
      return {
        isCheck: this.value
      }
    },
    props: ['value'],
    watch: {
      isCheck (value) {
        this.$emit('input', this.isCheck)
      },
      value (value) {
        this.isCheck = value
      }
    },
    methods: {
      handleCheck () {
        this.isCheck = !this.isCheck
        this.$emit('handleChange')
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/variables.scss';

  @keyframes dothabottomcheck{
    0% { height: 0; }
    100% { height: $--checkbox-height * 0.3;  }
  }

  @keyframes dothatopcheck{
    0% { height: 0; }
    50% { height: 0; }
    100% { height: $--checkbox-height * 0.6; }
  }
  .check-box {
    height: $--checkbox-height;
    width: $--checkbox-height;
    background-color: transparent;
    border: 1px solid $--line-color;
    border-radius: 50%;
    position: relative;
    display: block;
    margin: 0 auto;
    box-sizing: border-box;
    cursor:pointer;
    -webkit-appearance: none;
    &::before, &::after {
      box-sizing: border-box;
      position: absolute;
      height: 0;
      width: $--checkbox-height * .1;
      background-color: #FFF;
      display: inline-block;
      transform-origin: left top;
      border-radius: 5px;
      content: ' ';
      transition: opacity ease .5;
    }
    &::before {
      top:$--checkbox-height * .75;
      left: $--checkbox-height * .37;
      transform: rotate(-135deg);
    }
    &::after {
      top: $--checkbox-height * .5;
      left: $--checkbox-height * .11;
      transform: rotate(-45deg);
    }
  }

  .check-box:checked{
    background-color: $--assistant-color;
    border-color: $--assistant-color;
    &::after{
      height: $--checkbox-height * .3;
      animation: dothabottomcheck $--checkbox-duration/2 ease 0s forwards;
    }
    &::before{
      height: $--checkbox-height * .6;
      animation: dothatopcheck $--checkbox-duration ease 0s forwards;
    }
  }
</style>