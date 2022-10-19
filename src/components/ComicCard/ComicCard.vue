<template>
  <div class="comic-card shadow"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
    data: {
        type: Array,
        default: []
    }
});

</script>

<style lang="less" scope></style>
