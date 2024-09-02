import { Pageable, PageSort } from "@/types/Page";

export interface Slice<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: PageSort;
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
}
