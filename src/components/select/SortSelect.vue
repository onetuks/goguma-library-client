<script setup lang="ts">
import { SortType, SortTypes } from "@/types/SortType";
import SortSelectButton from "@/components/select/SortSelectButton.vue";
import { ref } from "vue";

const emits = defineEmits<{
  (event: "select:SortType", type: SortType): void;
}>();

const sortType = ref<SortType>("LATEST");
const isSortOptionVisible = ref<boolean>(false);

const viewSortOption = () => {
  isSortOptionVisible.value = !isSortOptionVisible.value;
};

const selectSortOption = (type: SortType) => {
  sortType.value = type;
  isSortOptionVisible.value = false;
  emits("select:SortType", type);
};
</script>

<template>
  <div class="sort-bar-container">
    <div class="sort-bar">
      <SortSelectButton :sort-type="sortType" @click="viewSortOption" />
      <transition name="fade">
        <div v-if="isSortOptionVisible" class="sort-option-container">
          <div
            class="sort-option"
            v-for="(type, index) in SortTypes.keys()"
            :key="index"
          >
            <SortSelectButton
              :sort-type="type"
              :index="index"
              @click="selectSortOption(type)"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.sort-bar-container {
  width: 100%;
  height: 40px;
  padding: 15px 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: right;
  border-bottom: 1px solid var(--ivory-500);
}

.sort-bar {
  width: 85px;
  height: 30px;
}

.sort-option-container {
  display: flex;
  flex-direction: column;
}

.sort-option {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--surface-primary);
  border-radius: 0 5px;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
