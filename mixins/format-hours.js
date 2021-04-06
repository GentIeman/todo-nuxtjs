export default {
  methods: {
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
