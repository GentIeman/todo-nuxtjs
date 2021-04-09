<template>
  <section class="search-container">
    <form name="searchForm">
      <input type="search" placeholder="Поиск..." > <!-- v-model="someSearchTempVar" -->
    </form>
    <div class="block__elementSearching">
      <ul>
        <li v-for="searchElement in getSearchResult(someSearchTempVar)" :key="searchElement.id"> <!-- (someSearchTempVar) -->
          <p>{{ searchElement.title }}</p>
          <vs-checkbox @change="changeTask({id: searchElement.id, toEdit: 'status', value: !searchElement.status})"
                       :checked-force="searchElement.status"></vs-checkbox>
          <img src="@/assets/icons/fi-rr-trash.svg" alt="icon" @click="removeTask(searchElement.id)" class="close" width="20px"
               height="20px">
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: "Search",
  data: () => ({

  }),
  computed: {
    ...mapGetters(['getTasks'])
  },
  methods: {
    ...mapActions(['changeTask', 'removeTask']),
    getSearchResult(result){
      return this.$store.getters.getSearching(result)
    }
  }
}
</script>

<style scoped lang="stylus">
  .search-container {
    position fixed
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
  }
</style>
