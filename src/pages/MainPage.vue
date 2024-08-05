<script lang="ts" setup>
import PickButton from "@/components/button/PickButton.vue";
import SubscribeButton from "@/components/button/SubscribeButton.vue";
import ReviewRegisterButton from "@/components/button/ReviewRegisterButton.vue";
</script>

<template>
  <PickButton :is-picked="false" :pick-count="0" />
  <SubscribeButton />
  <ReviewRegisterButton />
</template>

<style scoped></style>
