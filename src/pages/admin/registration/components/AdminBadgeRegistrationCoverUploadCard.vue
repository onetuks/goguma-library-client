<script setup lang="ts">
import { ref, watch } from "vue";
import { BadgeRequest } from "@/api/BadgeApis";
import {
  formatFilename,
  ImageFileUploadProps,
  initImageFileUploadProps,
} from "@/types/ImageFile";
import { defineProps } from "vue";

const props = defineProps<{
  badgeRequest: BadgeRequest;
}>();

const emits = defineEmits<{
  (event: "update:CoverImageData", data: ImageFileUploadProps): void;
}>();

const localBadgeRequest = ref<BadgeRequest>({ ...props.badgeRequest });

// 파일 선택 input
const coverImageInput = ref<HTMLInputElement | null>(null);
// 이미지 미리보기 URL
const coverImageUrl = ref<string | null>(props.badgeRequest.badgeImageFilename);

watch(
  () => props.badgeRequest,
  (newBadgeRequest) => {
    localBadgeRequest.value = { ...newBadgeRequest };
    coverImageUrl.value = newBadgeRequest.badgeImageFilename;
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
  <div class="badge-cover-container">
    <label class="form-label">뱃지 이미지</label>
    <div class="badge-cover-uploader" :class="{ 'has-cover': coverImageUrl }">
      <input
        type="file"
        accept="image/*"
        @change="changeCoverImageFile"
        ref="coverImageInput"
        style="display: none"
      />

      <div v-if="coverImageUrl" class="cover-preview">
        <img :src="coverImageUrl" alt="Badge Cover" class="badge-cover" />
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
        <p>뱃지 이미지를 첨부해주세요</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge-cover-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.badge-cover-uploader {
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

.badge-cover-uploader.has-cover {
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

.badge-cover {
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
