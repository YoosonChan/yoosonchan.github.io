<template>
  <div class="contaniner fixed top-0 inset-x-0 z-0 y-layout-container">
    <AppHeader />
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.y-layout-container {
  height: 100vw;
  overflow: scroll;
}
</style>
