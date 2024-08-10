<script lang="ts" setup>
import { ref } from "vue";
import activeHeartImage from "@/assets/icon/heart/heart_icon_active.png";
import inactiveHeartImage from "@/assets/icon/heart/heart_icon_inactive.png";

const props = withDefaults(
  defineProps<{
    pickCount: number;
    isPicked: boolean;
  }>(),
  {
    pickCount: 0,
    isPicked: false,
  }
);

const localPickCount = ref(props.pickCount);
const localIsPicked = ref(props.isPicked);

const toggleStatus = (): void => {
  localIsPicked.value = !localIsPicked.value;

  if (localIsPicked.value) {
    localPickCount.value += 1;
    return;
  }
  localPickCount.value -= 1;
};
</script>

<template>
  <div class="heart-container">
    <button @click="toggleStatus">
      <img
        :src="localIsPicked ? activeHeartImage : inactiveHeartImage"
        alt="Heart Icon"
        class="heart-icon"
      />
    </button>
    <span>{{ localPickCount }}</span>
  </div>
</template>

<style scoped>
.heart-container {
  display: flex;
  align-items: center;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}

.heart-icon {
  width: 24px;
  height: 24px;
}
</style>
