<template>
  <section class="container">
    <aside class="sidebar">
      <div class="sidebar__wrapper">
        <p class="sidebar__header header">Сортировка</p>
        <ul class="block-sort">
          <li class="block-sort__elements-list elements-list" v-for="elements in sortElement" :key="elements.sorter">
            <a class="block-sort__elements-title elements-title block-sort__elements-title_active">{{
                elements.name
              }}</a>
            <div class="block-sort__icons">
              <img :src="upArrow" alt="icon">
              <img :src="downArrow" alt="icon">
            </div>
          </li>
        </ul>
      </div>
    </aside>
    <section class="loader">
      <div class="loader__line"></div>
    </section>
    <section class="tasks">
      <ul>
        <li class="tasks__task-list" v-for="(dataTask, index) in getTasks" :key="dataTask.id">
          <transition name="slide-fade">
            <div class="card" v-show="showCard">
              <vs-checkbox dark class="card__checkbox"></vs-checkbox>
              <div class="card__main-data">
                <header>
                  <h3 class="card__title title">{{ dataTask.title }}</h3>
                </header>
                <p class="card__date date">{{ dataTask.date }} {{ formatHours(dataTask.date) }}</p>
              </div>
              <div class="card__block-control-task">
                <img class="card__edit-icon" src="@/static/icons/fi-rr-edit.svg" alt="icon" width="25" height="25"
                     @click="showModalWindowEdit = true">
                <img class="card__trash-icon" src="@/static/icons/fi-rr-trash.svg" alt="icon"
                     width="25" height="25" @click="removeTask(index)">
              </div>
            </div>
          </transition>
          <section class="modal-window-wrapper" v-show="showModalWindowEdit">
            <div class="modal-window-wrapper__window-edit-data window-data">
              <div class="test">
                <p class="modal-window-wrapper__header-modal-window header-modal-window">Вам доступно для редактирования
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
              <div class="card__main-data">
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
      </ul>
    </section>
    <section class="container__btn-add-task btn-add-task" @click="showModalWindow = true">
      <img class="container__btn-search btn-search" src="@/static/icons/fi-rr-plus.svg" alt="icon" width="22"
           height="22">
    </section>
    <section class="modal-window-wrapper" v-show="showModalWindow">
      <div class="modal-window-wrapper__window-add-data window-data">
        <div class="test">
          <p class="modal-window-wrapper__header-modal-window header-modal-window">Ваша задача начинается с...</p>
          <img class="modal-window-wrapper__close-modal-window" src="@/static/icons/fi-rr-cross.svg" alt="icon"
               width="16" height="16" @click="showModalWindow = false">
          <input type="text" autofocus class="modal-window-wrapper__add-title-task-form add-title-task-form"
                 placeholder="Введите название задачи" v-model="titleTask">
          <input type="number" min="0" class="modal-window-wrapper__add-date-task-form add-date-task-form"
                 placeholder="Время выполнения" v-model="dateTask" @keyup.enter="addTask">
          <button type="submit" class="modal-window-wrapper__btn-add-task-modal btn-add-task-modal"
                  :disabled="(titleTask.length < 1 || !dateTask > 0)" @click="addTask">Создать
          </button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    titleTask: '',
    dateTask: 0,
    sortElement: [
      {name: "задачам", sorter: "title"},
      {name: "длительности", sorter: "date"},
      {name: "статусу", sorter: "status"},
    ],
    upArrow: './static/icons/up-arrow.svg',
    downArrow: './static/icons/down-arrow.svg',
    showModalWindow: false,
    showModalWindowEdit: false,
    tempTitle: '',
    tempDate: '',
    showCard: true
  }),
  computed: {
    ...mapGetters(['getTasks'])
  },
  methods: {
    ...mapActions({
      addNewTask: 'addNewTask',
      removeTask: 'removeTask',
      changeTask: 'changeTask'
    }),
    removeTask(index) {
      this.showCard = false
    },
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
  }
}
</script>

<style lang="stylus">
.container {
  display grid
  grid-template-columns repeat(5, 1fr)
  grid-template-rows repeat(13, 4fr)
  position absolute
  width 100%
  height 100%

  .tasks {
    display flex
    justify-content center
    align-items center
    width 100%
    height auto
    grid-column 2 / 6
    grid-row 2 / 14

    //.slide-fade-leave-active {
    //  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    //}
    //
    //.slide-fade-leave-to {
    //  transform: translateX(15px);
    //  visibility: hidden;
    //}

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
  }

  .loader {
    position absolute
    top 55px
    width 100%
    height 15px
    background-color red
    grid-column 2 / 6
  }

  &__btn-add-task {
    display flex
    justify-content center
    align-items center
    position absolute
    right 20px
    bottom 20px
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
    top: 0;
    left: 0;
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.8)
    z-index 5

    &__window-add-data {
      position: absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 450px
      height 200px

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

  .sidebar {
    position relative
    top 0
    left 0
    grid-column 1 / 2
    grid-row 1 / 14
    height 100%
    background-color #21212b

    &__wrapper {
      position relative
      top 123px
      left 0
      width 100%
    }

    &__header {
      position absolute
      top 0
      left 20px
    }

    .header {
      position relative
      margin 0
      font-family sans-serif
      font-size 24px
      color #fff
    }

    .block-sort {
      margin 0
      padding 0

      &__elements-list {
        display flex
        align-items center
        position relative
        top 5px
        left 0
        padding: 15px 60px;

        &__elements-title {
          position relative
          margin 0
        }

        .elements-title {
          text-decoration none
          font-family sans-serif
          color #7f8c8d
          cursor pointer
          transition all .5s ease
        }
      }

      &__elements-title_active:hover {
        color: #535c68
      }
    }
  }
}
</style>
