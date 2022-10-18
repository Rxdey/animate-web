<template>
  <div class="search">
    <div class="search-wrap">
      <div class="search-bar shadow">
        <div class="search-inner">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="history-wrap"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
</script>

<style lang="less" scope>
.search-wrap {
  padding: 32px 16px;
}
.search-bar {
  width: 90%;
  margin: 32px auto;
  padding: 16px 32px;
  transform: skew(-30deg);
  .search-inner {
    transform: skew(30deg);
  }
  input {
    border: none;
    outline: none;
    font-size: var(--font-m);
    background-color: transparent;
    padding: 0 16px;
  }
}
</style>
