<template>
  <SwiperCom v-if="conf" v-bind="conf" @slide-change="onSlideChange" @init="onInit">
    <swiper-slide v-for="(chapter, i) in list" :key="chapter.imgUrl" :virtual-index="chapter.imgUrl" :content="chapter">
      <ImgCard v-if="chapter.imgUrl" :data="chapter" :loadStatus="loadStatus" ref="imgList"></ImgCard>
    </swiper-slide>
  </SwiperCom>
  <!-- `${chapter.animateId}_${chapter.chapterId}_${chapter.index}` -->
</template>

<script setup lang="tsx">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swiper, { Virtual, Zoom } from 'swiper';
import { Swiper as SwiperCom, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { getChapterRespose, update } from '@/service/model/comic';
import ImgCard from './ImgCard.vue';
import { rxLocalStorage } from '@/utils';

const props = withDefaults(
  defineProps<{
    list: getChapterRespose[];
    activeIndex?: number;
    loadStatus: boolean;
    lastPage?: any;
  }>(),
  {
    list: () => [],
    activeIndex: 0,
    loadStatus: true,
    lastPage: 0
  }
);

const emit = defineEmits(['slideChange']);
const virtualData = ref<getChapterRespose[]>([]);
const conf = ref<any>(null);
const imgList = ref<any>([]);

// 更新记录
const updateCollect = (current: any) => {
  rxLocalStorage.setItem(`${current.animateId}`, JSON.stringify(current));
  update({
    animateId: current.animateId,
    lastChapterId: current.chapterId,
    lastChapterName: current.title,
    lastPage: current.index,
    // lastChapter: ,
    source: 1
  });
};

const onSlideChange = (swiper: Swiper) => {
  const current = swiper.virtual.slides[swiper.activeIndex].props.content;
  emit('slideChange', swiper.activeIndex, current, swiper);
  // 滑动到当前页时，如果图片加载失败自动触发重载
  const activeImgCard = imgList.value.find((vm: any) => vm.getPropsData().chapterId === current.chapterId && vm.getPropsData().index === current.index);
  if (activeImgCard && activeImgCard.getLoadingError()) {
    activeImgCard.reloadImg();
  }
  updateCollect(current);
};

const onInit = (swiper: Swiper) => {
  const current = swiper.virtual.slides[swiper.activeIndex].props.content;
  emit('slideChange', swiper.activeIndex, current, swiper);
  rxLocalStorage.setItem(`${current.animateId}`, JSON.stringify(current));
  updateCollect(current);
};

onMounted(() => {
  virtualData.value = JSON.parse(JSON.stringify(props.list));
  conf.value = {
    modules: [Virtual, Zoom],
    zoom: true,
    virtual: {
      addSlidesAfter: 3,
      addSlidesBefore: 3
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
