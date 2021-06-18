<template>
  <section class="modal-window-wrapper" @click.self="closeTask">
    <div class="full-size-card" :class="{'slide-up': isSlide}">
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
  </section>
</template>

<script>
import {mapActions} from "vuex";
import formatHours from '@/mixins/format-hours.js';

export default {
  data: () => ({
    showFullSizeCard: false,
    isSlide: false
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
      setInterval(() => {
        this.$emit('close');
      }, 750)
    }
  }
}
</script>

<style scoped lang="stylus">
.modal-window-wrapper {
  display flex
  justify-content center
  align-items center
  position fixed
  top: 0;
  left: 0;
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.8)
  z-index 5
  cursor pointer
}

.full-size-card {
  display flex
  align-items center
  position relative
  top -100%
  min-width 800px
  height 80px
  background-color #272732
  border-radius 10px
  box-shadow rgba(0, 0, 0, 0.7) 0px 3px 8px 0px
  margin 20px 0
  animation full-size-animate .8s forwards

  @keyframes full-size-animate {
    0% {
      top -100%
    }
    75% {
      top 50px
    }
    100% {
      top 0
    }
  }

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

@media screen and (max-width 1300px){
  .full-size-card {
    width 700px
  }
}

.slide-up {
  animation: slide-up .8s ease-in

  @keyframes slide-up {
    0% {
      top 0
    }
    75% {
      top 50px
    }
    100% {
      top -100%
    }
  }
}
</style>
