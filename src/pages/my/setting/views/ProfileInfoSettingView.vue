<script lang="ts" setup>
import { ref, watch } from "vue";
import { CategoryMap, CategoryType } from "@/types/Category";
import { Member } from "@/api/MemberApis";

const props = defineProps<{
  member: Member;
}>();

const emits = defineEmits<{
  (event: "update:Member", value: Member): void;
}>();

const localMember = ref<Member>({
  ...props.member,
  instagramUrl: props.member.instagramUrl || "www.instagram.com/", // 기본값 설정
});

watch(localMember, (newMember) => {
  emits("update:Member", newMember);
});

// 인스타그램 URL을 항상 "www.instagram.com/"로 시작하게 보장
const ensureInstagramPrefix = () => {
  const prefix = "www.instagram.com/";
  // 사용자가 prefix를 제거하지 못하도록 처리
  if (!localMember.value.instagramUrl.startsWith(prefix)) {
    localMember.value.instagramUrl =
      prefix + localMember.value.instagramUrl.replace(prefix, "");
  }
};

const isSelectable = (category: CategoryType): boolean => {
  const isUnderLimit = localMember.value.interestedCategories.length < 3;
  const isSelected = localMember.value.interestedCategories.includes(category);
  return isUnderLimit || isSelected;
};

const toggleCategorySelection = (category: CategoryType) => {
  const isSelected = localMember.value.interestedCategories.includes(category);
  if (!isSelected) {
    pushCategory();
    return;
  }

  popCategory();

  function pushCategory() {
    if (category === "ALL") {
      localMember.value.interestedCategories = ["ALL"];
      return;
    }

    localMember.value.interestedCategories.push(category);
    if (localMember.value.interestedCategories.includes("ALL")) {
      localMember.value.interestedCategories =
        localMember.value.interestedCategories.filter(
          (selectedCategory) => selectedCategory !== "ALL"
        );
    }
  }

  function popCategory() {
    localMember.value.interestedCategories =
      localMember.value.interestedCategories.filter(
        (selectedCategory) => selectedCategory !== category
      );

    if (localMember.value.interestedCategories.length === 0) {
      localMember.value.interestedCategories.push("ALL");
    }
  }
};
</script>

<template>
  <div class="form-container">
    <div class="form-item">
      <div class="form-title">닉네임</div>
      <input
        type="text"
        v-model="localMember.nickname"
        placeholder="닉네임은 최소2자 최대10자로 입력해 주세요"
        class="input-field"
      />
    </div>
    <div class="form-item">
      <div class="form-title">한줄소개</div>
      <input
        type="text"
        v-model="localMember.introduction"
        placeholder="한줄소개를 입력해 주세요 (최대 30자)"
        class="input-field"
      />
    </div>
    <div class="form-item">
      <div class="form-title">인스타그램(선택)</div>
      <input
        type="url"
        v-model="localMember.instagramUrl"
        @input="ensureInstagramPrefix"
        placeholder="www.instagram.com/계정입력"
        class="input-field"
      />
    </div>
    <div class="form-item" style="margin-top: 26px">
      <div class="category-form-title">
        <div class="form-title">관심 카테고리를 선택해주세요</div>
        <div class="form-notice">*최대 3개까지 선택 가능</div>
      </div>
      <div class="category-container">
        <label
          v-for="([categoryType, categoryName], index) in CategoryMap.entries()"
          :key="index"
          class="checkbox-label"
        >
          <input
            type="checkbox"
            :value="categoryType"
            :checked="localMember.interestedCategories.includes(categoryType)"
            :disabled="!isSelectable(categoryType)"
            @click="toggleCategorySelection(categoryType)"
          />
          <span class="custom-checkbox" />
          <span class="custom-checkbox-label">{{ categoryName }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-title {
  width: auto;
  font-family: var(--font-family-bold), sans-serif;
  font-size: 16px;
  display: flex;
  align-items: start;
}

.form-notice {
  width: auto;
  font-family: var(--font-family-regular), sans-serif;
  font-size: 14px;
  font-weight: normal;
}

.input-field {
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 16px;
  background-color: var(--surface-tertiary);
}

.category-form-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--border-primary);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
}

.checkbox-label {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}

.checkbox-label input {
  display: none;
}

.custom-checkbox {
  background-image: url("@/assets/icon/checkbox/unchecked-icon.png");
  width: 15px;
  height: 15px;
}

.custom-checkbox-label {
  margin-left: 5px;
  font-family: var(--font-family-regular), sans-serif;
  font-size: 14px;
  font-weight: normal;
}

.checkbox-label input:checked + .custom-checkbox {
  background-image: url("@/assets/icon/checkbox/checked-icon.png");
  width: 15px;
  height: 15px;
}
</style>
