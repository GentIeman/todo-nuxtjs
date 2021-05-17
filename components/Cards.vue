<template>
  <section class="tasks">
    <ul>
      <transition-group name="slide-fade">
        <Onecard v-for="dataTask in getTasks" :key="dataTask.id" :data="dataTask"/>
      </transition-group>
    </ul>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: ['sortDirection', 'sortKey'],
  computed: {
    ...mapGetters(['getTasks']),
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
.tasks {
  display flex
  position absolute
  top 120px
  justify-content center
  align-items center
  width 100%
  height auto
  grid-column 2 / 6
  grid-row 1 / 6

  .slide-fade-leave-active {
    transition all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    opacity 1
  }

  .slide-fade-leave-to {
    transform translateX(70px)
    opacity 0
  }
}
</style>
