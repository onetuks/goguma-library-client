export const PAGE_LIMIT = 5;

export interface Page<T> {
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

export interface PageSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: PageSort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export const emptyPage = <T>(): Page<T> => {
  return {
    content: [],
    empty: true,
    first: true,
    last: true,
    number: 1,
    numberOfElements: 0,
    size: 5,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    totalElements: 0,
    totalPages: 0,
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      offset: 0,
      unpaged: true,
      paged: false,
    },
  };
};

export const buildPageQuery = (page?: number, size?: number): string => {
  let query = "";
  query += page || size ? "?" : "";
  query += page ? `page=${page - 1}` : "";
  query += page && size ? "&" : "";
  query += size ? `size=${size}` : "";
  return query;
};

export const buildPageQueryWithOutQuestionMark = (
  page?: number,
  size?: number
): string => {
  let query = "";
  query += page || size ? "&" : "";
  query += page ? `page=${page - 1}` : "";
  query += page && size ? "&" : "";
  query += size ? `size=${size}` : "";
  return query;
};

export const regulatePageNumber = <T>(page: Page<T>): Page<T> => {
  if (page.empty) {
    page.number += 1;
  }
  return page;
};
