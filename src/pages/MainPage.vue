<script lang="ts" setup>
import PickButton from "@/components/button/PickButton.vue";
import SubscribeButton from "@/components/button/SubscribeButton.vue";
import ReviewRegisterButton from "@/components/button/ReviewRegisterButton.vue";
</script>

<template>
  <PickButton :is-picked="false" :pick-count="0" />
  <SubscribeButton :is-subscribed="false" />
  <ReviewRegisterButton
    :review="{
      memberId: 1,
      bookId: 1,
      reviewTitle: '서평제목',
      reviewContent: '서평본문',
    }"
  />
</template>

<style scoped></style>
