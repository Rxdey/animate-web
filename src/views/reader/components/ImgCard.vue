<template>
  <div class="img-card">
    <img v-if="data.imgUrl && !loading" :src="getImgUrl(data.imgUrl)" />
    <div class="number" v-else>
      <span class="index">{{ data.title }}</span>
      <span>{{ data.index }} / {{ data.total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { type getChapterRespose } from '@/service/model/comic';
import { loadImg } from '@/service/model/index';
import { BASE_URL } from '@/service/api.config';

const props = withDefaults(defineProps<{ data: getChapterRespose }>(), {
  data: () => ({})
});

const loading = ref(true);
const getImgUrl = (url: string) => `${BASE_URL}/loadImg?url=${encodeURIComponent(url)}`;
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
    .index {
      font-size: 120px;
    }
  }
  img {
    width: 100%;
  }
}
</style>
