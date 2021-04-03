<template>
  <section class="container">
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
    <section class="loader">
      <div class="loader__line"></div>
    </section>
    <Cards />
    <Addtask />
  </section>
</template>

<script>

export default {
  data: () => ({
    sortElement: [
      {name: "задачам", sorter: "title"},
      {name: "длительности", sorter: "date"},
      {name: "статусу", sorter: "status"},
    ],
    upArrow: '../assets/icons/up-arrow.svg',
    downArrow: '../assets/icons/down-arrow.svg',
  })
}
</script>

<style lang="stylus">
.container {
  display grid
  grid-template-columns repeat(5, 1fr)
  grid-template-rows repeat(13, 4fr)
  position absolute
  width 100%
  height 100%

  .loader {
    position absolute
    top 55px
    width 100%
    height 15px
    background-color red
    grid-column 2 / 6
  }

  &__btn-add-task {
    display flex
    justify-content center
    align-items center
    position absolute
    right 20px
    bottom 20px
    width 44px
    height 44px
    border-radius 10px
    z-index 1
  }

  .btn-add-task {
    background linear-gradient(30deg, #95F9C3, #0B3866)
    cursor pointer
    transition all .5s ease-in-out

    &:before {
      content ''
      position absolute
      top 0
      left 0
      background linear-gradient(30deg, #95F9C3, #0B3866)
      width 100%
      height 100%
      border-radius 10px
      opacity 0
      z-index: -1;
    }

    &:hover:before {
      filter blur(5px)
      opacity 1
    }
  }

  .sidebar {
    position relative
    top 0
    left 0
    grid-column 1 / 2
    grid-row 1 / 14
    height 100%
    background-color #21212b

    &__wrapper {
      position relative
      top 123px
      left 0
      width 100%
    }

    &__header {
      position absolute
      top 0
      left 20px
    }

    .header {
      position relative
      margin 0
      font-family sans-serif
      font-size 24px
      color #fff
    }

    .block-sort {
      margin 0
      padding 0

      &__elements-list {
        display flex
        align-items center
        position relative
        top 5px
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
</style>
