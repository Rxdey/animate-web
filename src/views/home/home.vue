<template>
  <div class="home">
    <div class="banner">
      <div class="banner-content">
        <img src="@/assets/img/banner.jpg" alt="" />
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
          <List v-model:loading="tab.loading" :finished="tab.finish" loading-text="..." :offset="30" @load="getCollectionAll">
            <Empty v-if="!tab.list.length" image="/img/empty.gif" class="empty"> 什么都没有~ </Empty>
            <ComicList v-else class="home-list">
              <ComicCard v-for="(item, i) in tab.list" :key="i" :data="item" @click="toDetail(item)"></ComicCard>
            </ComicList>
          </List>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { List, Empty } from 'vant';
import ComicList from '@/components/ComicList/ComicList.vue';
import ComicCard from '@/components/ComicCard/ComicCard.vue';
import { getAnimateListFeatch } from '@/service/model/comic';
import { CollectionData } from '@/service/responseTypes';

type TabListType = {
  name: string;
  key: number;
  state: number;
  list: CollectionData[];
  loading: boolean;
  finish: boolean;
  page: number;
};
const tabList = ref<TabListType[]>([
  { name: '书架', key: 1, state: 1, list: [], loading: false, finish: false, page: 1 },
  { name: '看过', key: 2, state: 0, list: [], loading: false, finish: false, page: 1 }
]);
const router = useRouter();
const activeKey = ref(0);
const current = computed(() => tabList.value[activeKey.value]);

const getCollectionAll = async () => {
  const query = {
    userId: 1,
    state: current.value.state,
    source: 1,
    page: current.value.page,
    pageSize: 20
  };
  const res = await getAnimateListFeatch(query);
  tabList.value[activeKey.value].loading = false;
  const { state, data, msg } = res;
  if (!state || !data) {
    tabList.value[activeKey.value].finish = true;
    return;
  }
  tabList.value[activeKey.value].list = [...tabList.value[activeKey.value].list, ...data];
  tabList.value[activeKey.value].finish = data?.length < 20;
  tabList.value[activeKey.value].page += 1;
};
const toDetail = (comic: CollectionData) => {
  const { animateId } = comic;
  router.push({
    path: '/detail',
    query: {
      animateId
    }
  });
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
