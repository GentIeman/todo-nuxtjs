<template>
  <div class="progress">
    <div class="progress__line" @mouseover="showTooltipValue = true" @mouseleave="showTooltipValue = false" :style="{width: percentage.progress + '%'}" style="color: red">
    </div>
    <div class="tooltip" v-if="showTooltipValue">
      <span class="tooltip__text">Часов выполнено: {{ percentage.done }} / {{ percentage.total }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['percentage'],
  data: () => ({
    showTooltipValue: false,
  })
}
</script>

<style scoped lang="stylus">
.progress {
  position fixed
  top 55px
  height auto
  width 100%
  grid-column 1 / 6
  z-index 2

  &__line {
    position relative
    transition width .3s ease-in
    height 10px
    background linear-gradient(30deg, #95F9C3, #0B3866)
    box-shadow rgba(0, 0, 0, 0.35) 0px 5px 15px
    cursor pointer
  }

  .tooltip {
    display flex
    justify-content center
    align-items center
    position absolute
    top 40px
    left 50%
    transform translate(-50%, -50%)
    width 230px
    height 45px
    border-radius 10px
    background-color #3c3c4c
    box-shadow rgba(0, 0, 0, 0.35) 0px 5px 15px
    animation slideUp .5s forwards

    @keyframes slideUp {
      0% {
        opacity 0
        top 40px
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
