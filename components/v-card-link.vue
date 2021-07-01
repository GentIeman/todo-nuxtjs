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
      <div class="card__item card__btn card__icon-link" :class="{'card__btn_click' : relationStyle}" @click="createLink"
           @mouseup="relationStyle = false" @mousedown="relationStyle = true">
        <img class="icon-link" :src="'/icons/' + hoverIcon  +  '.svg'" alt="icon" width="25px" height="25px">
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
    relationStyle: false
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
      this.hoverIcon = 'link'
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
  cursor pointer

  &__inner {
    display flex
    justify-content space-between
    align-items flex-end
    position relative
    width 100%
    bottom 6px

    .card__icon-link {
      display flex
      justify-content center
      align-items center
      position relative
      padding 5px
      border-radius 5px
    }

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

.card__btn_click {
  position relative

  &:after {
    content ''
    position absolute
    width 100%
    height 100%
    padding 10px
    border-radius 5px
    animation click 0.1s ease-in forwards
  }
}

@keyframes click {
  0% {
    opacity: 1;
    transform: scale3d(0.4, 0.4, 1);
  }
  80% {
    box-shadow: inset 0 0 0 2px lightgreen;
    opacity: .1;
  }
  100% {
    box-shadow: inset 0 0 0 2px lightgreen;
    opacity: 0;
    transform: scale3d(1.2, 1.2, 1);
  }
}
</style>
