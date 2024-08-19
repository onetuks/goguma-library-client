<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-var-requires
const instagramIcon = require("@/assets/profile/Instagram.png");

const navigateToInstagram = () => {
  // TODO: Implement Instagram navigation
};
</script>

<template>
  <div class="instagram-button" @click="navigateToInstagram">
    <img :src="instagramIcon" alt="Instagram" />
  </div>
</template>

<style scoped>
.instagram-button {
  width: 34px;
  height: 34px;
  position: absolute;
  bottom: 25px;
  left: 261px;
  cursor: pointer;
}

.instagram-button img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
