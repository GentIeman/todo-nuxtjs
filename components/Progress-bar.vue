<template>
  <div class="progress">
    <div class="progress__line" :style="{width: percentage + '%'}" style="color: red" @mouseover="showTooltipValue = true" @mouseleave="showTooltipValue = false">
    </div>
    <div class="tooltip" v-if="showTooltipValue">
      <span class="tooltip__text">Часов выполнено: {{ hours.done}} / {{ hours.total }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['percentage', 'hours'],
  data: () => ({
    showTooltipValue: false
  }),
}
</script>

<style scoped lang="stylus">
.progress {
  position absolute
  top 55px
  height auto
  width 100%
  grid-column 2 / 6

  &:before {
    content ''
    position absolute
    bottom -35px
    left 50%
    transform translate(-50%, -50%)
    width 350px
    height 1.4px
    background-color #252525
  }

  &__line {
    position relative
    transition width .3s ease-in
    height 15px
    background linear-gradient(30deg, #95F9C3, #0B3866)
    border-radius 0 0 5px 5px
    cursor pointer
  }

  .tooltip {
    display flex
    justify-content center
    align-items center
    position absolute
    top 50px
    left 50%
    transform translate(-50%, -50%)
    width 230px
    height 45px
    border-radius 10px
    background-color #272732
    animation slideUp .5s forwards

    @keyframes slideUp {
      0% {
        opacity 0
        top 50px
      }
      50% {
        opacity 0.5
      }
      100% {
        opacity 1
        top 53px
      }
    }

    &__text {
      color: #fff;
      font-family sans-serif
      font-size: 15px;
    }
  }
}
</style>
