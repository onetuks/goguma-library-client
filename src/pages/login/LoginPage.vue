<script lang="ts" setup>
import LogoView from "@/pages/login/LogoView.vue";

const REDIRECT_URI = `${window.location.origin}/login/oauth2/callback`;
const KAKAO_CLIENT_ID = process.env.VUE_APP_KAKAO_CLIENT_ID;
const GOOGLE_CLIENT_ID = process.env.VUE_APP_GOOGLE_CLIENT_ID;
// const NAVER_CLIENT_ID = process.env.VUE_APP_NAVER_CLIENT_ID;

const KAKAO_AUTH_CODE_URL = encodeURI(
  `https://kauth.kakao.com/oauth/authorize` +
    `?client_id=${KAKAO_CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}/kakao` +
    `&response_type=code` +
    `&prompt=select_account` +
    `&state=kakao`
);
const GOOGLE_AUTH_CODE_URL = encodeURI(
  `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}/google` +
    `&response_type=code` +
    `&scope=profile` +
    `&state=google`
);
// const NAVER_AUTH_CODE_URL = encodeURI(
//   `https://nid.naver.com/oauth2.0/authorize` +
//     `?client_id=${NAVER_CLIENT_ID}` +
//     `&response_type=code` +
//     `&redirect_uri=${REDIRECT_URI}/naver` +
//     `&state=RANDOM_STATE`
// );
</script>

<template>
  <div class="login-container">
    <LogoView />
    <div class="login-buttons">
      <a :href="KAKAO_AUTH_CODE_URL">
        <img alt="Kakao Logo" src="@/assets/login/kakao_login_button.png" />
      </a>
      <a :href="GOOGLE_AUTH_CODE_URL">
        <img alt="Google Logo" src="@/assets/login/google_login_button.png" />
      </a>
      <!--      <a :href="NAVER_AUTH_CODE_URL">-->
      <!--        <img src="@/assets/login/naver_login_button.png" alt="Naver Logo" />-->
      <!--      </a>-->
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: var(--background-primary);
  height: inherit;
  margin-top: 70px;
}

.login-buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
}

.login-buttons a {
  display: flex;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.6s ease;
}

.login-buttons a:hover {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}

.login-buttons a:active {
  box-shadow: none;
}
</style>
