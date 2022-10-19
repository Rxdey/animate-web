<template>
  <div class="home">
    <div class="banner">
      <div class="banner-content">
        <img src="@/assets/img/banner.jpg" alt="">
      </div>
    </div>
    <section class="tab-bar">
      <van-tabs v-model:active="activeKey" shrink line-width="0">
        <van-tab v-for="tab in tabList" :key="tab.key">
          <template #title>
            <div class="tab-item shadow">
              {{ tab.name }}
            </div>
          </template>
          <div class="comic-list">
            <ComicCard v-for="(item, i) in tab.list" :key="i"></ComicCard>
          </div>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ComicCard from '@/components/ComicCard/ComicCard.vue';

const tabList = ref([
  { name: '书架', key: 1, list: [], loading: false, finish: false, page: 1 },
  { name: '看过', key: 2, list: [], loading: false, finish: false, page: 1 }
]);
const activeKey = ref(0);

const changeActive = (key: number) => {
  activeKey.value = key;
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
