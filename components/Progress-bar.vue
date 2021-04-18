<template>
  <section class="loader">
    <div class="loader__line">
    </div>
    <p style="color: #fff">Часов выполнено: {{ percentage.done }}/{{ percentage.total }}</p>
  </section>
</template>

<script>
export default {
  props: ['percentage'],
  data: () => ({}),
}
</script>

<style scoped lang="stylus">

.loader {
  position absolute
  top 55px
  width 100%
  height 15px
  grid-column 2 / 6
  border solid 1px red

  &__line {
    position relative
    width 50px
    height 100%
    background-color red
  }
}
</style>
