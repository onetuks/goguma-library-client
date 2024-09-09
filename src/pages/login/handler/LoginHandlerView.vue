<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ClientProvider, ClientProviders } from "@/types/ClientProvider";
import { AuthApis } from "@/api/AuthApis";

onMounted(() => {
  const authCode: string = getAuthCode(window.location.search);
  const clientProvider: ClientProvider = getClientProvider(
    window.location.pathname
  );

  AuthApis.login(clientProvider, authCode)
    .then((loginResponse) => {
      loginResponse.isNewMember
        ? router.push(`/members/my/settings`)
        : router.push("/");
    })
    .catch(() => {
      localStorage.clear();
      router.push("/login");
    });
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
