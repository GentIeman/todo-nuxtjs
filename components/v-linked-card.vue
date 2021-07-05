<template>
  <div class="linked" v-if="data.linked">
    <div class="linked-card">
      <vs-checkbox dark class="linked-card__checkbox"
                   @change="changeTask({id: data.linked, toEdit: 'status', value: !getTaskById(data.linked).status})"
                   :checked-force="getTaskById(data.linked).status"></vs-checkbox>
      <div class="linked-card__main-data">
        <header class="linked-card__item linked-card__header">
          <h2 class="title">{{ getTaskById(data.linked).title }}</h2>
        </header>
        <div class="linked-card__item linked-card__hour">
          <p class="date">{{ getTaskById(data.linked).date }} {{ formatHours(getTaskById(data.linked).date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatHours from '@/mixins/format-hours.js';
import {mapActions, mapGetters} from "vuex";

export default {
  name: "v-linked-card",
  props: ['data'],
  mixins: [formatHours],
  methods: {
    ...mapActions({
      changeTask: 'changeTask'
    }),
  },
  computed: {
    ...mapGetters(['getTaskById'])
  }

}
</script>

<style scoped lang="stylus">
.linked {
  position relative
  top 50px
  width 800px
  height auto

  .linked-card {
    display flex
    align-items center
    position relative
    min-width 800px
    background-color #272732
    height 80px
    border-radius 10px
    cursor default

    &__main-data {
      display flex
      justify-content center
      align-items flex-start
      flex-direction column
      flex-wrap wrap
      position relative
      left 30px
      width auto
      height 100%
      padding 0 15px

      &:after {
        content '';
        position absolute
        top 50%
        left 100%
        transform translate(-50%, -50%) rotate(90deg)
        width 44px
        height 1px
        background-color #64B5A2
      }
    }

    &__checkbox {
      position relative
      top 0
      left 25px
    }
  }
}

.title {
  font-family sans-serif
  font-size 20px
  color #fff
}

.date {
  font-family sans-serif
  color #fff
  font-size 14px
}

.show-link-task {
  visibility visible
}
</style>
