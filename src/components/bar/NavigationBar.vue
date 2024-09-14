<script lang="ts" setup>
import { ref, watch } from "vue";
import router from "@/router";
import { LOGIN_ID } from "@/types/AuthWords";

interface NavigationButton {
  label: string;
  inactiveIcon: string;
  activeIcon: string;
  width: number;
  height: number;
  clickHandler: () => void;
}

const NAVIGATION_BUTTONS: NavigationButton[] = [
  {
    label: "home",
    inactiveIcon: require("@/assets/icon/home/home_icon_inactive.png"),
    activeIcon: require("@/assets/icon/home/home_icon_active.png"),
    width: 25,
    height: 23,
    clickHandler: () => router.push("/"),
  },
  {
    label: "feed",
    inactiveIcon: require("@/assets/icon/menu/menu_icon_inactive.png"),
    activeIcon: require("@/assets/icon/menu/menu_icon_active.png"),
    width: 25,
    height: 15,
    clickHandler: () => router.push("/feeds"),
  },
  {
    label: "book",
    inactiveIcon: require("@/assets/icon/add/add_icon.png"),
    activeIcon: require("@/assets/icon/add/add_icon.png"),
    width: 26,
    height: 26,
    clickHandler: () => router.push("/books/search"),
  },
  {
    label: "study",
    inactiveIcon: require("@/assets/icon/book/book_icon_inactive.png"),
    activeIcon: require("@/assets/icon/book/books_icon_active.png"),
    width: 25,
    height: 21.4,
    clickHandler: () => router.push("/study/my"),
  },
  {
    label: "profile",
    inactiveIcon: require("@/assets/icon/my_page/my_page_icon_inactive.png"),
    activeIcon: require("@/assets/icon/my_page/my_page_icon_active.png"),
    width: 25,
    height: 25,
    clickHandler: () =>
      router.push(`/members/${localStorage.getItem(LOGIN_ID)}/profiles`),
  },
];

const selectedIndex = ref<number>(0);

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    NAVIGATION_BUTTONS.forEach((button, index) => {
      if (newPath === "/") {
        selectedIndex.value = 0;
        return;
      }
      if (newPath.includes(button.label)) {
        selectedIndex.value = index;
      }
    });
  }
);

const selectButton = (index: number): void => {
  selectedIndex.value = index;
  NAVIGATION_BUTTONS[selectedIndex.value].clickHandler();
};

const getNavigationButtonIcon = (
  button: NavigationButton,
  index: number
): string => {
  return selectedIndex.value === index
    ? button.activeIcon
    : button.inactiveIcon;
};
</script>

<template>
  <div class="nav-bar">
    <div class="nav-item-container">
      <div
        v-for="(button, index) in NAVIGATION_BUTTONS"
        :key="index"
        class="nav-item-wrapper"
      >
        <button
          :class="{ selected: selectedIndex === index }"
          @click="selectButton(index)"
        >
          <img
            :alt="button.label"
            :src="getNavigationButtonIcon(button, index)"
            :style="{
              width: button.width + 'px',
              height: button.height + 'px',
            }"
          />
        </button>
        <div
          v-if="index < NAVIGATION_BUTTONS.length - 1"
          class="separator"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 69px;
  background-color: var(--surface-fourth);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  border-top: 1px solid var(--button-fifth);
  border-radius: 10px 10px 0 0;
}

.nav-item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 35px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.separator {
  width: 1px;
  height: 100%; /* 구분선 높이 전체 영역 */
  background-color: var(--button-fifth); /* button/fifth 색상 */
}

button img {
  display: block;
}
</style>
