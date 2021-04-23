<template>
  <div class="progress">
    <div class="progress__line" :style="{width: percentage + '%'}" style="color: red">
    </div>
  </div>
</template>

<script>
export default {
  props: ['percentage'],
  data: () => ({})
}
</script>

<style scoped lang="stylus">
.progress {
  position absolute
  top 55px
  height 15px
  width 100%
  grid-column 2 / 6

  &__line {
    position relative
    height 100%
    background linear-gradient(30deg, #95F9C3, #0B3866)
  }
}
</style>
