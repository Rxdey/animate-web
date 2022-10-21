<template>
  <div class="comic-card" v-if="data">
    <div class="comic-wrap shadow">
      <img v-lazy="data.cover" :alt="data.name" :key="data.cover"/>
    </div>
    <div class="txt-shadow name ov-2">{{ data.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { SearchRespose } from '@/service/model/comic';

type Props = {
  data?: SearchRespose;
};
const props = withDefaults(defineProps<Props>(), {
  data: undefined
});
</script>

<style lang="less" scope>
.comic-card {
    // background-color: var(--color-bg);
  .comic-wrap {
    height: 280px;
    margin-bottom: 8px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .name {
    color: var(--color-white);
    font-size: var(--font-s);
  }
  // box-shadow: inset 0 0 16px var(--shaodw-color);
}
</style>
