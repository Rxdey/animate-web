<template>
  <div class="reader"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { update, getChapterFeatch, type updateParams, type detailRespose, type detailChapter, type getChapterRespose } from '@/service/model/comic';
import { useComicStore } from '@/store/modules/useComicStore';
import { changeTitle } from '@/utils';
import { showToast } from 'vant';

const route = useRoute();
const loading = ref(false);
const comicDetail = ref<detailRespose>({}); // 详情原始数据
const comitStore = useComicStore();
const currentChapter = ref<detailChapter>({});
const currentImgList = ref<getChapterRespose[] | any[]>([]);

const animateId: ComputedRef<string> = computed(() => route.query.animateId as string);

// 查找下一话
const getNextChapter = (chapterId: string | number) => {
  const list = comicDetail.value.chapterList || [];
  const currentIndex = list.findIndex(item => Number(item.chapterId) == Number(chapterId));
  if (currentIndex >= list.length - 1) return false;
  return list[currentIndex + 1];
};
// 查找上一话
const getPrveChapter = (chapterId: string | number) => {
  const list = comicDetail.value.chapterList || [];
  const currentIndex = list.findIndex(item => Number(item.chapterId) == Number(chapterId));
  if (currentIndex <= 0) return false;
  return list[currentIndex - 1];
};

// 获取指定话
const getChapter = async (chapterId: string | number) => {
  const res = await getChapterFeatch({
    animateId: animateId.value,
    chapterId
  });
  const { state, msg, data } = res;
  if (!state) {
    showToast('请求结果异常');
    return [];
  }
  return data || [];
};

// 更新记录
const updateCollect = async () => {
  const data = route.query as any;
  await update({
    ...data,
    source: 1
  });
};
// 组装显示数据
const createImageList = async (chapterId: string | number) => {
  const next = getNextChapter(chapterId);
  const prve = getPrveChapter(chapterId);
  const currentList = await getChapter(chapterId);
  if (next && next.chapterId) {
    const nextList = await getChapter(next.chapterId);
    currentList.push(...nextList);
  }
  if (prve && prve.chapterId) {
    const prveList = await getChapter(prve.chapterId);
    currentList.unshift(...prveList);
  }
  return currentList;
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
  currentChapter.value = res.chapterList?.find(item => Number(item.chapterId) === Number(route.query.lastChapterId)) || {};
  // if (!currentChapter.value.chapterId) return;
  // const list = await getChapter(currentChapter.value.chapterId);
  // currentImgList.value = list;
};

onMounted(async () => {
  updateCollect();
  await getDetail(animateId.value);
});
</script>

<style lang="less" scope></style>
