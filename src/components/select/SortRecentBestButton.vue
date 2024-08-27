<script setup lang="ts">
import { SortType } from "@/types/SortType";

// 타입 지정을 안하면, 타입스크립트를 안 쓰는거에요.
// 그러면 나중에 latest 가 소문자인지 대문자인지 하나씩 읽어보면서 디버깅해야해요.
// 모든 변수 하나하나에 모두 타입 지정해주세요.
// const currentTab = ref("latest");
const props = defineProps<{
  sortType: SortType;
}>();

// prop: 부모 -> 자식 컴포넌트로 전달되는 데이터
// emit: 자식 -> 부모 컴포넌트로 이벤트를 전달하는 함수
const emits = defineEmits<{
  // 이벤트 이름은 이런식으로 지어요.
  // sortType 에도 타입을 지정해줬어요.
  // 이렇게 해야 부모 컴포넌트에서도 어떤 타입이 오는지 알 수 있어요
  (event: "update:SortType", sortType: SortType): void;
}>();

// template 에서는 가급적이면 javascript 가 들어가면 안돼요.
// 특별한 이유가 없다면 이렇게 따로 함수로 만들어서 사용해야해요.
// 유지보수 쉽게 하려는 이유라고 하네요.
const isLatestSortType = (): boolean => {
  return props.sortType === "LATEST";
};

// 이벤트를 발생시키는 함수는 이렇게 만들어요.
const changeSortType = (): void => {
  emits("update:SortType", isLatestSortType() ? "PICK" : "LATEST");
};

// 이유는 제대로 기억 안 나는데, 이제 function 키워드는 안 쓴대요. 아마 타입 지정이 힘들어서 그런듯.
// const 로 변수처럼 만들어서 사용해보세요.
// function setTab(tab: string) {
//   currentTab.value = tab;
//   // 탭에 따라 정렬 방식을 바꿀 수 있는 로직을 추가할 수 있습니다.
//   // 최신 서평 또는 베스트 서평에 따른 데이터 필터링 로직을 여기에 작성하세요.
// }
</script>

<template>
  <div class="sort-button">
    <button :class="{ active: isLatestSortType() }" @click="changeSortType">
      최신 서평
    </button>
    <!--  위에꺼랑 똑같이 바꿔보세요 만약에 안 돌아가면 콘솔창 보면서 디버깅해보세요 -->
    <button :class="{ active: currentTab === 'best' }" @click="setTab('best')">
      베스트 서평
    </button>
  </div>
</template>

<style scoped>
.sort-button {
  display: flex;
  width: 100%;
  max-width: 390px;
  height: 50px;
}

/* button 처럼 태그 자체에 스타일을 주는건 위험한 일이에요. class 를 직접 만들어서 사용하세요. [ .{클래스이름} { 속성... } ] 이런 형태로 ㄱㄱ */
button {
  flex: 1;
  font-size: 20px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-family: "NanumSquare", sans-serif;
  box-shadow: none;
  color: var(--text-tertiary); /* 기본 글자 색상 */
}

button.active {
  background-color: var(--surface-primary); /* 버튼 활성화 시 배경색 변경 */
  color: #ffffff; /* 버튼 활성화 시 글자색 변경 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Drop shadow */
}

button:first-of-type {
  border-right: 1px solid var(--border-secondary); /* 버튼 사이에 경계선 추가 */
}
</style>
