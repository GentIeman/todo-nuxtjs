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
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTasks'])
  }
}
</script>

<style scoped lang="stylus">
.tasks {
  display flex
  justify-content center
  align-items center
  width 100%
  height auto
  grid-column 2 / 6
  grid-row 2 / 14

  .slide-fade-leave-active {
    transition all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  }

  .slide-fade-leave-to {
    transform translateX(30px)
    visibility hidden
  }
}
</style>
