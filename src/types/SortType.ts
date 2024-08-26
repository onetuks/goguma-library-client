export type SortType = "LATEST" | "PICK";

export const SortTypes: Map<SortType, string> = new Map([
  ["LATEST", "최신순"],
  ["PICK", "추천순"],
]);
