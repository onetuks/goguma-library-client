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

export interface Book {
  bookId: number | null;
  title: string;
  authorName: string;
  introduction: string | null;
  isbn: string;
  publisher: string;
  categories: Category[];
  coverImageUrl: string;
  isIndie: boolean;
  isPermitted: boolean;
  pickCount: number | null;
  createdAt: Date | null;
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
    return await postFormData("/books", request, [
      "cover-image",
      coverImage,
    ]).then((data) => data as BookResponse);
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

export const mapBookIsbnGetResponseToBook = (
  bookIsbnGetResponse: BookIsbnGetResponse
): Book => {
  return {
    bookId: null,
    title: bookIsbnGetResponse.title,
    authorName: bookIsbnGetResponse.authorName,
    introduction: null,
    isbn: bookIsbnGetResponse.isbn,
    publisher: bookIsbnGetResponse.publisher,
    categories: bookIsbnGetResponse.category,
    coverImageUrl: bookIsbnGetResponse.coverImageUrl,
    isIndie: false,
    isPermitted: false,
    pickCount: null,
    createdAt: null,
  };
};

export const initBook = (): Book => {
  return {
    bookId: null,
    title: "",
    authorName: "",
    introduction: null,
    isbn: "",
    publisher: "",
    categories: [],
    coverImageUrl: "",
    isIndie: false,
    isPermitted: false,
    pickCount: null,
    createdAt: null,
  };
};
