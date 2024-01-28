<template>
  <div class="fixed top-0 inset-x-0 z-0 p-0 y-layout-container">
    <AppHeader />
    <div class="fixed top-0 inset-x-0 z-10 box-border y-page-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.y-layout-container {
  --y-color-grey: #c9cdd4;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .y-page-container {
    --y-page-padding: 6vw;
    width: 100vw;
    height: 100vh;
    padding: var(--y-page-padding);
  }
}
</style>
