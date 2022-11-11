<template>
  <div class="user">
    <div class="user-detail shadow">
      <div class="user-head">
        <div class="head-img border-shadow">
          <div class="img-warap">
            <img v-lazy="userInfo?.headImg || '/img/head.webp'" :key="userInfo?.headImg" />
          </div>
        </div>
      </div>
      <div class="user-desc">
        <p class="user-name">昵称：{{ userInfo?.nickName || '㊙' }}</p>
        <p class="user-name">性别：{{ sexAct[userInfo?.sex || 0] }}</p>
        <p class="user-name">生日：{{ moment(userInfo?.birthDay).format('YYYY-MM-DD') || '㊙' }}</p>
        <p class="user-name">手机：{{ userInfo?.phone || '㊙' }}</p>
        <div class="tip"></div>
      </div>
    </div>
    <div class="user-group">
      <Cell title="意见反馈" @click="onReport"/>
      <Cell title="设置" @click="onSetting"/>
      <div class="shadow logout" @click="logOut">退出登录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Cell from '@/components/Cell/Cell.vue';
// import Cookies from 'js-cookie';
import { rxLocalStorage } from '@/utils';
import { showConfirmDialog, showToast } from 'vant';
import { getUserInfo, type UserType } from '@/service/model/login';
import moment from 'moment';

const router = useRouter();
const userInfo = ref<UserType | null>(null);
const sexAct: { [key: number | string]: string } = { 1: '男', 2: '女', 0: '㊙' };

const getUser = async () => {
  const res = await getUserInfo();
  const { state, data } = res;
  if (!data || !state) return;
  userInfo.value = data;
  rxLocalStorage.setItem('userInfo', JSON.stringify(data));
};

onMounted(() => {
  getUser();
});
const onSetting = () => {
  showToast('还没做')
};
const onReport = () => {
  showToast('你在教我做事？')
};

const logOut = () => {
  showConfirmDialog({
    title: '注意',
    message: '确定要退出登录吗？'
  })
    .then(() => {
      rxLocalStorage.clear();
      showToast('退出去了~')
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    })
    .catch(() => {});
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
