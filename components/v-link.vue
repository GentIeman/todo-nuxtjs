<template>
  <div class="form__wrapper" @click.self="close">
    <div class="form">
      <header class="form__header">
        <h1 class="header">Сделать связь с:</h1>
      </header>
      <div class="form__inner">
        <div class="form__list">
          <v-card-link v-for="task in getTasks" :data="task" :key="task.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VCardLink from "./v-card-link";

export default {
  name: "Linked",
  components: {VCardLink},
  props: ['id'],
  computed: {
    ...mapGetters(['getTasks'])
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="stylus">
.form__wrapper {
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.8)
  z-index 5
  cursor default

  .form {
    display flex
    flex-direction column
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 800px
    height 500px
    background-color #272732
    border-radius 10px

    &__header {
      display flex
      justify-content center
      position relative
      margin-top 40px

      .header {
        font normal 2em sans-serif
        color #fff
      }
    }

    &__inner {
      display flex
      justify-content center
      position relative
      margin-top 40px
      width 100%
      height 100%

      .form__list {
        position relative
        width 80%
      }
    }
  }
}

</style>
