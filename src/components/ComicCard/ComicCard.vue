<template>
  <div class="comic-card shadow"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
});
</script>

<style lang="less" scope>
.comic-card {
  // height: 280px;
  // border-radius: 16px;
  // background: url(@/assets/img/default.png) no-repeat center;
  background-size: cover;
  // box-shadow: inset 0 0 16px var(--shaodw-color);
}
</style>
