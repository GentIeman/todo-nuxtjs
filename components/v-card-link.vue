<template>
  <div class="card">
    <div class="card__inner">
      <div class="card__content">
        <div class="card__item card__content-title">
          <label>Задача</label>
          <p class="card__title title">{{ data.title }}</p>
        </div>
        <div class="card__item card__content-date">
          <label>Время выполения</label>
          <p class="card__date date">{{ data.date }} {{ formatHours(data.date) }}</p>
        </div>
      </div>
      <div class="card__item card__icon-link" @mouseover="hoverIcon = 'link'" @mouseleave="hoverIcon = 'unlink'" @click="createLink">
        <img class="icon-link" :src="'/icons/' + hoverIcon  +  '.svg'" alt="icon" width="25px" height="25px">
      </div>
      <div v-if="data.linked">
        {{ getTaskById(data.linked).title }}
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";
import formatHours from '@/mixins/format-hours.js';

export default {
  name: "v-card-link",
  props: ['data', 'parentId'],
  mixins: [formatHours],
  data: () => ({
    hoverIcon: 'unlink',
  }),
  computed: {
    ...mapGetters({getTasks: 'getTasks', getTaskById: 'getTaskById'})
  },
  methods: {
    ...mapActions({addLink: 'addLink'}),
    createLink() {
      this.addLink({
        id: this.parentId,
        linkTo: this.data.id,
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.card {
  display flex
  justify-content space-between
  width 100%
  height 60px
  border-bottom solid 1px #ccc
  transition background-color 1s ease
  cursor pointer

  &__inner {
    display flex
    justify-content space-between
    align-items flex-end
    position relative
    width 100%
    bottom 6px

    .card__content {
      display flex
      align-items flex-end
      position relative
      width 100%
      height 100%

      .card__content-title {
        min-width 300px
      }

      label {
        font normal 0.8em sans-serif
        color #444953
      }
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
