<template>
  <div class="detail">
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
            <span class="color-orange">{{ comicDetail.state }}</span>
          </p>
          <p class="desc" @click="onAlert">{{ comicDetail.desc }}</p>
        </div>
      </div>
    </div>
    <div class="detail--chapter"></div>
    <div class="detail--footer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef, Ref, toRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { detailFeatch } from '@/service/model/comic';
import { useComicStore } from '@/store/modules/useComicStore';
import { detailRespose } from '@/service/model/comic';
import { showDialog } from 'vant';

const route = useRoute();
const animaId: ComputedRef<string> = computed(() => route.query.animaId as string);
const comitStore = useComicStore();
const comicDetail: Ref<detailRespose> = ref({});

const getDetail = async (animaId: string) => {
  if (!animaId) return;
  const res = (await comitStore.GET_COMIC_DETAIL(animaId)) || {};
  comicDetail.value = res;
};

const onAlert = () => {
  const { name, desc } = comicDetail.value;
  showDialog({
    title: name,
    message: desc,
    theme: 'round-button'
  });
};

onMounted(() => {
  getDetail(animaId.value);
});
</script>

<style lang="less" scope>
@import url('./index.less');
</style>
