<template>
  <div class="reader">
    <div class="reader-loading" v-if="loading">
      <van-loading size="40" type="spinner">火热装载中~</van-loading>
    </div>
    <template v-else>
      <CusotmSwipter v-if="currentImgList.length" :list="currentImgList" @slideChange="onSwiperChange" :loadStatus="loadStatus" :lastPage="route.query.lastPage"></CusotmSwipter>
      <StatusBar :current="currentChapter"></StatusBar>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swiper from 'swiper';
import { update, getChapterFeatch, type updateParams, type detailRespose, type detailChapter, type getChapterRespose } from '@/service/model/comic';
import { useComicStore } from '@/store/modules/useComicStore';
import { changeTitle } from '@/utils';
import { showToast } from 'vant';
import CusotmSwipter from './components/CusotmSwipter.vue';
import StatusBar from './components/StatusBar.vue';

const route = useRoute();
const loading = ref(false);
const comicDetail = ref<detailRespose>({}); // 详情原始数据
const comitStore = useComicStore();
const currentChapter = ref<getChapterRespose>({}); // 当前页面
const currentImgList = ref<getChapterRespose[] | any[]>([]);
const loadStatus = ref(true);

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
const getChapter = (chapterId: string | number) => {
  return comitStore.GET_COMIC_CHAPTER_IMG(animateId.value, chapterId);
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

// 切换时触发
const onSwiperChange = async (index: number, data: getChapterRespose, swiper: Swiper) => {
  const { chapterId } = data || {};
  currentChapter.value = data;
  if (!chapterId) return;
  const nextChpater = getNextChapter(chapterId);
  const prevChpater = getPrevChapter(chapterId);
  if (nextChpater && nextChpater.chapterId) {
    // const isNext = comitStore.hasChapterData(animateId.value, nextChpater.chapterId);
    const isNext = !!currentImgList.value.find((item: getChapterRespose) => item.chapterId === nextChpater.chapterId);
    if (!isNext) {
      const nextList = await getChapter(nextChpater.chapterId);
      currentImgList.value = [...currentImgList.value, ...nextList];
    }
  }
  if (prevChpater && prevChpater.chapterId) {
    // const isPrev = comitStore.hasChapterData(animateId.value, prevChpater?.chapterId);
    const isPrev = !!currentImgList.value.find((item: getChapterRespose) => item.chapterId === prevChpater.chapterId);
    if (!isPrev) {
      const prevList = await getChapter(prevChpater.chapterId);
      currentImgList.value = [...prevList, ...currentImgList.value];
      setTimeout(() => {
        swiper.slideTo(index + Number(prevList[0].total), 0);
      }, 0);
      setTimeout(() => {
        loadStatus.value = false;
      }, 1000);
    }
  }
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
