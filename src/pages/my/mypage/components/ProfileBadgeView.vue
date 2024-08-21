<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

interface Badge {
  badgeId: number;
  name: string;
  detail: string;
  badgeImageUrl: string;
}

onBeforeMount(() => {
  //todo fetch badges
});

defineProps<{
  memberId: number;
}>();

const badges = ref<Badge[]>([]);

const getGridRows = () => {
  return badges.value.length / 3;
};

const handleError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/profile/default-badge.png");
};
</script>

<template>
  <div
    class="badge-container"
    :style="{ gridTemplateRows: `110px repeat(${getGridRows()}, 110px)` }"
    v-for="(badge, index) in badges"
    :key="index"
  >
    <div class="badge">
      <img
        :src="badge.badgeImageUrl"
        :alt="badge.name"
        class="badge-image"
        @error="handleError"
      />
    </div>
  </div>
</template>

<style scoped>
.badge-container {
  width: 100%;
  justify-content: center;
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, 110px);
  gap: 15px;
}

.badge {
  width: 110px;
  height: 110px;
  background-color: var(--surface-tertiary);
  border: 1px solid var(--gray-900);
  border-radius: 20px;
  padding: 10px;
}

.badge-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
