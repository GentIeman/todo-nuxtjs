<template>
  <div class="card">
    <div class="card__content">
      <div class="card__item card__content-title">
        <label>Задача</label>
        <p class="card__title title">{{ data.title }}</p>
      </div>
      <div class="card__item card__content-date">
        <label>Время выполения</label>
        <p class="card__date date">{{ data.date }} {{ formatHours(data.date) }}</p>
      </div>
      <div class="card__item card__icon-link" @mouseover="hoverIcon = 'link'"  @mouseleave="hoverIcon = 'unlink'">
        <img class="icon-link" :src="'/icons/' + hoverIcon  +  '.svg'" alt="icon" width="25px" height="25px">
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import formatHours from '@/mixins/format-hours.js';

export default {
  name: "v-card-link",
  props: ['data'],
  mixins: [formatHours],
  data: () => ({
    itTask: false,
    hoverIcon: 'unlink',
  }),
  computed: {
    ...mapGetters(['getTasks']),
  }
}
</script>

<style scoped lang="stylus">
.card {
  display flex
  justify-content space-between
  align-items center
  width 100%
  height 60px
  border-bottom solid 1px #ccc
  transition background-color 1s ease
  cursor pointer

  &__content {
    display flex
    justify-content space-between
    align-items flex-end
    position relative
    width 100%
    height 100%
    bottom 6px

    label {
      font normal 0.8em sans-serif
      color #444953
    }
  }

  .title {
    font normal 1.1em sans-serif
    color #fff
  }

  .date {
    font normal 1.1em sans-serif
    color #fff
  }

  .icon-link {
    cursor pointer
  }
}
</style>
