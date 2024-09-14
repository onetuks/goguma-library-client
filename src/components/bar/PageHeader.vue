<script lang="ts" setup>
import { eventBus } from "@/util/EventBus";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { IS_NEW_MEMBER } from "@/types/AuthWords";

const route = useRoute();

const headerTitle = ref<string>(route.name as string);
const nickname = ref<string>();

watch(
  () => route.name,
  (newName) => {
    headerTitle.value = newName as string;
  }
);

const getHeaderTitle = (): string => {
  const pageName = String(route.name);
  if (isNavigatePage() && pageName.includes("프로필 설정")) {
    if (localStorage.getItem(IS_NEW_MEMBER) === "true") {
      return "회원가입";
    }
    return "프로필 수정";
  } else if (pageName.includes("님의 서재")) {
    return `${nickname.value}${pageName}`;
  }
  return headerTitle.value;
};

const isHomePage = (): boolean => {
  return String(route.name).includes("고구마서재");
};

const isNavigatePage = (): boolean => {
  const pageName = String(route.name);
  if (pageName) {
    return (
      pageName.includes("고구마서재") ||
      pageName.includes("피드") ||
      pageName.includes("나의 서재") ||
      pageName.includes("도서 검색") ||
      pageName.includes("마이페이지") ||
      pageName.includes("프로필 설정")
    );
  }
  return false;
};

// const moveToAlarmListPage = (): void => {
//   router.push("/members/my/alarms");
// };

const goBack = () => window.history.back();

eventBus.on("update:Nickname", (newNickname) => {
  if (newNickname) {
    nickname.value = newNickname as string;
  }
});
</script>

<template>
  <div class="header-view-container">
    <div class="header-container">
      <img
        v-if="!isNavigatePage()"
        alt="뒤로가기"
        class="back-button"
        src="@/assets/icon/direction/left_icon.png"
        @click="goBack"
      />
      <div class="header-title" v-if="!isHomePage()">
        {{ getHeaderTitle() }}
      </div>
      <img
        v-else
        alt="banner"
        src="@/assets/logo/banner.png"
        class="banner-image"
      />
      <!--      <img-->
      <!--        v-if="isNavigatePage()"-->
      <!--        alt="alarm-icon"-->
      <!--        class="main-page-header-alarm"-->
      <!--        src="../../assets/icon/alarm/alarm-icon.png"-->
      <!--        @click="moveToAlarmListPage"-->
      <!--      />-->
    </div>
    <div class="header-division"></div>
  </div>
</template>

<style scoped>
.header-view-container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--background-primary);
  height: 50px;
  width: 100%;
  z-index: 10;
}

.header-container {
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}

.header-division {
  background-color: var(--border-primary);
  width: 100%;
  height: 1px;
}

.header-title {
  font-size: 20px;
  font-family: var(--font-family-bold), sans-serif;
  position: absolute;
  left: 0;
  right: 0;
}

.banner-image {
  position: absolute;
  left: calc(50% - 45px);
  height: 25px;
}

.back-button {
  position: absolute;
  height: 100%;
  left: 0;
  background-color: var(--background-primary);
  transition: background-color 0.6s ease;
  border-radius: 0 50% 50% 0;
  z-index: 20;
}

.back-button:hover {
  background-color: var(--surface-fourth);
}

.back-button:active {
  background-color: var(--surface-sixth);
}

.main-page-header-alarm {
  position: absolute;
  right: 0;
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50% 0 50% 50%;
  transition: background-color 0.6s ease;
  z-index: 20;
}

.main-page-header-alarm:hover {
  background-color: var(--surface-fourth);
}

.main-page-header-alarm:active {
  background-color: var(--surface-sixth);
}
</style>
