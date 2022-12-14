<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-wrap">
      <div class="search-bar shadow">
        <div class="search-inner">
          <input
            type="text"
            v-model="searchKey"
            @keydown.enter="
              () => {
                onSearch();
              }
            "
            @input="onInput"
          />
        </div>
      </div>
    </div>

    <div class="search-loading" v-show="loading">
      <Load type="loading">
        <p>加载！加载中~~</p>
      </Load>
    </div>

    <template v-if="historyList.length && showHistoryList && !loading">
      <div class="history">
        <ul class="history--list">
          <li class="history--item border-shadow" v-for="(item, i) in historyList" :key="i" @click="onSearch(item)">
            <div>{{ item }}</div>
          </li>
        </ul>
        <div class="clearAll" @click="onClear">清除搜索记录</div>
      </div>
    </template>
    <Load type="empty" v-if="!historyList.length && !loading">
      <span>什么都没有~</span>
    </Load>
    <div class="result-list" v-show="!showHistoryList">
      <ComicList>
        <SearchCard v-for="comic in searchList" :key="comic.animateId" :data="comic" @click="toDetail(comic)" />
      </ComicList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref } from 'vue';
import ComicList from '@/components/ComicList/ComicList.vue';
import SearchCard from '@/components/SearchCard/SearchCard.vue';
import Load from '@/components/Load/Load.vue';
import { useRouter, useRoute } from 'vue-router';
import { searchFeatch } from '@/service/model/comic';
import { rxLocalStorage } from '@/utils';
import type { SearchRespose } from '@/service/model/comic';

const router = useRouter();
const searchKey = ref('');
const searchList: Ref<SearchRespose[]> = ref([]);
const historyList: Ref<string[]> = ref([]);
const showHistoryList = ref(true);
const loading = ref(false);

/* TODO ==> 搜索 */
const onSearch = async (key = '') => {
  if (key) searchKey.value = key;
  if (!searchKey.value) return;
  const history = historyList.value;
  const i = history.findIndex(item => item === searchKey.value.trim());
  if (i > -1) history.splice(i, 1);
  history.unshift(searchKey.value.trim());
  rxLocalStorage.setItem('search-history', JSON.stringify(history));
  historyList.value = history;
  loading.value = true;
  showHistoryList.value = false;
  const res = await searchFeatch({
    searchKey: searchKey.value.trim()
  });
  loading.value = false;
  const { state, msg, data } = res;
  if (state !== 1) return;
  searchList.value = data || [];
};
/* TODO ==> 清空 */
const onClear = () => {
  historyList.value = [];
  rxLocalStorage.setItem('search-history', JSON.stringify([]));
};
const onInput = (e: any) => {
  showHistoryList.value = !e.target.value;
};
const toDetail = (comic: SearchRespose) => {
  const { animateId } = comic;
  router.push({
    path: '/detail',
    query: {
      animateId
    }
  });
};
onMounted(() => {
  historyList.value = JSON.parse(rxLocalStorage.getItem('search-history') || '[]');
});
</script>

<style lang="less" scope>
.search {
  padding: 32px;
  display: flex;
  flex-flow: column;
}
.search-bar {
  margin: 32px auto;
  padding: 16px 32px;
  // transform: skew(-20deg);
  // .search-inner {
  //   transform: skew(20deg);
  // }
  input {
    border: none;
    outline: none;
    font-size: var(--font-m);
    background-color: transparent;
    padding: 0 16px;
  }
}
.history {
  padding-bottom: 72px;
  position: relative;
  .clearAll {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-orange);
  }
  &--list {
    font-size: var(--font-m);
    max-height: 700px;
    overflow-y: auto;
  }
  &--item {
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 16px;
    padding: 4px 16px;
  }
}

.result-list {
  flex: 1;
  min-height: 200px;
  overflow-y: auto;
}
.search-loading {
  text-align: center;
  margin-top: 100px;
  color: #fff;
  img {
    width: 200px;
    display: inline-block;
  }
  p {
    margin: 16px 0;
    font-size: var(--font-s);
  }
}
</style>
