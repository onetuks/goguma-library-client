<script lang="ts" setup>
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    pickCount: number;
    picked: boolean;
  }>(),
  {
    pickCount: 0,
    picked: false,
  }
);

const activeHeartImage = "@assets/icon/heart/heart_icon_active.png";
const inactiveHeartImage = "@/assets/icon/heart/heart_icon_inactive.png";

let isPicked: boolean = ref(props.picked).value;

const toggleStatus = () => {
  isPicked = !isPicked;
};
</script>

<template>
  <div class="heart-container">
    <button @click="toggleStatus">
      <img
        :src="isPicked ? activeHeartImage : inactiveHeartImage"
        alt="Heart Icon"
        class="heart-icon"
      />
    </button>
    <span>{{ pickCount }}</span>
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
