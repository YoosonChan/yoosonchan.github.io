<script setup lang="ts">
const isMobile = ref(false)
const deviceMode = useDeviceModeStore()
const route = useRoute()
watch(() => isMobile.value, () => {
  deviceMode.changeMode(isMobile.value ? 'phone' : 'pc')
})
const handleChangeBtnClick = () => {
  isMobile.value = !isMobile.value
  if (route.path === '/') {
    // 首页消除聚焦enter触发问题
    (document.querySelector('.y-typing-container')! as HTMLElement).focus()
  }
}
</script>

<template>
  <div class="fixed top-0 inset-x-0 z-50 flex justify-between items-center py-3 backdrop-blur-xl y-header-container"
    :class="isMobile ? 'px-3 y-mobile-header-container' : 'flex-col'">
    <NuxtLink to="/">
      <img class="rounded-full shadow-md y-logo" src="../assets/img/logo.png" alt="logo">
    </NuxtLink>
    <NuxtLink to="/">
      <div class="cursor-pointer y-header-title-container"
        :class="isMobile ? 'translate-x-[-3vw]' : 'translate-x-0 translate-y-[-3vw] rotate-[-90deg]'">
        yooooooson</div>
    </NuxtLink>
    <a-button class="shadow-md y-device-change-btn" @click="handleChangeBtnClick" shape="circle" tabindex="-1">
      <template v-if="isMobile">
        <icon-computer />
      </template>
      <template v-else>
        <icon-mobile />
      </template>
    </a-button>
  </div>
</template>

<style scoped lang="less">
.y-header-container {
  --y-color-grey: #c9cdd4;
  --y-header-item-size: 4vw;
  --y-header-item-max-size: 3rem;
  width: 6vw;
  height: 100vh;

  &.y-mobile-header-container {
    width: 100vw;
    height: 6vw;
  }

  .y-logo,
  .y-device-change-btn {
    width: var(--y-header-item-size);
    height: var(--y-header-item-size);
    max-width: var(--y-header-item-max-size);
    max-height: var(--y-header-item-max-size);
  }

  .y-header-title-container {
    font-family: 'Fira Code';
    font-size: 3vw;
    font-weight: 700;
    color: var(--y-color-grey);

    &:hover {
      color: #000;
      transition: 1s;
    }
  }

  .y-device-change-btn {
    font-size: calc(0.6 * var(--y-header-item-size));
  }
}

@media (min-width: 1080px) {
  .y-header-container {
    width: 4.8rem;

    &.y-mobile-header-container {
      height: 4.8rem;
    }

    .y-device-change-btn {
      font-size: calc(0.6 * var(--y-header-item-max-size)) !important;
    }
  }
}
</style>