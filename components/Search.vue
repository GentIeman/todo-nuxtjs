<template>
  <div class="search-wrapper" @click.self="closeSearch">
    <section class="search-container">
      <form name="search">
        <input id="searchInput" type="search" class="search" placeholder="Поиск..." v-model="someSearch">
        <label for="searchInput">
          <button class="search__btn-search-task btn-search-task">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23.707 22.293L17.738 16.324C19.3646 14.3346 20.1644 11.7961 19.9719 9.23356C19.7793 6.67103 18.6092 4.28053 16.7036 2.55652C14.798 0.832514 12.3026 -0.0931045 9.73367 -0.0288727C7.16472 0.0353591 4.71873 1.08453 2.90164 2.90162C1.08455 4.71871 0.035382 7.16469 -0.0288498 9.73364C-0.0930816 12.3026 0.832537 14.798 2.55655 16.7036C4.28056 18.6092 6.67106 19.7793 9.23359 19.9718C11.7961 20.1644 14.3346 19.3646 16.324 17.738L22.293 23.707C22.4816 23.8892 22.7342 23.99 22.9964 23.9877C23.2586 23.9854 23.5094 23.8802 23.6948 23.6948C23.8803 23.5094 23.9854 23.2586 23.9877 22.9964C23.99 22.7342 23.8892 22.4816 23.707 22.293ZM10 18C8.41778 18 6.87106 17.5308 5.55546 16.6518C4.23987 15.7727 3.21449 14.5233 2.60899 13.0615C2.00349 11.5997 1.84506 9.99113 2.15374 8.43928C2.46243 6.88743 3.22435 5.46197 4.34317 4.34315C5.46199 3.22433 6.88746 2.4624 8.4393 2.15372C9.99115 1.84504 11.5997 2.00347 13.0615 2.60897C14.5233 3.21447 15.7727 4.23985 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.154 14.1545 15.6542 15.6542C14.1545 17.154 12.121 17.9976 10 18Z"
                fill="white"/>
            </svg>
          </button>
        </label>
      </form>
      <div class="results-container">
        <ul>
          <li class="result-card" v-for="searchElement in getSearchResult(someSearch)" :key="searchElement.id">
            <div class="card">
              <vs-checkbox dark class="card__checkbox"
                           @change="changeTask({id: searchElement.id, toEdit: 'status', value: !searchElement.status})"
                           :checked-force="searchElement.status"></vs-checkbox>
              <div class="card__main-data main-data">
                <header>
                  <h3 class="card__title title">{{ searchElement.title }}</h3>
                </header>
                <p class="card__date date">{{ searchElement.date }} {{ formatHours(searchElement.date) }}</p>
              </div>
              <div class="card__block-control-task">
                <img class="card__trash-icon" src="@/assets/icons/fi-rr-trash.svg" alt="icon"
                     width="25" height="25" @click="removeTask(searchElement.id)">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import formatHours from '@/mixins/format-hours.js';

export default {
  name: "Search",
  mixins: [formatHours],
  data: () => ({
    someSearch: ''
  }),
  methods: {
    ...mapActions(['changeTask', 'removeTask']),
    getSearchResult(result) {
      return this.$store.getters.getSearching(result)
    },
    closeSearch() {
      this.someSearch = ''
      this.$emit('close');
    }
  }
}
</script>

<style scoped lang="stylus">
.search-wrapper {
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.5)
  z-index 2

  .search-container {
    display flex
    justify-content center
    align-items center
    flex-direction column
    position absolute
    top 30%
    left 50%
    transform translate(-50%, -50%)
    width 800px
    height 100px
    background-color #272732
    border-radius 10px

    .results-container {
      position absolute
      top 75px
      width 750px
      height auto
      border-radius 0 0 10px 10px

      .result-card {

        .card {
          display flex
          align-items center
          position relative
          width auto
          height auto
          min-height 77px
          background-color #272732
          cursor pointer
          transition all .5s ease-in
          border-bottom solid 1px #64B5A2

          &:hover {
            background-color #2c3e50
          }

          .card__checkbox {
            position relative
            top 0
            left 25px
          }

          &__main-data {
            display flex
            justify-content center
            align-items flex-start
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

            .card__trash-icon {
              margin 0
              cursor pointer
            }
          }
        }
      }
    }

    .search {
      position relative
      top 0
      left 0
      width 750px
      height 60px
      padding 0 20px
      background-color #1E1E1E
      border-radius 10px
      color #ccc
      outline none
      font-size 17px
      border none

      &:before {
        content ('')
        position absolute
        bottom 0
        left 0
        width 0
        height 3px
        background-color red
        transition 0.5s
      }

      &:hover:before {
        width 100%
      }
    }

    .search__btn-search-task {
      display flex
      justify-content center
      align-items center
      position absolute
      top 50%
      right 30px
      transform translate(-50%, -50%)
      width 30px
      height 30px
    }

    .btn-search-task {
      background linear-gradient(30deg, #95F9C3, #0B3866)
      cursor pointer
      transition all .5s ease-in-out
      border none
      border-radius 10px
    }
  }
}
</style>
