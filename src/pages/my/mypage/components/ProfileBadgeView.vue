<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

interface Badge {
  badgeId: number;
  name: string;
  detail: string;
  badgeImageUrl: string;
}

onBeforeMount(() => {
  badges.value = [
    {
      badgeId: 1,
      name: "뱃지1",
      detail: "테스트용1",
      badgeImageUrl: "dfsd",
    },
    {
      badgeId: 2,
      name: "뱃지1",
      detail: "테스트용1",
      badgeImageUrl: "dfsd",
    },
    {
      badgeId: 3,
      name: "뱃지1",
      detail: "테스트용1",
      badgeImageUrl: "dfsd",
    },
    {
      badgeId: 4,
      name: "뱃지1",
      detail: "테스트용1",
      badgeImageUrl: "dfsd",
    },
  ];
});

defineProps<{
  memberId: number;
}>();

const badges = ref<Badge[]>([]);

const handleError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/profile/default-badge.png");
};
</script>

<template>
  <div class="badge-container">
    <div class="badge" v-for="(badge, index) in badges" :key="index">
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
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  justify-content: center;
  padding-left: 15px;
}

.badge {
  width: 110px;
  height: 110px;
  background-color: var(--surface-tertiary);
  border: 1px solid var(--gray-900);
  border-radius: 20px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
