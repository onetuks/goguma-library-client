<script lang="ts" setup>
import { ref, watch } from "vue";
import { Member } from "@/api/MemberApis";

const props = defineProps<{ member: Member }>();
const emits = defineEmits<{
  (event: "update:Member", value: Member): void;
}>();

const localMember = ref<Member>(props.member);
const profileImageInput = ref<HTMLInputElement>();
const profileBackgroundImageInput = ref<HTMLInputElement>();

watch(localMember, (newMember) => {
  emits("update:Member", newMember);
});

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/default-profile.png");
};

const initProfileImage = () => {
  localMember.value.profileImageUrl =
    "http://goguma-library/profiles/default-profile.png";
};

const initProfileBackgroundImage = () => {
  localMember.value.profileBackgroundImageUrl =
    "http://goguma-library/profiles/default-profile-background.png";
};

const changeProfileImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    localMember.value.profileImageUrl = URL.createObjectURL(file);
  }
};

const changeProfileBackgroundImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    localMember.value.profileBackgroundImageUrl = URL.createObjectURL(file);
  }
};
</script>

<template>
  <div class="profile-image-card-wrapper">
    <div
      class="profile-background-image-wrapper"
      :style="{
        backgroundImage: `url(${localMember.profileBackgroundImageUrl}) `,
      }"
    >
      <div class="init-button-wrapper">
        <div class="init-button" @click="initProfileImage">프로필 초기화</div>
        <div class="init-button" @click="initProfileBackgroundImage">
          배경 사진 초기화
        </div>
      </div>
    </div>
    <img
      :src="localMember.profileImageUrl"
      alt="profile image"
      class="profile-image-wrapper"
      @error="handleImageError"
    />
    <div class="profile-image-rest-wrapper">
      <div class="upload-button-wrapper">
        <input
          type="file"
          accept="image/*"
          class="hidden-file-input"
          @change="changeProfileImage"
          ref="profileImageInput"
        />
        <div class="upload-button" @click="profileImageInput?.click">
          프로필 사진 첨부
        </div>
        <input
          type="file"
          accept="image/*"
          class="hidden-file-input"
          @change="changeProfileBackgroundImage"
          ref="profileBackgroundImageInput"
        />
        <div class="upload-button" @click="profileBackgroundImageInput?.click">
          배경 사진 첨부
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-image-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 280px;
  position: relative;
}

.profile-background-image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: var(--gray-800);
  position: relative;
}

.init-button-wrapper {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  width: auto;
}

.init-button {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0 10px;
  height: 30px;
  border: 1px solid var(--button-primary);
  border-radius: 10px;
  color: var(--button-primary);
  font-size: 15px;
}

.profile-image-wrapper {
  position: absolute;
  left: 10px;
  bottom: 0;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  z-index: 2;
}

.profile-image-rest-wrapper {
  display: flex;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 3px;
  position: relative;
  justify-content: flex-end;
  z-index: 1;
}

.profile-image-rest-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(to bottom, var(--gray-800), transparent);
  pointer-events: none;
}

.upload-button-wrapper {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  width: auto;
  margin-right: 10px;
}

.upload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0 10px;
  height: 30px;
  border: 1px solid var(--button-primary);
  border-radius: 10px;
  font-size: 15px;
  font-family: var(--font-family), sans-serif;
}

.hidden-file-input {
  display: none;
}
</style>
