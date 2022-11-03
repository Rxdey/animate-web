<template>
  <div class="CusotmSwiper">
    <div class="swiper">
      <div class="swiper-wrapper"></div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import { getChapterRespose } from '@/service/model/comic';
import ImgCard from './ImgCard.vue';

const props = withDefaults(
  defineProps<{
    list: getChapterRespose[];
    activeIndex?: number;
  }>(),
  {
    list: () => [],
    activeIndex: 0
  }
);
const emit = defineEmits(['swiperChange']);
const virtualData = ref<getChapterRespose[]>([]);
const mySwiper = ref<any>(null);

onMounted(() => {
  virtualData.value = JSON.parse(JSON.stringify(props.list));
  mySwiper.value = new Swiper('.swiper', {
    zoom : true,
    autoplay: false,
    virtual: {
      slides: virtualData.value,
    //   addSlidesAfter: 5,
    //   addSlidesBefore: 5,
      renderSlide: (slides: getChapterRespose, index: number) => {
        return <div class="swiper-slide"><ImgCard data={slides}></ImgCard></div>
      }
    }
  });
  console.log(mySwiper.value.virtual);
});
</script>

<style lang="less" scope>
.CusotmSwiper {
  height: 100%;
  overflow: hidden;
  .swiper {
    height: 100%;
  }
}
</style>
