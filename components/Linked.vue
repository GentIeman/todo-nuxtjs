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
              <p class="card__title">{{ task.title }}</p>
              <div class="card__plus">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 511.997 511.997" style="enable-background:new 0 0 511.997 511.997;"
                     xml:space="preserve">
                    <g transform="translate(1 1)">
                      <g>
                        <g>
                          <path d="M211.26,389.24l-60.331,60.331c-25.012,25.012-65.517,25.012-90.508,0.005c-24.996-24.996-24.996-65.505-0.005-90.496
                            l120.683-120.683c24.991-24.992,65.5-24.992,90.491,0c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17
                            c-41.654-41.654-109.177-41.654-150.831,0L30.247,328.909c-41.654,41.654-41.654,109.177,0,150.831
                            c41.649,41.676,109.177,41.676,150.853,0l60.331-60.331c8.331-8.331,8.331-21.839,0-30.17S219.591,380.909,211.26,389.24z"/>
                          <path d="M479.751,30.24c-41.654-41.654-109.199-41.654-150.853,0l-72.384,72.384c-8.331,8.331-8.331,21.839,0,30.17
                            c8.331,8.331,21.839,8.331,30.17,0l72.384-72.384c24.991-24.992,65.521-24.992,90.513,0c24.991,24.991,24.991,65.5,0,90.491
                            L316.845,283.638c-24.992,24.992-65.5,24.992-90.491,0c-8.331-8.331-21.839-8.331-30.17,0s-8.331,21.839,0,30.17
                            c41.654,41.654,109.177,41.654,150.831,0l132.736-132.736C521.405,139.418,521.405,71.894,479.751,30.24z"/>
                        </g>
                      </g>
                    </g>
                </svg>
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
  computed: {
    ...mapGetters(['getTasks'])
  }
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

  .form {
    display flex
    justify-content center
    align-items center
    flex-direction column
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 800px
    height 700px
    background-color #272732
    border-radius 10px

    &__header {
      position absolute
      top 10%
      left 50%
      transform translate(-50%, -50%)

      .header {
        font normal 2em sans-serif
        color #fff
      }
    }
  }
}
</style>
