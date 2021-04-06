<template>
  <section class="modal-window-wrapper" @click.self="closeTask">
    <div class="full-size-card">
      <vs-checkbox dark class="card__checkbox"></vs-checkbox>
      <div class="card__main-data main-data">
        <header>
          <h3 class="card__title title">{{ data.title }}</h3>
        </header>
        <p class="card__date date">{{ data.date }} {{ formatHours(data.date) }}</p>
      </div>
      <div class="card__block-control-task">
        <img class="card__trash-icon" src="@/static/icons/fi-rr-trash.svg" alt="icon"
             width="25" height="25" @click="removeTask(data.id)">
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data: () => ({
    showFullSizeCard: false
  }),
  props: ["data"],
  methods: {
    ...mapActions({
      removeTask: 'removeTask',
    }),
    closeTask(){
      this.$emit('close');
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
  width 800px
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

  .card__main-data {
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

  .card__main-data:after {
    content '';
    position absolute
    top 50%
    left 100%
    transform translate(-50%, -50%) rotate(90deg)
    width 44px
    height 1px
    background-color #64B5A2
  }

  .card__block-control-task {
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
</style>
