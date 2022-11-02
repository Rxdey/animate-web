<template>
  <div class="detail__chapteritem" >
    <div class="chapter-card border-shadow" :class="{ active: activeHistory == data.chapterId }">
      <p class="ov-1">{{ data.chapter }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { detailChapter } from '@/service/model/comic';

type Props = {
    data?: detailChapter;
    activeHistory: number|string;
}

const props = withDefaults(defineProps<Props>(), {
    data: () => ({})
});
</script>

<style lang="less" scope></style>
