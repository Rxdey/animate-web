<template>
  <button class="my-button shadow" @click.stop="onClick" :style="{
    '--font-size': currentSize
  }">
    <van-loading v-if="loading" />
    <span v-else>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const sizeList = {
  small: '0.32rem',
  default: '0.373rem',
  larage: '0.427rem',
}
const emit = defineEmits(['click']);
type Props = {
  loading?: boolean;
  size: 'small' | 'default' | 'larage';
  disabled?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  size: 'default'
});
const currentSize = computed(() => sizeList[props.size]);
const onClick = e => {
  if (props.disabled || props.loading) return;
  emit('click', e);
};
</script>

<style lang="less" scope>
.my-button {
  --font-size: 32px;
  outline: none;
  display: inline-block;
  text-align: center;
  padding: 16px 32px;
  border: none;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  width: 100%;
  background-color: var(--color-white);
  color: var(--color-orange);
  cursor: pointer;
  font-size: var(--font-size);
  &.shadow {
    box-shadow: none;
  }
  &::after {
    // border-radius: 100px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  &::before {
    // border-radius: 100px;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  &:active {
    background-color: #e9e9e9;
  }
}
</style>
