<template>
  <section class="modal-window-background" @click.self="closeTask">
    <div class="full-size-card__inner" :class="{'slide-up': isSlide}">
      <div class="full-size-card">
        <vs-checkbox dark class="full-size-card__checkbox"
                     @change="changeTask({id: data.id, toEdit: 'status', value: !data.status})"
                     :checked-force="data.status"></vs-checkbox>
        <div class="full-size-card__main-data main-data">
          <header>
            <h3 class="full-size-card__title title">{{ data.title }}</h3>
          </header>
          <p class="full-size-card__date date">{{ data.date }} {{ formatHours(data.date) }}</p>
        </div>
        <div class="full-size-card__block-control-task">
          <img class="full-size-card__trash-icon" src="@/assets/icons/fi-rr-trash.svg" alt="icon"
               width="25" height="25" @click="removeTask(data.id)">
        </div>
      </div>
      <div class="link-task" :class="{'show-link-task' : isShowLink}">
        <a href="#" class="link-task__link link" @click="showModalWindowLink = true">Сделать связь с карточкой</a>
      </div>
    </div>
    <v-link v-if="showModalWindowLink" @close="showModalWindowLink = false"/>
  </section>
</template>

<script>
import {mapActions} from "vuex";
import formatHours from '@/mixins/format-hours.js';

export default {
  data: () => ({
    showFullSizeCard: false,
    isSlide: false,
    isShowLink: false,
    showModalWindowLink: false
  }),
  props: ["data"],
  mixins: [formatHours],
  methods: {
    ...mapActions({
      removeTask: 'removeTask',
      changeTask: 'changeTask'
    }),
    closeTask() {
      this.isSlide = true;
      this.isShowLink = false;
      setInterval(() => {
        this.$emit('close');
      }, 900)
    }
  },
  mounted() {
    setTimeout(() => {
      this.isShowLink = true;
    }, 900)
  }
}
</script>

<style scoped lang="stylus">
.modal-window-background {
  display flex
  justify-content center
  align-items center
  flex-direction column
  position fixed
  top: 0;
  left: 0;
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.8)
  z-index 5
  cursor pointer

  .full-size-card__inner {
    position relative
    top -100%
    width auto
    animation slide-down 1s forwards

    @keyframes slide-down {
      0% {
        top -100%
      }
      75% {
        top 10%
      }
      100% {
        top 0
      }
    }

    .full-size-card {
      display flex
      align-items center
      position relative
      top 0
      min-width 800px
      height 80px
      background-color #272732
      border-radius 10px
      box-shadow rgba(0, 0, 0, 0.7) 0px 3px 8px 0px

      &__checkbox {
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

        &__date {
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
        width 80px
        height 100%

        &__trash-icon {
          margin 0
          cursor pointer
        }
      }
    }

    @media screen and (max-width 1300px) {
      .full-size-card {
        width 700px
      }
    }

    .link-task {
      display flex
      justify-content flex-end
      position relative
      padding 5px 0
      visibility hidden

      &__link {
        position relative
        right 10px
      }

      .link {
        font normal 0.9em sans-serif
        color #535c68
        text-decoration none
        transition all .5s ease

        &:hover {
          color #8f8c8c
          text-decoration underline
        }
      }
    }

    .show-link-task {
      visibility visible
    }
  }

  .slide-up {
    animation slide-up 1s forwards

    @keyframes slide-up {
      0% {
        top 0
      }
      75% {
        top 10%
      }
      100% {
        top -100%
      }
    }
  }
}
</style>
