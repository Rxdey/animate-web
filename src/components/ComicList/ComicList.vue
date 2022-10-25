<template>
  <div class="comic-list">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

</script>

<style lang="less" scope>
.comic-list {
  --column-gap: 32px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - var(--column-gap)));
  // grid-auto-rows: minmax(min-content,max-content);
  justify-content: center;
  row-gap: 32px;
  column-gap: var(--column-gap);
  padding: 32px 0;
}
</style>
