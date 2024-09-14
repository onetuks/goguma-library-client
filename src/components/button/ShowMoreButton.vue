<script lang="ts" setup>
const emits = defineEmits<{
  (event: "move:ToShowMorePage"): void;
}>();

const moveToShowMorePage = (): void => {
  emits("move:ToShowMorePage");
};
</script>

<template>
  <button class="show-more-button-container" @click="moveToShowMorePage">
    <span style="margin-right: 6px">더보기</span>
    <svg
      fill="none"
      height="18"
      viewBox="0 0 11 18"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.04529 8.86355L1.21202 2.03027L2.06055 1.18174L9.84842 8.96961L1.99989 16.8181L1.15136 15.9696L8.04529 9.07568L8.15136 8.96961L8.04529 8.86355Z"
        fill="#E1DDCB"
        stroke="#FEFDF6"
        stroke-width="0.3"
      />
    </svg>
  </button>
</template>

<style scoped>
.show-more-button-container {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--surface-fifth);
  border: 1px solid var(--border-primary);
  border-radius: 5px;
  color: var(--text-fourth);
  font-size: 14px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.6s ease;
}

.show-more-button-container:hover {
  box-shadow: none;
}

.show-more-button-container:active {
  box-shadow: none;
}
</style>
