<script setup lang="ts">
const navigateToEditProfile = () => {
  // TODO: Implement navigation to edit profile page
};
</script>

<template>
  <button class="edit-profile-button" @click="navigateToEditProfile">
    프로필 수정
  </button>
</template>

<style scoped>
.edit-profile-button {
  position: absolute;
  top: 5px;
  right: 15px;
  width: 100px;
  height: 30px;
  background-color: rgba(244, 243, 236, 0.89);
  color: var(--text-fourth);
  border-radius: 10px;
  font-size: 14px; /* 버튼 중 */
  border: none;
  cursor: pointer;
}
</style>
