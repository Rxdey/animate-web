<template>
  <SwiperCom v-if="conf" v-bind="conf" @slide-change="onSlideChange" @init="onInit" ref="currentSwiper" class="mySwiper" :dir="dir">
    <swiper-slide v-for="(chapter, i) in list" :key="`${chapter.animateId}_${chapter.chapterId}_${chapter.index}`" :virtual-index="`${chapter.animateId}_${chapter.chapterId}_${chapter.index}`" :content="chapter">
      <ImgCard v-if="chapter.imgUrl" :data="chapter" :loadStatus="loadStatus" ref="imgList"></ImgCard>
    </swiper-slide>
  </SwiperCom>
  <!-- `${chapter.animateId}_${chapter.chapterId}_${chapter.index}` -->
</template>

<script setup lang="tsx">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swiper, { Virtual, Zoom } from 'swiper';
import { Swiper as SwiperCom, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { getChapterRespose, update } from '@/service/model/comic';
import ImgCard from './ImgCard.vue';
import { rxLocalStorage } from '@/utils';

const route = useRoute();

const props = withDefaults(
  defineProps<{
    list: getChapterRespose[];
    loadStatus: boolean;
    lastPage?: any;
    dir?: string;
  }>(),
  {
    list: () => [],
    loadStatus: true,
    lastPage: 0,
    dir: 'rtl'
  }
);

const emit = defineEmits(['slideChange', 'init']);
const virtualData = ref<getChapterRespose[]>([]);
const conf = ref<any>(null);
const imgList = ref<any>([]);
const currentSwiper = ref<any>(null);
const activeIndex = ref(0);

const onSlideChange = (swiper: Swiper) => {
  console.log('slideChange');
  activeIndex.value = swiper.activeIndex;
  const current = props.list[swiper.activeIndex];
  emit('slideChange', swiper.activeIndex, (list: any) => {
    swiper.updateSlides();
    swiper.virtual.update(true);
    swiper.slideTo(swiper.activeIndex + Number(list[0].total), 0);
  });
  // 滑动到当前页时，如果图片加载失败自动触发重载
  const activeImgCard = imgList.value.find((vm: any) => vm.getPropsData().chapterId === current.chapterId && vm.getPropsData().index === current.index);
  if (activeImgCard && activeImgCard.getLoadingError()) {
    activeImgCard.reloadImg();
  }
};

const onInit = (swiper: Swiper) => {
  // const current = props.list[swiper.activeIndex];
  activeIndex.value = swiper.activeIndex;
  emit('init', swiper.activeIndex, (list: any) => {
    swiper.updateSlides();
    swiper.virtual.update(true);
    const lastPage = Number(route.query.lastPage);
    swiper.slideTo(swiper.activeIndex + Number(list[0].total) + (lastPage > 0 ? lastPage - 1 : 0), 0);
  });
};

watch(
  () => props.loadStatus,
  val => {
    // if (!val) {
    //   nextTick(() => {
    //     const findIndex = props.list.findIndex(item => {
    //       return Number(item.chapterId) === Number(route.query.lastChapterId) && Number(item.index) === Number(route.query.lastPage);
    //     });
    //     if (findIndex >= 0) {
    //       currentSwiper.value.$el.swiper.slideTo(findIndex, 0);
    //     }
    //   });
    // }
  }
);
onMounted(() => {
  virtualData.value = JSON.parse(JSON.stringify(props.list));
  conf.value = {
    modules: [Virtual],
    observer: true,
    // zoom: true,
    virtual: {
      addSlidesAfter: 3,
      addSlidesBefore: 3
    }
  };
});
</script>

<style lang="less" scope>
.swiper {
  height: 100%;
}
.mySwiper {
  // transform: rotateY(180deg);
}
</style>
