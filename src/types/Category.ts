export type Category =
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

interface CategoryMapping {
  key: Category;
  value: string;
}

export const Categories: CategoryMapping[] = [
  { key: "ALL", value: "전체" },
  { key: "ETC", value: "기타" },
  { key: "POETRY", value: "시" },
  { key: "ESSAY", value: "에세이" },
  { key: "TRAVEL", value: "여행" },
  { key: "PHOTO", value: "사진" },
  { key: "ILLUSTRATION", value: "일러스트" },
  { key: "CARTOON", value: "만화" },
  { key: "MAGAZINE", value: "잡지" },
  { key: "NOVEL", value: "소설" },
  { key: "ART_BOOK", value: "미술" },
  { key: "NON_LITERATURE", value: "비문학" },
];
