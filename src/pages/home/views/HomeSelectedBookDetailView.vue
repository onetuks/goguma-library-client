<script lang="ts" setup>
import { Book } from "@/api/BookApis";
import { onMounted, ref, watch } from "vue";
import { sleep } from "@/util/SleeperUtil";

const props = defineProps<{
  book: Book;
}>();

onMounted(async () => {
  await sleep(100);
  visible.value = true;
});

watch(
  () => props.book,
  async () => {
    await sleep(200);
    visible.value = true;
  }
);

const visible = ref<boolean>(false);
</script>

<template>
  <div :class="{ visible: visible }" class="weekly-featured-books-detail">
    <div class="weekly-featured-books-detail-title">
      {{ book.authorName }}
    </div>
    <div class="weekly-featured-books-detail-introduction">
      {{ book.introduction }}
    </div>
  </div>
</template>

<style scoped>
.weekly-featured-books-detail {
  width: 100%;
  padding: 0 10px;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.6s ease;
  box-sizing: border-box;
}

.visible {
  opacity: 1;
}

.weekly-featured-books-detail-title {
  font-size: 21px;
  font-family: var(--font-family-bold), sans-serif;
}

.weekly-featured-books-detail-introduction {
  font-size: 14px;
  font-family: var(--font-family-regular), sans-serif;
  padding-bottom: 20px;
}
</style>
