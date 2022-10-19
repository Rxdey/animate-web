<template>
  <router-view class="page"></router-view>
  <nav class="nav-bar">
    <router-link class="nav-item" v-for="nav in navList" :to="nav.path">
      <span role="link">{{ nav.name }}</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
const navList = [
  { name: 'Home', path: '/home' },
  { name: 'Search', path: '/search' },
  { name: 'User', path: '/user' }
];
</script>

<style lang="less">
@import '@/assets/css/common.less';
@import '@/assets/css/reset.less';

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
  overflow: hidden;
}
.page {
  flex: 1;
  height: 1px;
}

.nav-bar {
  display: flex;
  flex-flow: row nowrap;
  color: var(--color-white);
  padding: 16px 32px 32px 32px;
  position: relative;
  align-items: flex-end;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10rem;
    height: 6px;
    background-color: var(--border-color);
    box-shadow: 4px 4px 0 var(--shaodw-color);
    top: 0;
  }
  &::after {
    transform: rotate(5deg);
    left: 0;
  }
  &::before {
    left: -4.82rem;
    transform: rotate(-15deg);
    content: none;
  }
  .nav-item {
    --fs: 28px;
    --fm: 36px;
    --fl: 48px;
    flex: 1;
    text-align: center;
    text-shadow: 2px 2px var(--color-orange);
    position: relative;
    line-height: 1;
    font-size: var(--fm);
    span {
      position: relative;
      z-index: 1;
      display: inline-block;
      transform: skewY(-10deg);
    }
    &.active {
      font-size: var(--fl);
      &::after {
        content: '';
        position: absolute;
        width: 120px;
        height: 20px;
        background-color: var(--color-purple);
        bottom: -5px;
        left: 50%;
        margin-left: -60px;
        transform: skew(15deg);
        box-shadow: 0px 0px 8px var(--shaodw-color);
        border-bottom: 5px solid var(--border-color);
        border-left: 16px solid var(--border-color);
        transform: skewY(-10deg);
      }
    }
    &:nth-child(2) {
      &.active {
        &::after {
          border-left: none;
          border-right: none;
        }
      }
    }
    &:last-child {
      &.active {
        &::after {
          border-left: none;
          border-right: 16px solid var(--border-color);
        }
      }
    }
  }
  a {
    list-style: none;
    color: inherit;
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
