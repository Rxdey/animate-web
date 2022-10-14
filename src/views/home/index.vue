<template>
  <div class="home">
    <div class="banner"></div>
    <div class="tab-tag">
      <div class="tab-item shadow active">书架</div>
      <div class="tab-item shadow">看过</div>
    </div>
    <div class="comic-list">
      <div class="comic-card shadow"></div>
      <div class="comic-card shadow"></div>
      <div class="comic-card shadow"></div>
      <div class="comic-card shadow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
</script>

<style lang="less" scope>
.banner {
  height: 450px;
  margin: -40px 0 16px 0;
  background-color: var(--color-yellow);
  transform: skewY(2deg);
  background-image: url('@/assets/img/banner.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  // box-shadow: var(--color-yellow);
  box-shadow: 0 8px 0 var(--color-yellow);
  border-bottom: 4px solid var(--color-purple);
}
.tab-tag {
  padding: 16px 32px;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 16px;
}
.tab-item {
  width: 33%;
  text-align: center;
  font-size: var(--font-xl);
  line-height: 1.2;
  text-shadow: 2px 4px 0 var(--color-origin);
  &.active {
    background-color: var(--color-purple);
    color: var(--color-white);
  }
  &+.tab-item {
    margin-left: 32px;
  }
}
.comic-list {
  --column-grap: 36px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - var(--column-grap)));
  justify-content: center;
  row-gap: 24px;
  column-gap: var(--column-grap);
  padding: 0 16px;
}
.comic-card {
  height: 280px;
  // border-radius: 16px;
}
</style>
