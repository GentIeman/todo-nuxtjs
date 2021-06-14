<template>
  <section class="card" @click.self="showFullSizeCard = true">
    <vs-checkbox dark class="card__checkbox"
                 @change="changeTask({id: data.id, toEdit: 'status', value: !data.status})"
                 :checked-force="data.status"></vs-checkbox>
    <div class="card__main-data main-data">
      <header>
        <h3 class="card__title title">{{ data.title }}</h3>
      </header>
      <p class="card__date date">{{ data.date }} {{ formatHours(data.date) }}</p>
    </div>
    <div class="card__block-control-task">
      <img class="card__edit-icon" src="@/assets/icons/fi-rr-edit.svg" alt="icon" width="25" height="25"
           @click="showModalWindowEdit = true">
      <img class="card__trash-icon" src="@/assets/icons/fi-rr-trash.svg" alt="icon"
           width="25" height="25" @click="removeTask(data.id)">
    </div>
    <Edittask :id="data.id" v-if="showModalWindowEdit"
              @edited='showModalWindowEdit = false'/>
    <Fullsizecard :data="data" v-if="showFullSizeCard" @close="showFullSizeCard = false"/>
    <Linked/>
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
    ...mapActions(['changeTask', 'removeTask']),
  }
}
</script>

<style scoped lang="stylus">
.card {
  display flex
  position relative
  min-width 800px
  height auto
  min-height 77px
  background-color #272732
  border-radius 10px
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  margin 20px 0
  cursor pointer
  transition background-color .5s ease-in-out

  &:hover {
    background-color #1E1E1E
  }

  &__checkbox {
    position relative
    top 0
    left 25px
  }

  &__main-data {
    display flex
    justify-content center
    align-self center
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

@media screen and (max-width 1300px) {
  .card {
    min-width 700px
  }
}
</style>
