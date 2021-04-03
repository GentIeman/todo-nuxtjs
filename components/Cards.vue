<template>
  <section class="tasks">
    <ul>
      <transition-group name="slide-fade">
        <li class="tasks__task-list" v-for="(dataTask, index) in getTasks" :key="dataTask.id">
          <div class="card">
            <vs-checkbox dark class="card__checkbox"></vs-checkbox>
            <div class="card__main-data main-data">
              <header>
                <h3 class="card__title title">{{ dataTask.title }}</h3>
              </header>
              <p class="card__date date">{{ dataTask.date }} {{ formatHours(dataTask.date) }}</p>
            </div>
            <div class="card__block-control-task">
              <img class="card__edit-icon" src="@/static/icons/fi-rr-edit.svg" alt="icon" width="25" height="25"
                   @click="showModalWindowEdit = true">
              <img class="card__trash-icon" src="@/static/icons/fi-rr-trash.svg" alt="icon"
                   width="25" height="25" @click="removeTask(dataTask.id)">
            </div>
          </div>
          <section class="modal-window-wrapper" v-show="showModalWindowEdit">
            <div class="modal-window-wrapper__window-edit-data window-data">
              <div class="test">
                <p class="modal-window-wrapper__header-modal-window header-modal-window">Вам доступно для
                  редактирования
                  задачи</p>
                <img class="modal-window-wrapper__close-modal-window" src="@/static/icons/fi-rr-cross.svg" alt="icon"
                     width="16" height="16" @click="showModalWindowEdit = false">
                <input type="text" autofocus class="modal-window-wrapper__edit-title-task-form edit-title-task-form"
                       placeholder="Введите название задачи"
                       @input="changeTask({id: dataTask.id, toEdit: 'title', value: tempTitle})" v-model="tempTitle">
                <input type="number" min="0" class="modal-window-wrapper__edit-date-task-form edit-date-task-form"
                       placeholder="Введите время выполнения"
                       @input="changeTask({id: dataTask.id, toEdit: 'date', value: tempDate})" v-model="tempDate">
                <button type="submit" class="modal-window-wrapper__btn-add-task-modal btn-add-task-modal"
                        @click="editTask()">Редактировать
                </button>
              </div>
            </div>
          </section>
          <section class="modal-window-wrapper">
            <div class="full-size-card">
              <vs-checkbox dark class="card__checkbox"></vs-checkbox>
              <div class="card__main-data main-data">
                <header>
                  <h3 class="card__title title">{{ dataTask.title }}</h3>
                </header>
                <p class="card__date date">{{ dataTask.date }} {{ formatHours(dataTask.date) }}</p>
              </div>
              <div class="card__block-control-task">
                <img class="card__trash-icon" src="@/static/icons/fi-rr-trash.svg" alt="icon"
                     width="25" height="25" @click="removeTask(index)">
              </div>
            </div>
          </section>
        </li>
      </transition-group>
    </ul>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    titleTask: '',
    dateTask: 0,
    tempTitle: '',
    tempDate: '',
    showModalWindowEdit: false,
  }),
  methods: {
    ...mapActions({
      removeTask: 'removeTask',
      changeTask: 'changeTask'
    }),
    formatHours(hours) {
      let char = String(hours).substr(-1)
      let str = 'часов'
      switch (+char) {
        case 1:
          str = 'час'
          break;
        case 2:
        case 3:
        case 4:
          str = 'часа'
          break;
      }
      return str
    },
    editTask() {
      this.showModalWindowEdit = false
    },
  },
  computed: {
    ...mapGetters(['getTasks'])
  },
}
</script>

<style scoped lang="stylus">
.tasks {
  display flex
  justify-content center
  align-items center
  width 100%
  height auto
  grid-column 2 / 6
  grid-row 2 / 14

  .slide-fade-leave-active {
    transition: all .7s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-leave-to {
    transform: translateX(30px);
    visibility: hidden;
  }

  .card {
    display flex
    align-items center
    position relative
    min-width 800px
    height auto
    min-height 77px
    background-color #272732
    border-radius 10px
    box-shadow rgba(0, 0, 0, 0.7) 0px 3px 8px 0px
    margin 20px 0

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

      .card__edit-icon {
        margin 0 10px
        cursor pointer
      }

      .card__trash-icon {
        margin 0 10px
        cursor pointer
      }
    }
  }

  .modal-window-wrapper {
    position fixed
    top: 0;
    left: 0;
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.8)
    z-index 5

    &__window-edit-data {
      position: absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 450px
      height 200px
      background-color #272732

      .test {
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

        .modal-window-wrapper__edit-title-task-form {
          width 360px
          height 40px
          margin 10px 0
        }

        .edit-title-task-form {
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

        .modal-window-wrapper__edit-date-task-form {
          width 180px
          height 40px
        }

        .edit-date-task-form {
          background-color #1E1E1E
          border-radius 5px
          border none
          padding 0 20px
          color #7CD6B2
        }

        .edit-date-task-form:focus {
          border solid 1.5px #95F9C3
        }

        .edit-title-task-form:focus {
          border solid 1.5px #95F9C3
        }

        .modal-window-wrapper__btn-add-task-modal {
          position relative
          width 140px
          height 40px
          margin 0
        }

        .btn-add-task-modal {
          border solid 1.5px #95F9C3
          background none
          border-radius 5px
          color #fff
          transition all .5s ease-in-out

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
