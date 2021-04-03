<template>
  <div>
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
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data: () => ({
    showModalWindow: false,
    titleTask: '',
    dateTask: 0
  }),
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
  }
}
</script>

<style scoped lang="stylus">
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
</style>
