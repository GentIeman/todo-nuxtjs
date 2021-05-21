<template>
  <section class="container">
    <Header @showSideBar="isShowSideBar = true" :propShowSidebar="isShowSideBar" @hideSideBar="isShowSideBar = false "/>
    <aside class="sidebar" :class="{'sidebar-slide-left': isShowSideBar}">
      <div class="sidebar__wrapper">
        <p class="sidebar__header header">Сортировка</p>
        <ul class="block-sort">
          <li class="block-sort__element-list element-list" :class="{'element-slide-left': isShowSideBar}"
              v-for="element in sortElement" :key="element.sorter">
            <a class="block-sort__element-title element-title block-sort__elements-title_active">{{
                element.name
              }}</a>
            <div class="block-sort__icons">
              <img class="block-sort__arrow icon-up" src="@/assets/icons/up-arrow.svg" alt="icon" width="20px"
                   height="20px" @click="setSortParams(element.sorter, 'ASC')">
              <img class="block-sort__arrow icon-down" src="@/assets/icons/down-arrow.svg" alt="icon" width="20px"
                   height="20px" @click="setSortParams(element.sorter, 'DESC')">
            </div>
          </li>
        </ul>
      </div>
    </aside>
    <Progress-bar :percentage="totalCounters" v-if="totalCounters.total > 0"/>
    <Cards :sortDirection="sortDirection" :sortKey="sortKey"/>
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
    sortDirection: '',
    sortKey: '',
    upArrow: '../assets/icons/up-arrow.svg',
    downArrow: '../assets/icons/down-arrow.svg',
    isShowSideBar: false
  }),
  computed: {
    ...mapGetters(['getTasks']),
    totalCounters() {
      let total = 0;
      let done = 0;
      let doneTasksCount = 0;
      this.getTasks.forEach(function (element) {
        total += Number(element.date)
        if (element.status === true) {
          done += (Number(element.date))
          doneTasksCount++
        }
      })
      return {total: total, done: done, progress: (doneTasksCount / this.getTasks.length) * 100}
    },
  },
  methods: {
    setSortParams(key, dir) {
      this.sortDirection = dir
      this.sortKey = key
    },
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
    left -100%
    grid-column 1 / 2
    grid-row 1 / 2
    height 100%
    background-color #21212b
    z-index 2
    transition all 1.5s ease

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

        &__element-list {
          display flex
          align-items center
          position relative
          top 0
          left 0
          padding 15px 40px
          transition 1s ease all

          &:nth-child(1) {
            transform translateX(-100%)
          }

          &:nth-child(2) {
            transform translateX(-130%)
          }

          &:nth-child(3) {
            transform translateX(-160%)
          }

          .block-sort__icons {
            display flex
            position relative

            .block-sort__arrow {
              cursor pointer
              margin: 0 2px
            }
          }

          .block-sort__element-title {
            position relative
          }

          .element-title {
            text-decoration none
            font normal 1.3em sans-serif
            color #7f8c8d
            cursor pointer
            transition all .5s ease
          }

          @media screen and (max-width 1300px) {
            .element-title {
              font-size 1em
            }
          }
        }

        .element-slide-left {
          transition 1s all ease
          transform translateY(0)
        }

        &__element-title_active:hover {
          color: #535c68
        }
      }
    }
  }

  .sidebar-slide-left {
    left 0
  }

  @media screen and (max-width 1300px) {
    .sidebar {
      width 95%
    }
  }

  .sidebar-slide-left {
    left 0
    transition all .5s ease
  }
}
</style>
