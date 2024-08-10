<script setup lang="ts">
import { ref } from "vue";

const fileInput = ref<HTMLInputElement | null>(null);
const coverUrl = ref<string | undefined>(undefined);

const hasCover = (): boolean => coverUrl.value !== undefined;

const changeFile = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    coverUrl.value = URL.createObjectURL(file);
  }
};

const triggerChangeFileClick = (): void => {
  fileInput.value?.click();
};

const removeCover = (): void => {
  coverUrl.value = undefined;
  fileInput.value = null;
};
</script>

<template>
  <div class="book-cover-uploader" :class="{ 'has-cover': hasCover }">
    <input
      type="file"
      @change="changeFile"
      ref="fileInput"
      style="display: none"
    />
    <div v-if="hasCover()" class="cover-preview">
      <img :src="coverUrl" alt="Book Cover" class="book-cover" />
      <img
        src="../../assets/icon/upload/trashcan_icon.png"
        alt="Remove Cover"
        class="remove-button"
        @click="removeCover"
      />
    </div>
    <div v-else class="upload-placeholder" @click="triggerChangeFileClick">
      <img
        src="../../assets/icon/upload/camera_icon.png"
        alt="Camera Icon"
        class="camera-icon"
      />
      <p>도서 표지를 첨부해주세요</p>
    </div>
  </div>
</template>

<style scoped>
.book-cover-uploader {
  background-color: #dcdcdc; /* 피그마의 gray/1000 */
  padding: 20px;
  text-align: center;
  border: 2px dashed #b4b4b4; /* 피그마의 gray/800 */
  border-radius: 5px;
  cursor: pointer;
  transition: border 0.3s ease;
  width: 360px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-cover-uploader.has-cover {
  border: none;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.camera-icon {
  width: 50px;
  height: 36px;
  margin-bottom: 10px;
}

.upload-placeholder p {
  color: #b4b4b4; /* 피그마의 gray/800 */
  margin: 0;
  width: 169px;
  height: 18px;
  font-family: "NanumSquare", sans-serif;
  text-align: center;
}

.cover-preview {
  position: relative;
  width: 120px;
  height: 180px;
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.remove-button {
  position: absolute;
  bottom: -45px; /* Adjusted to place below the cover */
  left: 50%;
  transform: translateX(-50%);
  width: 39px;
  height: 39px;
  cursor: pointer;
}
</style>
