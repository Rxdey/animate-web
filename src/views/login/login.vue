<template>
  <div class="login">
    <div class="logo-wrap">
      <div class="logo">登 入</div>
    </div>
    <div class="login--box">
      <div class="my-input">
        <div class="my-input-inner">
          <input type="text" v-model="userName" placeholder="输入用户名" />
        </div>
      </div>
      <div class="my-input">
        <div class="my-input-inner">
          <input type="password" v-model="password" placeholder="输入密码" />
        </div>
      </div>

      <div class="login-button">
        <MyButtom size="large" :loading="loading" @click="handleLogin">立即登入</MyButtom>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { login } from '@/service/model/login';
import { showToast } from 'vant';
import md5 from 'md5';
import { rxLocalStorage } from '@/utils';
// import Cookies from 'js-cookie';

const router = useRouter();
const userName = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if (!userName.value) {
    showToast('请输入账号');
    return;
  }
  if (!password.value) {
    showToast('请输入密码');
    return;
  }
  loading.value = true;
  const res = await login({
    userName: userName.value,
    password: md5(password.value)
  });
  loading.value = false;
  const { state, data } = res;
  if (!state || !data) {
    showToast('登录失败，账号或密码不正确');
    return;
  }
  rxLocalStorage.setItem('userInfo', JSON.stringify(data));
  const { token } = data;
  rxLocalStorage.setItem('token', token || '');
  showToast('登录成功~');
  rxLocalStorage.setItem('userName', userName.value);
  rxLocalStorage.setItem('password', password.value);
  loading.value = true;
  setTimeout(() => {
    router.push('/home');
  }, 1000);
};

onMounted(() => {
  userName.value = rxLocalStorage.getItem('userName') || '';
  password.value = rxLocalStorage.getItem('password') || '';
})
</script>

<style lang="less" scope>
.login {
  color: var(--color-white);
  .logo-wrap {
    text-align: center;
    width: 80%;
    margin: 200px auto 60px auto;
  }
  .logo {
    text-align: center;
    font-size: 180px;
    text-shadow: 8px 8px 0 var(--shadow-color);
    position: relative;
    display: inline-block;
    &::after {
      position: absolute;
      width: 100%;
      height: 100%;
      content: '登  入';
      top: 0;
      left: 0;
      text-shadow: 4px 4px 0 var(--border-color);
    }
  }
  &--box {
    width: 70%;
    margin: 0 auto;
  }
  .login-button {
    margin-top: 80px;
  }
}

.my-input {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  border-bottom: 4px solid var(--border-color);
  box-shadow: 0 4px 0 var(--shadow-color);
  padding: 16px 0;
  margin-bottom: 48px;
  &-before {
  }
  &-inner {
    flex: 1;
    min-width: 1px;
    input {
      border: none;
      outline: none;
      background-color: transparent;
      width: 100%;
      font-size: 32px;
      color: #fff;
      &::placeholder {
        color: #f5f1f1;
      }
    }
  }
  &-after {
  }
}
</style>
