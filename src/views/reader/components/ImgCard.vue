<template>
  <div class="img-card">
      <img v-if="data.imgUrl && !loadStatus && !loadingError" :src="currentUrl" @error="onError" @load="onLoad" />
      <div class="number" v-if="imageLoading">
        <span class="index">{{ data.index }}</span>
        <span>{{data.title}} {{data.index}} / {{data.total}}</span>
        <span v-if="loadingError" @click="reloadImg">加载失败了,👉👉重新加载</span>
        <span v-else>{{ getRandomTxt() }}</span>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { type getChapterRespose } from '@/service/model/comic';
import { loadImg } from '@/service/model/index';
import { BASE_URL } from '@/service/api.config';
import { createId } from '@/utils';

const props = withDefaults(defineProps<{ 
  data: getChapterRespose;
  loadStatus: boolean;
 }>(), {
  data: () => ({}),
  loadStatus: true
});

const loadingTxt = ['努力加载中...', '嘿咻嘿咻...', '喝杯茶等一等？'];
// const loading = ref(true);
const imageLoading = ref(true);
const loadingError = ref(false);

const currentUrl = ref('');

const getImgUrl = (url: string) => `${BASE_URL}/loadImg?url=${encodeURIComponent(url)}`;

const onLoad = () => {
  imageLoading.value = false;
  console.log('图片已加载');
};
const onError = () => {
  loadingError.value = true;
  console.log('error');
};
const reloadImg = () => {
  currentUrl.value = `${getImgUrl(props.data.imgUrl || '')}&random=${createId(5)}`;
  loadingError.value = false;
};
const getRandomTxt = () => {
  return loadingTxt[Math.floor(Math.random() * loadingTxt.length)];
};

const getLoadingError = () => {
  return loadingError.value;
}
const getPropsData = () => {
  return props.data;
}

onMounted(() => {
  if (props.data.imgUrl) currentUrl.value = getImgUrl(props.data.imgUrl);
});

defineExpose({reloadImg, getPropsData, getLoadingError });
</script>

<style lang="less" scope>
.img-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  .number {
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    position: absolute;
    display: flex;
    flex-flow: column;
    justify-content: center;
    top: 0;
    left: 0;
    // z-index: 1;
    .index {
      font-size: 120px;
    }
  }
  img {
    width: 100%;
  }
}
</style>
