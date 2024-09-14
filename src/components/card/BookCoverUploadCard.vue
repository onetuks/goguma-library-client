<script lang="ts" setup>
import { ref, watch } from "vue";
import { BookPostRequest } from "@/api/BookApis";
import {
  formatFilename,
  ImageFileUploadProps,
  initImageFileUploadProps,
} from "@/types/ImageFile";

const props = defineProps<{
  bookPostRequest: BookPostRequest;
}>();

const emits = defineEmits<{
  (event: "update:CoverImageData", data: ImageFileUploadProps): void;
}>();

const localBookPostRequest = ref<BookPostRequest>({ ...props.bookPostRequest });

// 파일 선택 input
const coverImageInput = ref<HTMLInputElement | null>(null);
// 이미지 미리보기 URL
const coverImageUrl = ref<string | null>(
  props.bookPostRequest.coverImageFilename
);

watch(
  () => props.bookPostRequest,
  (newBookPostRequest) => {
    localBookPostRequest.value = { ...newBookPostRequest };
    coverImageUrl.value = newBookPostRequest.coverImageFilename;
  }
);

const changeCoverImageFile = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const newUrl = URL.createObjectURL(file);
    coverImageUrl.value = newUrl;
    emits("update:CoverImageData", {
      file: file,
      filename: formatFilename(newUrl, file),
    });
  }
};

const triggerChangeFileClick = (): void => {
  coverImageInput.value?.click();
};

const removeCover = (): void => {
  coverImageUrl.value = null;
  coverImageInput.value = null;
  emits("update:CoverImageData", initImageFileUploadProps());
};
</script>

<template>
  <div class="book-cover-container">
    <label class="form-label">표지이미지</label>
    <div :class="{ 'has-cover': coverImageUrl }" class="book-cover-uploader">
      <input
        ref="coverImageInput"
        accept="image/*"
        style="display: none"
        type="file"
        @change="changeCoverImageFile"
      />

      <div v-if="coverImageUrl" class="cover-preview">
        <img :src="coverImageUrl" alt="Book Cover" class="book-cover" />
        <img
          alt="Remove Cover"
          class="remove-button"
          src="@/assets/icon/upload/trashcan_icon.png"
          @click="removeCover"
        />
      </div>
      <div v-else class="upload-placeholder" @click="triggerChangeFileClick">
        <img
          alt="Camera Icon"
          class="camera-icon"
          src="@/assets/icon/upload/camera_icon.png"
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
  transition: border 0.6s ease;
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
