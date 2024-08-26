<script lang="ts" setup>
import { ref } from "vue";
import activeHeartImage from "@/assets/icon/heart/heart_icon_active.png";
import inactiveHeartImage from "@/assets/icon/heart/heart_icon_inactive.png";
import { BookPick, BookPickApis } from "@/api/BookPickApis";

const props = defineProps<{
  bookId: number;
}>();

const bookPick = ref<BookPick | null>(null);

const fetchBookPickedStatus = async () => {
  await BookPickApis.getMyBookPick(props.bookId)
    .then((response) => {
      bookPick.value = { ...response } as BookPick;
    })
    .catch((error) => {
      if (error.code === "G007") {
        bookPick.value = null;
      }
    });
};

const togglePickStatus = async () => {
  if (bookPick.value) {
    await BookPickApis.deleteMyBookPick(bookPick.value.bookPickId).then(() => {
      bookPick.value = null;
    });
  } else {
    await BookPickApis.postNewBookPick(props.bookId).then((response) => {
      bookPick.value = { ...response } as BookPick;
    });
  }
};

fetchBookPickedStatus();
</script>

<template>
  <div class="heart-container">
    <button @click="togglePickStatus">
      <img
        :src="bookPick ? activeHeartImage : inactiveHeartImage"
        alt="Heart Icon"
        class="heart-icon"
      />
    </button>
  </div>
</template>

<style scoped>
.heart-container {
  display: flex;
  width: 100%;
  justify-content: center;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  transition: transform 0.2s ease;
}

button:active {
  transform: scale(0.8);
}

.heart-icon {
  width: 24px;
  height: 24px;
}
</style>
