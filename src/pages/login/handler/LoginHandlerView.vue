<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ACCESS_TOKEN } from "@/types/AuthWords";
import { ClientProvider, ClientProviders } from "@/types/ClientProvider";

onMounted(() => {
  const authCode: string = getAuthCode(window.location.search);
  const clientProvider: ClientProvider = getClientProvider(
    window.location.pathname
  );

  login(clientProvider, authCode);
});

const router = useRouter();

const getClientProvider = (pathName: string): ClientProvider => {
  return ClientProviders.find((clientProvider) => {
    return pathName.includes(clientProvider);
  }) as ClientProvider;
};

const getAuthCode = (search: string): string => {
  const urlParams = new URLSearchParams(search);

  if (!urlParams.has("code")) {
    throw new Error("인증 코드가 없습니다.");
  }

  return urlParams.get("code") as string;
};

const login = async (
  clientProvider: ClientProvider,
  code: string
): Promise<void> => {
  axios
    .post(
      `http://localhost:8080/api/auth/login/${clientProvider}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${code}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      localStorage.setItem(ACCESS_TOKEN, response.data.appToken);
      console.log("로그인에 성공했습니다.");
      router.push("/");
    })
    .catch((error) => {
      console.error("서버 JWT 토큰 발급 실패: ", error);
    });
};
</script>

<template>
  <div class="login-handler-container">로그인 중입니다.</div>
</template>

<style scoped>
.login-handler-container {
  background-color: var(--background-primary);
  font-family: var(--font-primary), sans-serif;
  font-size: 20px;
  color: var(--button-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 100px;
}
</style>
