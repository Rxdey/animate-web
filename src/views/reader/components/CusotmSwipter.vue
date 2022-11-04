<template>
  <SwiperCom v-if="conf" v-bind="conf" @slide-change="onSlideChange" @init="onInit" ref="currentSwiper">
    <swiper-slide v-for="(chapter, i) in list" :key="chapter.imgUrl" :virtual-index="chapter.imgUrl" :content="chapter">
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
const currentSwiper = ref<any>(null);

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
  // nextTick(() =>{
  // const findIndex = props.list.findIndex((item) => {
  //   return item.chapterId === current.chapterId && Number(item.index) === Number(props.lastPage)
  // });
  // console.log(findIndex);
  // swiper.slideTo(findIndex, 0);
  // updateCollect(current);
  // })
};

watch(
  () => props.loadStatus,
  val => {
    if (!val) {
      nextTick(() => {
        const findIndex = props.list.findIndex(item => {
          return Number(item.chapterId) === Number(route.query.lastChapterId) && Number(item.index) === Number(route.query.lastPage);
        });
        if (findIndex >= 0) {
          currentSwiper.value.$el.swiper.slideTo(findIndex, 0);
        }
      });
    }
  }
);
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
