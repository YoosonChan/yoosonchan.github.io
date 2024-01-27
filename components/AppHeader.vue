<script setup lang="ts">
const isMobile = ref(false)
const deviceMode = useDeviceModeStore()
watch(() => isMobile.value, () => {
  deviceMode.changeMode(isMobile.value ? 'phone' : 'pc')
})
</script>

<template>
  <div
    class="fixed top-0 inset-x-0 z-50 flex flex-col justify-between items-center py-3 backdrop-blur-xl y-header-container">
    <img class="rounded-full shadow-md y-logo" src="../assets/img/logo.png" alt="logo">
    <div>
      <a-button class="shadow-md y-device-change-btn" @click="isMobile = !isMobile" shape="circle">
        <template v-if="isMobile">
          <icon-computer />
        </template>
        <template v-else>
          <icon-mobile />
        </template>
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.y-header-container {
  --y-header-item-size: 4vw;
  width: 6vw;
  height: 100vh;

  .y-logo,
  .y-device-change-btn {
    width: var(--y-header-item-size);
    height: var(--y-header-item-size);
  }

  .y-device-change-btn {
    font-size: calc(0.6 * var(--y-header-item-size));
  }
}
</style>