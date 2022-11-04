<template>
  <div class="StatusBar">
    <div>
        <span>{{current.title}}</span>
        <span>{{current.index}}/{{current.total}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getChapterRespose } from '@/service/model/comic';
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = withDefaults(defineProps<{
    current: getChapterRespose
}>(), {
    current: ()=> ({
        index: 0,
        total: 0
    })
});


</script>

<style lang="less" scope>
.StatusBar {
    position: fixed;
    bottom: 0;
    right: 0;
    color: #aaa;
    font-size: var(--font-s);
    padding: 6px 16px;
    span {
        margin-left: 32px;
        letter-spacing: 2px;
    }
}
</style>
