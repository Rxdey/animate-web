<template>
  <div class="user">
    <div class="user-detail shadow">
      <div class="user-head">
        <div class="head-img border-shadow">
          <div class="img-warap">
            <img v-lazy="'/img/head.jpg'" />
          </div>
        </div>
      </div>
      <div class="user-desc">
        <p class="user-name">昵称：xxx</p>
        <p class="user-name">性别：㊙</p>
        <p class="user-name">生日：㊙</p>
        <p class="user-name">手机：㊙</p>
        <div class="tip"></div>
      </div>
    </div>
    <div class="user-group">
      <Cell title="意见反馈"/>
      <Cell title="设置"/>
      <div class="shadow logout">退出登录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Cell from '@/components/Cell/Cell.vue';
</script>

<style lang="less" scope>
@import './index.less';
</style>
