<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router";
import { AuthApis } from "@/api/AuthApis";

const reason = ref<string>();

const textArea = ref<HTMLTextAreaElement | null>(null);

const autoResize = (): void => {
  if (textArea.value) {
    textArea.value.style.height = "auto";
    textArea.value.style.height = `${textArea.value.scrollHeight}px`;
  }
};

const cancelWithdraw = (): void => {
  router.back();
};

const withdrawMember = async (): Promise<void> => {
  await AuthApis.withdraw()
    .then(() => {
      console.log("withdraw is done");
      router.push("/");
    })
    .catch((error) => console.error("WithdrawPAge.withdrawMember", error));
};
</script>

<template>
  <div class="withdraw-page-container">
    <textarea
      ref="textArea"
      v-model="reason"
      class="withdraw-reason"
      maxlength="1000"
      placeholder="고구마 서재를 떠나는 이유를 알려주세요"
      @input="autoResize"
    />
    <div class="withdraw-notice-container">
      <div class="withdraw-notice-title">유의사항</div>
      <div class="withdraw-notice-content">
        * 개인정보 및 탈퇴 관련된 안내사항이 들어갑니다
      </div>
    </div>
    <div class="withdraw-button-container">
      <div class="withdraw-button" @click="cancelWithdraw">탈퇴 그만두기</div>
      <div
        class="withdraw-button"
        style="border-color: var(--button-primary); color: var(--text-fifth)"
        @click="withdrawMember"
      >
        탈퇴하기
      </div>
    </div>
  </div>
</template>

<style scoped>
.withdraw-page-container {
  margin-top: 50px;
  width: 100%;
  padding: 25px 15px;
  box-sizing: border-box;
}

.withdraw-reason {
  width: 100%;
  background-color: var(--surface-tertiary);
  border: none;
  border-radius: 20px;
  padding: 8px 10px;
  min-height: 100px;
  font-size: 14px;
}

.withdraw-notice-container {
  margin-top: 15px;
  margin-bottom: 50px;
  padding: 0 15px;
  color: var(--text-fifth);
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  gap: 10px;
}

.withdraw-notice-title {
  font-size: 14px;
  font-family: var(--font-family-bold), sans-serif;
}

.withdraw-notice-content {
  font-size: 12px;
  font-family: var(--font-family-regular), sans-serif;
}

.withdraw-button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}

.withdraw-button {
  border: 2px solid var(--button-secondary);
  border-radius: 15px;
  background-color: transparent;
  padding: 16px 0;
  font-size: 16px;
  font-family: var(--font-family-bold), sans-serif;
  transition: background-color 0.6s ease;
}

.withdraw-button:hover {
  background-color: var(--surface-fourth);
}

.withdraw-button:active {
  background-color: var(--surface-sixth);
}
</style>
