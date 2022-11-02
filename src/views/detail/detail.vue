<template>
  <div class="detail">
    <div style="flex: 1; min-height: 200px">
      <van-skeleton animate title avatar :row="3" :loading="loading">
        <div class="detail--book">
          <div class="detail__cover">
            <div class="shadow cover-wrap">
              <img v-lazy="comicDetail.cover" />
            </div>
          </div>
          <div class="detail__desc">
            <div class="desc-wrap">
              <p class="name ov-2">{{ comicDetail.name }}</p>
              <p class="author">
                <span>作者: {{ comicDetail.author }}</span>
              </p>
              <p class="color-orange">{{ comicDetail.state }}</p>
            </div>
          </div>
        </div>
      </van-skeleton>

      <van-skeleton :row="3" :loading="loading">
        <div class="desc">{{ comicDetail.desc }}</div>
      </van-skeleton>
      <van-skeleton :row="4" :loading="loading">
        <div class="detail--chapter">
          <div class="tool-bar">
            <div class="tool-title txt-shadow">全部章节</div>
            <div class="sort icon" @click="onSort">
              <img src="@/assets/img/sort.png" />
            </div>
          </div>
          <div class="detail--chapterlist">
            <ChapterItem v-for="(item, i) in chapterLimit" :key="i" :data="item" :active-history="activeHistory" @click.stop="onRead(item)" />
          </div>
        </div>
      </van-skeleton>
    </div>
    <div class="detail--footer">
      <div class="detail-bar">
        <Loading v-show="collectLoading" />
        <div class="icon" @click.stop="onCollect(collectState ? 0 : 1)" v-show="!collectLoading">
          <img src="@/assets/img/like-o.png" v-if="!collectState" />
          <img src="@/assets/img/like.png" v-else />
        </div>
      </div>
      <MyButton class="chapter-button" :loading="loading" @click="handleRead">
        <p class="ov-1">{{ activeHistory ? `继续阅读 (${lastChapterName})` : '开始阅读' }}</p>
      </MyButton>
    </div>
    <van-popup v-model:show="showAllChapter" position="bottom" :style="{ height: '70%' }" round>
      <div class="current-popup" v-if="showAllChapter">
        <div class="chapter-nav">
          <div class="chapter-nav__left"></div>
          <div class="chapter-nav__title">全部章节</div>
          <div class="chapter-nav__right">
            <van-icon name="cross" @click="showAllChapter = false" />
          </div>
        </div>
        <div class="chapter-body">
          <div class="popup-chapterlist">
            <ChapterItem v-for="(item, i) in chapterList" :key="i" :data="item" :active-history="activeHistory" @click.stop="onRead(item)" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef, Ref, toRef, onActivated } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { detailFeatch } from '@/service/model/comic';
import { useComicStore } from '@/store/modules/useComicStore';
import ChapterItem from './components/ChapterItem.vue';
import { detailRespose, detailChapter, getCollectionFeatch, collectionFeatch } from '@/service/model/comic';
import { showToast, Loading } from 'vant';
import { CollectionData } from '@/service/responseTypes';
import { changeTitle } from '@/utils';

const route = useRoute();
const router = useRouter();
const loading = ref(false); // 加载动画
const animateId: ComputedRef<string> = computed(() => route.query.animateId as string);
const comitStore = useComicStore();
const comicDetail = ref<detailRespose>({}); // 详情原始数据
const chapterList = ref<detailChapter[]>([]); // 章节列表(会重排序)
const sortType = ref(false);
const collectState: Ref<number> = ref(0);
const collectLoading = ref(false);
const showAllChapter = ref(false); // 所有章节弹窗
const collectDetail = ref<CollectionData | null>(null); // 获取历史阅读记录，之前忘了加上

const activeHistory = computed(() => collectDetail.value?.lastChapterId || '');
const lastChapterName = computed(() => {
  const res = chapterList.value.find(item => item.chapterId === collectDetail.value?.lastChapterId);
  return res ? res.chapter : '';
});
// 要展示的列表
const chapterLimit = computed(() => {
  const len = 16;
  if (!chapterList.value.length) return [];
  const chapter = [];
  chapter.push(...chapterList.value.slice(0, len - 2));
  if (chapterList.value.length > len) {
    chapter.push({ chapter: '...' });
    chapter.push(chapterList.value[chapterList.value.length - 1]);
  }
  return chapter;
});

// 继续/开始阅读
const handleRead = async (chapterId?: string | number, chapterName?: string) => {
  const updateParams = {
    animateId: animateId.value,
    lastChapterId: chapterId,
    lastChapter: 0 as string | number, // 历史章节索引
    lastPage: 0 as string | number
  };
  const { lastChapter, lastChapterId, lastPage } = collectDetail.value || {};
  // 点击的开始/继续阅读按钮
  if (!chapterId) {
    if (!comicDetail.value.chapterList) return;
    const current = comicDetail.value?.chapterList[0];
    if (!collectDetail.value?.lastChapterId) {
      updateParams.lastChapterId = current.chapterId;
      updateParams.lastChapter = 0;
      updateParams.lastPage = 0;
    } else {
      updateParams.lastChapterId = lastChapterId;
      updateParams.lastChapter = lastChapter || 0;
      updateParams.lastPage = lastPage || 0;
    }
  }
  // 同一话
  if (chapterId === lastChapterId) {
    updateParams.lastPage = lastPage || 0;
  }
  router.push({
    path: '/reader',
    query: updateParams
  });
};
// 点击章节
const onRead = (desc: detailChapter) => {
  const { chapter, chapterId } = desc;
  if (chapter === '...') {
    showAllChapter.value = true;
    return;
  }
  if (!animateId) {
    showToast('获取章节失败');
    return;
  }
  handleRead(chapterId, chapter);
};
// 订阅/取消
const onCollect = async (state: number) => {
  const params = {
    // userId: 1,
    source: 1,
    state,
    animateId: animateId.value,
    animateName: comicDetail.value.name || '',
    cover: comicDetail.value.cover || ''
  };
  collectLoading.value = true;
  const res = await collectionFeatch(params);
  collectLoading.value = false;
  const { state: code, msg, data } = res;
  if (state === 9) return;
  if (code !== 1) {
    showToast(msg);
    return;
  }
  collectState.value = state;
  showToast(`已${state ? '收藏' : '取消收藏'}`);
};
// 获取是否订阅
const getCollect = async (animateId: string) => {
  const res = await getCollectionFeatch({ source: 1, animateId });
  const { data, state } = res;
  collectState.value = data ? data.state : 0;
  if (data) collectDetail.value = data;
};
// 获取详情
const getDetail = async (animateId: string) => {
  if (!animateId) return;
  loading.value = true;
  const res = (await comitStore.GET_COMIC_DETAIL(animateId)) || {};
  loading.value = false;
  comicDetail.value = res;
  chapterList.value = JSON.parse(JSON.stringify(res.chapterList || []));
  changeTitle(res.name||'');
};
// 排序
const onSort = () => {
  sortType.value = !sortType.value;
  chapterList.value = chapterList.value.reverse();
};

onMounted(() => {
  getDetail(animateId.value).then(() => {
    getCollect(animateId.value);
    // 添加到观看历史
    onCollect(9);
  });
});
</script>

<style lang="less" scope>
@import url('./index.less');
</style>
