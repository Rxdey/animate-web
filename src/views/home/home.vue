<template>
  <div class="home">
    <div class="banner">
      <div class="banner-content">
        <img src="@/assets/img/banner.jpg" alt="" />
      </div>
    </div>
    <section class="tab-bar">
      <van-tabs v-model:active="activeKey" shrink line-width="0">
        <van-tab v-for="tab in tabList" :key="tab.key" :disabled="loadingStatus">
          <template #title>
            <div class="tab-item border-shadow">
              {{ tab.name }}
            </div>
          </template>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="scroll-list">
            <VanList v-model:loading="tab.loading" :finished="tab.finish" :offset="30" @load="getCollectionAll">
              <VanEmpty v-if="!tab.list.length" image="/img/empty.gif" class="empty">
                <span v-show="!loadingStatus">什么都没有~</span>
              </VanEmpty>
              <ComicList v-else class="home-list">
                <ComicCard v-for="(item, i) in tab.list" :key="i" :data="item" @click="toDetail(item)"></ComicCard>
              </ComicList>
            </VanList>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
  { name: '看过', key: 2, state: -1, list: [], loading: false, finish: false, page: 1 }
]);
const router = useRouter();
const activeKey = ref(0);
const refreshing = ref(false);
const current = computed(() => tabList.value[activeKey.value]);
const loadingStatus = ref(false);

const getCollectionAll = async (cb = () => {}) => {
  const query = {
    userId: 1,
    state: current.value.state,
    source: 1,
    page: current.value.page,
    pageSize: 20
  };
  loadingStatus.value = true;
  const res = await getAnimateListFeatch(query);
  tabList.value[activeKey.value].loading = false;
  const { state, data, msg } = res;
  if (!state || !data) {
    tabList.value[activeKey.value].finish = true;
    loadingStatus.value = false;
    return;
  }
  cb();
  tabList.value[activeKey.value].list = [...tabList.value[activeKey.value].list, ...data];
  tabList.value[activeKey.value].finish = data?.length < 20;
  tabList.value[activeKey.value].page += 1;
  loadingStatus.value = false;
};
// 下拉刷新
const onRefresh = () => {
  tabList.value[activeKey.value].page = 1;

  // tabList.value[activeKey.value].finish = false;
  nextTick(() => {
    getCollectionAll(() => {
      tabList.value[activeKey.value].list = [];
    }).then(() => {
      // 保持一会儿动画效果
      setTimeout(() => {
        refreshing.value = false;
      }, 500);
    });
  })
};
const toDetail = (comic: CollectionData) => {
  const { animateId } = comic;
  router.push({
    path: '/detail',
    query: {
      animateId
    }
  });
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
