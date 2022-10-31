<template>
  <div class="container">
    <router-view class="page" v-slot="{ Component }">
      <keep-alive :include="mainStore.keepPageList">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <nav class="nav-bar" v-if="isShowList">
      <router-link class="nav-item" v-for="nav in navList" :to="nav.path">
        <span role="link">{{ nav.name }}</span>
      </router-link>
    </nav>
    <CatPaw />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/modules/useMainStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import CatPaw from '@/components/CatPaw/CatPaw.vue';

const route = useRoute();
const mainStore = useMainStore();
const showNavList = ['/home', '/search', '/user'];
const isShowList = computed(() => showNavList.includes(route.path));

const navList = [
  { name: '收藏', path: '/home' },
  { name: '找找？', path: '/search' },
  { name: 'ME', path: '/user' }
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
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  position: relative;
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
  background-color: var(--color-purple);
  transform: skewY(5deg);
  bottom: 15px;
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
    transform: skewY(-10deg);
    span {
      position: relative;
      z-index: 1;
      display: inline-block;
      // transform: skewY(-10deg);
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
        box-shadow: 0px 0px 8px var(--shadow-color);
        border-bottom: 5px solid var(--border-color);
        border-left: 16px solid var(--border-color);
        transform: skew(-10deg);
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
