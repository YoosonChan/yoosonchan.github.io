<template>
  <div class="fixed top-0 inset-x-0 z-0 p-0 y-layout-container">
    <AppHeader />
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.y-layout-container {
  --y-color-grey: #c9cdd4;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
