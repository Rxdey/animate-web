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
            <div class="detail__chapteritem" v-for="(item, i) in chapterLimit" :key="i">
              <div class="chapter-card border-shadow" :class="{ active: activeHistory === item.chapterId }" @click.stop="onRead(item)">
              <p class="ov-1">{{ item.chapter }}</p></div>
            </div>
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
      <van-skeleton :row="1" :loading="loading" class="button-skeleton">
        <div class="shadow detail-button">开始阅读</div>
      </van-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef, Ref, toRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { detailFeatch } from '@/service/model/comic';
import { useComicStore } from '@/store/modules/useComicStore';
import { detailRespose, detailChapter, getCollectionFeatch, collectionFeatch } from '@/service/model/comic';
import { showDialog, showToast, Loading } from 'vant';
import { CollectionData } from '@/service/responseTypes';

const route = useRoute();
const loading = ref(false);
const animateId: ComputedRef<string> = computed(() => route.query.animateId as string);
const comitStore = useComicStore();
const comicDetail: Ref<detailRespose> = ref({});
const sortType = ref(false);
const activeHistory = ref('');
const collectState: Ref<number> = ref(0);

const collectLoading = ref(false);

// 要展示的列表
const chapterLimit = computed(() => {
  const len = 16;
  const chapterList = comicDetail.value.chapterList || [];
  if (!chapterList.length) return [];
  const chapter = [];
  chapter.push(...chapterList.slice(0, len - 2));
  if (chapterList.length > len) {
    chapter.push({ chapter: '...' });
    chapter.push(chapterList[chapterList.length - 1]);
  }
  return chapter;
});

const onRead = (desc: detailChapter) => {
  console.log(desc);
};
// 订阅/取消
const onCollect = async (state: number) => {
  const params = {
    userId: 1,
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
  const res = await getCollectionFeatch({ userId: 1, source: 1, animateId });
  const { data, state } = res;
  collectState.value = data ? data.state : 0;
};
// 获取详情
const getDetail = async (animateId: string) => {
  if (!animateId) return;
  loading.value = true;
  const res = (await comitStore.GET_COMIC_DETAIL(animateId)) || {};
  loading.value = false;
  comicDetail.value = res;
};
// 排序
const onSort = () => {
  sortType.value = !sortType.value;
  comicDetail.value = {
    ...comicDetail.value,
    chapterList: comicDetail.value.chapterList?.reverse()
  };
};
onMounted(() => {
  getDetail(animateId.value).then(() => {
    getCollect(animateId.value);
    onCollect(9);
  });
});
</script>

<style lang="less" scope>
@import url('./index.less');
</style>
