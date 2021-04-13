<template>
  <div>
    <header class="header">
      <img @click="showSearchModalWindow = true" class="header__btn-search btn-search" src="@/assets/icons/fi-rr-search.svg" alt="icon" width="18" height="18">
    </header>
    <Search v-show="showSearchModalWindow" @close="showSearchModalWindow = false"/>
  </div>
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
    top 0
    left 0
    background-color #21212B
    box-shadow rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
    height 56px
    z-index 1

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
