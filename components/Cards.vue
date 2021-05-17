<template>
  <section class="tasks">
    <ul>
      <transition-group name="slide-fade">
        <Onecard v-for="dataTask in getTasks" :key="dataTask.id" :data="dataTask"/>
      </transition-group>
    </ul>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: ['sortDirection', 'sortKey'],
  computed: {
    ...mapGetters(['getTasks']),
    // sortedArray() {
    //   return this.sortTasks(this.sortKey, this.sortDirection)
    // },
    // reverseGetTasks() {
    //   return JSON.parse(JSON.stringify(this.getTasks)).reverse()
    // }
  },
  methods: {
    // sortTasks(sortBy, direction, isLocal = false) {
    //   function dynamicSort(property, dir) {
    //     let sortOrder = 1
    //     if (dir.toUpperCase() === 'DESC') {
    //       sortOrder = -1;
    //     }
    //     return function (a, b) {
    //       let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    //       return result * sortOrder;
    //     }
    //   }
    //
    //   let tempObj = JSON.parse(JSON.stringify(this.getTasks))
    //   tempObj.sort(dynamicSort(sortBy, direction))
    //   console.log('перед внутренней сортировкой')
    //   if (!isLocal && tempObj.length > 0) {
    //     console.log('Ищем позицию')
    //     let forDel = tempObj.findIndex(this.sortTasks('id', 'ASC', true)[0])
    //     console.log('впихиваем вперед')
    //     tempObj.unshift(this.sortTasks('id', 'ASC', true)[0])
    //     console.log('мочим ублюдка')
    //     tempObj.splice(forDel)
    //   }
    //   return tempObj; // this.$store.getters
    // }
  },
  sortTasks(sortBy, direction, isLocal = false) {
    function dynamicSort(property, dir) {
      let sortOrder = 1
      if (dir.toUpperCase() === 'DESC') {
        sortOrder = -1;
      }
      return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    }

    let tempObj = JSON.parse(JSON.stringify(this.getTasks))
    tempObj.sort(dynamicSort(sortBy, direction))
    if (!isLocal || tempObj.length > 0) {
      let forDel = tempObj.findIndex(this.sortTasks('id', 'ASC', true)[0])
      tempObj.unshift(this.sortTasks('id', 'ASC', true)[0])
    }
  }
}
</script>

<style scoped lang="stylus">
.tasks {
  display flex
  position absolute
  top 120px
  justify-content center
  align-items center
  width 100%
  height auto
  grid-column 2 / 6
  grid-row 1 / 6

  .slide-fade-leave-active {
    transition all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    opacity 1
  }

  .slide-fade-leave-to {
    transform translateX(70px)
    opacity 0
  }
}
</style>
