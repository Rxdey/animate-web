<template>
  <div class="reader">
    <div class="reader-wrap" v-show="loading">
      <div class="reader-loading">
        <van-loading size="40" type="spinner">火热装载中~</van-loading>
      </div>
    </div>
    <template v-if="!loading">
      <CusotmSwipter v-if="currentImgList.length" :list="currentImgList" @slideChange="onSwiperChange" @init="onInit" :loadStatus="loadStatus" :lastPage="route.query.lastPage"></CusotmSwipter>
      <StatusBar v-if="currentChapter.chapterId" :current="currentChapter" @update="onUpdate"></StatusBar>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swiper from 'swiper';
import { update, getChapterFeatch, type updateParams, type detailRespose, type detailChapter, type getChapterRespose } from '@/service/model/comic';
import { useComicStore } from '@/store/modules/useComicStore';
import { changeTitle, rxLocalStorage } from '@/utils';
import { showToast } from 'vant';
import CusotmSwipter from './components/CusotmSwipter.vue';
import StatusBar from './components/StatusBar.vue';

const route = useRoute();
const loading = ref(false);
const comicDetail = ref<detailRespose>({}); // 详情原始数据
const comitStore = useComicStore();
const currentChapter = ref<getChapterRespose>({}); // 当前页面
const currentImgList = ref<getChapterRespose[] | any[]>([]);
const loadStatus = ref(false);
const direction = ref(0); // TODO ==> 反向逻辑

const animateId: ComputedRef<string> = computed(() => route.query.animateId as string);

// 查找下一话
const getNextChapter = (chapterId: string | number) => {
  const list = comicDetail.value.chapterList || [];
  const currentIndex = list.findIndex(item => Number(item.chapterId) == Number(chapterId));
  if (currentIndex >= list.length - 1) return false;
  return list[currentIndex + 1];
};
// 查找上一话
const getPrevChapter = (chapterId: string | number) => {
  const list = comicDetail.value.chapterList || [];
  const currentIndex = list.findIndex(item => Number(item.chapterId) == Number(chapterId));
  if (currentIndex <= 0) return false;
  return list[currentIndex - 1];
};

// 获取指定话
const getChapter = async (chapterId: string | number) => {
  return await comitStore.GET_COMIC_CHAPTER_IMG(animateId.value, chapterId);
};

// 更新记录
const updateCollect = async () => {
  const data = route.query as any;
  await update({
    ...data,
    source: 1
  });
};
// 获取详情
const getDetail = async (animateId: string) => {
  if (!animateId) return;
  loading.value = true;
  const res = (await comitStore.GET_COMIC_DETAIL(animateId)) || {};
  loading.value = false;
  comicDetail.value = res;
  changeTitle(res.name || '');
  if (!res.chapterList) return;
  // currentChapter.value = res.chapterList?.find(item => Number(item.chapterId) === Number(route.query.lastChapterId)) || {};
};

// 初始化
const onInit = (index: number, cb = (e: any) => {}) => {
  onSwiperChange(index, cb);
};
// 切换时触发
const onSwiperChange = async (index: number, cb = (e: any) => {}) => {
  const { chapterId } = currentImgList.value[index] || {};
  currentChapter.value = currentImgList.value[index];
  if (!chapterId) return;
  const nextChpater = getNextChapter(chapterId);
  const prevChpater = getPrevChapter(chapterId);

  if (nextChpater && nextChpater.chapterId) {
    const isNext = !!currentImgList.value.find((item: getChapterRespose) => item.chapterId === nextChpater.chapterId);
    if (!isNext) {
      const nextList = await getChapter(nextChpater.chapterId);
      currentImgList.value = [...currentImgList.value, ...nextList];
    }
  }

  if (prevChpater && prevChpater.chapterId) {
    const isPrev = !!currentImgList.value.find((item: getChapterRespose) => item.chapterId === prevChpater.chapterId);
    if (!isPrev) {
      const prevList = await getChapter(prevChpater.chapterId);
      currentImgList.value = [...prevList, ...currentImgList.value];
      cb(prevList);
    }
  }
};
const onUpdate = (current: getChapterRespose) => {
  rxLocalStorage.setItem(`${current.animateId}`, JSON.stringify(current));
  update({
    animateId: current.animateId as string,
    lastChapterId: current.chapterId,
    lastChapterName: current.title,
    lastPage: current.index,
    // lastChapter: ,
    source: 1
  });
};

onMounted(async () => {
  updateCollect();
  await getDetail(animateId.value);
  currentImgList.value = await getChapter(route.query.lastChapterId as string);
});
</script>

<style lang="less" scope>
@import './index.less';
</style>
