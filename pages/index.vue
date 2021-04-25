<template>
  <section class="container">
    <Header/>
    <aside class="sidebar">
      <div class="sidebar__wrapper">
        <p class="sidebar__header header">Сортировка</p>
        <ul class="block-sort">
          <li class="block-sort__elements-list elements-list" v-for="elements in sortElement" :key="elements.sorter">
            <a class="block-sort__elements-title elements-title block-sort__elements-title_active">{{
                elements.name
              }}</a>
            <div class="block-sort__icons">
              <!--              <img src="@/assets/icons/up-arrow.svg" alt="icon">-->
              <!--              <img src="@/assets/icons/down-arrow.svg" alt="icon">-->
            </div>
          </li>
        </ul>
      </div>
    </aside>
    <Progress-bar :percentage="calculatedPercentage" v-if="currentHours.total > 0" :hours="currentHours"/>
    <Cards/>
    <Addtask/>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    sortElement: [
      {name: "задачам", sorter: "title"},
      {name: "длительности", sorter: "date"},
      {name: "статусу", sorter: "status"},
    ],
    upArrow: '../assets/icons/up-arrow.svg',
    downArrow: '../assets/icons/down-arrow.svg',
  }),
  computed: {
    ...mapGetters(['getTasks']),
    currentHours() {
      let total = 0;
      let done = 0;
      this.getTasks.forEach(function (element) {
        total += Number(element.date)
        if (element.status === true) {
          done += Number(element.date)
        }
      })
      return {total: total, done: done}
    },
    calculatedPercentage() {
      return (this.currentHours.done / this.currentHours.total) * 100
    }
  },
}
</script>

<style lang="stylus">
.container {
  display grid
  grid-template-columns repeat(5, 1fr)
  grid-template-rows repeat(5, minmax(auto-fill, 4fr))
  position absolute
  width 100%
  height 100%

  .sidebar {
    position relative
    top 0
    left 0
    grid-column 1 / 1
    grid-row 1 / 4
    height 100%
    background-color #21212b

    &__wrapper {
      position relative
      top 123px
      left 0
      width 100%
      height auto

      .sidebar__header {
        position relative
        top 0
        left 20px
      }

      .header {
        font-family sans-serif
        font-size 24px
        color #fff
      }

      .block-sort {
        position relative
        margin 0
        padding 0

        &__elements-list {
          display flex
          align-items center
          position relative
          top 0
          left 0
          padding: 15px 60px;

          &__elements-title {
            position relative
            margin 0
          }

          .elements-title {
            text-decoration none
            font-family sans-serif
            color #7f8c8d
            cursor pointer
            transition all .5s ease
          }
        }

        &__elements-title_active:hover {
          color: #535c68
        }
      }
    }
  }
}
</style>
