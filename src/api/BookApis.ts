// ISBN 도서 정보 조회
import { Category } from "@/types/Category";
import { buildPageQuery, get, postFormData } from "@/api/ServerRequest";

export interface BookIsbnGetResponse {
  title: string;
  authorName: string;
  publisher: string;
  isbn: string;
  category: Category[];
  coverImageUrl: string;
}

export interface BookResponse {
  bookId: number;
  title: string;
  authorName: string;
  introduction: string;
  isbn: string;
  publisher: string;
  categories: Category[];
  coverImageUrl: string;
  isIndie: boolean;
  isPermitted: boolean;
}

export interface BookPostRequest {
  title: string;
  authorName: string;
  isbn: string;
  publisher: string;
  categories: Category[];
  isIndie: boolean;
}

export const BookApis = {
  getBookWithIsbn: async (isbn: string): Promise<BookIsbnGetResponse> => {
    // ISBN 도서 정보 조회
    return await get(`/books/isbn/${isbn}`).then(
      (data) => data as BookIsbnGetResponse
    );
  },
  postNewBook: async (
    request: BookPostRequest,
    coverImage: File
  ): Promise<BookResponse> => {
    // 도서 등록
    return await postFormData(
      "/books",
      "request",
      request,
      "cover-image",
      coverImage
    ).then((data) => data as BookResponse);
  },
  getBook: async (bookId: number): Promise<BookResponse> => {
    // 도서 단건 조회
    return await get(`/books/${bookId}`).then((data) => data as BookResponse);
  },
  getBooksWithKeyword: async (
    keyword: string,
    page?: number,
    size?: number
  ): Promise<BookResponse[]> => {
    // 제목/저자/출판사 포함 도서 다건 조회
    return await get(
      `/books?keyword=${keyword}${buildPageQuery(page, size)}`
    ).then((data) => data as BookResponse[]);
  },
  getBooksWithInterestedCategories: async (): Promise<BookResponse[]> => {
    // 관심 카테고리 포함 도서 다건 조회
    return await get("/books/recommend/interested-categories").then(
      (data) => data as BookResponse[]
    );
  },
  getWeeklyBooks: async (): Promise<BookResponse[]> => {
    // 금주도서 조회
    return await get("/books/recommend/weekly-featured").then(
      (data) => data as BookResponse[]
    );
  },
};
