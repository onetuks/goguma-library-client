<script setup lang="ts">
import { ref } from "vue";

interface Button {
  label: string;
  inactiveIcon: string;
  activeIcon: string;
  width: number;
  height: number;
}

const buttons: Button[] = [
  {
    label: "Home",
    inactiveIcon: require("@/assets/icon/home/home_icon_inactive.png"),
    activeIcon: require("@/assets/icon/home/home_icon_active.png"),
    width: 25,
    height: 23,
  },
  {
    label: "Menu",
    inactiveIcon: require("@/assets/icon/menu/menu_icon_inactive.png"),
    activeIcon: require("@/assets/icon/menu/menu_icon_active.png"),
    width: 25,
    height: 15,
  },
  {
    label: "Add",
    inactiveIcon: require("@/assets/icon/add_icon.png"),
    activeIcon: require("@/assets/icon/add_icon.png"),
    width: 26,
    height: 26,
  },
  {
    label: "Books",
    inactiveIcon: require("@/assets/icon/book/book_icon_inactive.png"),
    activeIcon: require("@/assets/icon/book/books_icon_active.png"),
    width: 25,
    height: 21.4,
  },
  {
    label: "My Page",
    inactiveIcon: require("@/assets/icon/my_page/my_page_icon_inactive.png"),
    activeIcon: require("@/assets/icon/my_page/my_page_icon_active.png"),
    width: 25,
    height: 25,
  },
];

const selectedIndex = ref<number>(0);

const selectButton = (index: number): number => (selectedIndex.value = index);

const getNavigationButtonIcon = (button: Button, index: number): string => {
  return selectedIndex.value === index
    ? button.activeIcon
    : button.inactiveIcon;
};
</script>

<template>
  <div class="nav-bar">
    <div class="nav-item-container">
      <div
        v-for="(button, index) in buttons"
        :key="index"
        class="nav-item-wrapper"
      >
        <button
          @click="selectButton(index)"
          :class="{ selected: selectedIndex === index }"
        >
          <img
            :src="getNavigationButtonIcon(button, index)"
            :alt="button.label"
            :style="{
              width: button.width + 'px',
              height: button.height + 'px',
            }"
          />
        </button>
        <div v-if="index < buttons.length - 1" class="separator"></div>
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
  max-width: 390px;
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

button.selected img {
  /* 선택된 버튼의 이미지를 강조할 수 있는 스타일을 여기에 추가할 수 있습니다 */
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
