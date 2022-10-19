<template>
  <div class="search">
    <div class="search-wrap">
      <div class="search-bar shadow">
        <div class="search-inner">
          <input type="text" v-model="searchKey" @keydown.enter="onSearch"/>
        </div>
      </div>
    </div>
    <div class="history-wrap"></div>
    <div class="result-list"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { searchFeatch } from '@/service/model/comic';
// import ComicCard from '@/components/ComicCard/ComicCard.vue';

const searchKey = ref('');

const onSearch = async () => {
  if (!searchKey.value) return;
  const res = await searchFeatch({
    searchKey: searchKey.value
  });
};
</script>

<style lang="less" scope>
.search-wrap {
  padding: 32px 16px;
}
.search-bar {
  width: 90%;
  margin: 32px auto;
  padding: 16px 32px;
  transform: skew(-20deg);
  .search-inner {
    transform: skew(20deg);
  }
  input {
    border: none;
    outline: none;
    font-size: var(--font-m);
    background-color: transparent;
    padding: 0 16px;
  }
}
.result-list {
  padding: 0 32px;
}
</style>
