<script setup lang="ts">
import { SortType, SortTypes } from "@/types/SortType";
import SortSelectButton from "@/components/select/SortSelectButton.vue";
import { ref } from "vue";

let sortType: SortType = "LATEST";
const isSortOptionVisible = ref<boolean>(false);

const viewSortOption = () => {
  isSortOptionVisible.value = !isSortOptionVisible.value;
};

const selectSortOption = (index: number) => {
  sortType = SortTypes[index];
  isSortOptionVisible.value = false;
};
</script>

<template>
  <div class="sort-bar">
    <SortSelectButton :sort-type="sortType" @click="viewSortOption" />
    <div
      class="sort-option"
      v-for="(type, index) in SortTypes"
      :key="index"
      v-show="isSortOptionVisible"
    >
      <SortSelectButton
        :sort-type="type"
        :index="index"
        @click="selectSortOption(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.sort-bar {
  width: 85px;
  height: 30px;
}

.sort-option {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--surface-primary);
  z-index: 1;
}
</style>
