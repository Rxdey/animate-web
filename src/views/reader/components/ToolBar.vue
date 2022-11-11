<template>
  <teleport to="body">
    <div class="ToolBar">
      <div class="cell">
        <div class="title">阅读模式:</div>
        <div class="value">
          <div class="check-group">
            <div class="check-card" :class="{ active: item.value === modelValue }" v-for="item in modeList" :key="item.value" @click="change(item)">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { emit } from 'process';
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const modeList = [
  { value: 1, label: '正常' },
  { value: 2, label: '日漫' }
];
const props = withDefaults(defineProps<{ modelValue: number }>(), {
  modelValue: 1
});
const emit = defineEmits(['update:modelValue']);
const change = (data: any) => {
  const { value } = data;
  emit('update:modelValue', value);
};
</script>

<style lang="less" scope>
.ToolBar {
  background-color: #0a101d;
  padding: 32px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #fff;
  z-index: 99;
  font-size: var(--font-m);
}
.cell {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .title {
    min-width: 180px;
  }
  .value {
    flex: 1;
  }
}
.check-group {
  .check-card {
    padding: 8px 16px;
    line-height: 1;
    display: inline-block;
    border: 1px solid var(--color-white);
    & + .check-card {
      margin-left: 32px;
    }
    &.active {
      border-color: var(--border-color);
    }
  }
}
</style>
