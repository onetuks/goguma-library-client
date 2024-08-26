export type CategoryType =
  | "ALL"
  | "ETC"
  | "POETRY"
  | "ESSAY"
  | "TRAVEL"
  | "PHOTO"
  | "ILLUSTRATION"
  | "CARTOON"
  | "MAGAZINE"
  | "NOVEL"
  | "ART_BOOK"
  | "NON_LITERATURE";

export const CategoryMap: Map<CategoryType, string> = new Map([
  ["ALL", "전체"],
  ["ETC", "기타"],
  ["POETRY", "시집"],
  ["ESSAY", "에세이"],
  ["TRAVEL", "기행문"],
  ["PHOTO", "사진집"],
  ["ILLUSTRATION", "일러스트집"],
  ["CARTOON", "만화책"],
  ["MAGAZINE", "잡지"],
  ["NOVEL", "소설집"],
  ["ART_BOOK", "미술"],
  ["NON_LITERATURE", "비문학"],
]);
