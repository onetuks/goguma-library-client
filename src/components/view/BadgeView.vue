<script setup lang="ts">
import { ref, watch } from "vue";
import BadgeDetailModal from "@/components/modal/BadgeDetailModal.vue";
import { Badge, BADGES, convertToBadge } from "@/types/Badge";
import { Member } from "@/api/MemberApis";

const props = defineProps<{
  member: Member;
}>();

watch(
  () => props.member.badges,
  (newBadgeKeys) => convertToBadge(newBadgeKeys)
);

const badges = ref<Badge[]>(convertToBadge(props.member.badges));
const isBadgeDetailModalVisible = ref<boolean>(false);
const selectedBadge = ref<Badge | null>(null);

const handleError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/badge/default-badge.png");
};

const viewBadgeDetail = (badge: Badge) => {
  selectedBadge.value = badge;
  isBadgeDetailModalVisible.value = true;
};

const closeBadgeDetail = () => {
  selectedBadge.value = null;
  isBadgeDetailModalVisible.value = false;
};
</script>

<template>
  <div class="badge-container">
    <div
      class="badge"
      v-for="(badge, index) in badges"
      :key="index"
      @click="viewBadgeDetail(badge)"
    >
      <img
        :src="badge.badgeImageUrl"
        :alt="badge.badgeName"
        class="badge-image"
        @error="handleError"
      />
    </div>

    <BadgeDetailModal
      v-if="isBadgeDetailModalVisible && selectedBadge"
      :badge="selectedBadge"
      @modal:Close="closeBadgeDetail"
    />
  </div>
</template>

<style scoped>
.badge-container {
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
  background-color: var(--background-primary);
}

.badge {
  width: 100%;
  max-width: 110px;
  height: 110px;
  background-color: var(--surface-tertiary);
  border: 1px solid var(--gray-900);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

.badge:hover {
  background-color: var(--surface-fourth);
}

.badge:active {
  background-color: var(--surface-sixth);
}

.badge-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
