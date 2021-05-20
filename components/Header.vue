<template>
  <header class="header">
    <svg @click="showSideBar" v-show="this.propShowSidebar !== true" class="header__open-sidebar-hamburger open-sidebar-hamburger" width="30px" height="30px" id="Outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>183 burger menu</title><rect y="11" width="24" height="2" rx="1"/><rect y="4" width="24" height="2" rx="1"/><rect y="18" width="24" height="2" rx="1"/></svg>
    <svg @click="hideSideBar" v-show="this.propShowSidebar !== false" class="header__hide-sidebar-arrow hide-sidebar-arrow" width="40px" height="40px"
         id="Outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M10.88,17.715a1,1,0,0,0,0-1.415L7.588,13.007,18,13a1,1,0,0,0,0-2l-10.414.007L10.88,7.715A1,1,0,0,0,9.466,6.3L5.88,9.886a3,3,0,0,0,0,4.243l3.586,3.586A1,1,0,0,0,10.88,17.715Z"/>
    </svg>
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
  props: ['propShowSidebar'],
  data: () => ({
    showSearchModalWindow: false,
  }),
  methods: {
    showSideBar() {
      this.propShowSidebar = false
      this.$emit('showSideBar')
    },
    hideSideBar() {
      this.propShowSidebar = true
      this.$emit('hideSideBar')
    }
  }
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



  &__open-sidebar-hamburger {
    position absolute
    top 50%
    left 40px
    transform translate(-50%, -50%)
  }

  .open-sidebar-hamburger {
    fill #fff
    cursor pointer
  }

  &__hide-sidebar-arrow {
    position absolute
    top 50%
    left 40px
    transform translate(-50%, -50%)
  }

  .hide-sidebar-arrow {
    cursor pointer
    fill #fff
  }

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
