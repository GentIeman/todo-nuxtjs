<template>
  <header class="header">
    <h1 class="header__heading heading">Todo-list</h1>
    <img @click="showSearchModalWindow = true" class="header__btn-search btn-search"
         src="@/assets/icons/fi-rr-search.svg" alt="icon" width="18" height="18">
    <Search v-show="showSearchModalWindow" @close="showSearchModalWindow = false"/>
  </header>
</template>

<script>
import Search from "./Search";

export default {
  components: {Search},
  data: () => ({
    showSearchModalWindow: false
  }),
}
</script>

<style scoped lang="stylus">
.header {
  display flex
  align-items center
  justify-content flex-end
  position relative
  width 100%
  top 0
  left 0
  background-color #21212B
  box-shadow rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
  height 56px
  z-index 2
  grid-column 1 / 6
  grid-row 1 / 2

  &__heading {
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  }

  .heading {
    font bold 1.5em sans-serif
    color #fff
    letter-spacing 3px
  }

  &__btn-search {
    position absolute
    right 20px
  }

  .btn-search {
    position relative
    cursor pointer
  }
}
</style>
