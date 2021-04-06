<template>
  <section>
    <div class="card" @click.self="showFullSizeCard = true">
      <vs-checkbox dark class="card__checkbox"
                   @change="changeTask({id: data.id, toEdit: 'status', value: !data.status})"
                   :checked-force="data.status"></vs-checkbox>
      <div class="card__main-data main-data">
        <header>
          <h3 class="card__title title">{{ data.title }}</h3>
        </header>
        <p class="card__date date">{{ data.date }} {{ this.formatHours(data.date) }}</p>
      </div>
      <div class="card__block-control-task">
        <img class="card__edit-icon" src="@/static/icons/fi-rr-edit.svg" alt="icon" width="25" height="25"
             @click="showModalWindowEdit = true" >
        <img class="card__trash-icon" src="@/static/icons/fi-rr-trash.svg" alt="icon"
             width="25" height="25" @click="removeTask(data.id)">
      </div>
    </div>
    <Edittask :id="data.id" v-if="showModalWindowEdit"
              @edited='showModalWindowEdit = false'/>
    <Fullsizecard :data="data" v-if="showFullSizeCard" @close="showFullSizeCard = false"/>
  </section>
</template>

<script>
import {mapActions} from "vuex";
import formatHours from '@/mixins/format-hours.js';

export default {
  name: "Onecard",
  props: ['data'],
  mixins: [formatHours],
  data: () => ({
    showModalWindowEdit: false,
    showFullSizeCard: false
  }),
  methods: {
    ...mapActions({
      removeTask: 'removeTask',
      changeTask: 'changeTask'
    })
  }
}
</script>

<style scoped lang="stylus">
.card {
  display flex
  align-items center
  position relative
  min-width 800px
  height auto
  min-height 77px
  background-color #272732
  border-radius 10px
  box-shadow rgba(0, 0, 0, 0.7) 0px 3px 8px 0px
  margin 20px 0
  cursor pointer

  .card__checkbox {
    position relative
    top 0
    left 25px
  }

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

    .card__title {
      position relative
      margin 0
      padding 0
    }

    .title {
      font-family sans-serif
      font-size 20px
      color #fff
    }

    .card__date {
      position relative
      padding 0
      margin 0
    }

    .date {
      font-family sans-serif
      color #fff
      font-size 14px
    }
  }

  &__main-data:after {
    content '';
    position absolute
    top 50%
    left 100%
    transform translate(-50%, -50%) rotate(90deg)
    width 44px
    height 1px
    background-color #64B5A2
  }

  &__block-control-task {
    display flex
    position absolute
    right 0
    justify-content center
    align-items center
    width 120px
    height 100%

    .card__edit-icon {
      margin 0 10px
      cursor pointer
    }

    .card__trash-icon {
      margin 0 10px
      cursor pointer
    }
  }
}
</style>
