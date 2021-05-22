<template>
  <section class="modal-window-wrapper">
    <div class="modal-window-wrapper__window-edit-data window-data">
      <div class="modal-window-wrapper__content">
        <p class="modal-window-wrapper__header-modal-window header-modal-window">Редактирование задачи</p>
        <img class="modal-window-wrapper__close-modal-window" src="@/assets/icons/fi-rr-cross.svg" alt="icon"
             width="16" height="16" @click="closeModalWindowEdit()">
        <input type="text" class="modal-window-wrapper__edit-title-task-form edit-title-task-form"
               placeholder="Введите название задачи" v-model="tempTitle">
        <input type="number" min="0" class="modal-window-wrapper__edit-date-task-form edit-date-task-form"
               placeholder="Введите время выполнения" v-model="tempDate">
        <button type="submit" class="modal-window-wrapper__btn-add-task-modal btn-add-task-modal"
                @click="editTask()" :disabled="(tempTitle.length < 1 || !(tempDate > 0))">Редактировать
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Edittask",
  props: ['id'],
  data: () => ({
    tempTitle: '',
    tempDate: '',
  }),
  mounted() {
    this.tempTitle = this.currentTask.title;
    this.tempDate = this.currentTask.date;
  },
  computed:{
    currentTask(){return this.$store.getters.getTaskById(this.id)}
  },
  methods: {
    ...mapActions({
      changeTask: 'changeTask',
    }),
    closeModalWindowEdit(){
      this.$emit('edited')
    },
    editTask() {
      this.changeTask({id: this.id, toEdit: 'date', value: this.tempDate})
      this.changeTask({id: this.id, toEdit: 'title', value: this.tempTitle})
      this.$emit('edited')
    },
  },
  watch: {
    tempDate(value) {
      value = +value;
      this.tempDate += value;
      (value > 0 || value === '') ? this.tempDate = value : this.tempDate = value *- 1;
    }
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
  z-index 10
  border solid 1px red

  &__window-edit-data {
    position: absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 450px
    height 200px
    background-color #272732

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
