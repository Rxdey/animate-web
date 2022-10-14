<template>
  <router-view class="page"></router-view>
  <nav class="nav-bar">
    <div class="nav-list">
      <div class="nav-bar__item">Home</div>
      <div class="nav-bar__item">User</div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="less">
html,
body {
  height: 100%;
  overflow: hidden;
}
#app {
  font-size: 28px;
  max-width: 10rem;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  height: 100%;
}
.page {
  flex: 1;
}
.nav-bar {
  height: 110px;
  position: relative;
  color: var(--color-white);
  text-shadow: 2px 4px 0 var(--color-origin);
  .nav-list {
    display: flex;
    flex-flow: row nowrap;
    background-color: var(--color-brown);
    border-radius: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 4px 4px 2px var(--color-yellow);
    border-bottom: 2px solid var(--color-purple);
    border-right: 2px solid var(--color-purple);
  }
  &__item {
    text-align: center;
    flex: 1;
    padding: 8px 32px;
    width: 160px;
    &:first-child {
      border-right: 2px solid var(--color-bg);
    }
    &:last-child {
      border-left: 2px solid var(--color-bg);
    }
  }
}
</style>
