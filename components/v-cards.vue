<template>
  <section class="tasks">
    <ul class="tasks__list">
      <transition-group name="slide-fade">
        <v-card v-for="dataTask in sortedArray" :key="dataTask.id" :data="dataTask"/>
      </transition-group>
    </ul>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  props: ['sortDirection', 'sortKey'],
  computed: {
    ...mapGetters({getTasks:'getTasks',
    getLastAdded:'getLastAdded'
    }),
    sortedArray() {
      return this.sortTasks(this.sortKey, this.sortDirection)
    },
  },
  methods: {
    ...mapMutations({nullifingLastAdded:'changeSortedStatusForNewTask'}),
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
      tempObj.sort(dynamicSort(sortBy, direction));
      if (!isLocal && tempObj.length > 0) {

        tempObj.unshift(this.sortTasks('id', 'DESC', true)[0])
        let forDel=0
        if (tempObj.length>0) {
          for (let i = 1; i < tempObj.length; i++) {
            if (tempObj[i].id === tempObj[0].id && tempObj[i].id===this.getLastAdded) {
              forDel = i
              this.nullifingLastAdded()
            }
          }
        }
        tempObj.splice(forDel,1)
      }
      return tempObj
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
  grid-column 1 / 6

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
