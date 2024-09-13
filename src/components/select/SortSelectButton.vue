<script lang="ts" setup>
import { SortType, SortTypes } from "@/types/SortType";
import { onBeforeMount } from "vue";

const props = withDefaults(
  defineProps<{
    sortType: SortType;
    index?: number;
  }>(),
  {
    index: -1,
  }
);

onBeforeMount(() => getDirectionImage());

const getDirectionImage = () => {
  switch (props.index) {
    case 0:
      return require("@/assets/icon/direction/up_icon.png");
    case 1:
      return require("@/assets/icon/direction/empty_icon.png");
    default:
      return require("@/assets/icon/direction/down_icon.png");
  }
};
</script>

<template>
  <div class="sort-button">
    <div class="sort-button-text-content">{{ SortTypes.get(sortType) }}</div>
    <div class="sort-button-image-content">
      <img
        :src="getDirectionImage()"
        alt="down_icon"
        class="sort-button-icon-content"
      />
    </div>
  </div>
</template>

<style scoped>
.sort-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--background-primary);
}

.sort-button-text-content {
  width: 55px;
  height: 100%;
  text-align: right;
  font-size: 11px;
}

.sort-button-image-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sort-button-icon-content {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
