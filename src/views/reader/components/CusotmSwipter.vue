<template>
  <SwiperCom v-if="conf" v-bind="conf" @slide-change="onSlideChange" @init="onInit">
    <swiper-slide v-for="(chapter, i) in list" :key="chapter.imgUrl" :virtual-index="chapter.imgUrl" :content="chapter">
      <ImgCard :data="chapter"></ImgCard>
    </swiper-slide>
  </SwiperCom>
  <!-- `${chapter.animateId}_${chapter.chapterId}_${chapter.index}` -->
</template>

<script setup lang="tsx">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swiper, { Virtual } from 'swiper';
import { Swiper as SwiperCom, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
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

const emit = defineEmits(['slideChange']);
const virtualData = ref<getChapterRespose[]>([]);
const conf = ref<any>(null);

const onSlideChange = (swiper: Swiper) => {
  // activeIndex.value = swiper.activeIndex;
  emit('slideChange', swiper.activeIndex, swiper.virtual.slides[swiper.activeIndex].props.content, swiper);
};
const onInit = (swiper: Swiper) => {
  console.log('init', swiper);
  emit('slideChange', swiper.activeIndex, swiper.virtual.slides[swiper.activeIndex].props.content, swiper);
};

onMounted(() => {
  virtualData.value = JSON.parse(JSON.stringify(props.list));
  conf.value = {
    modules: [Virtual],
    virtual: {
      addSlidesAfter: 5,
      addSlidesBefore: 5
    }
  };
});
</script>

<style lang="less" scope>
// .CusotmSwiper {
//   height: 100%;
//   overflow: hidden;

// }
.swiper {
  height: 100%;
}
</style>
