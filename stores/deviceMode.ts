export const useDeviceModeStore = defineStore('deviceMode', {
  state() {
    return {
      mode: 'pc',
      isPhone: false
    }
  },
  actions: {
    changeMode(mode: 'pc' | 'phone') {
      this.mode = mode
      this.isPhone = mode === 'phone'
    }
  }
})