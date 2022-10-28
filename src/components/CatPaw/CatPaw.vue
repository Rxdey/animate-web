<template>
  <div class="CatPaw">
    <img class="cat" :src="currentImg" @click="createRandomImg" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import paw1 from '@/assets/img/paw_01.png';
import paw2 from '@/assets/img/paw_02.png';
import paw3 from '@/assets/img/paw_03.png';
import paw4 from '@/assets/img/paw_04.png';

function toFixed(number: number) {
  var multiplier = Math.pow(10, 3),
    wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

const transformToRem = (px: string) => {
  return toFixed((parseInt(px) / 750) * 100) / 10 + 'rem';
};

const route = useRoute();
const imgList = [paw1, paw2, paw3, paw4];
const currentImg = ref('');

const createRandomImg = () => {
  const i = Math.floor(Math.random() * imgList.length);
  currentImg.value = imgList[i];
  return i;
};

onMounted(() => {
  createRandomImg();
});

watch(route, () => {
  createRandomImg();
});
</script>

<style lang="less" scope>
.CatPaw {
  position: fixed;
  bottom: -60px;
  left: 32px;
  transform-origin: 50% 100%;
  animation: rotate 3s ease-in-out infinite;
  //   animation-timing-function: ease-in-out;
    animation-direction: alternate;
  .cat {
    width: 80px;
  }
}
@keyframes rotate {
  from {
    transform: rotate(12deg);
  }
  to {
    transform: rotate(-12deg);
  }
}
</style>
