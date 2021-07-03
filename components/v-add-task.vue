<template>
  <div>
    <svg class="intro-icon" v-if="showModalWindow === false && this.getTasks < 1" id="Layer_1" width="250px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{font-size:50.14px;fill:#fff;font-family:SegoePrint-Bold, Segoe Print;font-weight:700;}.cls-2,.cls-3{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:9.57px;}.cls-2{stroke-miterlimit:10;}.cls-3{stroke-linejoin:round;stroke-dasharray:347.68;}</style></defs><text class="cls-1" transform="translate(12 109.15)">Добавить задачу</text><path class="cls-2" d="M459.51,423.43a249.35,249.35,0,0,1-160.2-57.94"/><path class="cls-2" d="M267.06,333.24A249.35,249.35,0,0,1,209.12,173"/><polygon class="cls-3" points="500 423.27 479.75 434.96 459.51 446.65 459.51 423.27 459.51 399.89 479.75 411.58 500 423.27"/></svg>
    <section class="container__btn-add-task btn-add-task" @click="showModalWindow = true">
      <img class="container__btn-search btn-search" src="/icons/fi-rr-plus.svg" alt="icon" width="22"
           height="22">
    </section>
    <section class="modal-window-wrapper" v-show="showModalWindow">
      <div class="modal-window-wrapper__window-add-data window-data">
        <div class="modal-window-wrapper__content">
          <p class="modal-window-wrapper__header-modal-window header-modal-window">Ваша задача начинается с...</p>
          <img class="modal-window-wrapper__close-modal-window" src="/icons/fi-rr-cross.svg" alt="icon"
               width="16" height="16" @click="showModalWindow = false">
          <input type="text" autofocus spellcheck="true"
                 class="modal-window-wrapper__add-title-task-form add-title-task-form"
                 placeholder="Введите название задачи" v-model="titleTask">
          <input type="number" class="modal-window-wrapper__add-date-task-form add-date-task-form"
                 placeholder="Время выполнения" v-model="dateTask" @keyup.enter="addTask">
          <button type="submit" class="modal-window-wrapper__btn-add-task-modal btn-add-task-modal"
                  :disabled="(titleTask.length < 1 || !(dateTask > 0))" @click="addTask">Создать
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data: () => ({
    showModalWindow: false,
    titleTask: '',
    dateTask: 0
  }),
  computed: {
    ...mapGetters(['getTasks'])
  },
  methods: {
    ...mapActions({
      addNewTask: 'addNewTask',
    }),
    addTask() {
      if (this.addNewTask) {
        this.showModalWindow = false
      }
      this.addNewTask({
        title: this.titleTask,
        date: this.dateTask,
      })
      this.titleTask = '';
      this.dateTask = 0;
    },
  },
  watch: {
    dateTask(value) {
      value = +value;
      this.dateTask += value;
      (value > 0 || value === '') ? this.dateTask = value : this.dateTask = value * -1;
    }
  }
}
</script>

<style scoped lang="stylus">
div {
  position absolute
  bottom 0
  right 0

  .intro-icon {
    position absolute
    bottom 0
    right 80px
  }

  .container__btn-add-task {
    position absolute
    bottom 20px
    right 20px
  }

  .btn-add-task {
    display flex
    position fixed
    justify-content center
    align-items center
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

  .modal-window-wrapper {
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.8)
    z-index 5

    &__window-add-data {
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 450px
      height 200px

      .modal-window-wrapper__content {
        display flex
        justify-content space-between
        align-items center
        flex-wrap wrap
        position relative
        margin 0 40px
        padding 10px
        width auto
        height auto

        .modal-window-wrapper__header-modal-window {
          position relative
        }

        .header-modal-window {
          font-family sans-serif
          color #fff
        }

        .modal-window-wrapper__add-title-task-form {
          width 360px
          height 40px
          margin 10px 0
        }

        .add-title-task-form {
          background-color #1E1E1E
          border-radius 5px
          border none
          padding 0 20px
          color #7CD6B2
        }

        .modal-window-wrapper__close-modal-window {
          position absolute
          top 0
          right 0
          cursor pointer
        }

        .modal-window-wrapper__add-date-task-form {
          width 200px
          height 40px
        }

        .add-date-task-form {
          background-color #1E1E1E
          border-radius 5px
          border none
          padding 0 20px
          color #7CD6B2
        }

        .add-date-task-form:focus {
          border solid 1.5px #95F9C3
        }

        .add-title-task-form:focus {
          border solid 1.5px #95F9C3
        }

        .modal-window-wrapper__btn-add-task-modal {
          position relative
          width 140px
          height 40px
        }

        .btn-add-task-modal {
          border solid 1.5px #95F9C3
          background none
          border-radius 5px
          color #fff
          transition all .8s ease-in-out

          &:hover {
            background-color #95F9C3
          }

          &:focus {
            background-color #95F9C3
          }
        }
      }
    }

    .window-data {
      display flex
      justify-content center
      align-items center
      flex-direction column
      position relative
      background-color #272732
      border-radius 10px
      box-shadow rgba(0, 0, 0, 0.7) 0px 3px 8px 0px
      margin 0
      padding 0
    }
  }
}
</style>
