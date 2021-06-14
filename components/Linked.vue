<template>
  <div class="form__wrapper">
    <div class="form">
      <header class="form__header">
        <h1 class="header">Сделать связь с:</h1>
      </header>
      <div class="form__inner">
        <ul class="form__list">
          <li class="form__item" v-for="task in getTasks">
            <div class="card">
              <p class="card__title title">{{ task.title }}</p>
              <div class="card__icon-link icon-link">
<!--                <img :src="'/icons/' + test + '.svg'" alt="icon" width="30px" height="30px">-->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Linked",
  itTask: false,
  hoverIcon: 'unlink',
  computed: {
    ...mapGetters(['getTasks'])
  },
}
</script>

<style scoped lang="stylus">
.form__wrapper {
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.8)
  z-index 5
  cursor default

  .form {
    display flex
    flex-direction column
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 800px
    height 500px
    background-color #272732
    border-radius 10px

    &__header {
      display flex
      justify-content center
      position relative
      margin-top 40px

      .header {
        font normal 2em sans-serif
        color #fff
      }
    }

    &__inner {
      display flex
      position relative
      margin-top 40px
      width 100%
      height 100%

      .form__list {
        position relative
        width 100%
        margin 0 60px

        .form__item {
          position relative

          &:first-child {
            border-top solid 1px #ccc
          }

          &:last-child {
            border-bottom none
          }

          .card {
            display flex
            justify-content space-between
            align-items center
            width 100%
            height 60px
            border-bottom solid 1px #ccc
            transition background-color .4s ease
            cursor pointer

            &:hover {
              background-color #535c68
            }

            &__title {
              position absolute
              left 50px
            }

            .title {
              font normal 1.3em sans-serif
              color #fff
            }

            &__icon-link {
              position absolute
              right 50px
            }

            .icon-link {
              cursor pointer
            }
          }
        }
      }
    }
  }
}
</style>
