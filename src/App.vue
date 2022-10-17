<template>
  <router-view class="page"></router-view>
  <nav class="nav-bar">
      <router-link class="nav-item" v-for="nav in navList" :to="nav.path">
        <span role="link">{{nav.name}}</span>
      </router-link>
  </nav>
</template>

<script setup lang="ts">
const navList = [
  { name: 'Home', path: '/home' },
  { name: 'Search', path: '/search' },
  { name: 'User', path: '/user' },
];
</script>

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
  height: 1px;
}

.nav-bar {
  display: flex;
  flex-flow: row nowrap;
  color: var(--color-white);
  padding: 32px;
  .nav-item {
    flex: 1;
    align-items: center;
    text-align: center;
    text-shadow: 2px 2px var(--color-orange);
    position: relative;
    span {
      position: relative;
      z-index: 1;
    }
    &:last-child {
      &.active {
        &::after {
          border-left: none;
          // border-bottom: none;
          // border-top: 5px solid var(--border-color);
          border-right: 16px solid var(--border-color);
        }
      }
    }
    &:nth-child(2) {
      &.active {
        &::after {
          border-left: none;
          border-right: none;
          // border-top: 5px solid var(--border-color);
        }
      }
    }
    &.active {
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
      }
    }
  }
  a {
    list-style: none;
    color: inherit;
  }
}
</style>
