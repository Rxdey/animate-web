<template>
  <div class="comic-cell shadow">
    <div class="cell-title">{{title}}</div>
    <div class="cell-value">{{value}}</div>
    <div class="cell-icon" v-if="icon">
        <van-icon :name="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: 'arrow'
    }
});

</script>

<style lang="less" scope>
.comic-cell {
  padding: 8px 32px;
  display: flex;
  flex-flow: row nowrap;
  font-size: var(--font-l);
  margin-bottom: 32px;
  color: var(--color-deeppurple30);
  .cell-title {
    min-width: 200px;
  }
  .cell-value {
    text-align: right;
    flex: 1;
  }
}
</style>
