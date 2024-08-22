<script setup lang="ts">
import { ref, watch } from "vue";
import { Book } from "@/api/BookApis";

const props = defineProps<{
  book: Book;
}>();

const emits = defineEmits<{
  (event: "update:CoverImageFile", file: File | null): void;
  (event: "update:CoverImageFilename", filename: string | null): void;
}>();

const coverImageUrl = ref<string | null>(props.book.coverImageUrl); // 이미지 미리보기 URL
const coverImageFile = ref<File | null>(null); // 실제 파일
const coverImageFilename = ref<string | null>(null); // 서버 요청에 제공할 파일명
const coverImageInput = ref<HTMLInputElement | null>(null); // 파일 선택 input

watch(
  () => props.book.coverImageUrl,
  (newCoverImageUrl) => {
    coverImageUrl.value = newCoverImageUrl;
  }
);

watch(coverImageFile, (newCoverImageFile) => {
  emits("update:CoverImageFile", newCoverImageFile);
});

watch(coverImageFilename, (newCoverImageFilename) => {
  emits("update:CoverImageFilename", newCoverImageFilename);
});

const changeCoverImageFile = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const newUrl = URL.createObjectURL(file);
    coverImageUrl.value = newUrl;
    coverImageFile.value = file;
    coverImageFilename.value =
      newUrl.split("/").pop() + file.type.replace("image/", ".");
  }
};

const triggerChangeFileClick = (): void => {
  coverImageInput.value?.click();
};

const removeCover = (): void => {
  coverImageFilename.value = null;
  coverImageUrl.value = null;
  coverImageFile.value = null;
  coverImageInput.value = null;
};

const handleError = (event: Event): void => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/error/error-icon.png");
};
</script>

<template>
  <div class="book-cover-container">
    <label class="form-label">표지이미지</label>
    <div
      class="book-cover-uploader"
      :class="{ 'has-cover': coverImageFile !== null }"
    >
      <input
        type="file"
        accept="image/*"
        @change="changeCoverImageFile"
        ref="coverImageInput"
        style="display: none"
      />

      <div v-if="coverImageUrl" class="cover-preview">
        <img
          :src="coverImageUrl"
          alt="Book Cover"
          class="book-cover"
          @error="handleError"
        />
        <img
          src="@/assets/icon/upload/trashcan_icon.png"
          alt="Remove Cover"
          class="remove-button"
          @click="removeCover"
        />
      </div>
      <div v-else class="upload-placeholder" @click="triggerChangeFileClick">
        <img
          src="@/assets/icon/upload/camera_icon.png"
          alt="Camera Icon"
          class="camera-icon"
        />
        <p>도서 표지를 첨부해주세요</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-cover-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.book-cover-uploader {
  background-color: #dcdcdc; /* 피그마의 gray/1000 */
  padding: 20px;
  text-align: center;
  border: 2px dashed #b4b4b4; /* 피그마의 gray/800 */
  border-radius: 5px;
  cursor: pointer;
  transition: border 0.3s ease;
  width: auto;
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

.form-label {
  font-family: var(--font-family-bold), sans-serif;
  font-size: 16px;
  text-align: left;
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
